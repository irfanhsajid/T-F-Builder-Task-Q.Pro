import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send } from "lucide-react";
import type { FormField } from "./types";
import { loadFormConfig } from "./utils/storage";
import FormFieldRenderer from "./components/FormFieldRenderer";

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
  };

  if (!fields.length) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-muted-foreground">No form has been created yet.</p>
        <Button onClick={() => navigate("/form-builder")}>
          <ArrowLeft size={16} className="mr-2" /> Go to Form Builder
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/form-builder")}>
          <ArrowLeft size={16} />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Form Preview</h1>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-6 space-y-5">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            {field.type !== "checkbox" && (
              <Label className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
            )}
            <FormFieldRenderer
              field={field}
              value={values[field.id] ?? (field.type === "checkbox" ? false : "")}
              onChange={(v) => setValue(field.id, v)}
            />
          </div>
        ))}

        <Button type="submit" className="w-full" disabled={!isFormValid}>
          <Send size={16} className="mr-2" /> Submit
        </Button>
      </form>
    </div>
  );
};

export default FormPreviewContainer;
