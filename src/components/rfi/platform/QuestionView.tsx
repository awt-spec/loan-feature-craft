import type { SectionId } from "./PlatformShell";
import type { Question } from "@/lib/rfi-content";
import { questions, sla, clientes, otrasInstituciones } from "@/lib/rfi-content";
import { Reveal } from "./motion";
import { AnswerDemo } from "./AnswerDemo";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CircleDot,
  Compass,
  FileText,
  Lightbulb,
  MapPin,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

// Icon colors for the (red) cinematic header — pills there are frosted white
const nivelIcon: Record<string, string> = {
  Sí: "text-emerald-300",
  Parcial: "text-amber-300",
  No: "text-rose-300",
};
const madurezIcon: Record<string, string> = {
  Avanzado: "text-amber-200",
  Intermedio: "text-sky-300",
  Básico: "text-slate-200",
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

  // TOC: pull H blocks
  const toc = question.blocks
    .map((b, i) => (b.kind === "h" ? { i, text: b.text } : null))
    .filter(Boolean) as { i: number; text: string }[];

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
      {/* Main */}
      <article className="min-w-0">
        {/* Cinematic header */}
        <header className="relative overflow-hidden rounded-3xl border border-border bg-cinematic text-white shadow-sysde">
          <div className="pointer-events-none absolute inset-0 bg-grid-sysde-light opacity-40 mask-radial-fade" />
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

          {/* Ghost number */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-10 animate-float-slow select-none font-heading text-[14rem] font-black leading-none text-white/[0.06] md:text-[20rem]"
          >
            {String(question.n).padStart(2, "0")}
          </div>

          <div className="relative p-6 md:p-10">
            <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
              <FileText className="h-3.5 w-3.5" />
              RFI Banco Atlas · Pregunta {question.n} de 6
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-start sm:gap-5">
              <div className="relative shrink-0 self-start">
                <div className="absolute inset-0 animate-glow rounded-2xl bg-primary/40 blur-xl" />
                <div className="text-mono relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-hero font-heading text-2xl font-black text-white ring-1 ring-white/25 shadow-sysde sm:h-20 sm:w-20 sm:text-3xl md:h-24 md:w-24 md:text-4xl">
                  {String(question.n).padStart(2, "0")}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-mono text-[10px] uppercase tracking-[0.28em] text-white/60">
                  Consulta formal
                </div>
                <h1 className="mt-2 font-heading text-[22px] font-black leading-snug tracking-tight text-white sm:text-2xl sm:leading-tight md:text-4xl">
                  {question.title}
                </h1>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {question.cumplimiento && (
                <Pill className="bg-white/12 text-white ring-white/30">
                  <CircleDot className={`h-3 w-3 ${nivelIcon[question.cumplimiento]}`} /> Cumplimiento · {question.cumplimiento}
                </Pill>
              )}
              {question.madurez && (
                <Pill className="bg-white/12 text-white ring-white/30">
                  <BadgeCheck className={`h-3 w-3 ${madurezIcon[question.madurez]}`} /> Madurez · {question.madurez}
                </Pill>
              )}
              <Pill className="bg-white/10 text-white ring-white/25">
                <Target className="h-3 w-3" /> Respuesta SYSDE · Inventiva
              </Pill>
            </div>
          </div>
        </header>

        {/* Orientación — quote-styled */}
        <Reveal as="section" className="relative mt-8">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft md:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                <Compass className="h-5 w-5 text-primary" strokeWidth={2.25} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  <span className="h-px w-6 bg-primary/60" />
                  Orientación al proveedor
                </div>
                <p className="mt-2 font-heading text-lg italic leading-relaxed text-foreground md:text-xl">
                  <Quote className="mr-1 inline h-4 w-4 -translate-y-2 text-primary/50" />
                  {question.orientacion}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Answer card */}
        <Reveal as="section" delay={80} className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-card-soft">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-5 py-3 md:px-7">
            <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Respuesta formal · SYSDE + Inventiva
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
              Verificable
            </div>
          </div>

          <div className="relative p-6 md:p-8">
            {/* Left accent rail */}
            <div className="pointer-events-none absolute left-6 top-8 bottom-8 hidden w-px bg-gradient-to-b from-primary/40 via-border to-transparent md:block" />

            <div className="space-y-6 md:pl-6">
              {question.blocks.map((b, i) => {
                if (b.kind === "p") {
                  return (
                    <p
                      key={i}
                      className="text-[15px] leading-relaxed text-foreground/90 md:text-base"
                    >
                      {b.strong && (
                        <strong className="font-heading font-bold text-foreground">
                          {b.strong}{" "}
                        </strong>
                      )}
                      {b.text}
                    </p>
                  );
                }
                if (b.kind === "h") {
                  return (
                    <div key={i} id={`q${question.n}-h${i}`} className="relative mt-8 first:mt-0">
                      <div className="absolute -left-6 top-1.5 hidden h-3 w-3 rounded-full bg-primary ring-4 ring-primary/15 md:block" />
                      <h3 className="font-heading text-lg font-black uppercase tracking-wider text-primary md:text-xl">
                        {b.text}
                      </h3>
                      <div className="mt-2 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
                    </div>
                  );
                }
                if (b.kind === "callout") {
                  return (
                    <aside
                      key={i}
                      className="relative overflow-hidden rounded-xl border-l-4 border-primary bg-accent/60 p-4 pl-5 text-sm text-foreground shadow-sm"
                    >
                      <Lightbulb
                        className="absolute right-3 top-3 h-4 w-4 text-primary/60"
                        strokeWidth={2}
                      />
                      <div className="pr-8 italic">{b.text}</div>
                    </aside>
                  );
                }
                // ul — feature list cards
                return (
                  <ul key={i} className="grid gap-2.5 sm:grid-cols-2">
                    {b.items.map((it, j) => (
                      <li
                        key={j}
                        className="group relative flex gap-3 rounded-xl border border-border bg-background p-3.5 text-[14px] leading-relaxed transition hover:border-primary/40 hover:shadow-card-soft"
                      >
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/20 transition group-hover:bg-primary group-hover:ring-primary">
                          <CheckCircle2
                            className="h-3.5 w-3.5 text-primary transition group-hover:text-white"
                            strokeWidth={2.5}
                          />
                        </div>
                        <span className="min-w-0">
                          {it.strong && (
                            <strong className="mr-1 font-heading font-bold text-foreground">
                              {it.strong}:
                            </strong>
                          )}
                          <span className="text-foreground/85">{it.text}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>
          </div>

          {/* Demo interactiva — diagrama de la respuesta */}
          <div className="border-t border-border bg-muted/20 p-6 md:p-8">
            <AnswerDemo n={question.n} />
          </div>

          {/* Q5: SLA */}
          {question.n === 5 && (
            <div className="border-t border-border bg-muted/30 p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Modelo de niveles de servicio · estándar SYSDE
              </div>
              <div className="grid gap-3 md:hidden">
                {sla.map((r) => (
                  <div
                    key={r.sev}
                    className="rounded-xl border border-border bg-card p-4 shadow-card-soft"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-mono inline-flex h-7 w-9 items-center justify-center rounded-md bg-gradient-hero font-black text-white shadow-sysde">
                        {r.sev}
                      </span>
                      <span className="font-heading font-bold">{r.nombre}</span>
                    </div>
                    <dl className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                      <div>
                        <dt className="text-mono uppercase tracking-wider text-muted-foreground">
                          Resp.
                        </dt>
                        <dd className="text-mono mt-0.5 font-semibold">{r.respuesta}</dd>
                      </div>
                      <div>
                        <dt className="text-mono uppercase tracking-wider text-muted-foreground">
                          Solución
                        </dt>
                        <dd className="text-mono mt-0.5 font-semibold">{r.solucion}</dd>
                      </div>
                      <div>
                        <dt className="text-mono uppercase tracking-wider text-muted-foreground">
                          Cobertura
                        </dt>
                        <dd className="text-mono mt-0.5 font-semibold">{r.cobertura}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
              <div className="hidden overflow-hidden rounded-2xl border border-border bg-card md:block">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left">Sev.</th>
                      <th className="px-4 py-3 text-left">Descripción</th>
                      <th className="px-4 py-3 text-left">Respuesta</th>
                      <th className="px-4 py-3 text-left">Solución</th>
                      <th className="px-4 py-3 text-left">Cobertura</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sla.map((r) => (
                      <tr key={r.sev} className="border-t border-border transition hover:bg-muted/40">
                        <td className="px-4 py-3">
                          <span className="text-mono inline-flex h-7 w-9 items-center justify-center rounded-md bg-gradient-hero font-black text-white shadow-sysde">
                            {r.sev}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-heading font-semibold text-foreground">
                          {r.nombre}
                        </td>
                        <td className="px-4 py-3 text-mono text-foreground">{r.respuesta}</td>
                        <td className="px-4 py-3 text-mono text-foreground">{r.solucion}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.cobertura}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Q6: clientes */}
          {question.n === 6 && (
            <div className="border-t border-border bg-muted/30 p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                <MapPin className="h-3.5 w-3.5" />
                Clientes prioritarios · referencias verificables
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {clientes.map((c) => (
                  <div
                    key={c.n}
                    className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-card-soft transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sysde"
                  >
                    <div className="absolute right-3 top-3 text-mono text-[10px] font-bold text-muted-foreground/60">
                      0{c.n}
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                      <Landmark className="h-4 w-4 text-primary" strokeWidth={2.25} />
                    </div>
                    <div className="mt-3 font-heading text-sm font-bold leading-tight text-foreground">
                      {c.nombre}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{c.tipo}</div>
                    <div className="mt-2 inline-flex items-center gap-1 text-mono text-[10px] uppercase tracking-wider text-primary">
                      <MapPin className="h-3 w-3" /> {c.pais}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-dashed border-border bg-background p-4 text-sm text-muted-foreground">
                <span className="font-heading font-bold text-foreground">
                  Otras instituciones atendidas:
                </span>{" "}
                {otrasInstituciones}
              </div>
            </div>
          )}
        </Reveal>

        {/* Pager */}
        <nav className="mt-10 grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => prev && onNavigate(`q${prev.n}` as SectionId)}
            disabled={!prev}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-left transition hover:border-primary/40 hover:shadow-card-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
              Anterior
            </div>
            <div className="mt-2 font-heading text-sm font-bold text-foreground">
              {prev ? `0${prev.n} · ${prev.title}` : "Inicio del RFI"}
            </div>
          </button>
          <button
            onClick={() => next && onNavigate(`q${next.n}` as SectionId)}
            disabled={!next}
            className="sheen group relative overflow-hidden rounded-2xl bg-gradient-hero p-5 text-left text-white shadow-sysde transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 sm:text-right"
          >
            <div className="pointer-events-none absolute inset-0 bg-grid-sysde-light opacity-30" />
            <div className="relative flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-white/80 sm:justify-end">
              Siguiente
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </div>
            <div className="relative mt-2 font-heading text-sm font-bold">
              {next ? `0${next.n} · ${next.title}` : "Fin de las preguntas"}
            </div>
          </button>
        </nav>
      </article>

      {/* Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-4">
          {/* Progress */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card-soft">
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Progreso
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-mono font-heading text-4xl font-black text-gradient-sysde">
                {String(question.n).padStart(2, "0")}
              </span>
              <span className="text-mono text-lg font-bold text-muted-foreground/60">/ 06</span>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="animate-progress h-full rounded-full bg-gradient-hero"
                style={{ width: `${(question.n / 6) * 100}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>Q01</span>
              <span>{Math.round((question.n / 6) * 100)}%</span>
              <span>Q06</span>
            </div>
          </div>

          {/* TOC */}
          {toc.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
              <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                En esta respuesta
              </div>
              <ul className="mt-3 space-y-1">
                {toc.map((t, idx) => (
                  <li key={t.i}>
                    <a
                      href={`#q${question.n}-h${t.i}`}
                      className="group flex items-start gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      <span className="text-mono mt-0.5 w-5 text-[10px] font-bold text-primary/70">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="line-clamp-2 flex-1">{t.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Question list */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
            <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Todas las preguntas
            </div>
            <ul className="mt-3 space-y-1">
              {questions.map((q) => {
                const active = q.n === question.n;
                return (
                  <li key={q.n}>
                    <button
                      onClick={() => onNavigate(`q${q.n}` as SectionId)}
                      className={[
                        "flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition",
                        active
                          ? "bg-primary/10 text-foreground ring-1 ring-primary/30"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "text-mono mt-0.5 w-6 text-[10px] font-bold",
                          active ? "text-primary" : "text-primary/60",
                        ].join(" ")}
                      >
                        0{q.n}
                      </span>
                      <span className="line-clamp-2 flex-1">{q.title}</span>
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
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ring-1 backdrop-blur ${className}`}
    >
      {children}
    </span>
  );
}

// Local icon fallback — avoid an extra import at top and keep tree-shaking healthy
function Landmark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="3" x2="21" y1="22" y2="22" />
      <line x1="6" x2="6" y1="18" y2="11" />
      <line x1="10" x2="10" y1="18" y2="11" />
      <line x1="14" x2="14" y1="18" y2="11" />
      <line x1="18" x2="18" y1="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}
