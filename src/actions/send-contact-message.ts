"use server";

import { readContactValues } from "@/lib/read-contact-values";
import { sendContactEmail } from "@/lib/send-contact-email";
import { validateContactValues } from "@/lib/validate-contact-values";
import type { ContactFormState } from "@/types/contact";

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = readContactValues(formData);

  // Bots fill every field, people never see this one, so pretend it worked
  if (formData.get("website")) return { status: "sent", values };

  const errors = validateContactValues(values);
  if (Object.keys(errors).length > 0) return { status: "invalid", values, errors };

  const sent = await sendContactEmail(values);

  return sent ? { status: "sent", values } : { status: "failed", values };
}
