import { useState } from "react";
import styled from "styled-components";
import hexToRgb from "../../resources/hexToRgb";
import ProjectInterface from "../../interfaces/ProjectInterface";
import TodoInterface from "../../interfaces/TodoInterface";

import Todo from "../Todo/Todo";
import Popup from "../UI/Popup/Popup";
import IconButton from "../UI/IconButton/IconButton";
import Button from "../UI/Button/Button";
import DeleteIcon from "../../assets/DeleteIcon";

import { drk3, lght1 } from "../../resources/variables";

interface StyledButtonProps {
  backgroundColor?: string;
  className?: string;
}
const StyledProject = styled("div")<StyledButtonProps>`
  border-radius: 15px;
  background: ${lght1};
  max-width: 400px;
  height: 100%;

  &:hover:not(.highlighted) {
    cursor: pointer;
    opacity: 0.85;
  }

  > p,
  > div,
  li, span > div, span > p {
    padding-right: 2rem;
    padding-left: 2rem;
  }

  > div, &.highlighted span > div {
    background: ${(props) =>
      props.backgroundColor ? props.backgroundColor : "#eee"};
    color: ${(props) => {
      const rgb = hexToRgb(props.backgroundColor!);

      return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 186
        ? drk3
        : lght1;
    }};
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 15px 15px 0 0;
  }

  h3 {
    font-size: 1.8rem;
  }

  > p, span > p {
    font-size: 1.1rem;
    padding-top: 1.5rem;
    padding-bottom: 1rem;
  }

  &.highlighted {
    max-width: none;
    width: 100%;
    position: relative;
    background: ${lght1};
    margin: 0;     

    > span {
      max-height: 90vh;
      overflow-y: hidden;
    }

    ul {
      height: 100%;
      max-height: 60vh;
      overflow-y: auto;

      li > div {

        > button {
          top: 0;
          right: 0;
        }
      }
    }

    > div, span > div {
      position: relative;

      button {
        position: absolute;
        right: 1rem;
        bottom: 0;
        transform: translateY(50%)
      }
    }
  }


  > button {
    position: absolute;
    top: -0.75rem;
    left: -0.75rem;
  }
`;

const Project = (props: {
  project: ProjectInterface;
  onDelete: (id: string, type: "PROJECT" | "TODO", projectID?: string) => void;
  onChangeProgressBar: () => void;
  onToggleState?: (id: string, projectID?: string) => void;
  onStartEdit?: (oldTodo: TodoInterface) => void;
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const deleteHandler = () => {
    props.onDelete(props.project.id, "PROJECT");
    props.onChangeProgressBar();
  };

  const deleteTodoHandler = (e: any, todoID: string) => {
    props.onDelete(todoID, "TODO", props.project.id);
  };

  const amountOfTodosText = `${props.project.todos.length} todo${
    props.project.todos.length !== 1 ? "s" : ""
  }`;

  return (
    <>
      {isHighlighted && (
        <Popup onBackdropClick={() => setIsHighlighted(false)}>
          <StyledProject
            className="highlighted"
            backgroundColor={props.project.color}
          >

<span className=".wrap">
<div>
              <h3>{props.project.title}</h3>
              <span>{amountOfTodosText}</span>
              <Button onClick={deleteHandler}>Delete Project</Button>
            </div>

            <p>{props.project.description}</p>
            <ul>
              {props.project.todos.map((t) => (
                <li key={t.id}>
                  <Todo
                    todo={t}
                    onToggleState={props.onToggleState}
                    onDelete={deleteTodoHandler.bind(this, t.id)}
                    onStartEdit={props.onStartEdit}
                    closeProjectPopup={() => setIsHighlighted(false)}
                    darkerBackground
                  ></Todo>
                </li>
              ))}
            </ul>
            

</span>

            <IconButton
              icon={<DeleteIcon></DeleteIcon>}
              onClick={() => setIsHighlighted(false)}
            ></IconButton>
          </StyledProject>
        </Popup>
      )}
      <StyledProject
        onClick={() => setIsHighlighted(true)}
        backgroundColor={props.project.color}
      >
        <div>
          <h3>{props.project.title}</h3>
          <span>{amountOfTodosText}</span>
        </div>
        <p>{props.project.description}</p>
      </StyledProject>
    </>
  );
};

export default Project;
