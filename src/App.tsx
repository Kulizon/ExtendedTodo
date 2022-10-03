import { useEffect, useState } from "react";
import styled from "styled-components";
import TodoInterface from "./interfaces/TodoInterface";
import ProjectInterface from "./interfaces/ProjectInterface";

import AddTodo from "./components/AddTodo/AddTodo";
import Lists from "./components/Lists/Litsts";
import IconButton from "./components/UI/IconButton/IconButton";
import Popup from "./components/UI/Popup/Popup";
import Button from "./components/UI/Button/Button";
import AddIcon from "./assets/AddIcon";
import EditIcon from "./assets/EditIcon";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 2rem auto;

  @media (max-width: 1232px) { 
    padding: 0 2rem;
  }

  @media (max-width: 616px) { 
    padding: 0 1rem;
  }

  .username-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      width: 2.5rem;
      height: 2.5rem;

      svg {
        width: 2rem;
        height: 2rem;
      }
    }
  }

  > button:not(.username-wrap button) {
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
    z-index: 160;
    width: 3rem;
    height: 3rem;
    font-size: 2.25rem;
  }

  @media (max-width: 600px) {

    > button:not(.username-wrap button) {
      right: 1rem;
      bottom: 1rem;
      z-index: 160;
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.5rem;
    }
  
  }
`;

const StyledNameForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  label {
    font-size: 2rem;
  }

  input {
    margin: 0.5rem 0 2rem;
  }
`;

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [projects, setProjects] = useState<ProjectInterface[]>([]);

  const [isAddTodoVisible, setIsAddTodoVisible] = useState(false);
  const [editedTodo, setEditedTodo] = useState<TodoInterface>();
  const [name, setName] = useState("");

  const addTodoHandler = (newTodo: TodoInterface) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setProjects((prevProjects) => [
      ...prevProjects.map((p) => {
        if (p.id === newTodo.projectID)
          return { ...p, todos: [...p.todos, newTodo] };
        else return p;
      }),
    ]);
  };

  const addProjectHandler = (newProject: ProjectInterface) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const toggleStateHandler = (id: string, projectID?: string) => {
    setTodos((prevTodos) => [
      ...prevTodos.map((t) => {
        if (t.id === id) return { ...t, finished: !t.finished };
        else return t;
      }),
    ]);
    setProjects((prevProjects) => [
      ...prevProjects.map((p) => {
        if (p.id === projectID) {
          return {
            ...p,
            todos: [
              ...p.todos.map((t) => {
                if (t.id === id) return { ...t, finished: !t.finished };
                else return t;
              }),
            ],
          };
        } else return p;
      }),
    ]);
  };

  const deleteHandler = (
    id: string,
    type: "PROJECT" | "TODO",
    projectID?: string
  ) => {
    if (type === "PROJECT") {
      setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));
      setTodos((prevTodos) => prevTodos.filter((t) => t.projectID !== id));
    } else if (type === "TODO") {
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
      setProjects((prevProjects) => [
        ...prevProjects.map((p) => {
          if (p.id === projectID)
            return { ...p, todos: [...p.todos.filter((t) => t.id !== id)] };
          else return p;
        }),
      ]);
    }
  };

  // edit --> delete old and add new
  const editDoneHandler = (oldTodo: TodoInterface, newTodo: TodoInterface) => {
    deleteHandler(oldTodo.id, "TODO", oldTodo.projectID);
    addTodoHandler(newTodo);
  };

  // start edit
  const startEditHandler = (oldTodo: TodoInterface) => {
    setEditedTodo(oldTodo);
  };

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")!));
    }

    if (localStorage.getItem("projects")) {
      setProjects(JSON.parse(localStorage.getItem("projects")!));
    }

    if (localStorage.getItem("name")) {
      setName(localStorage.getItem("name")!);
    }
  }, []);

  useEffect(() => {
    setCount(count + 1);
    if (count < 2) return;

    localStorage.setItem("todos", JSON.stringify(todos));
    // eslint-disable-next-line
  }, [todos]);

  useEffect(() => {
    setCount(count + 1);
    if (count < 2) return;
    localStorage.setItem("projects", JSON.stringify(projects));
    // eslint-disable-next-line
  }, [projects]);

  if (!name)
    return (
      <Popup isUsernameBackdrop>
        <StyledNameForm
          onSubmit={(e: any) => {
            e.preventDefault();
            setName(e.target[0].value);
            localStorage.setItem("name", e.target[0].value);
          }}
        >
          <label htmlFor="name">What's your name?</label>
          <input type="text" name="name" />
          <Button>Start</Button>
        </StyledNameForm>
      </Popup>
    );

  return (
    <StyledApp>
      <div className="username-wrap">
        <h1>Hi, {name} 👋</h1>
        <IconButton icon={          <EditIcon></EditIcon>} onClick={() => setName("")} className="edit-username"></IconButton>
      </div>

      {isAddTodoVisible && (
        <Popup onBackdropClick={() => setIsAddTodoVisible(false)}>
          <AddTodo
            onAddTodo={addTodoHandler}
            onAddProject={addProjectHandler}
            projects={projects}
            closePopup={() => setIsAddTodoVisible(false)}
          ></AddTodo>
        </Popup>
      )}

      {editedTodo && (
        <Popup onBackdropClick={() => setEditedTodo(undefined)}>
          <AddTodo
            onAddTodo={addTodoHandler}
            onAddProject={addProjectHandler}
            editedTodo={editedTodo}
            onEditDone={editDoneHandler}
            projects={projects}
            closePopup={() => setEditedTodo(undefined)}
          ></AddTodo>
        </Popup>
      )}
      <Lists
        todos={todos}
        projects={projects}
        onDelete={deleteHandler}
        onToggleState={toggleStateHandler}
        onStartEdit={startEditHandler}
      ></Lists>
      {!isAddTodoVisible && !editedTodo && (
        <IconButton
          icon={<AddIcon></AddIcon>}
          onClick={() => setIsAddTodoVisible(true)}
        ></IconButton>
      )}
    </StyledApp>
  );
};

export default App;
