import { Trash2, GripVertical, Plus } from "lucide-react";
import type { FormField, FieldType } from "../types";
import styles from "@/styles/FormBuilder.module.css";
import CustomSelect from "@/components/ui/CustomSelect";

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
  onChangeType: (
    id: string,
    type: FieldType,
    currentOptions?: string[],
  ) => void;
  onRemove: (id: string) => void;
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

    <div className={styles.checkboxRow}>
      <input
        type="checkbox"
        id={`req-${field.id}`}
        className={styles.checkbox}
        checked={field.required}
        onChange={(e) => onUpdate(field.id, { required: e.target.checked })}
      />
      <label className={styles.label} htmlFor={`req-${field.id}`}>
        Required
      </label>
    </div>

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
