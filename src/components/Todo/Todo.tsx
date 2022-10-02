import styled from "styled-components";
import TodoInterface from "../../interfaces/TodoInterface";

const StyledTodo = styled.div`
  border-radius: 15px;
  background: #eee;
  padding: 1rem;
  display: flex;
  position: relative;

  > div {
    display: flex;
    flex-direction: column;
  }

  span {
    margin: 0 0.5rem;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const Todo = (props: {
  todo: TodoInterface;
  onDelete?: (id: string, type: "PROJECT" | "TODO", projectID?: string) => void;
  onToggleState?: (id: string) => void;
}) => {
  const deleteHandler = () => {
    if (props.onDelete)
      props.onDelete(props.todo.id, "TODO", props.todo.projectID);
  };

  const toggleStateHandler = () => {
    if (props.onToggleState) props.onToggleState(props.todo.id);
  };

  return (
    <StyledTodo>
      <input
        type={"checkbox"}
        checked={props.todo.finished}
        onChange={toggleStateHandler}
      />
      <div>
        <h3>{props.todo.title}</h3>
        <p>{props.todo.text}</p>
        <p>
          Project: {props.todo.projectTitle}
          <span></span>
          Due to: {props.todo.dueToDate}, {props.todo.dueToTime}
        </p>
      </div>

      {props.onDelete && props.todo.finished && (
        <button onClick={deleteHandler}>Delete</button>
      )}
    </StyledTodo>
  );
};

export default Todo;
