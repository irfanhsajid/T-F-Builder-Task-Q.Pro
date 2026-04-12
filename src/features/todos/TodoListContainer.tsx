import { Loader2 } from "lucide-react";
import { useTodos, useUsers } from "./hooks/useTodos";
import { useTodoFilters } from "./hooks/useTodoFilters";
import { useFilteredTodos } from "./hooks/useFilteredTodos";
import TodoFilters from "./components/TodoFilters";
import TodoTable from "./components/TodoTable";
import TodoPagination from "./components/TodoPagination";
import styles from "@/styles/Todo.module.css";

/**
 * Container component: orchestrates data fetching, filtering, and pagination.
 * Delegates rendering to presentational components.
 */
const TodoListContainer = () => {
  const { todos, isLoading: todosLoading, isError: todosError } = useTodos();
  const { users, userMap, isLoading: usersLoading, isError: usersError } = useUsers();
  const { filters, setFilters, resetFilters } = useTodoFilters();
  const { filtered, paginated, page, totalPages, pageSize } = useFilteredTodos(todos, filters);

  const isLoading = todosLoading || usersLoading;
  const isError = todosError || usersError;

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader2 className={styles.spinner} size={32} />
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
      <TodoTable todos={paginated} userMap={userMap} />
      <TodoPagination
        page={page}
        totalPages={totalPages}
        totalItems={filtered.length}
        pageSize={pageSize}
        pageSizeSetting={filters.pageSize}
        onPageChange={(p) => setFilters({ page: p })}
        onPageSizeChange={(ps) => setFilters({ pageSize: ps, page: 1 })}
      />
    </div>
  );
};

export default TodoListContainer;
