import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2, GripVertical } from "lucide-react";
import type { FormField } from "../types";

interface FieldEditorProps {
  field: FormField;
  index: number;
  canRemove: boolean;
  onUpdate: (id: string, update: Partial<FormField>) => void;
  onRemove: (id: string) => void;
}

const FieldEditor = ({ field, index, canRemove, onUpdate, onRemove }: FieldEditorProps) => (
  <div className="rounded-xl border bg-card p-5 space-y-4 transition-all hover:shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-muted-foreground">
        <GripVertical size={16} />
        <span className="text-sm font-medium">Field {index + 1}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(field.id)}
        disabled={!canRemove}
        className="text-destructive hover:text-destructive"
      >
        <Trash2 size={16} />
      </Button>
    </div>

    <div className="space-y-2">
      <Label>Label / Name</Label>
      <Input
        placeholder="e.g. User Name"
        value={field.label}
        onChange={(e) => onUpdate(field.id, { label: e.target.value })}
      />
    </div>

    <div className="flex items-center gap-2">
      <Checkbox
        id={`req-${field.id}`}
        checked={field.required}
        onCheckedChange={(c) => onUpdate(field.id, { required: !!c })}
      />
      <Label htmlFor={`req-${field.id}`} className="text-sm">Required</Label>
    </div>
  </div>
);

export default FieldEditor;
