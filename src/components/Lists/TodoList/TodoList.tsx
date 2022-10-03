import styled from "styled-components";
import TodoInterface from "../../../interfaces/TodoInterface";

import Todo from "../../Todo/Todo";

import { fntWghtNrml, drk4 } from "../../../resources/variables";

const StyledTodoList = styled.ul`
  margnin: 2rem 0;

  > h3 {
    margin-top: 1rem;
    color: ${drk4};
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    font-weight: ${fntWghtNrml};

    span {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
  }

  > h2 {
    font-weight: ${fntWghtNrml};
  }
`;

const TodoList = (props: {
  todos: TodoInterface[];
  onDelete: (id: string, type: "PROJECT" | "TODO", projectID?: string) => void;
  onToggleState?: (id: string) => void;
  onStartEdit?: (oldTodo: TodoInterface) => void;
}) => {
  return (
    <StyledTodoList>
      <h2>Your Todos ✒️</h2>
      {props.todos.length === 0 ? (
        <h3>
          <span>❗️</span> You have no todos... try adding one!
        </h3>
      ) : (
        <>
          {props.todos.map((todo) => (
            <Todo
              todo={todo}
              key={Math.random().toString()}
              onDelete={props.onDelete}
              onToggleState={props.onToggleState}
              onStartEdit={props.onStartEdit}
            ></Todo>
          ))}
        </>
      )}
    </StyledTodoList>
  );
};

export default TodoList;
