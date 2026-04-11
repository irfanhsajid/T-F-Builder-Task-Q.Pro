import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";
import type { FormField } from "./types";
import { loadFormConfig } from "./utils/storage";
import FormFieldRenderer from "./components/FormFieldRenderer";
import styles from "@/styles/FormBuilder.module.css";

const FormPreviewContainer = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState<FormField[]>([]);
  const [values, setValues] = useState<Record<string, string | boolean>>({});

  useEffect(() => {
    const config = loadFormConfig();
    if (config?.fields.length) setFields(config.fields);
  }, []);

  const setValue = (id: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const isFormValid = fields.every((f) => {
    if (!f.required) return true;
    const val = values[f.id];
    return val !== undefined && val !== "" && val !== false;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      const missing = fields.find(
        (f) => f.required && (values[f.id] === undefined || values[f.id] === "" || values[f.id] === false),
      );
      if (missing) toast.error(`"${missing.label}" is required.`);
      return;
    }

    const output: Record<string, string | boolean> = {};
    fields.forEach((f) => {
      output[f.label] = values[f.id] ?? "";
    });
    console.log("=== Form Submitted ===");
    console.log(JSON.stringify(output, null, 2));
    toast.success("Form submitted! Check the console for data.");
  };

  if (!fields.length) {
    return (
      <div className={`${styles.page} ${styles.pageWide}`}>
        <div className={styles.emptyState}>
          <p>No form has been created yet.</p>
          <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => navigate("/form-builder")}>
            <ArrowLeft size={16} /> Go to Form Builder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.page} ${styles.pageWide}`}>
      <div className={styles.previewHeader}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnGhost} ${styles.btnIcon}`}
          onClick={() => navigate("/form-builder")}
          aria-label="Back to builder"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className={styles.title}>Form Preview</h1>
      </div>

      <form className={styles.previewForm} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.id} className={styles.fieldBlock}>
            {field.type !== "checkbox" && (
              <label className={styles.labelInline}>
                {field.label}
                {field.required && <span className={styles.requiredMark}>*</span>}
              </label>
            )}
            <FormFieldRenderer
              field={field}
              value={values[field.id] ?? (field.type === "checkbox" ? false : "")}
              onChange={(v) => setValue(field.id, v)}
            />
          </div>
        ))}

        <button type="submit" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} disabled={!isFormValid}>
          <Send size={16} /> Submit
        </button>
      </form>
    </div>
  );
};

export default FormPreviewContainer;
