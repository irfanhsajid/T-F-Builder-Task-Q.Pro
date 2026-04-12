export const INVALID_EMAIL_MSG = "Please enter a valid email address.";
export const INVALID_PHONE_MSG = "Please enter a valid phone number.";

/** Simple, practical check (not full RFC 5322). */
export function isValidEmail(value: string): boolean {
  const s = value.trim();
  if (!s) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/** Digits only after stripping separators; allows typical national and international lengths. */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}
