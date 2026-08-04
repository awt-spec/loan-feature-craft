import type { SectionId } from "./PlatformShell";
import { questions, process as proc, vendor, canales } from "@/lib/rfi-content";
import { Reveal, SpotlightCard, CountUp } from "./motion";
import { SafSolarSystem } from "./SafSolarSystem";
import type { LucideIcon } from "lucide-react";
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
  Target,
  PackageCheck,
  Check,
  Sparkles,
  History,
  Users,
} from "lucide-react";

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

const STACK = [
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
];

export function Overview({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <div className="space-y-10 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-2/60 p-8 md:p-14">
        <div className="pointer-events-none absolute inset-0 animate-grid-pan bg-grid-sysde mask-radial-fade opacity-40" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-float rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 animate-float-slow rounded-full bg-primary/15 blur-3xl" />
        {/* Ghost "6" */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-heading text-[16rem] font-black leading-none text-primary/[0.06] md:text-[22rem]"
        >
          6
        </div>

        <div className="relative">
          <Reveal as="div" delay={0} className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            <Radar className="h-3.5 w-3.5 animate-spin-slow text-primary" strokeWidth={2.25} />
            Documento vivo · Confidencial
          </Reveal>
          <Reveal as="h1" delay={90} className="mt-5 max-w-3xl font-heading text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            Respuesta al RFI de{" "}
            <span className="text-shimmer">Core Bancario</span>{" "}
            para Banco Atlas.
          </Reveal>
          <Reveal as="p" delay={180} className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            SYSDE Internacional Inc. · Inventiva (aliado local en Paraguay).
            Plataforma <strong className="text-foreground">SAF+</strong> — core bancario integral,
            construido sobre 35 años de operación continua en el sector financiero.
          </Reveal>

          <Reveal as="div" delay={270} className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate("q1")}
              className="sheen group inline-flex items-center gap-2 rounded-xl bg-gradient-hero px-5 py-3 text-sm font-semibold text-white shadow-sysde transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Abrir las 6 preguntas
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => onNavigate("proveedor")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Ficha del proveedor
            </button>
          </Reveal>
        </div>
      </section>

      {/* El producto: SAF+ */}
      <section>
        <SectionHeader
          kicker="El producto"
          title="SAF+ — core bancario modular"
          subtitle="Una sola plataforma, módulos independientes que se activan según el negocio del banco."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Layers3,
              title: "Arquitectura modular",
              text: "Colocación, captación, canales digitales, tesorería, seguridad, BI, facturación y notificaciones operan como módulos desacoplados sobre un core común, con datos y contabilidad unificados.",
            },
            {
              icon: Code2,
              title: "API-First y contenerizado",
              text: "Microservicios en .NET 10 LTS, Docker y API Gateway. Cada módulo se despliega, escala y actualiza sin detener la operación del resto del core.",
            },
            {
              icon: PackageCheck,
              title: "Activación por etapas",
              text: "El banco enciende solo los módulos que necesita hoy y suma los demás después, sin migraciones nuevas ni reimplementación del core.",
            },
          ].map((c, idx) => (
            <Reveal key={c.title} delay={idx * 90}>
              <SpotlightCard className="glass-panel h-full rounded-2xl p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-sysde ring-1 ring-white/10">
                  <c.icon className="h-5 w-5" strokeWidth={2.25} />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold leading-tight">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sistema solar modular */}
      <SafSolarSystem />

      {/* Los 3 pilares */}

      <section>
        <SectionHeader
          kicker="Propuesta de valor"
          title="Los 3 pilares de la solución"
          subtitle="Experiencia comprobada, suscripción ilimitada y un precio único mensual."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Reveal delay={0}>
            <SpotlightCard className="glass-panel group relative h-full overflow-hidden rounded-2xl p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/25" />
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-sysde ring-1 ring-white/10">
                  <Target className="h-5 w-5" strokeWidth={2.25} />
                </div>
                <span className="text-mono rounded-full border border-primary/25 bg-primary/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  Pilar 01
                </span>
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold leading-tight">Experiencia</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                35+ años dedicados exclusivamente a software financiero y 800+ instituciones en producción.
                SAF+ corre 100% sobre .NET 10 LTS, microservicios contenerizados y API-First — sin capas
                heredadas ni middleware de terceros.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-foreground">
                {[
                  "35+ años de operación continua",
                  "800+ instituciones financieras",
                  "160 especialistas técnicos",
                ].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={90}>
            <SpotlightCard className="glass-panel group relative h-full overflow-hidden rounded-2xl p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/25" />
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-sysde ring-1 ring-white/10">
                  <PackageCheck className="h-5 w-5" strokeWidth={2.25} />
                </div>
                <span className="text-mono rounded-full border border-primary/25 bg-primary/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  Pilar 02
                </span>
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold leading-tight">Suscripción ilimitada</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Todos los módulos, usuarios y transacciones incluidos. Sin costos por módulo, por usuario
                ni por volumen transaccional.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-foreground">
                {[
                  "Licenciamiento SAF+ completo (banca universal)",
                  "Usuarios y transacciones ilimitados",
                  "Infraestructura cloud gestionada (Azure)",
                  "Soporte N1/N2/N3 en español · SYSDE + Inventiva",
                  "Actualizaciones, parches y nuevas versiones",
                  "Monitoreo 24/7, DR y respaldos grado bancario",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={180}>
            <SpotlightCard className="glass-panel group relative h-full overflow-hidden rounded-2xl border-primary/30 p-6">
              <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-[0.08] transition group-hover:opacity-[0.14]" />
              <div className="pointer-events-none absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-sysde ring-1 ring-white/10">
                    <Sparkles className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <span className="text-mono rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    Pilar 03
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold leading-tight">Precio</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-heading text-5xl font-black leading-none tracking-tight text-foreground">
                    USD 14,999
                  </span>
                </div>
                <div className="text-mono mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  por mes · todo incluido
                </div>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />
                <ul className="mt-4 space-y-1.5 text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    <span>Sin costos ocultos por módulo ni por transacción</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    <span>Sin inversión inicial en licencias ni hardware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    <span>Contrato mensual, previsible y escalable</span>
                  </li>
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>
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
          <Kpi icon={CircleDollarSign} target={10} prefix="USD " suffix="M" label="Facturación anual" delay={0} />
          <Kpi icon={Code2} target={160} label="Especialistas técnicos" delay={80} />
          <Kpi icon={Landmark} target={800} suffix="+" label="Instituciones en producción" delay={160} />
          <Kpi icon={History} target={35} suffix="+" label="Años de operación continua" delay={240} />
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
          {questions.map((q, idx) => (
            <Reveal key={q.n} delay={idx * 70}>
            <SpotlightCard
              as="button"
              tilt
              onClick={() => onNavigate(`q${q.n}` as SectionId)}
              className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-2/60 p-5 text-left transition-all hover:border-primary/40 hover:bg-surface-2 hover:shadow-sysde"
            >
              <div className="flex items-start gap-4">
                <div className="text-mono flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-hero text-sm font-bold text-white shadow-sysde transition-transform duration-300 group-hover:scale-105">
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
            </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process + Vendor summary two-column */}
      <section className="grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
        <SpotlightCard className="glass-panel h-full rounded-2xl p-6">
          <SmallHeader icon={CalendarClock}>Datos del proceso</SmallHeader>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <Row k="Institución" v={proc.institucion} />
            <Row k="Tipo" v={proc.tipo} />
            <Row k="Emisión" v={proc.emision} />
            <Row k="Cierre" v={proc.cierre} highlight />
            <Row k="Canal" v={proc.canal} />
            <Row k="Objeto" v={proc.objeto} />
          </dl>
        </SpotlightCard>
        </Reveal>
        <Reveal delay={120}>
        <SpotlightCard className="glass-panel h-full rounded-2xl p-6">
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
                  <div className="text-mono flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-[11px] font-bold text-primary ring-1 ring-primary/40">
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
        </SpotlightCard>
        </Reveal>
      </section>

      {/* Client-side contacts strip */}
      <section>
        <SectionHeader
          kicker="Canal oficial"
          title="Contactos Banco Atlas y EY"
          subtitle="Interlocutores designados para la recepción de este RFI."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {canales.map((c, idx) => (
            <Reveal key={c.email} delay={idx * 80}>
            <SpotlightCard className="glass-panel h-full rounded-2xl p-5">
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
            </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stack tape — marquee */}
      <Reveal>
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-surface-2/60 p-6">
        <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <Layers3 className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} /> Stack de referencia · SAF+
        </div>
        <div className="marquee-mask marquee-pause mt-4">
          <div className="marquee-track gap-2 text-mono text-xs">
            {[...STACK, ...STACK].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
      </Reveal>
    </div>
  );
}

function Kpi({
  icon: Icon,
  target,
  prefix,
  suffix,
  label,
  delay = 0,
}: {
  icon: LucideIcon;
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <SpotlightCard className="glass-panel group relative h-full overflow-hidden rounded-2xl p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/25" />
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-sysde ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
          <Icon className="h-5 w-5" strokeWidth={2.25} />
        </div>
        <div className="text-mono mt-4 font-heading text-3xl font-black text-foreground">
          <CountUp value={target} prefix={prefix} suffix={suffix} />
        </div>
        <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      </SpotlightCard>
    </Reveal>
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
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
        <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
      </span>
      {children}
    </div>
  );
}
