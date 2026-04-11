import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { FormField } from "../types";

interface FormFieldRendererProps {
  field: FormField;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
}

/**
 * Presentational component: renders a single form field based on its type.
 * Keeps rendering logic reusable and decoupled from form state.
 */
const FormFieldRenderer = ({ field, value, onChange }: FormFieldRendererProps) => {
  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "date":
      return (
        <Input
          type={field.type}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${field.label.toLowerCase()}`}
        />
      );
    case "textarea":
      return (
        <Textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          rows={3}
        />
      );
    case "select":
      return (
        <Select value={(value as string) ?? ""} onValueChange={(v) => onChange(v)}>
          <SelectTrigger>
            <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {(field.options ?? []).map((opt, i) => (
              <SelectItem key={i} value={opt || `option-${i}`}>{opt || `Option ${i + 1}`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "radio":
      return (
        <RadioGroup value={(value as string) ?? ""} onValueChange={(v) => onChange(v)}>
          {(field.options ?? []).map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <RadioGroupItem value={opt || `option-${i}`} id={`${field.id}-${i}`} />
              <Label htmlFor={`${field.id}-${i}`}>{opt || `Option ${i + 1}`}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <Checkbox
            id={`cb-${field.id}`}
            checked={!!value}
            onCheckedChange={(c) => onChange(!!c)}
          />
          <Label htmlFor={`cb-${field.id}`}>{field.label}</Label>
        </div>
      );
    default:
      return null;
  }
};

export default FormFieldRenderer;
