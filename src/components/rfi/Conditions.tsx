import { CheckCircle2 } from "lucide-react";
import { condiciones } from "@/lib/rfi-content";
import { SectionTitle } from "./SectionTitle";

export function Conditions() {
  return (
    <section id="condiciones" className="mx-auto max-w-6xl px-6 py-20">
      <SectionTitle eyebrow="Sección 6" title="Condiciones generales" />
      <ul className="mt-10 grid gap-3 md:grid-cols-2">
        {condiciones.map((c, i) => (
          <li
            key={i}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card-soft"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span className="text-sm leading-relaxed text-foreground/90">{c}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
