import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { TodoFilters, User } from "../types";

const ALL_ROWS_LIMIT = 200;

function apiLimit(filters: TodoFilters): number {
  return filters.pageSize === "all" ? ALL_ROWS_LIMIT : filters.pageSize;
}

function apiPage(filters: TodoFilters): number {
  return filters.pageSize === "all" ? 1 : filters.page;
}

function statusForApi(
  status: string,
): "completed" | "pending" | undefined {
  if (status === "completed" || status === "pending") return status;
  return undefined;
}

export const useTodos = (filters: TodoFilters) => {
  const limit = apiLimit(filters);
  const page = apiPage(filters);
  const status = statusForApi(filters.status);

  const query = useQuery({
    queryKey: [
      "todos",
      "page",
      page,
      limit,
      filters.userId,
      filters.status,
      filters.search.trim(),
    ],
    queryFn: () =>
      api.fetchTodosPage({
        page,
        limit,
        userId: filters.userId || undefined,
        status,
        search: filters.search.trim() || undefined,
      }),
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
