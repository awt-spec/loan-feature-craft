import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Gauge,
  Settings2,
  Search,
  Workflow,
  BarChart3,
  ChevronDown,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  Lock,
  ListChecks,
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

export function LoanFunctionality() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("procesos");

  const totalItems = areas.reduce(
    (acc, a) => acc + a.blocks.reduce((s, b) => s + b.items.length, 0),
    0,
  );

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center gap-3 rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 py-4 text-left transition hover:border-primary/50 hover:from-primary/15 md:px-6"
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
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.5}
        />
      </button>

      {open && (
        <div className="mt-4 space-y-3 animate-[fade-in_0.35s_ease-out]">
          {areas.map((area) => {
            const Icon = area.icon;
            const isOpen = expanded === area.id;
            return (
              <Reveal key={area.id}>
                <section className="overflow-hidden rounded-2xl border border-border/70 bg-surface-2/60 backdrop-blur">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : area.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-primary/5 md:px-6"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-sysde ring-1 ring-white/15">
                      <Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-sm font-black uppercase tracking-[0.08em] md:text-base">
                        {area.title}
                      </span>
                      <span className="block text-xs leading-snug text-muted-foreground md:text-sm">
                        {area.summary}
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      strokeWidth={2.5}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-border/60 px-4 py-5 md:px-6">
                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {area.blocks.map((b) => (
                          <div
                            key={b.title}
                            className="rounded-xl border border-border/60 bg-background/50 p-4 transition hover:border-primary/40"
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
                    </div>
                  )}
                </section>
              </Reveal>
            );
          })}

          <div className="grid gap-3 pt-1 sm:grid-cols-2 xl:grid-cols-4">
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
        </div>
      )}
    </div>
  );
}
