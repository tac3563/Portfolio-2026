import type { ContactValues } from "@/types/contact";

function readText(formData: FormData, field: string): string {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}

export function readContactValues(formData: FormData): ContactValues {
  return {
    name: readText(formData, "name"),
    email: readText(formData, "email"),
    topic: readText(formData, "topic"),
    message: readText(formData, "message"),
  };
}
