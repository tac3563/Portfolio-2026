export function TypeWysiwyg() {
  return (
    <section
      id="wysiwyg"
      aria-labelledby="wysiwyg-heading"
      className="sections-type-wysiwyg container-page py-32"
    >
      <h2 id="wysiwyg-heading" className="copy-label text-muted">
        WYSIWYG
      </h2>
      <div className="mt-12 grid gap-y-16 lg:grid-cols-2 lg:gap-x-16">
        <div className="wysiwyg max-w-2xl">
          <h2>Rich text heading</h2>
          <p>
            Body copy inside a <code>.wysiwyg</code> block picks up its styles from the element, so
            content from a CMS or Markdown renders without extra classes. Links look{" "}
            <a href="#wysiwyg">like this</a> and <strong>strong text</strong> is semibold.
          </p>
          <p>A second paragraph sits a little closer to the first than other elements do.</p>
          <h3>Lists</h3>
          <ul>
            <li>Unordered list item</li>
            <li>Another item with a bit more text to show wrapping across lines</li>
          </ul>
          <ol>
            <li>Ordered list item</li>
            <li>Second step</li>
          </ol>
          <blockquote>
            <p>Typography is what language looks like.</p>
          </blockquote>
          <hr />
          <p className="copy-lg--inline">An intro paragraph using an inline size modifier.</p>
        </div>
        <div className="wysiwyg--label-headings wysiwyg max-w-2xl">
          <h2>Label headings</h2>
          <p>
            The <code>.wysiwyg--label-headings</code> modifier turns <code>h2</code>s into mono
            labels with a rule.
          </p>
          <ul>
            <li>Useful for project details</li>
            <li>Or sidebar content</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
