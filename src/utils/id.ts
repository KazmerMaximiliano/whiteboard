/**
 * Generate a unique id, preferring the platform crypto UUID and falling back to
 * a timestamp + random suffix where it is unavailable.
 */
export const createId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
};
