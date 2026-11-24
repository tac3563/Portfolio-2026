import { contact } from "@/content/contact";
import { ContactFieldError } from "@/components/sections/contact-field-error";
import { findContactErrorId } from "@/lib/contact-field-ids";

const chipTilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

type ContactTopicsProps = {
  selected: string;
  error?: string;
};

export function ContactTopics({ selected, error }: ContactTopicsProps) {
  return (
    <fieldset className="sections-contact-topics flex flex-col gap-5">
      <legend className="sr-only">{contact.topicLegend}</legend>
      <span aria-hidden="true">{contact.topicPrompt}</span>
      <div className="flex flex-wrap gap-3">
        {contact.topics.map((topic, index) => (
          <label
            key={topic.id}
            className={`sections-contact-topics__chip cursor-pointer rounded-full border-2 border-ink-900 px-5 py-2.5 heading-3xs select-none hover:bg-paper-200 has-checked:border-ember-600 has-checked:bg-ember-600 has-checked:text-paper-50 has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-foreground ${chipTilts[index % chipTilts.length]}`}
          >
            <input
              type="radio"
              id={`contact-topic-${topic.id}`}
              name="topic"
              value={topic.id}
              required
              defaultChecked={topic.id === selected}
              aria-describedby={error ? findContactErrorId("topic") : undefined}
              className="sr-only"
            />
            {topic.label}
          </label>
        ))}
      </div>
      <ContactFieldError field="topic" message={error} />
    </fieldset>
  );
}
