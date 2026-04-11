import type { FormField } from "../types";
import styles from "@/styles/FormBuilder.module.css";

interface FormFieldRendererProps {
  field: FormField;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
}

const FormFieldRenderer = ({ field, value, onChange }: FormFieldRendererProps) => {
  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "date":
      return (
        <input
          className={styles.input}
          type={field.type}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${field.label.toLowerCase()}`}
        />
      );
    case "textarea":
      return (
        <textarea
          className={styles.textarea}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          rows={3}
        />
      );
    case "select":
      return (
        <select
          className={styles.select}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select {field.label.toLowerCase()}</option>
          {(field.options ?? []).map((opt, i) => (
            <option key={i} value={opt || `option-${i}`}>
              {opt || `Option ${i + 1}`}
            </option>
          ))}
        </select>
      );
    case "radio":
      return (
        <div className={styles.radioGroup}>
          {(field.options ?? []).map((opt, i) => {
            const val = opt || `option-${i}`;
            return (
              <label key={i} className={styles.radioRow}>
                <input
                  type="radio"
                  className={styles.radio}
                  name={field.id}
                  value={val}
                  checked={(value as string) === val}
                  onChange={() => onChange(val)}
                />
                <span>{opt || `Option ${i + 1}`}</span>
              </label>
            );
          })}
        </div>
      );
    case "checkbox":
      return (
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            className={styles.checkbox}
            id={`cb-${field.id}`}
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className={styles.checkboxLabel}>{field.label}</span>
        </label>
      );
    default:
      return null;
  }
};

export default FormFieldRenderer;
