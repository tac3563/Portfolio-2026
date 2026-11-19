import { Header } from "@/components/layout/header";
import { site } from "@/config/site";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <>
      <Header role={site.role} nav={site.nav} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
      </main>
      <Footer />
    </>
  );
}
