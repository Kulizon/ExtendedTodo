import styled from "styled-components";
import TodoInterface from "../../interfaces/TodoInterface";

const StyledTodo = styled.div`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Todo = (props: {
  todo: TodoInterface;
  onDelete?: (id: string, type: "PROJECT" | "TODO") => void;
  onToggleState?: (id: string) => void;
}) => {
  const deleteHandler = () => {
    if (props.onDelete) props.onDelete(props.todo.id, "TODO");
  };

  const toggleStateHandler = () => {
    if (props.onToggleState) props.onToggleState(props.todo.id);
  };

  return (
    <StyledTodo>
      <h3>{props.todo.title}</h3>
      <p>{props.todo.text}</p>
      Project: {props.todo.projectTitle}
      <br></br>
      Due to: {props.todo.dueToDate}, {props.todo.dueToTime}
      {props.onToggleState && (
        <button onClick={toggleStateHandler}>
          {props.todo.finished ? "Add to todo" : "Add to finished"}
        </button>
      )}
      {props.onDelete && <button onClick={deleteHandler}>Delete</button>}
    </StyledTodo>
  );
};

export default Todo;
