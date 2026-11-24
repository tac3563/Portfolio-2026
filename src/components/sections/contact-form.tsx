"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactMessage } from "@/actions/send-contact-message";
import { ContactBlank } from "@/components/sections/contact-blank";
import { ContactErrorSummary } from "@/components/sections/contact-error-summary";
import { ContactFieldError } from "@/components/sections/contact-field-error";
import { ContactSent } from "@/components/sections/contact-sent";
import { ContactSubmit } from "@/components/sections/contact-submit";
import { ContactTopics } from "@/components/sections/contact-topics";
import { contact } from "@/content/contact";
import { findContactErrorId, findContactFieldId } from "@/lib/contact-field-ids";
import { contactLimits } from "@/lib/contact-limits";
import type { ContactFieldErrors, ContactFormState } from "@/types/contact";

const initialState: ContactFormState = {
  status: "idle",
  values: { name: "", email: "", topic: "", message: "" },
};

type ContactFormProps = {
  focusOnMount: boolean;
  onSendAnother: () => void;
};

export function ContactForm({ focusOnMount, onSendAnother }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const summary = useRef<HTMLDivElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusOnMount) nameInput.current?.focus();
  }, [focusOnMount]);

  useEffect(() => {
    if (state.status === "invalid" || state.status === "failed") summary.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return <ContactSent values={state.values} onSendAnother={onSendAnother} />;
  }

  const { values } = state;
  const errors: ContactFieldErrors = state.status === "invalid" ? state.errors : {};
  const messageId = findContactFieldId("message");

  return (
    <form
      action={formAction}
      noValidate
      aria-label={contact.formLabel}
      aria-busy={pending}
      className="sections-contact-form relative flex flex-col gap-10"
    >
      <ContactErrorSummary ref={summary} state={state} />

      <div className="flex flex-col gap-8 heading-xs">
        <p className="leading-relaxed">
          {contact.greeting} {contact.namePrompt}{" "}
          <ContactBlank
            ref={nameInput}
            field="name"
            label={contact.nameLabel}
            placeholder={contact.namePlaceholder}
            autoComplete="name"
            maxLength={contactLimits.nameMaxLength}
            defaultValue={values.name}
            error={errors.name}
          />
        </p>

        <ContactTopics selected={values.topic} error={errors.topic} />

        <p className="leading-relaxed">
          {contact.emailPrompt}{" "}
          <ContactBlank
            field="email"
            type="email"
            label={contact.emailLabel}
            placeholder={contact.emailPlaceholder}
            autoComplete="email"
            spellCheck={false}
            maxLength={contactLimits.emailMaxLength}
            defaultValue={values.email}
            error={errors.email}
          />
        </p>

        <div className="flex flex-col gap-4">
          <label htmlFor={messageId}>{contact.messagePrompt}</label>
          <textarea
            id={messageId}
            name="message"
            required
            rows={6}
            minLength={contactLimits.messageMinLength}
            maxLength={contactLimits.messageMaxLength}
            placeholder={contact.messagePlaceholder}
            defaultValue={values.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? findContactErrorId("message") : undefined}
            className="sections-contact-form__message w-full resize-y rounded-2xl border-2 border-ink-900 bg-transparent p-5 copy-md placeholder:text-taupe-300 hover:border-ember-600 aria-invalid:border-error"
          />
          <ContactFieldError field="message" message={errors.message} />
        </div>
      </div>

      <div aria-hidden="true" className="sr-only">
        <label htmlFor="contact-website">{contact.honeypotLabel}</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-6 border-t border-paper-300 pt-8 sm:flex-row-reverse sm:items-center sm:justify-between">
        <ContactSubmit />
        <p className="copy-meta text-taupe-500">{contact.signOff}</p>
      </div>

      <p role="status" className="sr-only">
        {pending ? contact.sending : ""}
      </p>
    </form>
  );
}
