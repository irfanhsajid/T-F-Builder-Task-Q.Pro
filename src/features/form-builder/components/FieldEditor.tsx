import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2, GripVertical, Plus } from "lucide-react";
import type { FormField, FieldType } from "../types";

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "text", label: "Text Input" },
  { value: "number", label: "Number" },
  { value: "email", label: "Email" },
  { value: "textarea", label: "Text Area" },
  { value: "select", label: "Dropdown" },
  { value: "radio", label: "Radio Buttons" },
  { value: "checkbox", label: "Checkbox" },
  { value: "date", label: "Date" },
];

interface FieldEditorProps {
  field: FormField;
  index: number;
  canRemove: boolean;
  needsOptions: (type: FieldType) => boolean;
  onUpdate: (id: string, update: Partial<FormField>) => void;
  onChangeType: (id: string, type: FieldType, currentOptions?: string[]) => void;
  onRemove: (id: string) => void;
}

const FieldEditor = ({ field, index, canRemove, needsOptions, onUpdate, onChangeType, onRemove }: FieldEditorProps) => (
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

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Label / Name</Label>
        <Input
          placeholder="e.g. User Name"
          value={field.label}
          onChange={(e) => onUpdate(field.id, { label: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Input Type</Label>
        <Select value={field.type} onValueChange={(v) => onChangeType(field.id, v as FieldType, field.options)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FIELD_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <Checkbox
        id={`req-${field.id}`}
        checked={field.required}
        onCheckedChange={(c) => onUpdate(field.id, { required: !!c })}
      />
      <Label htmlFor={`req-${field.id}`} className="text-sm">Required</Label>
    </div>

    {needsOptions(field.type) && (
      <div className="space-y-2 pl-4 border-l-2 border-primary/20">
        <Label className="text-sm">Options</Label>
        {(field.options ?? []).map((opt, oi) => (
          <div key={oi} className="flex items-center gap-2">
            <Input
              value={opt}
              placeholder={`Option ${oi + 1}`}
              onChange={(e) => {
                const newOpts = [...(field.options ?? [])];
                newOpts[oi] = e.target.value;
                onUpdate(field.id, { options: newOpts });
              }}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpdate(field.id, { options: (field.options ?? []).filter((_, i) => i !== oi) })}
              disabled={(field.options ?? []).length <= 1}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdate(field.id, { options: [...(field.options ?? []), ""] })}
        >
          <Plus size={14} className="mr-1" /> Add Option
        </Button>
      </div>
    )}
  </div>
);

export default FieldEditor;
