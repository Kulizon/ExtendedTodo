import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import ProjectInterface from "../../interfaces/ProjectInterface";
import TodoInterface from "../../interfaces/TodoInterface";
import { ChromePicker } from "react-color";

import Todo from "../Todo/Todo";

const StyledAddTodo = styled.div`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  background: #fff;
`;

const AddTodo = (props: {
  onAddTodo: (newTodo: TodoInterface) => void;
  onAddProject: (newProject: ProjectInterface) => void;
  projects: ProjectInterface[];
}) => {
  const formRef = useRef<any>();

  const [todo, setTodo] = useState<TodoInterface>({
    id: nanoid(),
    title: "",
    text: "",
    color: "#000",
    projectID: props.projects[0]?.id,
    projectTitle: props.projects[0]?.title,
    finished: false,
    dueToDate: "",
    dueToTime: "",
  });

  const [isAddProjectMenuVisible, setIsAddProjectMenuVisible] = useState(false);

  useEffect(() => {
    setTodo((prevTodo) => {
      return {
        ...prevTodo,
        projectID: props.projects[0]?.id,
        projectTitle: props.projects[0]?.title,
      };
    });
  }, [props.projects]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    const fieldName = e.target.name;

    if (fieldName === "project") {
      setTodo((prevTodo) => {
        return {
          ...prevTodo,
          projectID: value,
          projectTitle: props.projects.filter((p) => p.id === value)[0].title,
        };
      });
    } else {
      setTodo((prevTodo) => {
        return { ...prevTodo, [fieldName]: value };
      });
    }
  };

  const addTodoHandler = (e: any) => {
    e.preventDefault();

    if (e.nativeEvent.submitter.id === "todo-submit") {
      const projectInput = e.target[5];
      setTodo((t) => {
        return {
          ...t,
          projectID: projectInput.value,
          projectTitle: props.projects.filter(
            (p) => p.id === projectInput.value
          )[0].title,
        };
      });

      if (
        !todo.title ||
        !todo.text ||
        !todo.color ||
        !todo.dueToDate ||
        !todo.dueToTime
      ) {
        alert("Fill out fields");
        return;
      }

      if (!projectInput.value && projectInput.name !== "project") {
        alert("Add project");
        return;
      }

      props.onAddTodo(todo);
    }

    if (e.nativeEvent.submitter.id === "project-submit") {
      const projectTitle = e.target[5].value;
      const projectDescription = e.target[6].value;
      const projectColor = e.target[7].value;
      const projectIcon = e.target[8].value;

      props.onAddProject({
        title: projectTitle,
        description: projectDescription,
        color: projectColor,
        todos: [],
        icon: projectIcon,
        id: nanoid(),
      });
      setIsAddProjectMenuVisible(false);
    }
  };

  useEffect(() => {
    if (props.projects.length === 1)
      setTodo((prevTodo) => {
        return { ...prevTodo, projectID: props.projects[0].id };
      });
  }, [props.projects]);

  return (
    <StyledAddTodo>
      <form onSubmit={addTodoHandler} ref={formRef}>
        <h2>Todo</h2>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="title">Text</label>
          <input type="text" name="text" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="title">Color</label>
          <input type="color" name="color" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="title">Due to</label>
          <input type="date" name="dueToDate" onChange={handleChange} />
          <input type="time" name="dueToTime" onChange={handleChange} />
        </div>

        <div>
          <h2>Project</h2>
          {isAddProjectMenuVisible || props.projects.length === 0 ? (
            <>
              <div>
                <label htmlFor="projectTitle">Title</label>
                <input type="text" name="projectTitle" />
              </div>
              <div>
                <label htmlFor="projectDescription">Description</label>
                <input type="text" name="projectDescription" />
              </div>
              <div>
                <label htmlFor="projectColor">Color</label>
                <input type="color" name="projectColor" />
              </div>
              <div>
                <label htmlFor="projectIcon">Icon</label>
                <input type="text" name="projectIcon" />
              </div>
              <button id="project-submit">Add Project</button>
            </>
          ) : (
            <select name="project" onChange={handleChange}>
              {props.projects.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          )}
          {props.projects.length !== 0 && (
            <button
              onClick={() =>
                setIsAddProjectMenuVisible((prevState) => !prevState)
              }
            >
              Change
            </button>
          )}
        </div>

        <button id="todo-submit">Add</button>
      </form>
      {todo.title &&
        todo.text &&
        todo.color &&
        todo.projectID &&
        todo.dueToDate &&
        todo.dueToTime && <Todo todo={todo} onToggleState={() => {}}></Todo>}
    </StyledAddTodo>
  );
};

export default AddTodo;
