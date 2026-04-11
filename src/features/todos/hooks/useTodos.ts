import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { Todo, User } from "../types";

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

export const useUsers = () => {
  const usersQuery = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: api.fetchUsers,
    staleTime: Infinity,
  });

  const userMap = new Map<number, string>();
  usersQuery.data?.forEach((u) => userMap.set(u.id, u.name));

  return {
    users: usersQuery.data ?? [],
    userMap,
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
  };
};
