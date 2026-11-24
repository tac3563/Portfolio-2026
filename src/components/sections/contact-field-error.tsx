import type { ContactField } from "@/types/contact";
import { findContactErrorId } from "@/lib/contact-field-ids";

type ContactFieldErrorProps = {
  field: ContactField;
  message?: string;
};

export function ContactFieldError({ field, message }: ContactFieldErrorProps) {
  if (!message) return null;

  return (
    <span
      id={findContactErrorId(field)}
      className="sections-contact-field-error inline-flex items-center gap-2 align-middle copy-meta text-error"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-4 shrink-0">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth={1.5} />
        <path d="M8 4.5v4.5M8 11v.5" stroke="currentColor" strokeWidth={1.5} />
      </svg>
      {message}
    </span>
  );
}
