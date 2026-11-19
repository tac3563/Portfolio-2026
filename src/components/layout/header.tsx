import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="font-medium tracking-tight">
          {site.name}
        </a>
        <ul className="flex gap-6 text-sm text-muted">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
