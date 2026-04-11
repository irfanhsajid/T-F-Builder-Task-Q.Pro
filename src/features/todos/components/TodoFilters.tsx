import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import type { User, TodoFilters as Filters } from "../types";

interface TodoFiltersProps {
  filters: Filters;
  users: User[];
  onFilterChange: (update: Partial<Filters>) => void;
}

const TodoFilters = ({ filters, users, onFilterChange }: TodoFiltersProps) => (
  <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4">
    <div className="relative flex-1 min-w-[200px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
      <Input
        placeholder="Search todos..."
        className="pl-9"
        value={filters.search}
        onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
      />
    </div>
    <Select value={filters.userId || "all"} onValueChange={(v) => onFilterChange({ userId: v === "all" ? "" : v, page: 1 })}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All Users" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Users</SelectItem>
        {users.map((u) => (
          <SelectItem key={u.id} value={String(u.id)}>{u.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Select value={filters.status || "all"} onValueChange={(v) => onFilterChange({ status: v === "all" ? "" : v, page: 1 })}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="All Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default TodoFilters;
