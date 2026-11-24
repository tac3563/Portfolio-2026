import type { Ref } from "react";
import { contact } from "@/content/contact";
import { findContactFieldId } from "@/lib/contact-field-ids";
import type { ContactField, ContactFormState } from "@/types/contact";

type ContactErrorSummaryProps = {
  state: ContactFormState;
  ref: Ref<HTMLDivElement>;
};

export function ContactErrorSummary({ state, ref }: ContactErrorSummaryProps) {
  if (state.status !== "invalid" && state.status !== "failed") return null;

  return (
    <div
      ref={ref}
      tabIndex={-1}
      aria-labelledby="contact-error-summary-heading"
      className="sections-contact-error-summary flex flex-col gap-4 rounded-2xl border-2 border-error p-5 text-error sm:p-6"
    >
      <h3 id="contact-error-summary-heading" className="heading-3xs">
        {state.status === "failed" ? contact.sendFailed : contact.errorSummaryHeading}
      </h3>
      {state.status === "invalid" && (
        <ul className="flex flex-col gap-2 copy-meta">
          {(Object.entries(state.errors) as [ContactField, string][]).map(([field, message]) => (
            <li key={field}>
              <a
                href={`#${findContactFieldId(field)}`}
                className="underline underline-offset-4 hover:no-underline"
              >
                {message}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
