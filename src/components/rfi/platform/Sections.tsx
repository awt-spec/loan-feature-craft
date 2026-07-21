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
import { Reveal, SpotlightCard, CountUp } from "./motion";
import { Handshake, MessageCircle, ShieldCheck } from "lucide-react";

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

      {/* Identidad SYSDE + aliado Inventiva */}
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Reveal delay={40}>
          <SpotlightCard className="glass-panel h-full rounded-2xl p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-hero shadow-sysde" />
                  <div className="pulse-dot absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-500" />
                </div>
                <div>
                  <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Razón social
                  </div>
                  <div className="font-heading text-2xl font-black">{vendor.razon}</div>
                  <div className="text-sm text-muted-foreground">
                    {vendor.pais} · {vendor.anios} en el sector financiero
                  </div>
                </div>
              </div>
              <a
                href={`https://${vendor.web}`}
                target="_blank"
                rel="noreferrer"
                className="text-mono inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-primary transition hover:bg-primary/10"
              >
                <Globe2 className="h-3.5 w-3.5" /> {vendor.web}
              </a>
            </div>

            {/* KPIs */}
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/5 pt-6 sm:grid-cols-4">
              <VendorKpi value={10} prefix="USD " suffix="M" label="Facturación anual" />
              <VendorKpi value={160} label="Especialistas" />
              <VendorKpi value={800} suffix="+" label="Instituciones" />
              <VendorKpi value={35} suffix="+" label="Años continuos" />
            </div>

            {/* Diferenciales */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary ring-1 ring-primary/30">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% software para el sector financiero
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary ring-1 ring-primary/30">
                <ShieldCheck className="h-3.5 w-3.5" /> Proveedor independiente · sin conflicto de interés
              </span>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={130}>
          <SpotlightCard className="relative h-full overflow-hidden rounded-2xl border border-emerald-500/40 bg-card p-6 shadow-card-soft md:p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                <Handshake className="h-3.5 w-3.5" /> Aliado local · Paraguay
              </div>
              <div className="mt-3 font-heading text-xl font-black">Inventiva</div>
              <a
                href="https://inventiva.net"
                target="_blank"
                rel="noreferrer"
                className="text-mono mt-1 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-emerald-600 hover:underline dark:text-emerald-400"
              >
                <Globe2 className="h-3 w-3" /> inventiva.net
              </a>
              <p className="mt-4 text-[13px] leading-relaxed text-foreground/80">
                Responsable de la presencia en país para la implementación y la atención de primer
                nivel y en sitio, en horario de Asunción y en idioma español. Inventiva aporta la
                cercanía y el conocimiento del mercado local; SYSDE aporta la ingeniería de producto
                y el soporte especializado (N2/N3) desde su estructura regional.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Presencia en país", "N1 y soporte en sitio", "Conexión SIPAP · Bancard"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>

      {/* Contactos principales */}
      <div>
        <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
          <Users className="h-3.5 w-3.5" /> Contactos principales · SYSDE
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {vendor.contactos.map((c, i) => {
            const wa = c.tel.replace(/[^\d]/g, "");
            return (
              <Reveal key={c.email} delay={i * 90}>
                <SpotlightCard className="glass-panel h-full rounded-2xl p-5 md:p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-mono flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-hero text-base font-bold text-white shadow-sysde">
                      {c.iniciales}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-heading text-lg font-bold">{c.nombre}</div>
                      <div className="text-xs text-muted-foreground">{c.cargo}</div>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <a
                      href={`mailto:${c.email}`}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-hero px-3 text-xs font-semibold text-white shadow-sysde transition hover:brightness-110 sm:h-10"
                    >
                      <Mail className="h-3.5 w-3.5" /> Correo
                    </a>
                    <a
                      href={`tel:${c.tel.replace(/\s/g, "")}`}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground transition hover:border-primary/40 hover:text-primary sm:h-10"
                    >
                      <Phone className="h-3.5 w-3.5" /> Llamar
                    </a>
                    <a
                      href={`https://wa.me/${wa}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-500/20 dark:text-emerald-300 sm:h-10"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                  </div>
                  <div className="text-mono mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                    <span>{c.email}</span>
                    <span>{c.tel}</span>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VendorKpi({
  value,
  prefix,
  suffix,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div>
      <div className="text-mono font-heading text-2xl font-black text-gradient-sysde">
        <CountUp value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
    </div>
  );
}

export function ContactosSection() {
  const orgOf = (cargo: string) => (cargo.includes("EY") ? "EY" : "Banco Atlas");
  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        icon={Users}
        kicker="Sección 4.1"
        title="Canal oficial de recepción"
        subtitle="Interlocutores designados de Banco Atlas y EY para la recepción y consultas del RFI."
      />

      {/* Reglas del canal (de las instrucciones del RFI) */}
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal delay={30}>
          <div className="h-full rounded-2xl border-l-4 border-primary bg-accent/60 p-5">
            <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              <Mail className="h-3.5 w-3.5" /> Envío de la información
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              El documento completo debe remitirse en formato editable (Word) al canal definido.
              Fecha límite: <strong className="text-primary">{proc.cierre}</strong>.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="h-full rounded-2xl border-l-4 border-primary bg-accent/60 p-5">
            <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              <MessageCircle className="h-3.5 w-3.5" /> Canal de consultas
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              Toda consulta debe canalizarse por los contactos oficiales. Las consultas y sus
              respuestas podrán compartirse de forma consolidada con todos los participantes.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Interlocutores */}
      <div className="grid gap-5 md:grid-cols-3">
        {canales.map((c, i) => {
          const org = orgOf(c.cargo);
          return (
            <Reveal key={c.email} delay={i * 80}>
              <SpotlightCard className="glass-panel group flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-mono flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 font-bold text-primary ring-1 ring-primary/25 transition-transform duration-300 group-hover:scale-105">
                    {c.iniciales}
                  </div>
                  <span
                    className={[
                      "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1",
                      org === "EY"
                        ? "bg-amber-500/10 text-amber-700 ring-amber-500/30 dark:text-amber-300"
                        : "bg-primary/10 text-primary ring-primary/30",
                    ].join(" ")}
                  >
                    {org}
                  </span>
                </div>
                <div className="mt-4 font-heading text-lg font-bold">{c.nombre}</div>
                <div className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{c.cargo}</div>
                <a
                  href={`mailto:${c.email}`}
                  className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-hero px-4 text-xs font-semibold text-white shadow-sysde transition hover:brightness-110 sm:h-10"
                >
                  <Mail className="h-3.5 w-3.5" /> Escribir correo
                </a>
                <div className="text-mono mt-2 truncate text-center text-[11px] text-muted-foreground">
                  {c.email}
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
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
