import { useState } from "react";
import styled from "styled-components";
import ProjectInterface from "../../interfaces/ProjectInterface";

import Todo from "../Todo/Todo";
import Popup from "../UI/Popup/Popup";

const StyledProject = styled.div`
  border-radius: 15px;
  background: #eee;
  max-width: 400px;
  margin: auto;
  margin: 1rem;

  button,
  p,
  > div {
    padding-right: 1rem;
    padding-left: 1rem;
  }

  > div {
    background: blue;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 15px 15px 0 0;
  }

  h3 {
    font-size: 2rem;
  }

  > p {
    font-size: 1.1rem;
    padding-top: 1.5rem;
    padding-bottom: 1rem;
  }
`;

const Project = (props: {
  project: ProjectInterface;
  onDelete: (id: string, type: "PROJECT" | "TODO") => void;
  onChangeProgressBar: () => void;
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const deleteHandler = () => {
    props.onDelete(props.project.id, "PROJECT");
    props.onChangeProgressBar();
  };

  return (
    <>
      {isHighlighted && (
        <Popup onBackdropClick={() => setIsHighlighted(false)}>
          <StyledProject onClick={() => setIsHighlighted(true)}>
            <div>
              <h3>{props.project.title}</h3>
              <span>{props.project.todos.length} todos</span>
            </div>

            <p>{props.project.description}</p>
            <ul>
              {props.project.todos.map((t) => (
                <li key={t.id}>
                  <Todo todo={t}></Todo>
                </li>
              ))}
            </ul>
            <button onClick={deleteHandler}>Delete</button>
          </StyledProject>
        </Popup>
      )}
      <StyledProject onClick={() => setIsHighlighted(true)}>
        <div>
          <h3>{props.project.title}</h3>
          <span>{props.project.todos.length} todos</span>
        </div>

        <p>{props.project.description}</p>
        <button onClick={deleteHandler}>Delete</button>
      </StyledProject>
    </>
  );
};

export default Project;
