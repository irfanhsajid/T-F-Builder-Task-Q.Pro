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
          <th>Title</th>
          <th>User</th>
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
              <td>{todo.title}</td>
              <td className={styles.muted}>{userMap.get(todo.userId) ?? "Unknown"}</td>
              <td>
                <span className={todo.completed ? styles.badgeSuccess : styles.badgeMuted}>
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
