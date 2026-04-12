import { Search, Undo, X } from "lucide-react";
import type { User, TodoFilters as Filters } from "../types";
import styles from "@/styles/Todo.module.css";
import CustomSelect from "@/components/ui/CustomSelect";

interface TodoFiltersProps {
  filters: Filters;
  users: User[];
  onFilterChange: (update: Partial<Filters>) => void;
  onResetFilters: () => void;
}

function hasActiveTodoFilters(f: Filters) {
  return (
    f.search.trim() !== "" || f.userId !== "" || f.status !== "" || f.page !== 1
  );
}

const TodoFilters = ({
  filters,
  users,
  onFilterChange,
  onResetFilters,
}: TodoFiltersProps) => (
  <div className={styles.filters}>
    <div className={styles.filtersMain}>
      <div className={styles.searchWrap}>
        <Search className={styles.searchIcon} size={16} />
        <input
          type="search"
          placeholder="Search todos..."
          className={styles.searchInput}
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
        />
      </div>
      <CustomSelect
        className={styles.filterSelectWrap}
        options={[
          { value: "all", label: "All Users" },
          ...users.map((u) => ({ value: String(u.id), label: u.name })),
        ]}
        value={filters.userId || "all"}
        onChange={(v) => {
          onFilterChange({ userId: v === "all" ? "" : v, page: 1 });
        }}
      />
      <CustomSelect
        className={styles.filterSelectNarrowWrap}
        options={[
          { value: "all", label: "All Status" },
          { value: "completed", label: "Completed" },
          { value: "pending", label: "Pending" },
        ]}
        value={filters.status || "all"}
        onChange={(v) => {
          onFilterChange({ status: v === "all" ? "" : v, page: 1 });
        }}
      />
    </div>
    {hasActiveTodoFilters(filters) && (
      <button
        type="button"
        className={styles.filterReset}
        onClick={onResetFilters}
      >
        <Undo className={styles.filterResetIcon} size={16} />
        Reset
      </button>
    )}
  </div>
);

export default TodoFilters;
