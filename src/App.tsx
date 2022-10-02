import { useEffect, useState } from "react";
import styled from "styled-components";
import TodoInterface from "./interfaces/TodoInterface";
import ProjectInterface from "./interfaces/ProjectInterface";

import AddTodo from "./components/AddTodo/AddTodo";
import Lists from "./components/Lists/Litsts";
import IconButton from "./components/UI/IconButton/IconButton";
import Popup from "./components/UI/Popup/Popup";
import Button from "./components/UI/Button/Button";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 2rem auto;

  .username-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > button:not(.username-wrap button) {
    position: absolute;
    right: 1.5rem;
    bottom: 1.5rem;
    z-index: 160;
    width: 3rem;
    height: 3rem;
    font-size: 2.25rem;
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

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")!));
    }

    if (localStorage.getItem("projects")) {
      setProjects(JSON.parse(localStorage.getItem("projects")!));
    }

    if (localStorage.getItem("name")) {
      console.log();

      setName(localStorage.getItem("name")!);
    }
  }, []);

  useEffect(() => {
    setCount(count + 1);
    if (count < 2) return;

    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    setCount(count + 1);
    if (count < 2) return;
    localStorage.setItem("projects", JSON.stringify(projects));
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
        <Button onClick={() => setName("")} className="edit-username">
          Edit username
        </Button>
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
      <Lists
        todos={todos}
        projects={projects}
        onDelete={deleteHandler}
        onToggleState={toggleStateHandler}
      ></Lists>
      {!isAddTodoVisible && (
        <IconButton
          icon="+"
          onClick={() => setIsAddTodoVisible(true)}
        ></IconButton>
      )}
    </StyledApp>
  );
};

export default App;
