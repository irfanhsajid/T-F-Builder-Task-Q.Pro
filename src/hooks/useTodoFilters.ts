import { useState, useCallback } from "react";
import type { TodoFilters, TodoPageSize } from "@/types/todos";

const STORAGE_KEY = "todo-filters";

const defaultFilters: TodoFilters = {
  userId: "",
  status: "",
  search: "",
  page: 1,
  pageSize: 10,
};

function normalizePageSize(value: unknown): TodoPageSize {
  if (value === "all") return "all";
  const n = Number(value);
  if (n === 10 || n === 20 || n === 50) return n;
  return 10;
}

function loadFilters(): TodoFilters {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<TodoFilters>;
      return {
        ...defaultFilters,
        ...parsed,
        pageSize: normalizePageSize(parsed.pageSize),
      };
    }
  } catch {
    /* ignore parse errors */
  }
  return defaultFilters;
}

export const useTodoFilters = () => {
  const [filters, setFiltersState] = useState<TodoFilters>(loadFilters);

  const setFilters = useCallback((update: Partial<TodoFilters>) => {
    setFiltersState((prev) => {
      const next = { ...prev, ...update };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFilters));
    } catch {
      /* ignore quota / private mode */
    }
  }, []);

  return { filters, setFilters, resetFilters };
};
