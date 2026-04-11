import { Loader2 } from "lucide-react";
import { useTodos, useUsers } from "./hooks/useTodos";
import TodoTable from "./components/TodoTable";

const TodoListContainer = () => {
  const { todos, isLoading: todosLoading, isError: todosError } = useTodos();
  const { userMap, isLoading: usersLoading, isError: usersError } = useUsers();

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
      <TodoTable todos={todos} userMap={userMap} />
    </div>
  );
};

export default TodoListContainer;
