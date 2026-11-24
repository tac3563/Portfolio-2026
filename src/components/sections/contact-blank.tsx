import type { ComponentProps } from "react";
import type { ContactField } from "@/types/contact";
import { ContactFieldError } from "@/components/sections/contact-field-error";
import { findContactErrorId, findContactFieldId } from "@/lib/contact-field-ids";

type ContactBlankProps = Omit<ComponentProps<"input">, "id" | "name"> & {
  field: Exclude<ContactField, "topic">;
  label: string;
  error?: string;
};

export function ContactBlank({ field, label, error, className, ...props }: ContactBlankProps) {
  const id = findContactFieldId(field);

  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={field}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? findContactErrorId(field) : undefined}
        className={`sections-contact-blank field-sizing-content w-full min-w-0 rounded-none border-b-2 border-ink-900 bg-transparent px-1 pb-1 text-ember-600 placeholder:text-taupe-300 hover:border-ember-600 aria-invalid:border-error sm:w-auto sm:min-w-56 ${className ?? ""}`}
        {...props}
      />{" "}
      <ContactFieldError field={field} message={error} />
    </>
  );
}
