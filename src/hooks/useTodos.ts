import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { TodoFilters, User } from "@/types/todos";

function statusForApi(status: string): "completed" | "pending" | undefined {
  if (status === "completed" || status === "pending") return status;
  return undefined;
}

export const useTodos = (filters: TodoFilters) => {
  const status = statusForApi(filters.status);
  const search = filters.search.trim() || undefined;
  const userId = filters.userId || undefined;
  const isAll = filters.pageSize === "all";

  const query = useQuery({
    queryKey: [
      "todos",
      isAll ? "all" : "page",
      isAll ? null : filters.page,
      isAll ? null : filters.pageSize,
      filters.userId,
      filters.status,
      filters.search.trim(),
    ],
    queryFn: () => {
      const ps = filters.pageSize;
      if (ps === "all") {
        return api.fetchTodosPage({ userId, status, search });
      }
      return api.fetchTodosPage({
        page: filters.page,
        limit: ps,
        userId,
        status,
        search,
      });
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  return {
    todos: query.data?.todos ?? [],
    totalCount: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
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
