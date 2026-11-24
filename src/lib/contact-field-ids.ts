import { contact } from "@/content/contact";
import type { ContactField } from "@/types/contact";

export function findContactFieldId(field: ContactField): string {
  if (field === "topic") return `contact-topic-${contact.topics[0].id}`;

  return `contact-${field}`;
}

export function findContactErrorId(field: ContactField): string {
  return `contact-${field}-error`;
}
