import TodoInterface from "./TodoInterface";

interface ProjectInterface {
  id: string;
  title: string;
  description: string;
  todos: TodoInterface[];
  color: string;
  icon: string;
}

export default ProjectInterface;
