export type Todo = {
  id: string;
  title: string;
  isActive: boolean;
  index: number;
};
export type TodoList = Todo[];
export type Filter = "All" | "Active" | "Completed";
