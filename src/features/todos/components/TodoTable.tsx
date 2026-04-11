import { Badge } from "@/components/ui/badge";
import type { Todo } from "../types";

interface TodoTableProps {
  todos: Todo[];
  userMap: Map<number, string>;
}

const TodoTable = ({ todos, userMap }: TodoTableProps) => (
  <div className="overflow-hidden rounded-xl border bg-card">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b bg-muted/50">
          <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Title</th>
          <th className="px-4 py-3 text-left font-semibold text-muted-foreground">User</th>
          <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.length === 0 ? (
          <tr>
            <td colSpan={3} className="px-4 py-12 text-center text-muted-foreground">No todos found.</td>
          </tr>
        ) : (
          todos.map((todo) => (
            <tr key={todo.id} className="border-b last:border-0 transition-colors hover:bg-muted/30">
              <td className="px-4 py-3 text-foreground">{todo.title}</td>
              <td className="px-4 py-3 text-muted-foreground">{userMap.get(todo.userId) ?? "Unknown"}</td>
              <td className="px-4 py-3">
                <Badge
                  variant={todo.completed ? "default" : "secondary"}
                  className={todo.completed ? "bg-success text-success-foreground" : ""}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </Badge>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default TodoTable;
