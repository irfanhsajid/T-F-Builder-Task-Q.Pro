import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { Todo } from "../types";

export const useTodos = () => {
  const todosQuery = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: api.fetchTodos,
    staleTime: Infinity,
  });

  return {
    todos: todosQuery.data ?? [],
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,
  };
};
