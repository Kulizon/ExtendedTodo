import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import ProjectInterface from "../../interfaces/ProjectInterface";
import TodoInterface from "../../interfaces/TodoInterface";

import Todo from "../Todo/Todo";
import IconButton from "../UI/IconButton/IconButton";
import Button from "../UI/Button/Button";
import DeleteIcon from "../../assets/DeleteIcon";

const StyledAddTodo = styled.div`
  border-radius: 15px;
  background: #fff;
  width: 100%;
  position: relative;

  > button {
    position: absolute;
    left: -0.75rem;
    top: -0.75rem;
  }

  > span {
    max-height: 90vh;
    overflow-y: hidden;

    form, > div {
      padding: 0.5rem;
      margin: 0.5rem;
      max-height: 70vh;
      overflow-y: auto;
    }
  }

  form {
    display: flex;
    flex-direction: column;
  }

  > div {
    margin: 1rem;
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

      &.due-to {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column: 1/3;
        column-gap: 2rem;

        label {
          grid-column: 1/3;
        }
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

  @media (max-width: 800px) {
    form > div {
      display: flex;
      flex-direction: column;
    }
  }

`;

const AddTodo = (props: {
  onAddTodo: (newTodo: TodoInterface) => void;
  onAddProject: (newProject: ProjectInterface) => void;
  projects: ProjectInterface[];
  closePopup: () => void;
  editedTodo?: TodoInterface;
  onEditDone?: (oldTodo: TodoInterface, newTodo: TodoInterface) => void;
}) => {
  const formRef = useRef<any>();

  const [todo, setTodo] = useState<TodoInterface>(
    props.editedTodo
      ? { ...props.editedTodo }
      : {
          id: nanoid(),
          title: "",
          text: "",
          color: props.projects[0]?.color,
          projectID: props.projects[0]?.id,
          projectTitle: props.projects[0]?.title,
          finished: false,
          dueToDate: "",
          dueToTime: "",
        }
  );

  const [isAddProjectMenuVisible, setIsAddProjectMenuVisible] = useState(false);

  useEffect(() => {
    if (props.editedTodo) return;
    setTodo((prevTodo) => {
      return {
        ...prevTodo,
        color: props.projects[0]?.color,
        projectID: props.projects[0]?.id,
        projectTitle: props.projects[0]?.title,
      };
    });
  }, [props.projects, props.editedTodo]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    const fieldName = e.target.name;

    if (fieldName === "project") {
      setTodo((prevTodo) => {
        return {
          ...prevTodo,

          projectID: value,
          projectTitle: props.projects.filter((p) => p.id === value)[0].title,
          color: props.projects.filter((p) => p.id === value)[0].color,
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

    if (e.nativeEvent.submitter.id === "project-submit") {
      const projectTitle = e.target[4].value;
      const projectDescription = e.target[5].value;
      const projectColor = e.target[6].value;
      // const projectIcon = e.target[8].value;

      if (!projectTitle || !projectDescription || !projectColor) {
        alert('Fill out all fields!')
        return
      }

      props.onAddProject({
        title: projectTitle,
        description: projectDescription,
        color: projectColor,
        todos: [],
        // icon: projectIcon,
        id: nanoid(),
      });
      setIsAddProjectMenuVisible(false);
    }

    if (e.nativeEvent.submitter.id === "todo-submit") {
      const projectInput = e.target[4];
      

      setTodo((t) => {
        return {
          ...t,
          projectID: projectInput.value,
          projectTitle: props.projects.filter(
            (p) => p.id === projectInput.value
          )[0]?.title,
          color: props.projects.filter(
            (p) => p.id === projectInput.value
          )[0]?.color,
        };
      });

      if (
        !todo.title ||
        !todo.text
      ) {
        alert("Fill out all fields!");
        return;
      }

      if (!projectInput.value && projectInput.name !== "project") {
        alert("Add project!");
        return;
      }

      if (props.onEditDone && props.editedTodo) {
        props.onEditDone(props.editedTodo, todo);
        props.closePopup();
        return;
      }

      props.onAddTodo(todo);
      props.closePopup();
    }
  };

  useEffect(() => {
    if (props.projects.length === 1)
      setTodo((prevTodo) => {
        return { ...prevTodo, projectID: props.projects[0].id, projectTitle: props.projects[0].title, color: props.projects[0].color };
      });
  }, [props.projects]);

  return (
    <StyledAddTodo>
      <IconButton onClick={props.closePopup} icon={<DeleteIcon></DeleteIcon>}></IconButton>
      <span className="wrap">
      <form onSubmit={addTodoHandler} ref={formRef}>
        <div>
          <h2>Todo 📌</h2>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              defaultValue={props.editedTodo ? props.editedTodo.title : ""} autoComplete="false"
            />
          </div>
          <div>
            <label htmlFor="title">Text</label>
            <input
              type="text"
              name="text"
              onChange={handleChange}
              defaultValue={props.editedTodo ? props.editedTodo.text : ""} autoComplete="false"
            />
          </div>
          <div className="due-to">
            <label htmlFor="title">Due to</label>
              <input
                type="date"
                name="dueToDate"
                onChange={handleChange}
                defaultValue={
                  props.editedTodo ? props.editedTodo.dueToDate : ""
                }
              />
              <input
                type="time"
                name="dueToTime"
                onChange={handleChange}
                defaultValue={
                  props.editedTodo ? props.editedTodo.dueToTime : ""
                }
              />
          </div>
        </div>

        <div>
          <h2>Project ⚙️</h2>
          {isAddProjectMenuVisible || props.projects.length === 0 ? (
            <>
              <div>
                <label htmlFor="projectTitle">Title</label>
                <input type="text" name="projectTitle" autoComplete="false"/>
              </div>
              <div>
                <label htmlFor="projectDescription">Description</label>
                <input type="text" name="projectDescription" autoComplete="false"/>
              </div>
              <div>
                <label htmlFor="projectColor">Color</label>
                <input type="color" name="projectColor" />
              </div>
              <span></span>
              {/* <div>
                <label htmlFor="projectIcon">Icon</label>
                <input type="text" name="projectIcon" />
              </div> */}
              <Button id="project-submit">Add New Project</Button>
            </>
          ) : (
            <select
              name="project"
              onChange={handleChange}
              defaultValue={props.editedTodo ? props.editedTodo.projectID : ""}
            >
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

        <Button id="todo-submit" disabled={isAddProjectMenuVisible || props.projects.length === 0}>
          {props.editedTodo && props.onEditDone ? "Edit" : "Add"}
        </Button>
      </form>

      </span>

      {todo.title &&
        todo.text &&
        todo.projectID &&
<Todo todo={todo} onToggleState={() => {}} darkerBackground></Todo>}
    </StyledAddTodo>
  );
};

export default AddTodo;
