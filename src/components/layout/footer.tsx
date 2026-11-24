import { site } from "@/config/site";
import { RollLink } from "@/components/layout/roll-link";
import { FooterBackToTop } from "@/components/layout/footer-back-to-top";

export async function Footer() {
  "use cache";

  return (
    <footer className="layout-footer border-t border-border py-10 copy-meta text-muted">
      <div className="flex container-page items-end justify-between gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <ul className="flex gap-6">
            {site.socials.map((s) => (
              <li key={s.href}>
                <RollLink
                  href={s.href}
                  label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground focus-visible:text-foreground"
                >
                  <span className="sr-only"> (opens in a new tab)</span>
                </RollLink>
              </li>
            ))}
          </ul>
        </div>
        <FooterBackToTop />
      </div>
    </footer>
  );
}
