type CopyStyle = {
  className: string;
  sizes: string;
};

const copyStyles: CopyStyle[] = [
  { className: "copy-lg", sizes: "18 → 24" },
  { className: "copy-md", sizes: "16 → 20" },
];

export function TypeCopy() {
  return (
    <section
      id="copy"
      aria-labelledby="copy-heading"
      className="sections-type-copy container-page py-32"
    >
      <h2 id="copy-heading" className="copy-label text-muted">
        Copy — Inter
      </h2>
      <ul className="mt-12 grid gap-y-12">
        {copyStyles.map((style) => (
          <li key={style.className} className="grid gap-4 md:grid-cols-4">
            <p className="copy-meta text-muted">
              .{style.className}
              <br />
              {style.sizes}
            </p>
            <p className={`${style.className} max-w-2xl md:col-span-3`}>
              I design and build fast, accessible web experiences. Good typography sets the rhythm
              of a page before anyone reads a word, so every style here scales with the viewport and
              keeps a comfortable line length.
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
