import { Loader2 } from "lucide-react";
import { useTodos, useUsers } from "./hooks/useTodos";
import { useTodoFilters } from "./hooks/useTodoFilters";
import { useFilteredTodos } from "./hooks/useFilteredTodos";
import TodoFilters from "./components/TodoFilters";
import TodoTable from "./components/TodoTable";
import TodoPagination from "./components/TodoPagination";

/**
 * Container component: orchestrates data fetching, filtering, and pagination.
 * Delegates rendering to presentational components.
 */
const TodoListContainer = () => {
  const { todos, isLoading: todosLoading, isError: todosError } = useTodos();
  const { users, userMap, isLoading: usersLoading, isError: usersError } = useUsers();
  const { filters, setFilters } = useTodoFilters();
  const { filtered, paginated, page, totalPages, pageSize } = useFilteredTodos(todos, filters);

  const isLoading = todosLoading || usersLoading;
  const isError = todosError || usersError;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (isError) {
    return <div className="py-16 text-center text-destructive">Failed to load data. Please try again.</div>;
  }

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Todo List</h1>
      <TodoFilters filters={filters} users={users} onFilterChange={setFilters} />
      <TodoTable todos={paginated} userMap={userMap} />
      <TodoPagination
        page={page}
        totalPages={totalPages}
        totalItems={filtered.length}
        pageSize={pageSize}
        onPageChange={(p) => setFilters({ page: p })}
      />
    </div>
  );
};

export default TodoListContainer;
