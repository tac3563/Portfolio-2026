import "server-only";
import { contact } from "@/content/contact";
import { fillTemplate } from "@/lib/fill-template";
import type { ContactValues } from "@/types/contact";

const resendEndpoint = "https://api.resend.com/emails";
const defaultSender = "Portfolio <onboarding@resend.dev>";

function findTopicLabel(topicId: string): string {
  return contact.topics.find(({ id }) => id === topicId)?.label ?? topicId;
}

export async function sendContactEmail(values: ContactValues): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !recipient) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return false;
  }

  const topic = findTopicLabel(values.topic);

  try {
    const response = await fetch(resendEndpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? defaultSender,
        to: [recipient],
        reply_to: values.email,
        subject: fillTemplate(contact.emailSubject, { name: values.name, topic }),
        text: [
          `${contact.nameLabel}: ${values.name}`,
          `${contact.emailLabel}: ${values.email}`,
          `${contact.topicLegend} ${topic}`,
          "",
          values.message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      console.error(`Contact form: Resend responded ${response.status}`, await response.text());
    }

    return response.ok;
  } catch (error) {
    console.error("Contact form: request to Resend failed", error);
    return false;
  }
}
