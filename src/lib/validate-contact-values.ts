import { contact } from "@/content/contact";
import { contactLimits } from "@/lib/contact-limits";
import type { ContactFieldErrors, ContactValues } from "@/types/contact";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName(name: string): string | undefined {
  if (!name) return contact.errors.nameRequired;
  if (name.length > contactLimits.nameMaxLength) return contact.errors.nameTooLong;
}

function validateEmail(email: string): string | undefined {
  if (!email) return contact.errors.emailRequired;
  if (email.length > contactLimits.emailMaxLength || !emailPattern.test(email)) {
    return contact.errors.emailInvalid;
  }
}

function validateTopic(topic: string): string | undefined {
  if (!contact.topics.some(({ id }) => id === topic)) return contact.errors.topicRequired;
}

function validateMessage(message: string): string | undefined {
  if (message.length < contactLimits.messageMinLength) return contact.errors.messageTooShort;
  if (message.length > contactLimits.messageMaxLength) return contact.errors.messageTooLong;
}

export function validateContactValues(values: ContactValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {
    name: validateName(values.name),
    email: validateEmail(values.email),
    topic: validateTopic(values.topic),
    message: validateMessage(values.message),
  };

  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => message !== undefined),
  ) as ContactFieldErrors;
}
