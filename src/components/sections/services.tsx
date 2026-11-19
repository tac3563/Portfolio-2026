import { services } from "@/content/services";
import { ServicesHeading } from "@/components/sections/services-heading";
import { ServicesList } from "@/components/sections/services-list";
import { ServicesStage } from "@/components/sections/services-stage";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="sections-services relative z-10"
    >
      <ServicesStage>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="flex flex-col gap-6 md:col-span-7">
            <p className="copy-label text-taupe-300">{services.label}</p>
            <ServicesHeading />
          </div>
          <p className="max-w-md copy-md text-pretty text-taupe-300 md:col-span-5 lg:col-span-4 lg:col-start-9">
            {services.intro}
          </p>
        </div>
        <ServicesList />
      </ServicesStage>
    </section>
  );
}
