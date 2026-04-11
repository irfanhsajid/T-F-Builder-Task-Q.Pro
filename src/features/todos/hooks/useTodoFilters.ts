import { useState, useCallback } from "react";
import type { TodoFilters } from "../types";

const STORAGE_KEY = "todo-filters";

const defaultFilters: TodoFilters = { userId: "", status: "", search: "", page: 1 };

function loadFilters(): TodoFilters {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultFilters, ...JSON.parse(saved) };
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

  return { filters, setFilters };
};
