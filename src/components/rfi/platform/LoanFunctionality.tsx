import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Gauge,
  Settings2,
  Search,
  Workflow,
  BarChart3,
  ChevronRight,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  Lock,
  ListChecks,
  ArrowLeft,
  Layers,
} from "lucide-react";
import { Reveal } from "./motion";

type Block = { title: string; items: string[] };
type Area = {
  id: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  blocks: Block[];
};

const areas: Area[] = [
  {
    id: "dashboard",
    icon: Gauge,
    title: "Dashboard Vista 360",
    summary: "Vista integral de indicadores y situación del portafolio de créditos.",
    blocks: [
      {
        title: "Indicadores",
        items: [
          "Situación del portafolio de créditos",
          "Indicadores de cartera en tiempo real",
          "Vista integral por producto y segmento",
        ],
      },
    ],
  },
  {
    id: "reglas",
    icon: Settings2,
    title: "Reglas de negocio",
    summary: "Parametrización completa del ciclo de crédito sin desarrollo a medida.",
    blocks: [
      {
        title: "General",
        items: [
          "Niveles de aprobación",
          "Planes de inversión",
          "Tipos de plazo",
          "Cantidad de pago sostenido",
          "Requisitos",
          "Tipos de crédito",
          "Tipos de crédito / Datos generales",
          "Tipos de crédito / Intereses",
          "Tipos de crédito / Indicadores",
          "Tipos de crédito / Requisitos",
          "Tipos de crédito / Garantías",
          "Tipos de crédito / Agencias",
        ],
      },
      {
        title: "Rubros",
        items: [
          "Rubros generales",
          "Prioridad de rubro",
          "Por tipo de crédito",
          "Por crédito",
          "Prioridad por crédito",
          "Prioridad por tipo de crédito",
          "Contabilización rubro por estado",
        ],
      },
      { title: "Cuentas", items: ["Saldo a favor"] },
      {
        title: "Específica",
        items: [
          "Tipo de producto",
          "Tipos de cartera",
          "Tasas incumplimiento de tipo cartera por riesgo CONASSIF",
          "Tipo de sector prioritario SBD",
          "Tipos programa autorizado SBD",
        ],
      },
      {
        title: "Catálogo de catálogos",
        items: ["Catálogos maestros para controles regulatorios o normativos"],
      },
    ],
  },
  {
    id: "consultas",
    icon: Search,
    title: "Consultas",
    summary: "Trazabilidad total del crédito, la línea y sus movimientos.",
    blocks: [
      { title: "Créditos", items: ["Detalle de créditos", "Carátula", "Amortizaciones"] },
      {
        title: "Créditos específicos",
        items: ["Detalle de créditos", "Carátula", "Amortizaciones"],
      },
      {
        title: "Líneas de crédito individuales",
        items: [
          "Detalle de líneas de crédito",
          "Carátula",
          "Amortizaciones",
          "Detalle de créditos relacionados",
          "Saldo congelado",
          "Límite temporal",
        ],
      },
      {
        title: "Otras consultas",
        items: [
          "Movimientos del crédito (movimientos y detalle)",
          "Cuentas referenciadas (consulta y detalle de información)",
          "Movimientos saldo a favor",
          "Recibos por crédito",
        ],
      },
    ],
  },
  {
    id: "procesos",
    icon: Workflow,
    title: "Procesos",
    summary: "Del alta y aprobación hasta cobro judicial, con cierres diarios seguros.",
    blocks: [
      {
        title: "Apertura y aprobación",
        items: [
          "Línea de crédito individual — Apertura",
          "Apertura de crédito: datos generales, generales, desembolso",
          "Personas relacionadas, saldos teóricos y saldos reales",
          "Aprobación requisitos crédito (consulta y selección de requisitos)",
          "Aprobación créditos individual (líneas o créditos)",
          "Cambio de estado: aprobado, rechazado, anulado",
          "Asociación de garantías: líquidas, prendarias, hipotecarias, avales",
        ],
      },
      {
        title: "Desembolsos",
        items: ["Individual", "Parciales", "Grupales"],
      },
      {
        title: "Abonos",
        items: [
          "Individual ordinario / anticipado / vencido / extraordinario",
          "Individual adelanto de capital y pagos parciales",
          "Grupal ordinario / anticipado / vencido / extraordinario",
          "Grupal pagos parciales",
          "Por depósito bancario (fecha valor)",
          "Por depósitos por identificar (fecha valor)",
          "Por cuenta contable / saldos a favor (fecha valor)",
          "Liquidación depósitos por identificar",
        ],
      },
      {
        title: "Otros procesos",
        items: [
          "Cargos y generación de cargos manuales",
          "Cancelación anticipada individual y grupal",
          "Revisión de tasas: interés moratorio y corriente",
          "Cierre diario con subprocesos y punto de reinicio seguro",
          "Pase a históricos",
          "Crédito a cobro judicial",
          "Calificación de créditos: traslados vigente/vencido y pago sostenido",
          "Posposición de cuotas, fecha de exigibilidad y skip payment",
          "Envío a incobrables",
          "Renovación y reestructura",
          "Reversión de revisión de tasas",
          "Modificación condiciones líneas de crédito",
          "Consulta cancelación crédito",
        ],
      },
      {
        title: "Funcionalidad interna — tipos de cuota",
        items: ["Nivelado", "Principal nivelado", "Plan libre", "Nómina", "Un solo pago", "Al vencimiento", "Global"],
      },
    ],
  },
  {
    id: "reportes",
    icon: BarChart3,
    title: "Reportes",
    summary: "Salidas contables y operativas listas para conciliación y control.",
    blocks: [
      { title: "Créditos", items: ["Recibo de desembolso"] },
      {
        title: "Operación diaria",
        items: [
          "Saldos diarios",
          "Cálculo de intereses",
          "Cálculo de moratorios",
          "Aplicaciones pagos por cuenta contable",
          "Aplicación de pagos por depósitos",
        ],
      },
    ],
  },
];

const pillars = [
  { icon: ShieldCheck, title: "Cobertura integral", text: "de todo el ciclo de vida del crédito." },
  { icon: SlidersHorizontal, title: "Flexibilidad y control", text: "mediante reglas de negocio parametrizables." },
  { icon: TrendingUp, title: "Información oportuna", text: "para una mejor toma de decisiones." },
  { icon: Lock, title: "Cumplimiento normativo", text: "y controles regulatorios integrados." },
];

const totalItems = areas.reduce(
  (acc, a) => acc + a.blocks.reduce((s, b) => s + b.items.length, 0),
  0,
);

function orbit(index: number, total: number, radius: number) {
  const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}

/* ------------------------------------------------------------------ *
 * Entry button — swaps the ecosystem view for the loans diagram.
 * ------------------------------------------------------------------ */
export function LoanEntryButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group mt-6 flex w-full items-center gap-3 rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 py-4 text-left transition hover:border-primary/50 hover:from-primary/15 md:px-6"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-sysde">
        <ListChecks className="h-5 w-5 text-white" strokeWidth={2.25} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-heading text-base font-black tracking-tight md:text-lg">
          Ver funcionalidad completa de Préstamos y Créditos
        </span>
        <span className="text-mono block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {areas.length} áreas · {totalItems} funcionalidades documentadas
        </span>
      </span>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-hero text-white shadow-sysde transition group-hover:scale-105">
        <ChevronRight className="h-5 w-5 text-white" strokeWidth={2.5} />
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * Loans diagram — radial map of the 5 functional areas.
 * ------------------------------------------------------------------ */
export function LoanDiagram({ onBack }: { onBack: () => void }) {
  const [areaId, setAreaId] = useState<string | null>(null);
  const [blockTitle, setBlockTitle] = useState<string | null>(null);

  const area = areas.find((a) => a.id === areaId) ?? null;
  const AreaIcon = area?.icon;
  const block = area?.blocks.find((b) => b.title === blockTitle) ?? null;

  const radius = 235;
  const subRadius = 175;

  const nodes = area
    ? area.blocks.map((b) => ({ key: b.title, label: b.title, meta: `${b.items.length}` }))
    : areas.map((a) => ({ key: a.id, label: a.title, meta: `${a.blocks.reduce((s, b) => s + b.items.length, 0)}` }));

  return (
    <section>
      <div className="flex flex-col gap-2">
        <div className="text-mono inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-primary">
          <Layers className="h-3.5 w-3.5" strokeWidth={2.25} />
          Módulo de préstamos · mapa funcional
        </div>
        <h2 className="font-heading text-2xl font-black tracking-tight md:text-3xl">
          Funcionalidad completa de <span className="text-shimmer">Préstamos y Créditos</span>
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {area
            ? `${area.summary} Toca un grupo para ver su detalle.`
            : `${areas.length} áreas y ${totalItems} funcionalidades documentadas. Toca un área para desplegar sus grupos.`}
        </p>
      </div>

      <Reveal>
        <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-surface-2/60 px-2 py-6 md:px-8 md:py-10">
          <div className="pointer-events-none absolute inset-0 bg-grid-sysde mask-radial-fade opacity-30" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative flex items-center justify-center">
            <div className="origin-center scale-[0.52] sm:scale-[0.7] md:scale-90 lg:scale-100">
              <div
                key={areaId ?? "root"}
                className="relative animate-[fade-in_0.4s_ease-out]"
                style={{ width: radius * 2 + 140, height: radius * 2 + 120 }}
              >
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/25"
                  style={{ width: (area ? subRadius : radius) * 2, height: (area ? subRadius : radius) * 2 }}
                />
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
                  style={{ width: radius * 1.3, height: radius * 1.3 }}
                />

                {/* Core */}
                <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-36 w-36 flex-col items-center justify-center gap-1 rounded-full bg-gradient-hero px-4 text-center text-white shadow-sysde ring-1 ring-white/20">
                    {AreaIcon ? (
                      <AreaIcon className="h-7 w-7 text-white" strokeWidth={2.25} />
                    ) : (
                      <ListChecks className="h-7 w-7 text-white" strokeWidth={2.25} />
                    )}
                    <span className="font-heading text-sm font-black leading-tight text-white">
                      {area ? area.title : "PRÉSTAMOS"}
                    </span>
                    <span className="text-mono text-[9px] uppercase tracking-[0.2em] text-white/80">
                      {area ? `${area.blocks.length} grupos` : `${totalItems} func.`}
                    </span>
                  </div>
                </div>

                {nodes.map((n, i) => {
                  const p = orbit(i, nodes.length, area ? subRadius : radius);
                  const active = area ? blockTitle === n.key : false;
                  const Icon = area ? Layers : areas[i].icon;
                  return (
                    <button
                      key={n.key}
                      type="button"
                      onClick={() => (area ? setBlockTitle(active ? null : n.key) : (setAreaId(n.key), setBlockTitle(null)))}
                      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)` }}
                    >
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-full shadow-sysde ring-1 transition-transform duration-300 group-hover:scale-110 ${
                          area && !active
                            ? "border border-primary/30 bg-surface-2 text-primary shadow-sm ring-transparent"
                            : "bg-gradient-hero text-white ring-white/15"
                        }`}
                      >
                        <Icon
                          className={`h-7 w-7 ${area && !active ? "" : "text-white"}`}
                          strokeWidth={2.25}
                        />
                      </div>
                      <div className="absolute left-1/2 top-full mt-2 w-40 -translate-x-1/2">
                        <span className="inline-block rounded-full border border-white/10 bg-surface-2/90 px-2 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                          {n.label}
                        </span>
                        <span className="text-mono mt-1 block text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          {n.meta} ítems
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative mt-2 flex flex-wrap justify-center gap-3">
            {area ? (
              <button
                type="button"
                onClick={() => {
                  setAreaId(null);
                  setBlockTitle(null);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-surface-2 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2.5} /> Todas las áreas
              </button>
            ) : null}
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-hero px-4 py-2 text-sm font-semibold text-white shadow-sysde transition hover:opacity-90"
            >
              <ArrowLeft className="h-4 w-4 text-white" strokeWidth={2.5} /> Volver al ecosistema SAF+
            </button>
          </div>
        </div>
      </Reveal>

      {area && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {(block ? [block] : area.blocks).map((b) => (
            <div
              key={b.title}
              className="rounded-xl border border-border/60 bg-surface-2/60 p-4 transition hover:border-primary/40"
            >
              <div className="text-mono mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                {b.title}
              </div>
              <ul className="space-y-1.5">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-2 text-[13px] leading-snug text-muted-foreground">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="flex items-start gap-3 rounded-2xl border border-border/70 bg-surface-2/60 p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/25">
                <Icon className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <p className="text-[13px] leading-snug text-muted-foreground">
                <span className="font-semibold text-foreground">{p.title}</span> {p.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
