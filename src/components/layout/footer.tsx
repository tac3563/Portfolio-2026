import { site } from "@/lib/site";

// Cached so the year is fixed at build time (required by Cache Components).
export async function Footer() {
  "use cache";

  return (
    <footer className="border-t border-border py-10 text-sm text-muted">
      <div className="container-page flex flex-col justify-between gap-4 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-6">
          {site.socials.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {s.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
