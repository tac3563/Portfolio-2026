import { site } from "@/lib/site";

// The hero is the LCP element, so its entrance is pure CSS (.animate-enter) and
// paints with the HTML instead of waiting for JS to hydrate.
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="container-page flex min-h-svh flex-col justify-center pt-16"
    >
      <p className="animate-enter text-sm tracking-widest text-muted uppercase">
        Developer &amp; Designer
      </p>
      <h1
        id="hero-heading"
        className="mt-4 max-w-4xl animate-enter text-5xl font-semibold tracking-tight text-balance [animation-delay:80ms] sm:text-7xl"
      >
        I design and build fast, accessible web experiences.
      </h1>
      <p className="mt-6 max-w-xl animate-enter text-lg text-pretty text-muted [animation-delay:160ms]">
        {site.description}
      </p>
    </section>
  );
}
