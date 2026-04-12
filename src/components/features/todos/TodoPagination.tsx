import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TodoPageSize } from "@/types/todos";
import styles from "@/styles/Todo.module.css";
import CustomSelect from "@/components/ui/CustomSelect";

const FIRST_LAST_WINDOW = 9;

type PageItem = number | "ellipsis";

function buildPaginationItems(
  currentPage: number,
  totalPages: number,
): PageItem[] {
  if (totalPages < 1) return [];
  if (totalPages <= 12) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= FIRST_LAST_WINDOW) {
    const head = Array.from({ length: FIRST_LAST_WINDOW }, (_, i) => i + 1);
    return [...head, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - FIRST_LAST_WINDOW + 1) {
    const start = totalPages - FIRST_LAST_WINDOW + 1;
    const tail = Array.from({ length: FIRST_LAST_WINDOW }, (_, i) => start + i);
    return [1, "ellipsis", ...tail];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

interface TodoPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  /** Resolved size for “Showing …” (numeric rows or all rows). */
  pageSize: number | "all";
  pageSizeSetting: TodoPageSize;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: TodoPageSize) => void;
}

function parsePageSize(value: string): TodoPageSize {
  if (value === "all") return "all";
  const n = Number(value);
  if (n === 10 || n === 20 || n === 50) return n;
  return 10;
}

const TodoPagination = ({
  page,
  totalPages,
  totalItems,
  pageSize,
  pageSizeSetting,
  onPageChange,
  onPageSizeChange,
}: TodoPaginationProps) => {
  const showPager = totalPages > 1 && pageSize !== "all";
  const items = showPager ? buildPaginationItems(page, totalPages) : [];

  const rangeLabel =
    totalItems === 0
      ? "Showing 0 of 0"
      : pageSize === "all"
        ? `Showing 1–${totalItems} of ${totalItems}`
        : `Showing ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, totalItems)} of ${totalItems}`;

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationMeta}>
        <span className={styles.paginationInfo}>{rangeLabel}</span>
        <CustomSelect
          className={styles.paginationPageSize}
          placement="auto"
          options={[
            { value: "10", label: "10 / page" },
            { value: "20", label: "20 / page" },
            { value: "50", label: "50 / page" },
            { value: "all", label: "All Results" },
          ]}
          value={pageSizeSetting === "all" ? "all" : String(pageSizeSetting)}
          onChange={(v) => onPageSizeChange(parsePageSize(v))}
        />
      </div>

      {showPager && (
        <nav className={styles.paginationNav} aria-label="Pagination">
          <button
            type="button"
            className={styles.paginationArrow}
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} strokeWidth={2.25} />
          </button>

          <ul className={styles.paginationPages}>
            {items.map((item, idx) =>
              item === "ellipsis" ? (
                <li
                  key={`e-${idx}`}
                  className={styles.paginationEllipsis}
                  aria-hidden
                >
                  …
                </li>
              ) : (
                <li key={item}>
                  {item === page ? (
                    <span
                      className={styles.paginationPageActive}
                      aria-current="page"
                    >
                      {item}
                    </span>
                  ) : (
                    <button
                      type="button"
                      className={
                        item === totalPages
                          ? styles.paginationPageLinkLast
                          : styles.paginationPageLink
                      }
                      onClick={() => onPageChange(item)}
                    >
                      {item}
                    </button>
                  )}
                </li>
              ),
            )}
          </ul>

          <button
            type="button"
            className={styles.paginationArrowNext}
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight size={18} strokeWidth={2.25} />
          </button>
        </nav>
      )}
    </div>
  );
};

export default TodoPagination;
