import TodoInterface from "../../interfaces/TodoInterface";
import ProjectInterface from "../../interfaces/ProjectInterface";

import TodoList from "./TodoList/TodoList";
import ProjectList from "./ProjectList/ProjectList";

const Lists = (props: {
  todos: TodoInterface[];
  projects: ProjectInterface[];
  onDelete: (id: string, type: "PROJECT" | "TODO") => void;
  onToggleState?: (id: string) => void;
}) => {
  return (
    <div>
      <ProjectList
        projects={props.projects}
        onDelete={props.onDelete}
      ></ProjectList>
      <TodoList
        todos={props.todos}
        onDelete={props.onDelete}
        onToggleState={props.onToggleState}
      ></TodoList>
    </div>
  );
};

export default Lists;
