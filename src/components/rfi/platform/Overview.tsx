import type { SectionId } from "./PlatformShell";
import { questions, process as proc, vendor, canales } from "@/lib/rfi-content";
import {
  ArrowUpRight,
  Landmark,
  Code2,
  CalendarClock,
  Mail,
  BadgeCheck,
  ShieldCheck,
  CircleDot,
  Radar,
  CircleDollarSign,
  Globe2,
  Layers3,
  ClipboardCheck,
  BookOpenCheck,
  History,
  Users,
} from "lucide-react";

const nivelStyles: Record<string, string> = {
  Sí: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
  Parcial: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
  No: "bg-rose-500/10 text-rose-300 ring-rose-500/30",
};

const madurezStyles: Record<string, string> = {
  Avanzado: "bg-primary/15 text-primary-foreground ring-primary/40",
  Intermedio: "bg-sky-500/10 text-sky-300 ring-sky-500/30",
  Básico: "bg-slate-500/10 text-slate-300 ring-slate-500/30",
};

export function Overview({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <div className="space-y-10 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-2/60 p-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 bg-grid-sysde mask-radial-fade opacity-40" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2 text-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            <Radar className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} />
            Documento vivo · Confidencial
          </div>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            Respuesta al RFI de{" "}
            <span className="text-gradient-sysde">Core Bancario</span>{" "}
            para Banco Atlas.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            SYSDE Internacional Inc. · Inventiva (aliado local en Paraguay).
            Plataforma <strong className="text-foreground">SAF+</strong> — core bancario integral,
            construido sobre 35 años de operación continua en el sector financiero.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate("q1")}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-hero px-5 py-3 text-sm font-semibold text-white shadow-sysde transition hover:brightness-110"
            >
              Abrir las 6 preguntas
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => onNavigate("proveedor")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-white/10"
            >
              Ficha del proveedor
            </button>
          </div>
        </div>
      </section>

      {/* KPI Grid */}
      <section>
        <SectionHeader
          kicker="Indicadores clave"
          title="SYSDE en números"
          subtitle="Dimensión operativa y capacidad instalada del proveedor."
        />
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Kpi icon={CircleDollarSign} value="USD 10M" label="Facturación anual" />
          <Kpi icon={Code2} value="160" label="Especialistas técnicos" />
          <Kpi icon={Landmark} value="800+" label="Instituciones en producción" />
          <Kpi icon={History} value="35+" label="Años de operación continua" />
        </div>
      </section>

      {/* Question matrix */}
      <section>
        <SectionHeader
          kicker="Matriz de respuestas"
          title="Las 6 preguntas del RFI"
          subtitle="Cumplimiento y nivel de madurez declarado en cada eje."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {questions.map((q) => (
            <button
              key={q.n}
              onClick={() => onNavigate(`q${q.n}` as SectionId)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-2/60 p-5 text-left transition-all hover:border-primary/40 hover:bg-surface-2"
            >
              <div className="flex items-start gap-4">
                <div className="text-mono flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-hero text-sm font-bold text-white shadow-sysde">
                  0{q.n}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {q.cumplimiento && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${nivelStyles[q.cumplimiento]}`}
                      >
                        <CircleDot className="h-2.5 w-2.5" /> {q.cumplimiento}
                      </span>
                    )}
                    {q.madurez && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${madurezStyles[q.madurez]}`}
                      >
                        <BadgeCheck className="h-2.5 w-2.5" /> {q.madurez}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 line-clamp-3 text-sm font-medium leading-snug text-foreground">
                    {q.title}
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-primary">
                    Abrir respuesta <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Process + Vendor summary two-column */}
      <section className="grid gap-5 lg:grid-cols-3">
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2">
          <SmallHeader icon={CalendarClock}>Datos del proceso</SmallHeader>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <Row k="Institución" v={proc.institucion} />
            <Row k="Tipo" v={proc.tipo} />
            <Row k="Emisión" v={proc.emision} />
            <Row k="Cierre" v={proc.cierre} highlight />
            <Row k="Canal" v={proc.canal} />
            <Row k="Objeto" v={proc.objeto} />
          </dl>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <SmallHeader icon={ShieldCheck}>Proveedor</SmallHeader>
          <div className="mt-4 space-y-2 text-sm">
            <div className="font-heading text-lg font-bold">{vendor.razon}</div>
            <div className="text-muted-foreground">
              {vendor.pais} · {vendor.anios}
            </div>
            <a
              className="text-mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-primary"
              href={`https://${vendor.web}`}
            >
              <Globe2 className="h-3 w-3" /> {vendor.web}
            </a>
          </div>
          <div className="mt-5 border-t border-white/5 pt-4">
            <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Contactos oficiales
            </div>
            <div className="mt-2 space-y-2">
              {vendor.contactos.map((c) => (
                <div key={c.email} className="flex items-center gap-3">
                  <div className="text-mono flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-[11px] font-bold text-primary-foreground ring-1 ring-primary/40">
                    {c.iniciales}
                  </div>
                  <div className="min-w-0 text-xs">
                    <div className="truncate font-medium">{c.nombre}</div>
                    <div className="truncate text-muted-foreground">{c.cargo}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client-side contacts strip */}
      <section>
        <SectionHeader
          kicker="Canal oficial"
          title="Contactos Banco Atlas y EY"
          subtitle="Interlocutores designados para la recepción de este RFI."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {canales.map((c) => (
            <div key={c.email} className="glass-panel rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="text-mono flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-sm font-bold text-foreground ring-1 ring-white/10">
                  {c.iniciales}
                </div>
                <div>
                  <div className="text-sm font-semibold">{c.nombre}</div>
                  <div className="text-[11px] text-muted-foreground">{c.cargo}</div>
                </div>
              </div>
              <a
                href={`mailto:${c.email}`}
                className="text-mono mt-3 inline-flex items-center gap-1.5 text-[11px] text-primary hover:underline"
              >
                <Mail className="h-3 w-3" /> {c.email}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Stack tape */}
      <section className="rounded-2xl border border-white/10 bg-surface-2/60 p-6">
        <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <Layers className="h-3.5 w-3.5 text-primary" /> Stack de referencia · SAF+
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-mono text-xs">
          {[
            ".NET 10 LTS",
            "C#",
            "Angular 21",
            "SQL Server 2022",
            "Redis 7",
            "RabbitMQ 4",
            "Docker",
            "API Gateway",
            "gRPC",
            "Azure",
            "TDE AES-256",
            "TLS 1.3",
            "Entra ID · MFA",
            "ISO/IEC 27001",
          ].map((t) => (
            <span
              key={t}
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function Kpi({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}) {
  return (
    <div className="glass-panel group relative overflow-hidden rounded-2xl p-5">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
      <Icon className="h-4 w-4 text-primary" />
      <div className="text-mono mt-3 font-heading text-3xl font-black text-foreground">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
    </div>
  );
}

function Row({ k, v, highlight = false }: { k: string; v: string; highlight?: boolean }) {
  return (
    <>
      <dt className="text-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
      <dd className={`text-sm ${highlight ? "font-semibold text-primary" : "text-foreground"}`}>{v}</dd>
    </>
  );
}

function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-primary">{kicker}</div>
      <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function SmallHeader({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
      <Icon className="h-3.5 w-3.5 text-primary" />
      {children}
    </div>
  );
}
