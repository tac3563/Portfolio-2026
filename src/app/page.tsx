import { Header } from "@/components/layout/header";
import { site } from "@/config/site";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { personSchema } from "@/lib/person-schema";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escaped so a "<" in any value can't close the script tag
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema()).replace(/</g, "\\u003c"),
        }}
      />
      <Header nav={site.nav} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
