import { useMemo } from "react";
import type { Todo, TodoFilters, TodoPageSize } from "../types";

function effectivePageSize(ps: TodoPageSize): number | "all" {
  return ps === "all" ? "all" : ps;
}

export const useFilteredTodos = (todos: Todo[], filters: TodoFilters) => {
  return useMemo(() => {
    let result = todos;
    if (filters.userId) result = result.filter((t) => t.userId === Number(filters.userId));
    if (filters.status === "completed") result = result.filter((t) => t.completed);
    if (filters.status === "pending") result = result.filter((t) => !t.completed);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }
    const filtered = result;

    const size = effectivePageSize(filters.pageSize);

    if (size === "all") {
      return {
        filtered,
        paginated: filtered,
        page: 1,
        totalPages: 1,
        pageSize: "all" as const,
      };
    }

    const totalPages = Math.max(1, Math.ceil(filtered.length / size));
    const page = Math.min(filters.page, totalPages);
    const paginated = filtered.slice((page - 1) * size, page * size);

    return {
      filtered,
      paginated,
      page,
      totalPages,
      pageSize: size,
    };
  }, [todos, filters.userId, filters.status, filters.search, filters.page, filters.pageSize]);
};
