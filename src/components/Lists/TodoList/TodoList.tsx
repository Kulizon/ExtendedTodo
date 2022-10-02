import styled from "styled-components";
import TodoInterface from "../../../interfaces/TodoInterface";

import Todo from "../../Todo/Todo";

import { fntWghtNrml } from "../../../resources/variables";

const StyledTodoList = styled.ul`
  margnin: 2rem 0;

  h2 {
    font-weight: ${fntWghtNrml};
  }
`;

const TodoList = (props: {
  todos: TodoInterface[];
  onDelete: (id: string, type: "PROJECT" | "TODO", projectID?: string) => void;
  onToggleState?: (id: string) => void;
}) => {
  return (
    <StyledTodoList>
      <h2>Your Todos ✒️</h2>
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
