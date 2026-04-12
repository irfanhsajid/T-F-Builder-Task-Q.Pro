export type FieldType =
  | "text"
  | "number"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "time"
  | "range"
  | "file";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  /** Used when `type === "range"` */
  min?: number;
  max?: number;
  step?: number;
  /** Used when `type === "file"` (e.g. `image/*`, `.pdf`) */
  accept?: string;
  /** Shown in preview for supported input types (text, email, phone, etc.) */
  placeholder?: string;
}

export interface FormConfig {
  fields: FormField[];
}
