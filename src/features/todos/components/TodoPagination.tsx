import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "@/styles/Todo.module.css";

interface TodoPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const TodoPagination = ({ page, totalPages, totalItems, pageSize, onPageChange }: TodoPaginationProps) => (
  <div className={styles.pagination}>
    <span className={styles.paginationInfo}>
      Showing {totalItems === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalItems)} of{" "}
      {totalItems}
    </span>
    <div className={styles.paginationControls}>
      <button
        type="button"
        className={styles.iconButton}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      <span className={styles.pageIndicator}>
        {page} / {totalPages}
      </span>
      <button
        type="button"
        className={styles.iconButton}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

export default TodoPagination;
