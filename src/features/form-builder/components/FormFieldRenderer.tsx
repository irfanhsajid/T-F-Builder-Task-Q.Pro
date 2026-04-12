import type { FormField } from "../types";
import styles from "@/styles/FormBuilder.module.css";
import CustomSelect from "@/components/ui/CustomSelect";

interface FormFieldRendererProps {
  field: FormField;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  error?: string;
}

const FormFieldRenderer = ({ field, value, onChange, error }: FormFieldRendererProps) => {
  const errClass = error ? styles.inputError : "";
  const errText = error ? (
    <p className={styles.fieldErrorText} role="alert">
      {error}
    </p>
  ) : null;

  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "date":
    case "time":
      return (
        <>
          <input
            className={`${styles.input} ${errClass}`}
            type={field.type}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            aria-invalid={!!error}
          />
          {errText}
        </>
      );
    case "textarea":
      return (
        <>
          <textarea
            className={`${styles.textarea} ${errClass}`}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            rows={3}
            aria-invalid={!!error}
          />
          {errText}
        </>
      );
    case "select": {
      const opts = (field.options ?? []).map((opt, i) => ({
        value: opt || `option-${i}`,
        label: opt || `Option ${i + 1}`,
      }));
      return (
        <CustomSelect
          options={opts}
          value={(value as string) ?? ""}
          onChange={(v) => onChange(v)}
          placeholder={`Select ${field.label.toLowerCase()}`}
          error={error}
        />
      );
    }
    case "radio":
      return (
        <>
          <div
            className={styles.radioGroup}
            role="radiogroup"
            aria-invalid={!!error}
            aria-describedby={error ? `err-${field.id}` : undefined}
          >
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
          {error ? (
            <p id={`err-${field.id}`} className={styles.fieldErrorText} role="alert">
              {error}
            </p>
          ) : null}
        </>
      );
    case "checkbox":
      return (
        <>
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              className={styles.checkbox}
              id={`cb-${field.id}`}
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              aria-invalid={!!error}
            />
            <span className={styles.checkboxLabel}>{field.label}</span>
          </label>
          {errText}
        </>
      );
    case "range": {
      const min = field.min ?? 0;
      const max = field.max ?? 100;
      const step = field.step ?? 1;
      const strVal =
        (value as string) === "" || value === undefined
          ? String(min)
          : String(value);
      return (
        <div className={styles.rangeRow}>
          <div className={styles.rangeTrack}>
            <input
              type="range"
              className={`${styles.rangeInput} ${errClass}`}
              min={min}
              max={max}
              step={step}
              value={strVal}
              onChange={(e) => onChange(e.target.value)}
              aria-invalid={!!error}
            />
            <span className={styles.rangeValue}>{strVal}</span>
          </div>
          {errText}
        </div>
      );
    }
    case "file":
      return (
        <>
          <input
            type="file"
            className={`${styles.input} ${styles.fileInput} ${errClass}`}
            accept={field.accept?.trim() || undefined}
            aria-invalid={!!error}
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(file ? file.name : "");
            }}
          />
          {typeof value === "string" && value ? (
            <span className={styles.rangeValue} aria-live="polite">
              Selected: {value}
            </span>
          ) : null}
          {errText}
        </>
      );
    default:
      return null;
  }
};

export default FormFieldRenderer;
