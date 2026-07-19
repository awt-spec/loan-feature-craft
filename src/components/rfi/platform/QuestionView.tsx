import type { SectionId } from "./PlatformShell";
import type { Question } from "@/lib/rfi-content";
import { questions, sla, clientes } from "@/lib/rfi-content";
import { ArrowLeft, ArrowRight, BadgeCheck, CircleDot, Compass, FileText, ShieldCheck } from "lucide-react";

const nivelStyles: Record<string, string> = {
  Sí: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/40 dark:text-emerald-300",
  Parcial: "bg-amber-500/15 text-amber-700 ring-amber-500/40 dark:text-amber-300",
  No: "bg-rose-500/15 text-rose-700 ring-rose-500/40 dark:text-rose-300",
};

const madurezStyles: Record<string, string> = {
  Avanzado: "bg-primary/15 text-primary ring-primary/40 dark:text-primary-foreground",
  Intermedio: "bg-sky-500/15 text-sky-700 ring-sky-500/40 dark:text-sky-300",
  Básico: "bg-slate-500/15 text-slate-700 ring-slate-500/40 dark:text-slate-300",
};

export function QuestionView({
  question,
  onNavigate,
}: {
  question: Question;
  onNavigate: (id: SectionId) => void;
}) {
  const prev = questions.find((q) => q.n === question.n - 1);
  const next = questions.find((q) => q.n === question.n + 1);

  return (
    <div className="grid gap-8 pb-16 lg:grid-cols-[minmax(0,1fr)_280px]">
      {/* Main */}
      <article className="min-w-0">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-2/60 p-6 md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-grid-sysde mask-radial-fade opacity-30" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <FileText className="h-3.5 w-3.5 text-primary" />
              Pregunta {question.n} de 6 · RFI Banco Atlas
            </div>
            <div className="mt-6 flex items-start gap-5">
              <div className="text-mono flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-hero font-heading text-2xl font-black text-white shadow-sysde">
                0{question.n}
              </div>
              <h1 className="font-heading text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                {question.title}
              </h1>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {question.cumplimiento && (
                <Pill className={nivelStyles[question.cumplimiento]}>
                  <CircleDot className="h-3 w-3" /> Cumplimiento · {question.cumplimiento}
                </Pill>
              )}
              {question.madurez && (
                <Pill className={madurezStyles[question.madurez]}>
                  <BadgeCheck className="h-3 w-3" /> Madurez · {question.madurez}
                </Pill>
              )}
            </div>
          </div>
        </div>

        {/* Orientación */}
        <div className="mt-6 rounded-2xl border-l-2 border-primary bg-primary/5 p-5">
          <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            <Compass className="h-3.5 w-3.5" /> Orientación al proveedor
          </div>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">{question.orientacion}</p>
        </div>

        {/* Body blocks */}
        <div className="mt-8 space-y-5">
          {question.blocks.map((b, i) => {
            if (b.kind === "p") {
              return (
                <p key={i} className="text-[15px] leading-relaxed text-foreground/90">
                  {b.strong && <strong className="mr-1 text-foreground">{b.strong}</strong>}
                  {b.text}
                </p>
              );
            }
            if (b.kind === "h") {
              return (
                <h3
                  key={i}
                  className="mt-4 font-heading text-lg font-bold tracking-tight text-foreground"
                >
                  {b.text}
                </h3>
              );
            }
            if (b.kind === "callout") {
              return (
                <div
                  key={i}
                  className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-100/90"
                >
                  {b.text}
                </div>
              );
            }
            // ul
            return (
              <ul key={i} className="space-y-2.5">
                {b.items.map((it, j) => (
                  <li
                    key={j}
                    className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 text-[14px] leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>
                      {it.strong && <strong className="mr-1 text-foreground">{it.strong}:</strong>}
                      <span className="text-foreground/85">{it.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>

        {/* Special: attach SLA table on Q5 */}
        {question.n === 5 && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-surface-2/60">
            <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3 text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Modelo SLA de referencia
            </div>
            <table className="w-full text-sm">
              <thead className="bg-white/[0.02] text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left">Sev.</th>
                  <th className="px-4 py-2.5 text-left">Descripción</th>
                  <th className="px-4 py-2.5 text-left">Respuesta</th>
                  <th className="px-4 py-2.5 text-left">Solución</th>
                  <th className="px-4 py-2.5 text-left">Cobertura</th>
                </tr>
              </thead>
              <tbody>
                {sla.map((r) => (
                  <tr key={r.sev} className="border-t border-white/5">
                    <td className="px-4 py-2.5 text-mono font-bold text-primary">{r.sev}</td>
                    <td className="px-4 py-2.5 text-foreground/90">{r.nombre}</td>
                    <td className="px-4 py-2.5 text-mono text-foreground">{r.respuesta}</td>
                    <td className="px-4 py-2.5 text-mono text-foreground">{r.solucion}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{r.cobertura}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Special: client table on Q6 */}
        {question.n === 6 && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-surface-2/60">
            <div className="border-b border-white/5 px-5 py-3 text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Clientes prioritarios · referencias verificables
            </div>
            <table className="w-full text-sm">
              <thead className="bg-white/[0.02] text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left">#</th>
                  <th className="px-4 py-2.5 text-left">Institución</th>
                  <th className="px-4 py-2.5 text-left">Tipo</th>
                  <th className="px-4 py-2.5 text-left">País</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c) => (
                  <tr key={c.n} className="border-t border-white/5">
                    <td className="px-4 py-2.5 text-mono text-muted-foreground">0{c.n}</td>
                    <td className="px-4 py-2.5 font-semibold text-foreground">{c.nombre}</td>
                    <td className="px-4 py-2.5 text-foreground/85">{c.tipo}</td>
                    <td className="px-4 py-2.5 text-mono text-muted-foreground">{c.pais}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pager */}
        <div className="mt-10 flex items-center justify-between gap-3">
          <button
            onClick={() => prev && onNavigate(`q${prev.n}` as SectionId)}
            disabled={!prev}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-muted-foreground transition hover:bg-white/10 hover:text-foreground disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            {prev ? `Pregunta ${prev.n}` : "—"}
          </button>
          <button
            onClick={() => next && onNavigate(`q${next.n}` as SectionId)}
            disabled={!next}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-hero px-4 py-2.5 text-sm font-semibold text-white shadow-sysde transition hover:brightness-110 disabled:opacity-30"
          >
            {next ? `Pregunta ${next.n}` : "Fin"}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
        </div>
      </article>

      {/* Sticky meta */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-4">
          <div className="glass-panel rounded-2xl p-5">
            <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Progreso
            </div>
            <div className="text-mono mt-1 font-heading text-3xl font-black">
              {question.n}
              <span className="text-muted-foreground/60"> / 6</span>
            </div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full bg-gradient-hero"
                style={{ width: `${(question.n / 6) * 100}%` }}
              />
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5">
            <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Todas las preguntas
            </div>
            <ul className="mt-3 space-y-1.5">
              {questions.map((q) => {
                const active = q.n === question.n;
                return (
                  <li key={q.n}>
                    <button
                      onClick={() => onNavigate(`q${q.n}` as SectionId)}
                      className={[
                        "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition",
                        active
                          ? "bg-primary/15 text-foreground ring-1 ring-primary/40"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                      ].join(" ")}
                    >
                      <span className="text-mono w-6 text-[10px] font-bold text-primary">0{q.n}</span>
                      <span className="line-clamp-1 flex-1">{q.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ring-1 ${className}`}
    >
      {children}
    </span>
  );
}
