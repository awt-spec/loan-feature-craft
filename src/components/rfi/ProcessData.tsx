import { Building2, FileText, Target, CalendarDays, CalendarClock, Mail } from "lucide-react";
import { process } from "@/lib/rfi-content";
import { SectionTitle } from "./SectionTitle";

const items = [
  { icon: Building2, label: "Institución", value: process.institucion },
  { icon: FileText, label: "Tipo de documento", value: process.tipo },
  { icon: Target, label: "Objeto", value: process.objeto },
  { icon: CalendarDays, label: "Fecha de emisión", value: process.emision },
  { icon: CalendarClock, label: "Fecha límite de respuesta", value: process.cierre, highlight: true },
  { icon: Mail, label: "Canal de respuesta", value: process.canal },
];

export function ProcessData() {
  return (
    <section id="proceso" className="mx-auto max-w-6xl px-6 py-20">
      <SectionTitle eyebrow="Sección 1" title="Datos del proceso" />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.label}
            className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card-soft transition-all hover:-translate-y-0.5 hover:shadow-sysde ${
              it.highlight ? "ring-1 ring-primary/40" : ""
            }`}
          >
            <div
              className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                it.highlight ? "bg-gradient-hero text-primary-foreground" : "bg-accent text-accent-foreground"
              }`}
            >
              <it.icon className="h-5 w-5" />
            </div>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {it.label}
            </div>
            <div className="mt-1.5 font-heading text-lg font-bold text-foreground">{it.value}</div>
            {it.highlight && (
              <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                Deadline
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
