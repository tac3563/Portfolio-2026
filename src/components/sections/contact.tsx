import { ContactDetails } from "@/components/sections/contact-details";
import { ContactHeading } from "@/components/sections/contact-heading";
import { ContactLetter } from "@/components/sections/contact-letter";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="sections-contact relative z-10 overflow-x-clip bg-paper-100 text-ink-900"
    >
      <div className="flex container-page flex-col gap-16 pt-24 pb-24 md:gap-24 md:pt-32 md:pb-40">
        <ContactHeading />
        <div className="grid gap-16 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-4 lg:col-span-3">
            <ContactDetails />
          </div>
          <div className="md:col-span-8 lg:col-span-8 lg:col-start-5">
            <ContactLetter />
          </div>
        </div>
      </div>
    </section>
  );
}
