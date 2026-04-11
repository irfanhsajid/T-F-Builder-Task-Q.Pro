import TodoTable from "./components/TodoTable";
import type { Todo } from "./types";

const MOCK_TODOS: Todo[] = [
  { id: 1, userId: 1, title: "Sample todo", completed: false },
];

const TodoListContainer = () => {
  const userMap = new Map<number, string>([[1, "User One"]]);

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Todo List</h1>
      <TodoTable todos={MOCK_TODOS} userMap={userMap} />
    </div>
  );
};

export default TodoListContainer;
