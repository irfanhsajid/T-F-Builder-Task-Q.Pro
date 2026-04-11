import type { FormConfig } from "../types";

const STORAGE_KEY = "form-builder-config";

export const saveFormConfig = (config: FormConfig): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
};

export const loadFormConfig = (): FormConfig | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};
