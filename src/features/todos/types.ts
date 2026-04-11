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

export interface TodoFilters {
  userId: string;
  status: string;
  search: string;
  page: number;
}
