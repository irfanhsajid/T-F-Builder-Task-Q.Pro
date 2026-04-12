import { useEffect, useMemo } from "react";
import { useTodos, useUsers } from "./hooks/useTodos";
import { useTodoFilters } from "./hooks/useTodoFilters";
import TodoFilters from "./components/TodoFilters";
import TodoTable from "./components/TodoTable";
import TodoTableSkeleton from "./components/TodoTableSkeleton";
import TodoPagination from "./components/TodoPagination";
import type { TodoPageSize } from "./types";
import styles from "@/styles/Todo.module.css";

function effectiveLimit(pageSize: TodoPageSize): number {
  return pageSize === "all" ? 200 : pageSize;
}

/**
 * Container: server-side pagination & filters via JSONPlaceholder query params.
 */
const TodoListContainer = () => {
  const { filters, setFilters, resetFilters } = useTodoFilters();
  const {
    todos,
    totalCount,
    isLoading: todosLoading,
    isFetching: todosFetching,
    isError: todosError,
  } = useTodos(filters);
  const { users, userMap, isLoading: usersLoading, isError: usersError } = useUsers();

  const limit = effectiveLimit(filters.pageSize);
  const totalPages = useMemo(() => {
    if (filters.pageSize === "all") return 1;
    return Math.max(1, Math.ceil(totalCount / limit));
  }, [totalCount, limit, filters.pageSize]);

  const page = Math.min(filters.page, totalPages);

  useEffect(() => {
    if (filters.page > totalPages) {
      setFilters({ page: totalPages });
    }
  }, [filters.page, totalPages, setFilters]);

  const isLoading = todosLoading || usersLoading;
  const isError = todosError || usersError;

  const skeletonRows = filters.pageSize === "all" ? 10 : filters.pageSize;

  if (isLoading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Todo List</h1>
        <TodoTableSkeleton rows={skeletonRows} />
      </div>
    );
  }

  if (isError) {
    return <div className={styles.error}>Failed to load data. Please try again.</div>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Todo List</h1>
      <TodoFilters
        filters={filters}
        users={users}
        onFilterChange={setFilters}
        onResetFilters={resetFilters}
      />
      <TodoTable
        todos={todos}
        userMap={userMap}
        isFetching={todosFetching}
        skeletonRows={skeletonRows}
      />
      <TodoPagination
        page={page}
        totalPages={totalPages}
        totalItems={totalCount}
        pageSize={filters.pageSize === "all" ? "all" : limit}
        pageSizeSetting={filters.pageSize}
        onPageChange={(p) => setFilters({ page: p })}
        onPageSizeChange={(ps) => setFilters({ pageSize: ps, page: 1 })}
      />
    </div>
  );
};

export default TodoListContainer;
