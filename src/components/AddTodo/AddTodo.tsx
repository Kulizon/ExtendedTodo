import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import ProjectInterface from "../../interfaces/ProjectInterface";
import TodoInterface from "../../interfaces/TodoInterface";

import Todo from "../Todo/Todo";
import IconButton from "../UI/IconButton/IconButton";
import Button from "../UI/Button/Button";

const StyledAddTodo = styled.div`
  border-radius: 15px;
  padding: 1rem;
  background: #fff;
  width: 100%;
  position: relative;

  > button {
    position: absolute;
    left: -0.75rem;
    top: -0.75rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  form > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 0.5rem;
    column-gap: 2rem;

    button {
      justify-self: flex-start;
    }

    &:nth-of-type(2) {
      margin: 2rem 0;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;

      > div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 2rem;
      }

      label {
        font-size: 1.1rem;
      }

      input {
        margin-top: 0.4rem;
        width: 100%;
        height: 1.75rem;
      }
    }
  }

  h2 {
    grid-column: 1/3;
  }

  form > button {
    align-self: center;
  }
`;

const AddTodo = (props: {
  onAddTodo: (newTodo: TodoInterface) => void;
  onAddProject: (newProject: ProjectInterface) => void;
  projects: ProjectInterface[];
  closePopup: () => void;
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
        alert("Fill out all fields!");
        return;
      }

      if (!projectInput.value && projectInput.name !== "project") {
        alert("Add project!");
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
      <IconButton onClick={props.closePopup} icon="x"></IconButton>
      <form onSubmit={addTodoHandler} ref={formRef}>
        <div>
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
            <div>
              <input type="date" name="dueToDate" onChange={handleChange} />
              <input type="time" name="dueToTime" onChange={handleChange} />
            </div>
          </div>
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
              <Button id="project-submit">Add New Project</Button>
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
            <Button
              onClick={() =>
                setIsAddProjectMenuVisible((prevState) => !prevState)
              }
            >
              {isAddProjectMenuVisible
                ? "Add to Existing Project "
                : "Add to New Project"}
            </Button>
          )}
        </div>

        <Button id="todo-submit" disabled={isAddProjectMenuVisible}>
          Add
        </Button>
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
