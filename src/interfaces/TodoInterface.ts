interface TodoInterface {
  id: string;
  title: string;
  text: string;
  color: string;
  projectID: string;
  projectTitle: string;
  finished: boolean;
  dueToDate?: string;
  dueToTime?: string;
}

export default TodoInterface;
