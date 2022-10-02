import styled from "styled-components";
import TodoInterface from "../../interfaces/TodoInterface";

import Button from "../UI/Button/Button";

import { positive, lght1, lght3 } from "../../resources/variables";

interface StyledTodo {
  afterColor: string;
}

const StyledTodo = styled.div<StyledTodo>`
  border-radius: 15px;
  background: ${lght1};
  padding: 1rem;
  display: flex;
  position: relative;
  margin: 1rem 0 1.5rem;
  align-items: center;
  overflow: hidden;

  &::after {
    content: '';
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: ${(props) => props.afterColor};
    height: 5px;
  }



  > div {
    display: flex;
    flex-direction: column;
  }

  span {
    margin: 0 0.5rem;
  }

  button {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .checkbox {
    margin-right: 1rem;
    border-radius: 360px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;

    input {
      height 100%;
      width: 100%;
      accent-color: ${positive};

      &:not(:checked) {
        transform: scale(125%)
      }
    }
  }
`;

const Todo = (props: {
  todo: TodoInterface;
  onDelete?: (id: string, type: "PROJECT" | "TODO", projectID?: string) => void;
  onToggleState?: (id: string, projectID: string) => void;
}) => {
  const deleteHandler = () => {
    if (props.onDelete)
      props.onDelete(props.todo.id, "TODO", props.todo.projectID);
  };

  const toggleStateHandler = () => {
    if (props.onToggleState)
      props.onToggleState(props.todo.id, props.todo.projectID);
  };

  return (
    <StyledTodo afterColor={props.todo.color}>
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
        <p>
          Project: {props.todo.projectTitle}
          <span></span>
          Due to: {props.todo.dueToDate}, {props.todo.dueToTime}
        </p>
      </div>

      {props.onDelete && props.todo.finished && (
        <Button onClick={deleteHandler}>Delete</Button>
      )}
    </StyledTodo>
  );
};

export default Todo;
