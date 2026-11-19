import { Header } from "@/components/layout/header";
import { site } from "@/config/site";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { TypeHeadings } from "@/components/sections/type-headings";
import { TypeCopy } from "@/components/sections/type-copy";
import { TypeMono } from "@/components/sections/type-mono";
import { TypeWysiwyg } from "@/components/sections/type-wysiwyg";

export default function Home() {
  return (
    <>
      <Header role={site.role} nav={site.nav} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <TypeHeadings />
        <TypeCopy />
        <TypeMono />
        <TypeWysiwyg />
      </main>
      <Footer />
    </>
  );
}
