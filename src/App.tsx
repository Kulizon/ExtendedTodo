import { useEffect, useState } from "react";
import styled from "styled-components";
import TodoInterface from "./interfaces/TodoInterface";
import ProjectInterface from "./interfaces/ProjectInterface";

import AddTodo from "./components/AddTodo/AddTodo";
import Lists from "./components/Lists/Litsts";
import IconButton from "./components/UI/IconButton/IconButton";
import Popup from "./components/UI/Popup/Popup";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: auto;

  > button {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 160;
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

  const toggleStateHandler = (id: string) => {
    setTodos((prevTodos) => [
      ...prevTodos.map((t) => {
        if (t.id === id) return { ...t, finished: !t.finished };
        else return t;
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
      <Popup>
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            setName(e.target[0].value);
            localStorage.setItem("name", e.target[0].value);
          }}
        >
          <label htmlFor="name">What's your name?</label>
          <input type="text" name="name" />
          <button>Start</button>
        </form>
      </Popup>
    );

  return (
    <StyledApp>
      <h1>Hi, {name}</h1>
      {isAddTodoVisible && (
        <Popup onBackdropClick={() => setIsAddTodoVisible(false)}>
          <AddTodo
            onAddTodo={addTodoHandler}
            onAddProject={addProjectHandler}
            projects={projects}
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
