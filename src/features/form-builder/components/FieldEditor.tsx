import { Trash2, GripVertical, Plus } from "lucide-react";
import type { FormField, FieldType } from "../types";
import styles from "@/styles/FormBuilder.module.css";
import CustomSelect from "@/components/ui/CustomSelect";

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "text", label: "Text Input" },
  { value: "number", label: "Number" },
  { value: "email", label: "Email" },
  { value: "tel", label: "Phone Number" },
  { value: "textarea", label: "Text Area" },
  { value: "file", label: "File Upload" },
  { value: "select", label: "Select Dropdown" },
  { value: "radio", label: "Radio Buttons" },
  { value: "checkbox", label: "Checkbox" },
  { value: "date", label: "Date" },
  { value: "time", label: "Time" },
  { value: "range", label: "Range Slider" },
];

interface FieldEditorProps {
  field: FormField;
  index: number;
  canRemove: boolean;
  needsOptions: (type: FieldType) => boolean;
  onUpdate: (id: string, update: Partial<FormField>) => void;
  onChangeType: (
    id: string,
    type: FieldType,
    currentOptions?: string[],
  ) => void;
  onRemove: (id: string) => void;
}

function supportsPlaceholder(type: FieldType): boolean {
  return (
    type === "text" ||
    type === "email" ||
    type === "tel" ||
    type === "number" ||
    type === "textarea" ||
    type === "date" ||
    type === "time" ||
    type === "select"
  );
}

const FieldEditor = ({
  field,
  index,
  canRemove,
  needsOptions,
  onUpdate,
  onChangeType,
  onRemove,
}: FieldEditorProps) => (
  <div className={styles.fieldCard}>
    <div className={styles.fieldHeader}>
      <div className={styles.fieldMeta}>
        <GripVertical size={16} />
        <span>Field {index + 1}</span>
      </div>
      <button
        type="button"
        className={`${styles.btn} ${styles.btnGhost} ${styles.btnIcon} ${styles.btnDanger}`}
        onClick={() => onRemove(field.id)}
        disabled={!canRemove}
        aria-label="Remove field"
      >
        <Trash2 size={16} />
      </button>
    </div>

    <div className={styles.grid}>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor={`label-${field.id}`}>
          Label / Name
        </label>
        <input
          id={`label-${field.id}`}
          className={styles.input}
          placeholder="e.g. User Name"
          value={field.label}
          onChange={(e) => onUpdate(field.id, { label: e.target.value })}
        />
      </div>
      <CustomSelect
        label="Input Type"
        options={FIELD_TYPES}
        value={field.type}
        onChange={(v) => onChangeType(field.id, v as FieldType, field.options)}
      />
    </div>

    {supportsPlaceholder(field.type) && (
      <div className={`${styles.grid} ${styles.placeholderRequiredGrid}`}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor={`ph-${field.id}`}>
            Placeholder text
          </label>
          <input
            id={`ph-${field.id}`}
            className={styles.input}
            placeholder="Optional hint shown inside the field"
            value={field.placeholder ?? ""}
            onChange={(e) =>
              onUpdate(field.id, {
                placeholder:
                  e.target.value === "" ? undefined : e.target.value,
              })
            }
          />
        </div>
        <div className={styles.placeholderRequiredCheckboxCell}>
          <div
            className={`${styles.checkboxRow} ${styles.checkboxRowNoTopMargin}`}
          >
            <input
              type="checkbox"
              id={`req-${field.id}`}
              className={styles.checkbox}
              checked={field.required}
              onChange={(e) =>
                onUpdate(field.id, { required: e.target.checked })
              }
            />
            <label className={styles.label} htmlFor={`req-${field.id}`}>
              Mark as required
            </label>
          </div>
        </div>
      </div>
    )}

    {field.type === "range" && (
      <div className={styles.rangeSettings}>
        <span className={styles.label}>Slider range</span>
        <div className={styles.rangeSettingsGrid}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor={`min-${field.id}`}>
              Min
            </label>
            <input
              id={`min-${field.id}`}
              type="number"
              className={styles.input}
              value={field.min ?? 0}
              onChange={(e) =>
                onUpdate(field.id, { min: Number(e.target.value) || 0 })
              }
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor={`max-${field.id}`}>
              Max
            </label>
            <input
              id={`max-${field.id}`}
              type="number"
              className={styles.input}
              value={field.max ?? 100}
              onChange={(e) =>
                onUpdate(field.id, { max: Number(e.target.value) || 100 })
              }
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor={`step-${field.id}`}>
              Step
            </label>
            <input
              id={`step-${field.id}`}
              type="number"
              className={styles.input}
              min={0.0001}
              step="any"
              value={field.step ?? 1}
              onChange={(e) =>
                onUpdate(field.id, {
                  step: Math.max(Number(e.target.value) || 1, 0.0001),
                })
              }
            />
          </div>
        </div>
      </div>
    )}

    {field.type === "file" && (
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor={`accept-${field.id}`}>
          Accepted types (optional)
        </label>
        <input
          id={`accept-${field.id}`}
          className={styles.input}
          placeholder="e.g. image/* or .pdf,.doc"
          value={field.accept ?? ""}
          onChange={(e) =>
            onUpdate(field.id, { accept: e.target.value || undefined })
          }
        />
      </div>
    )}

    {needsOptions(field.type) && (
      <div className={styles.optionsBlock}>
        <span className={styles.label}>Options</span>
        {(field.options ?? []).map((opt, oi) => (
          <div key={oi} className={styles.optionRow}>
            <input
              className={styles.input}
              value={opt}
              placeholder={`Option ${oi + 1}`}
              onChange={(e) => {
                const newOpts = [...(field.options ?? [])];
                newOpts[oi] = e.target.value;
                onUpdate(field.id, { options: newOpts });
              }}
            />
            <button
              type="button"
              className={`${styles.btn} ${styles.btnGhost} ${styles.btnIcon} ${styles.btnDanger}`}
              onClick={() =>
                onUpdate(field.id, {
                  options: (field.options ?? []).filter((_, i) => i !== oi),
                })
              }
              disabled={(field.options ?? []).length <= 1}
              aria-label="Remove option"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={() =>
            onUpdate(field.id, { options: [...(field.options ?? []), ""] })
          }
        >
          <Plus size={14} /> Add Option
        </button>
      </div>
    )}
  </div>
);

export default FieldEditor;
