import { questions, sla, clientes, otrasInstituciones, type Question } from "@/lib/rfi-content";
import { SectionTitle } from "./SectionTitle";
import { NivelBadge, MadurezBadge } from "./Badges";
import { Info, Sparkles } from "lucide-react";

export function Questions() {
  return (
    <section id="preguntas" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle
        eyebrow="Sección 5"
        title="Las 6 preguntas del RFI"
        description="Respuestas objetivas y verificables. Cada bloque incluye la orientación al proveedor y la respuesta formal de SYSDE / Inventiva."
      />
      <div className="mt-14 space-y-10">
        {questions.map((q) => (
          <QuestionCard key={q.n} q={q} />
        ))}
      </div>
    </section>
  );
}

function QuestionCard({ q }: { q: Question }) {
  return (
    <article
      id={`p${q.n}`}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-card-soft transition-all hover:shadow-sysde"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-hero" />

      <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
        {/* Number rail */}
        <div className="relative overflow-hidden border-b border-border bg-muted/40 p-8 lg:border-b-0 lg:border-r">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Pregunta</div>
          <div className="mt-1 font-heading text-8xl font-black leading-none text-gradient-sysde">
            {String(q.n).padStart(2, "0")}
          </div>
          <div className="mt-6 flex flex-col gap-2">
            {q.cumplimiento && <NivelBadge nivel={q.cumplimiento} />}
            {q.madurez && <MadurezBadge madurez={q.madurez} />}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          <h3 className="font-heading text-xl font-bold leading-snug text-foreground md:text-2xl">
            {q.title}
          </h3>

          <div className="mt-6 rounded-2xl border border-border bg-muted/50 p-5">
            <div className="mb-1 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <Info className="h-3.5 w-3.5" /> Orientación al proveedor
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{q.orientacion}</p>
          </div>

          <div className="mt-6 rounded-2xl border border-primary/20 bg-accent/50 p-6">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Respuesta de SYSDE · Inventiva
            </div>
            <div className="space-y-4 text-[15px] leading-relaxed text-foreground">
              {q.blocks.map((b, i) => (
                <Block key={i} block={b} />
              ))}
            </div>

            {q.n === 5 && <SLATable />}
            {q.n === 6 && <ClientsTable />}
          </div>
        </div>
      </div>
    </article>
  );
}

function Block({ block }: { block: Question["blocks"][number] }) {
  if (block.kind === "p") {
    return (
      <p>
        {block.strong && <strong className="font-heading font-bold text-foreground">{block.strong} </strong>}
        <span className="text-foreground/85">{block.text}</span>
      </p>
    );
  }
  if (block.kind === "h") {
    return (
      <h4 className="mt-6 font-heading text-base font-black uppercase tracking-wider text-primary">
        {block.text}
      </h4>
    );
  }
  if (block.kind === "callout") {
    return (
      <div className="mt-2 rounded-xl border-l-4 border-primary bg-background p-4 text-sm italic text-muted-foreground">
        {block.text}
      </div>
    );
  }
  return (
    <ul className="space-y-2.5">
      {block.items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>
            {it.strong && (
              <strong className="font-heading font-bold text-foreground">{it.strong}: </strong>
            )}
            <span className="text-foreground/85">{it.text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function SLATable() {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-background">
      <div className="bg-gradient-hero px-4 py-2.5 font-heading text-sm font-bold uppercase tracking-widest text-primary-foreground">
        Niveles de servicio · modelo estándar SYSDE
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Severidad</th>
              <th className="px-4 py-3">Respuesta</th>
              <th className="px-4 py-3">Solución objetivo</th>
              <th className="px-4 py-3">Cobertura</th>
            </tr>
          </thead>
          <tbody>
            {sla.map((r) => (
              <tr key={r.sev} className="border-t border-border">
                <td className="px-4 py-3">
                  <span className="mr-2 inline-flex h-6 w-8 items-center justify-center rounded-md bg-primary/10 font-heading text-xs font-black text-primary">
                    {r.sev}
                  </span>
                  <span className="text-foreground/85">{r.nombre}</span>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{r.respuesta}</td>
                <td className="px-4 py-3 font-mono text-xs">{r.solucion}</td>
                <td className="px-4 py-3 font-mono text-xs">{r.cobertura}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ClientsTable() {
  return (
    <>
      <h4 className="mt-6 font-heading text-base font-black uppercase tracking-wider text-primary">
        Clientes prioritarios en la región
      </h4>
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-hero text-left text-xs font-bold uppercase tracking-wider text-primary-foreground">
              <tr>
                <th className="w-12 px-4 py-3">#</th>
                <th className="px-4 py-3">Institución</th>
                <th className="px-4 py-3">Tipo de entidad</th>
                <th className="px-4 py-3">País</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.n} className="border-t border-border even:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.n}</td>
                  <td className="px-4 py-3 font-heading font-bold text-foreground">{c.nombre}</td>
                  <td className="px-4 py-3 text-foreground/80">{c.tipo}</td>
                  <td className="px-4 py-3 text-foreground/80">{c.pais}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Otras instituciones atendidas:</strong> {otrasInstituciones}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        <strong className="text-foreground">Cercanía operativa.</strong> SYSDE mantiene estructura propia en
        los mercados de estas referencias (oficina/SVA en México; oficina, fábrica y SVA en El Salvador; SVA
        en República Dominicana), además de su presencia en Costa Rica, Perú y Colombia. El mismo modelo con
        el que —junto a Inventiva— atendería a Banco Atlas.
      </p>
    </>
  );
}
