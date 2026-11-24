export type ContactField = "name" | "email" | "topic" | "message";

export type ContactValues = Record<ContactField, string>;

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactFormState =
  | { status: "idle"; values: ContactValues }
  | { status: "invalid"; values: ContactValues; errors: ContactFieldErrors }
  | { status: "failed"; values: ContactValues }
  | { status: "sent"; values: ContactValues };
