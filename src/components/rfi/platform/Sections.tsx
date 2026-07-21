import {
  process as proc,
  vendor,
  canales,
  instrucciones,
  condiciones,
  contexto,
} from "@/lib/rfi-content";
import {
  AlertCircle,
  Building2,
  CalendarCheck,
  CalendarClock,
  Check,
  ClipboardCheck,
  FileText,
  Globe2,
  Landmark,
  Mail,
  Phone,
  ScrollText,
  Target,
  Users,
} from "lucide-react";
import { Reveal, SpotlightCard } from "./motion";

function PageHeader({
  kicker,
  title,
  subtitle,
  icon: Icon,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-2/60 p-8 md:p-10">
      <div className="pointer-events-none absolute inset-0 animate-grid-pan bg-grid-sysde mask-radial-fade opacity-30" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-float rounded-full bg-primary/15 blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          <Icon className="h-3.5 w-3.5" /> {kicker}
        </div>
        <h1 className="mt-3 font-heading text-3xl font-black tracking-tight md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </Reveal>
  );
}

export function ProcesoSection() {
  const datos = [
    { icon: Landmark, k: "Institución", v: proc.institucion },
    { icon: FileText, k: "Tipo de proceso", v: proc.tipo },
    { icon: Target, k: "Objeto", v: proc.objeto },
    { icon: CalendarClock, k: "Fecha de emisión", v: proc.emision },
    { icon: CalendarCheck, k: "Fecha de cierre", v: proc.cierre, destacado: true },
    { icon: Mail, k: "Canal", v: proc.canal },
  ];

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        icon={CalendarClock}
        kicker="Secciones 1 · 2"
        title="Contexto y datos del proceso"
        subtitle="Por qué existe este RFI, sus parámetros formales y las etapas del camino hacia el RFP."
      />

      {/* Contexto y objetivo + aviso */}
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Reveal delay={40}>
          <SpotlightCard className="glass-panel h-full rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              <FileText className="h-3.5 w-3.5" /> Contexto y objetivo
            </div>
            <p className="mt-4 font-heading text-lg font-bold leading-relaxed text-foreground md:text-xl">
              {contexto.intro}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80 md:text-[15px]">
              {contexto.proposito}
            </p>
          </SpotlightCard>
        </Reveal>
        <Reveal delay={130}>
          <div className="sheen relative h-full overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-hero p-6 text-white shadow-sysde md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-grid-sysde-light opacity-25" />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -right-6 animate-float-slow font-heading text-[11rem] font-black leading-none text-white/10"
            >
              !
            </div>
            <div className="relative">
              <AlertCircle className="h-8 w-8 animate-glow" />
              <div className="mt-3 text-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">
                Aviso
              </div>
              <p className="mt-2 font-heading text-xl font-bold leading-snug md:text-2xl">
                {contexto.aviso}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Datos formales */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {datos.map((d, i) => (
          <Reveal key={d.k} delay={i * 60}>
            <SpotlightCard
              className={[
                "group h-full rounded-2xl border p-5 transition",
                d.destacado
                  ? "border-primary/50 bg-accent/60 shadow-sysde"
                  : "border-border bg-card shadow-card-soft hover:border-primary/40",
              ].join(" ")}
            >
              <div
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110",
                  d.destacado
                    ? "bg-gradient-hero text-white shadow-sysde ring-white/20"
                    : "bg-primary/10 text-primary ring-primary/20",
                ].join(" ")}
              >
                <d.icon className="h-5 w-5" strokeWidth={2.25} />
              </div>
              <div className="text-mono mt-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {d.k}
              </div>
              <div className={`mt-1 font-heading text-base font-bold leading-snug ${d.destacado ? "text-primary" : "text-foreground"}`}>
                {d.v}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      {/* Línea de tiempo del proceso */}
      <Reveal delay={80}>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft md:p-8">
          <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            <CalendarClock className="h-3.5 w-3.5" /> Etapas del proceso · rumbo al RFP
          </div>

          {/* Desktop: stepper horizontal */}
          <div className="mt-8 hidden md:block">
            <div className="relative">
              <div className="absolute left-[10%] right-[10%] top-[14px] h-px bg-border" />
              <div className="absolute left-[10%] top-[14px] h-px w-[40%] bg-gradient-hero" />
              <div className="relative grid grid-cols-5 gap-3">
                {contexto.etapas.map((e) => (
                  <div key={e.titulo} className="text-center">
                    <TimelineDot estado={e.estado} />
                    <div className="mt-3 font-heading text-sm font-bold leading-tight text-foreground">
                      {e.titulo}
                    </div>
                    <div className="mt-1 text-[11px] leading-snug text-muted-foreground">{e.detalle}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Móvil: rail vertical */}
          <ol className="mt-6 space-y-5 md:hidden">
            {contexto.etapas.map((e, i) => (
              <li key={e.titulo} className="relative flex gap-4 pl-1">
                {i < contexto.etapas.length - 1 && (
                  <span className="absolute left-[17px] top-8 h-full w-px bg-border" aria-hidden />
                )}
                <TimelineDot estado={e.estado} />
                <div className="min-w-0 pb-1">
                  <div className="font-heading text-sm font-bold text-foreground">{e.titulo}</div>
                  <div className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{e.detalle}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </div>
  );
}

function TimelineDot({ estado }: { estado: "done" | "active" | "next" }) {
  if (estado === "done") {
    return (
      <span className="relative z-10 mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sysde">
        <Check className="h-4 w-4" strokeWidth={3} />
      </span>
    );
  }
  if (estado === "active") {
    return (
      <span className="relative z-10 mx-auto flex h-8 w-8 shrink-0 items-center justify-center">
        <span className="map-ping absolute left-1/2 top-1/2 h-8 w-8 rounded-full bg-primary/50" />
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-hero text-white shadow-sysde ring-2 ring-primary/40">
          <CalendarCheck className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </span>
    );
  }
  return (
    <span className="relative z-10 mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-border bg-card text-muted-foreground">
      <span className="h-2 w-2 rounded-full bg-border" />
    </span>
  );
}

export function ProveedorSection() {
  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        icon={Building2}
        kicker="Sección 3"
        title="Proveedor"
        subtitle="Identificación formal de SYSDE Internacional Inc. y su aliado local Inventiva."
      />

      <Reveal delay={60}>
      <SpotlightCard className="glass-panel rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Razón social
            </div>
            <div className="mt-1 font-heading text-2xl font-black">{vendor.razon}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {vendor.pais} · {vendor.anios} en el sector financiero
            </div>
            <a
              href={`https://${vendor.web}`}
              className="text-mono mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-primary"
            >
              <Globe2 className="h-3 w-3" /> {vendor.web}
            </a>
          </div>
          <div className="text-mono flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Aliado local
            </div>
            <div className="font-heading text-sm font-bold">Inventiva · Paraguay</div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6">
          <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Contactos principales
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {vendor.contactos.map((c) => (
              <div key={c.email} className="rounded-2xl border border-white/10 bg-surface-2/60 p-5">
                <div className="flex items-center gap-4">
                  <div className="text-mono flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero text-sm font-bold text-white shadow-sysde">
                    {c.iniciales}
                  </div>
                  <div>
                    <div className="font-heading text-base font-bold">{c.nombre}</div>
                    <div className="text-xs text-muted-foreground">{c.cargo}</div>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5 text-xs">
                  <a
                    href={`mailto:${c.email}`}
                    className="text-mono flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-3 w-3" /> {c.email}
                  </a>
                  <div className="text-mono flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3 w-3" /> {c.tel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SpotlightCard>
      </Reveal>
    </div>
  );
}

export function ContactosSection() {
  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        icon={Users}
        kicker="Sección 4.1"
        title="Canal oficial de recepción"
        subtitle="Interlocutores designados de Banco Atlas y EY para la recepción y consultas del RFI."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {canales.map((c, i) => (
          <Reveal key={c.email} delay={i * 80}>
          <SpotlightCard className="glass-panel h-full rounded-2xl p-6">
            <div className="text-mono flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 font-bold ring-1 ring-white/10">
              {c.iniciales}
            </div>
            <div className="mt-4 font-heading text-lg font-bold">{c.nombre}</div>
            <div className="mt-1 text-xs text-muted-foreground">{c.cargo}</div>
            <a
              href={`mailto:${c.email}`}
              className="text-mono mt-4 inline-flex items-center gap-1.5 text-[11px] text-primary hover:underline"
            >
              <Mail className="h-3 w-3" /> {c.email}
            </a>
          </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function InstruccionesSection() {
  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        icon={ClipboardCheck}
        kicker="Sección 5"
        title="Instrucciones de respuesta"
        subtitle="Criterios formales aplicables a la elaboración y envío de la respuesta."
      />
      <ol className="space-y-4">
        {instrucciones.map((it, i) => (
          <Reveal as="li" key={it.titulo} delay={i * 70}>
          <SpotlightCard className="glass-panel flex gap-5 rounded-2xl p-5 md:p-6">
            <div className="text-mono flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-hero text-sm font-bold text-white shadow-sysde">
              0{i + 1}
            </div>
            <div>
              <div className="font-heading text-base font-bold">{it.titulo}</div>
              <div className="mt-1 text-sm leading-relaxed text-foreground/85">{it.detalle}</div>
            </div>
          </SpotlightCard>
          </Reveal>
        ))}
      </ol>

      <div className="glass-panel rounded-2xl p-6">
        <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Leyenda de badges usados en las respuestas
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Cumplimiento
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-semibold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-500/30">
                Sí
              </span>
              <span className="rounded-full bg-amber-500/10 px-2.5 py-1 font-semibold uppercase tracking-wider text-amber-300 ring-1 ring-amber-500/30">
                Parcial
              </span>
              <span className="rounded-full bg-rose-500/10 px-2.5 py-1 font-semibold uppercase tracking-wider text-rose-300 ring-1 ring-rose-500/30">
                No
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Madurez
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full bg-primary/15 px-2.5 py-1 font-semibold uppercase tracking-wider text-primary-foreground ring-1 ring-primary/40">
                Avanzado
              </span>
              <span className="rounded-full bg-sky-500/10 px-2.5 py-1 font-semibold uppercase tracking-wider text-sky-300 ring-1 ring-sky-500/30">
                Intermedio
              </span>
              <span className="rounded-full bg-slate-500/10 px-2.5 py-1 font-semibold uppercase tracking-wider text-slate-300 ring-1 ring-slate-500/30">
                Básico
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export function CondicionesSection() {
  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        icon={ScrollText}
        kicker="Sección 6"
        title="Condiciones generales"
        subtitle="Términos formales aplicables al presente proceso de RFI."
      />
      <ol className="space-y-3">
        {condiciones.map((c, i) => (
          <Reveal as="li" key={i} delay={i * 45}>
          <div className="glass-panel flex items-start gap-4 rounded-xl p-4 text-sm text-foreground/90 transition-colors hover:border-primary/30">
            <span className="text-mono mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-[11px] font-bold text-primary ring-1 ring-white/10">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="leading-relaxed">{c}</span>
          </div>
          </Reveal>
        ))}
      </ol>
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-[13px] text-amber-100/85">
        Documento confidencial. Uso exclusivo del proceso de evaluación de proveedores de Core
        Bancario de Banco Atlas S.A. Prohibida su reproducción total o parcial sin autorización.
      </div>
    </div>
  );
}
