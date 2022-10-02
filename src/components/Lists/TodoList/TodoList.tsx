import styled from "styled-components";
import TodoInterface from "../../../interfaces/TodoInterface";

import Todo from "../../Todo/Todo";

const StyledTodoList = styled.ul`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  ul {
    background: red;
  }
`;

const TodoList = (props: {
  todos: TodoInterface[];
  onDelete: (id: string, type: "PROJECT" | "TODO", projectID?: string) => void;
  onToggleState?: (id: string) => void;
}) => {
  return (
    <StyledTodoList>
      {props.todos.map((todo) => (
        <Todo
          todo={todo}
          key={Math.random().toString()}
          onDelete={props.onDelete}
          onToggleState={props.onToggleState}
        ></Todo>
      ))}
    </StyledTodoList>
  );
};

export default TodoList;
