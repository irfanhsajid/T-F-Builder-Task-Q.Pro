import { Search } from "lucide-react";
import type { User, TodoFilters as Filters } from "../types";
import styles from "@/styles/Todo.module.css";

interface TodoFiltersProps {
  filters: Filters;
  users: User[];
  onFilterChange: (update: Partial<Filters>) => void;
}

const TodoFilters = ({ filters, users, onFilterChange }: TodoFiltersProps) => (
  <div className={styles.filters}>
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
    <select
      className={styles.filterSelect}
      value={filters.userId || "all"}
      onChange={(e) => {
        const v = e.target.value;
        onFilterChange({ userId: v === "all" ? "" : v, page: 1 });
      }}
    >
      <option value="all">All Users</option>
      {users.map((u) => (
        <option key={u.id} value={String(u.id)}>
          {u.name}
        </option>
      ))}
    </select>
    <select
      className={styles.filterSelectNarrow}
      value={filters.status || "all"}
      onChange={(e) => {
        const v = e.target.value;
        onFilterChange({ status: v === "all" ? "" : v, page: 1 });
      }}
    >
      <option value="all">All Status</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
    </select>
  </div>
);

export default TodoFilters;
