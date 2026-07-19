import { createFileRoute } from "@tanstack/react-router";
import { PlatformShell } from "@/components/rfi/platform/PlatformShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RFI Core Bancario — Banco Atlas × SYSDE · Inventiva" },
      {
        name: "description",
        content:
          "Plataforma interactiva de respuesta al RFI de Core Bancario de Banco Atlas S.A. — SYSDE Internacional Inc. e Inventiva. Asunción, Paraguay · 2026.",
      },
      { property: "og:title", content: "RFI Core Bancario — Banco Atlas × SYSDE" },
      {
        property: "og:description",
        content:
          "Documento interactivo · SAF+ core bancario integral · 6 preguntas del RFI de Banco Atlas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <PlatformShell />;
}
