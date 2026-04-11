export type FieldType = "text" | "number" | "email" | "textarea" | "select" | "checkbox" | "radio" | "date";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}

export interface FormConfig {
  fields: FormField[];
}
