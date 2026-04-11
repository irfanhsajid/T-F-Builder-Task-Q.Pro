import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TodoPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const TodoPagination = ({ page, totalPages, totalItems, pageSize, onPageChange }: TodoPaginationProps) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-muted-foreground">
      Showing {totalItems === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalItems)} of {totalItems}
    </span>
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        <ChevronLeft size={16} />
      </Button>
      <span className="text-sm font-medium text-foreground">{page} / {totalPages}</span>
      <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        <ChevronRight size={16} />
      </Button>
    </div>
  </div>
);

export default TodoPagination;
