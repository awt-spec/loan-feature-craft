import {
  process as proc,
  vendor,
  canales,
  instrucciones,
  clientes,
  otrasInstituciones,
  condiciones,
} from "@/lib/rfi-content";
import { CalendarClock, Building2, Mail, Phone, ClipboardCheck, Globe2, ScrollText, Users, AtSign, IdCard } from "lucide-react";

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
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-2/60 p-8 md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-grid-sysde mask-radial-fade opacity-30" />
      <div className="relative">
        <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          <Icon className="h-3.5 w-3.5" /> {kicker}
        </div>
        <h1 className="mt-3 font-heading text-3xl font-black tracking-tight md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

export function ProcesoSection() {
  const rows: [string, string][] = [
    ["Institución", proc.institucion],
    ["Tipo de proceso", proc.tipo],
    ["Objeto", proc.objeto],
    ["Fecha de emisión", proc.emision],
    ["Fecha de cierre", proc.cierre],
    ["Canal", proc.canal],
  ];
  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        icon={CalendarClock}
        kicker="Sección 1"
        title="Datos del proceso"
        subtitle="Parámetros formales del RFI publicado por Banco Atlas S.A."
      />
      <div className="glass-panel rounded-2xl p-6 md:p-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          {rows.map(([k, v]) => (
            <div key={k} className="border-b border-white/5 pb-4 last:border-0">
              <dt className="text-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {k}
              </dt>
              <dd className="mt-1.5 font-heading text-lg font-bold text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
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

      <div className="glass-panel rounded-2xl p-6 md:p-8">
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
      </div>
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
        {canales.map((c) => (
          <div key={c.email} className="glass-panel rounded-2xl p-6">
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
          </div>
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
          <li
            key={it.titulo}
            className="glass-panel flex gap-5 rounded-2xl p-5 md:p-6"
          >
            <div className="text-mono flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-hero text-sm font-bold text-white shadow-sysde">
              0{i + 1}
            </div>
            <div>
              <div className="font-heading text-base font-bold">{it.titulo}</div>
              <div className="mt-1 text-sm leading-relaxed text-foreground/85">{it.detalle}</div>
            </div>
          </li>
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
          <li
            key={i}
            className="glass-panel flex items-start gap-4 rounded-xl p-4 text-sm text-foreground/90"
          >
            <span className="text-mono mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-[11px] font-bold text-primary ring-1 ring-white/10">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="leading-relaxed">{c}</span>
          </li>
        ))}
      </ol>
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-[13px] text-amber-100/85">
        Documento confidencial. Uso exclusivo del proceso de evaluación de proveedores de Core
        Bancario de Banco Atlas S.A. Prohibida su reproducción total o parcial sin autorización.
      </div>
    </div>
  );
}
