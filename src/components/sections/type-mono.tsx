type MonoStyle = {
  className: string;
  sizes: string;
  sample: string;
};

const monoStyles: MonoStyle[] = [
  { className: "copy-label", sizes: "12 → 16", sample: "Developer & Designer" },
  { className: "copy-meta", sizes: "12 → 16", sample: "Next.js · TypeScript · 2026" },
];

export function TypeMono() {
  return (
    <section
      id="mono"
      aria-labelledby="mono-heading"
      className="sections-type-mono container-page py-32"
    >
      <h2 id="mono-heading" className="copy-label text-muted">
        Labels &amp; meta — JetBrains Mono
      </h2>
      <ul className="mt-12 grid gap-y-12">
        {monoStyles.map((style) => (
          <li key={style.className} className="grid gap-4 md:grid-cols-4">
            <p className="copy-meta text-muted">
              .{style.className}
              <br />
              {style.sizes}
            </p>
            <p className={`${style.className} md:col-span-3`}>{style.sample}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
