import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { FormField, FieldType } from "../types";
import { saveFormConfig, loadFormConfig } from "../utils/storage";

const createField = (): FormField => ({
  id: crypto.randomUUID(),
  label: "",
  type: "text",
  required: false,
  options: [],
});

const needsOptions = (type: FieldType): boolean => type === "select" || type === "radio";

export const useFormBuilder = () => {
  const [fields, setFields] = useState<FormField[]>(() => {
    const config = loadFormConfig();
    return config?.fields.length ? config.fields : [createField()];
  });

  const addField = useCallback(() => {
    setFields((prev) => [...prev, createField()]);
  }, []);

  const removeField = useCallback((id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const updateField = useCallback((id: string, update: Partial<FormField>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...update } : f)));
  }, []);

  const changeFieldType = useCallback((id: string, type: FieldType, currentOptions?: string[]) => {
    const options = needsOptions(type)
      ? (currentOptions?.length ? currentOptions : ["Option 1"])
      : [];
    updateField(id, { type, options });
  }, [updateField]);

  const save = useCallback((): boolean => {
    const valid = fields.every((f) => f.label.trim());
    if (!valid) {
      toast.error("All fields must have a label.");
      return false;
    }
    saveFormConfig({ fields });
    toast.success("Form saved successfully!");
    return true;
  }, [fields]);

  return {
    fields,
    addField,
    removeField,
    updateField,
    changeFieldType,
    save,
    needsOptions,
  };
};
