import { AlertCircle } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export function ContextSection() {
  return (
    <section id="contexto" className="relative overflow-hidden bg-muted/40 py-20">
      <div className="absolute inset-0 bg-grid-sysde opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Sección 2" title="Contexto y objetivo" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card-soft">
            <p className="text-lg leading-relaxed text-foreground">
              Banco Atlas S.A., con el acompañamiento de <strong>EY</strong>, se encuentra en la etapa
              preliminar del proceso de modernización de su plataforma de Core Bancario.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              El presente RFI tiene como propósito recopilar información calificada de los proveedores del
              mercado a fin de determinar cuáles cumplen con los requisitos mínimos para avanzar en una etapa
              de propuesta formal (RFP). Las respuestas serán utilizadas exclusivamente con fines de análisis
              y precalificación.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-hero p-8 text-primary-foreground">
            <AlertCircle className="mb-3 h-8 w-8" />
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">Aviso</div>
            <p className="mt-2 font-heading text-2xl font-bold leading-snug">
              Este documento NO representa un compromiso de contratación.
            </p>
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -right-10 font-heading text-[10rem] font-black leading-none text-white/10"
            >
              !
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
