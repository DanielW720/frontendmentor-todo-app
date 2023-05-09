export type Todo = { id: string; title: string; isActive: boolean };
export type TodoList = Todo[];
export type Filter = "All" | "Active" | "Completed";
