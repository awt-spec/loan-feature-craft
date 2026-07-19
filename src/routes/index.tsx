import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/rfi/TopBar";
import { Hero } from "@/components/rfi/Hero";
import { ProcessData } from "@/components/rfi/ProcessData";
import { ContextSection } from "@/components/rfi/ContextSection";
import { VendorContacts } from "@/components/rfi/VendorContacts";
import { Instructions } from "@/components/rfi/Instructions";
import { Questions } from "@/components/rfi/Questions";
import { References } from "@/components/rfi/References";
import { Conditions } from "@/components/rfi/Conditions";
import { SiteFooter } from "@/components/rfi/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RFI Core Bancario — Banco Atlas × SYSDE · Inventiva" },
      {
        name: "description",
        content:
          "Respuesta formal de SYSDE Internacional Inc. e Inventiva al RFI de selección de plataforma de Core Bancario de Banco Atlas S.A., con acompañamiento de EY. Asunción, Paraguay · 2026.",
      },
      { property: "og:title", content: "RFI Core Bancario — Banco Atlas × SYSDE" },
      {
        property: "og:description",
        content:
          "SAF+ · Core bancario integral. Respuesta estructurada a las 6 preguntas del RFI de Banco Atlas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <TopBar />
      <main>
        <Hero />
        <ProcessData />
        <ContextSection />
        <VendorContacts />
        <Instructions />
        <Questions />
        <References />
        <Conditions />
      </main>
      <SiteFooter />
    </div>
  );
}
