import { site } from "@/config/site";

// schema.org Person, so search engines and AI answers can tie the name, job title and location together
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressCountry: site.country,
    },
    knowsAbout: site.skills,
    sameAs: site.socials.map((social) => social.href),
  };
}
