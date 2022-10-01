import { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import TodoInterface from "./interfaces/TodoInterface";

import AddTodo from "./components/AddTodo/AddTodo";
import Lists from "./components/Lists/Litsts";
import ProjectInterface from "./interfaces/ProjectInterface";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
`;

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [projects, setProjects] = useState<ProjectInterface[]>([]);

  const addTodoHandler = (newTodo: TodoInterface) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
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

  const deleteHandler = (id: string, type: "PROJECT" | "TODO") => {
    if (type === "PROJECT") {
      setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));
      setTodos((prevTodos) => prevTodos.filter((t) => t.projectID !== id));
    } else if (type === "TODO") {
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")!));
    }

    if (localStorage.getItem("projects")) {
      setProjects(JSON.parse(localStorage.getItem("projects")!));
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

  return (
    <StyledApp>
      <header className="App-header"></header>
      <AddTodo
        onAddTodo={addTodoHandler}
        onAddProject={addProjectHandler}
        projects={projects}
      ></AddTodo>
      <Lists
        todos={todos}
        projects={projects}
        onDelete={deleteHandler}
        onToggleState={toggleStateHandler}
      ></Lists>
    </StyledApp>
  );
};

export default App;
