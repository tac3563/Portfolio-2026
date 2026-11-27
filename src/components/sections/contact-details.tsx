import { contact } from "@/content/contact";
import { site } from "@/config/site";
import { RollLink } from "@/components/layout/roll-link";

export function ContactDetails() {
  return (
    <dl aria-label={contact.detailsLabel} className="sections-contact-details flex flex-col gap-10">
      <div className="flex flex-col gap-3 border-t border-paper-300 pt-4">
        <dt className="copy-label text-taupe-500">{contact.statusLabel}</dt>
        <dd className="flex items-start gap-3 copy-md text-pretty">
          <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
            <span className="size-2 rounded-full bg-green-600" />
          </span>
          {contact.status}
        </dd>
      </div>
      <div className="flex flex-col gap-3 border-t border-paper-300 pt-4">
        <dt className="copy-label text-taupe-500">{contact.basedLabel}</dt>
        <dd className="copy-md">{contact.based}</dd>
      </div>
      <div className="flex flex-col gap-3 border-t border-paper-300 pt-4">
        <dt className="copy-label text-taupe-500">{contact.cvLabel}</dt>
        <dd>
          <RollLink
            href={site.cvHref}
            label={contact.cvLink}
            download
            className="w-fit heading-3xs hover:text-ember-600 focus-visible:text-ember-600"
          >
            <span className="sr-only"> {contact.cvFileType}</span>
          </RollLink>
        </dd>
      </div>
      <div className="flex flex-col gap-3 border-t border-paper-300 pt-4">
        <dt className="copy-label text-taupe-500">{contact.elsewhereLabel}</dt>
        <dd>
          <ul className="flex flex-col gap-2">
            {site.socials.map((social) => (
              <li key={social.href}>
                <RollLink
                  href={social.href}
                  label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit heading-3xs hover:text-ember-600 focus-visible:text-ember-600"
                >
                  <span className="sr-only"> {contact.opensInNewTab}</span>
                </RollLink>
              </li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
  );
}
