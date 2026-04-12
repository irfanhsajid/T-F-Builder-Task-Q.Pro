import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import type { FormField } from "./types";
import { loadFormConfig } from "./utils/storage";
import {
  INVALID_EMAIL_MSG,
  INVALID_PHONE_MSG,
  isValidEmail,
  isValidPhone,
} from "./utils/validation";
import FormFieldRenderer from "./components/FormFieldRenderer";
import FormSubmitResult from "./components/FormSubmitResult";
import styles from "@/styles/FormBuilder.module.css";

const REQUIRED_MSG = "This field is required";

function isRequiredFieldEmpty(
  field: FormField,
  val: string | boolean | undefined,
): boolean {
  if (!field.required) return false;
  if (field.type === "checkbox") {
    return val !== true;
  }
  if (field.type === "range") {
    return val === undefined || val === "";
  }
  return val === undefined || val === false || String(val).trim() === "";
}

function buildInitialValues(
  formFields: FormField[],
): Record<string, string | boolean> {
  const init: Record<string, string | boolean> = {};
  for (const f of formFields) {
    if (f.type === "checkbox") init[f.id] = false;
    else if (f.type === "range") init[f.id] = String(f.min ?? 0);
    else init[f.id] = "";
  }
  return init;
}

const FormPreviewContainer = () => {
  const navigate = useNavigate();
  const [fields] = useState<FormField[]>(() => {
    const config = loadFormConfig();
    return config?.fields.length ? config.fields : [];
  });
  const [values, setValues] = useState<Record<string, string | boolean>>(() => {
    const config = loadFormConfig();
    const fs = config?.fields ?? [];
    return fs.length ? buildInitialValues(fs) : {};
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    string | boolean
  > | null>(null);

  const setValue = (id: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setFieldErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    for (const f of fields) {
      if (isRequiredFieldEmpty(f, values[f.id])) {
        next[f.id] = REQUIRED_MSG;
      }
    }
    if (Object.keys(next).length > 0) {
      setFieldErrors(next);
      return;
    }

    for (const f of fields) {
      const raw = values[f.id];
      if (typeof raw !== "string") continue;
      const t = raw.trim();
      if (t === "") continue;
      if (f.type === "email" && !isValidEmail(t)) {
        next[f.id] = INVALID_EMAIL_MSG;
      } else if (f.type === "tel" && !isValidPhone(t)) {
        next[f.id] = INVALID_PHONE_MSG;
      }
    }
    if (Object.keys(next).length > 0) {
      setFieldErrors(next);
      return;
    }

    const output: Record<string, string | boolean> = {};
    fields.forEach((f) => {
      output[f.label] = values[f.id] ?? "";
    });
    console.log("=== Form Submitted ===");
    console.log(JSON.stringify(output, null, 2));
    setFieldErrors({});
    setSubmittedData(output);
  };

  if (!fields.length) {
    return (
      <div className={`${styles.page} ${styles.pageWide}`}>
        <div className={styles.emptyState}>
          <p>No form has been created yet. Please create a form first.</p>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => navigate("/form-builder")}
          >
            <ArrowLeft size={16} /> Go to Form Builder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.page} ${styles.pageWide}`}>
      <div className={styles.previewHeader}>
        <h1 className={styles.title}>Form Preview</h1>
        {!submittedData && (
          <button
            type="button"
            className={`${styles.btn} ${styles.btnOutline}`}
            onClick={() => navigate("/form-builder")}
            aria-label="Back to builder"
          >
            <ArrowLeft size={16} /> Back to Builder
          </button>
        )}
      </div>

      {submittedData ? (
        <FormSubmitResult
          data={submittedData}
          onBackToBuilder={() => navigate("/form-builder")}
        />
      ) : (
        <form className={styles.previewForm} onSubmit={handleSubmit} noValidate>
          {fields.map((field) => (
            <div key={field.id} className={styles.fieldBlock}>
              {field.type !== "checkbox" && (
                <label className={styles.labelInline}>
                  {field.label}
                  {field.required && (
                    <span className={styles.requiredMark}>*</span>
                  )}
                </label>
              )}
              <FormFieldRenderer
                field={field}
                value={
                  values[field.id] ?? (field.type === "checkbox" ? false : "")
                }
                onChange={(v) => setValue(field.id, v)}
                error={fieldErrors[field.id]}
              />
            </div>
          ))}

          <button
            type="submit"
            className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
          >
            <Send size={16} /> Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default FormPreviewContainer;
