type HeadingStyle = {
  className: string;
  sizes: string;
};

const headingStyles: HeadingStyle[] = [
  { className: "heading-2xl", sizes: "48 → 120" },
  { className: "heading-xl", sizes: "40 → 96" },
  { className: "heading-lg", sizes: "34 → 72" },
  { className: "heading-md", sizes: "30 → 56" },
  { className: "heading-sm", sizes: "26 → 44" },
  { className: "heading-xs", sizes: "22 → 36" },
  { className: "heading-2xs", sizes: "20 → 32" },
  { className: "heading-3xs", sizes: "16 → 20" },
];

export function TypeHeadings() {
  return (
    <section
      id="headings"
      aria-labelledby="headings-heading"
      className="sections-type-headings bg-ink-900 py-32 text-paper-100"
    >
      <div className="container-page">
        <h2 id="headings-heading" className="copy-label text-taupe-300">
          Headings — Space Grotesk
        </h2>
        <ul className="mt-12 grid gap-y-12">
          {headingStyles.map((style) => (
            <li key={style.className} className="grid gap-4 md:grid-cols-4">
              <p className="copy-meta text-taupe-300">
                .{style.className}
                <br />
                {style.sizes}
              </p>
              <p className={`${style.className} md:col-span-3`}>
                The quick brown fox jumps over the lazy dog
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
