import styles from "@/styles/Todo.module.css";

interface TodoTableSkeletonProps {
  /** Number of placeholder rows (default matches typical first page size). */
  rows?: number;
}

/** Shared tbody used by full-page skeleton and in-table refetch skeleton. */
export function TodoTableSkeletonBody({ rows = 10 }: { rows?: number }) {
  return (
    <tbody aria-busy="true">
      {Array.from({ length: rows }, (_, i) => (
        <tr key={i} className={styles.skeletonRow}>
          <td>
            <div
              className={styles.skeletonBar}
              style={{ width: `${68 + (i % 4) * 8}%`, maxWidth: "100%" }}
            />
          </td>
          <td>
            <div className={styles.skeletonBar} style={{ width: "55%" }} />
          </td>
          <td>
            <div className={styles.skeletonBadge} />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

const TodoTableSkeleton = ({ rows = 10 }: TodoTableSkeletonProps) => (
  <div className={styles.tableWrap} aria-busy="true" aria-label="Loading todos">
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Task Title</th>
          <th>Assigned To</th>
          <th>Status</th>
        </tr>
      </thead>
      <TodoTableSkeletonBody rows={rows} />
    </table>
  </div>
);

export default TodoTableSkeleton;
