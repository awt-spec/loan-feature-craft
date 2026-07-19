import { instrucciones } from "@/lib/rfi-content";
import { SectionTitle } from "./SectionTitle";
import { FileText, Sparkles, ScanSearch, Send, MessagesSquare } from "lucide-react";

const icons = [FileText, Sparkles, ScanSearch, Send, MessagesSquare];

export function Instructions() {
  return (
    <section id="instrucciones" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Sección 4"
          title="Instrucciones para la respuesta"
          description="Formato, criterios de calidad, evaluación y envío de la información."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {instrucciones.map((i, idx) => {
            const Icon = icons[idx] ?? FileText;
            return (
              <div key={i.titulo} className="group rounded-2xl border border-border bg-card p-6 shadow-card-soft transition-all hover:-translate-y-0.5 hover:border-primary/40">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{i.titulo}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{i.detalle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <LegendCard
            title="Nivel de cumplimiento"
            items={[
              { label: "Sí", cls: "bg-primary text-primary-foreground" },
              { label: "Parcial", cls: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200" },
              { label: "No", cls: "bg-muted text-muted-foreground" },
            ]}
          />
          <LegendCard
            title="Nivel de madurez"
            items={[
              { label: "Básico", dots: 1 },
              { label: "Intermedio", dots: 2 },
              { label: "Avanzado", dots: 3 },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function LegendCard({
  title,
  items,
}: {
  title: string;
  items: { label: string; cls?: string; dots?: number }[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
      <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{title}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((it) => (
          <span
            key={it.label}
            className={`inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-semibold ${
              it.cls ?? "bg-background text-foreground"
            }`}
          >
            {it.dots !== undefined && (
              <span className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${i <= it.dots! ? "bg-primary" : "bg-border"}`}
                  />
                ))}
              </span>
            )}
            {it.label}
          </span>
        ))}
      </div>
    </div>
  );
}
