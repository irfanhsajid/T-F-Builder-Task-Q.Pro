export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
}

/** Rows per page for the todo table (JSON-serializable). */
export type TodoPageSize = 10 | 20 | 50 | "all";

export interface TodoFilters {
  userId: string;
  status: string;
  search: string;
  page: number;
  pageSize: TodoPageSize;
}
