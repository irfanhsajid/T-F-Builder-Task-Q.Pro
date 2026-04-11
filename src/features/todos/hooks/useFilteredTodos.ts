import { useMemo } from "react";
import type { Todo, TodoFilters } from "../types";

const PAGE_SIZE = 10;

export const useFilteredTodos = (todos: Todo[], filters: TodoFilters) => {
  const filtered = useMemo(() => {
    let result = todos;
    if (filters.userId) result = result.filter((t) => t.userId === Number(filters.userId));
    if (filters.status === "completed") result = result.filter((t) => t.completed);
    if (filters.status === "pending") result = result.filter((t) => !t.completed);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }
    return result;
  }, [todos, filters.userId, filters.status, filters.search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(filters.page, totalPages);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return { filtered, paginated, page, totalPages, pageSize: PAGE_SIZE };
};
