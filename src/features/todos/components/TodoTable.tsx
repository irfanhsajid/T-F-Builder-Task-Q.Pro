import { CheckCircle2, Clock } from "lucide-react";
import type { Todo } from "../types";
import styles from "@/styles/Todo.module.css";
import { TodoTableSkeletonBody } from "./TodoTableSkeleton";

interface TodoTableProps {
  todos: Todo[];
  userMap: Map<number, string>;
  /** When true (e.g. server refetch), tbody shows skeleton rows instead of data. */
  isFetching?: boolean;
  skeletonRows?: number;
}

const TodoTable = ({
  todos,
  userMap,
  isFetching = false,
  skeletonRows = 10,
}: TodoTableProps) => (
  <div
    className={[styles.tableWrap, isFetching && styles.tableWrapFetching]
      .filter(Boolean)
      .join(" ")}
    aria-busy={isFetching}
  >
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Task Title</th>
          <th>Assigned To</th>
          <th>Status</th>
        </tr>
      </thead>
      {isFetching ? (
        <TodoTableSkeletonBody rows={skeletonRows} />
      ) : (
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
      )}
    </table>
  </div>
);

export default TodoTable;
