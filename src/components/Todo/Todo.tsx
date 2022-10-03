import styled from "styled-components";
import TodoInterface from "../../interfaces/TodoInterface";

import Button from "../UI/Button/Button";

import { positive, lght1, lght3, lght2 } from "../../resources/variables";

interface StyledTodoInterface {
  afterColor: string;
  darkerBackground?: boolean;
}

const StyledTodo = styled.div<StyledTodoInterface>`
  border-radius: 15px;
  background: ${(props) => props.darkerBackground ? lght2 : lght1};
  padding: 1rem;
  display: flex;
  position: relative;
  margin: 1rem 0 1.5rem;
  align-items: center;

  &::after {
    content: '';
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: ${(props) => props.afterColor};
    height: 5px;  
    border-radius: 360px;
  }

  > div {
    display: flex;
    flex-direction: column;

    > p:first-of-type {
      margin: 0.25rem 0 0.75rem;
    }

    > div {
      display: flex;

      > p:first-of-type {
        margin-right: 0.5rem;
      }
    }  
  }

  button {
    position: absolute;
    top: -0.75rem;
    right: 1rem;

    &:nth-of-type(2) {
      top: -0.75rem;
      right: 5.5rem
    }
  }

  .checkbox {
    margin-right: 1rem;
    border-radius: 360px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.75rem;
    height: 1.75rem;

    input {
      height 100%;
      width: 100%;
      accent-color: ${positive};

      &:not(:checked) {
        transform: scale(125%)
      }
    }
  }
    
  @media (max-width: 600px) {
    > div {
      > div {
        flex-direction: column;
      }
    }
  }

`;

const Todo = (props: {
  todo: TodoInterface;
  onDelete?: (id: string, type: "PROJECT" | "TODO", projectID?: string) => void;
  onToggleState?: (id: string, projectID: string) => void;
  onStartEdit?: (oldTodo: TodoInterface) => void;
  closeProjectPopup?: () => void;
  darkerBackground?: boolean
}) => {
  const deleteHandler = () => {
    if (props.onDelete)
      props.onDelete(props.todo.id, "TODO", props.todo.projectID);
  };

  const startEditHandler = () => {
    if (props.onStartEdit) {
      props.onStartEdit(props.todo);
      if (props.closeProjectPopup) props.closeProjectPopup();
    }
  };

  const toggleStateHandler = () => {
    if (props.onToggleState)
      props.onToggleState(props.todo.id, props.todo.projectID);
  };

  return (
    <StyledTodo afterColor={props.todo.color} darkerBackground={props.darkerBackground}>
      <div
        className="checkbox"
        style={
          !props.todo.finished ? { boxShadow: `0px 0px 0px 3px ${lght3}` } : {}
        }
      >
        <input
          type={"checkbox"}
          checked={props.todo.finished}
          onChange={toggleStateHandler}
        />
      </div>
      <div>
        <h4>{props.todo.title}</h4>
        <p>{props.todo.text}</p>
        <div>        <p>
          Project: {props.todo.projectTitle}  </p>
          <p>
          Due to: {props.todo.dueToDate}, {props.todo.dueToTime}
        </p></div>

      </div>
      <div className="button-container">
        {props.onStartEdit && <Button onClick={startEditHandler}>Edit</Button>}
        {props.onDelete && props.todo.finished && (
          <Button onClick={deleteHandler}>Delete</Button>
        )}
      </div>
    </StyledTodo>
  );
};

export default Todo;
