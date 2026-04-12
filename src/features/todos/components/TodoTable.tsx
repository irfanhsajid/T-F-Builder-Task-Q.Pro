import { CheckCircle2, Clock } from "lucide-react";
import type { Todo } from "../types";
import styles from "@/styles/Todo.module.css";

interface TodoTableProps {
  todos: Todo[];
  userMap: Map<number, string>;
}

const TodoTable = ({ todos, userMap }: TodoTableProps) => (
  <div className={styles.tableWrap}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Task Title</th>
          <th>Assigned To</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.length === 0 ? (
          <tr>
            <td colSpan={3} className={styles.emptyCell}>
              No todos found.
            </td>
          </tr>
        ) : (
          todos.map((todo) => (
            <tr key={todo.id}>
              <td
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed
                    ? "var(--text-secondary)"
                    : "var(--text-primary)",
                }}
              >
                {todo.title}
              </td>
              <td className={styles.muted}>
                {userMap.get(todo.userId) ?? "Unknown"}
              </td>
              <td>
                <span
                  className={
                    todo.completed ? styles.badgeSuccess : styles.badgeMuted
                  }
                >
                  {todo.completed ? (
                    <CheckCircle2
                      className={styles.badgeIcon}
                      size={14}
                      aria-hidden
                    />
                  ) : (
                    <Clock className={styles.badgeIcon} size={14} aria-hidden />
                  )}
                  {todo.completed ? "Completed" : "Pending"}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default TodoTable;
