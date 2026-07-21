import { useEffect, useMemo, useRef, useState } from "react";
import { sla } from "@/lib/rfi-content";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  Banknote,
  BookOpenCheck,
  Building2,
  Calculator,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Container,
  CreditCard,
  Database,
  Factory,
  Globe2,
  Headset,
  History,
  Landmark,
  MonitorSmartphone,
  MousePointerClick,
  Network,
  Pause,
  Play,
  RotateCcw,
  Server,
  ShieldCheck,
  Users,
  Waypoints,
  Wrench,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 * Tipos del motor de diagramas
 * ------------------------------------------------------------------ */
type Tone = "core" | "ally" | "ext" | "plain";

interface DiagNode {
  id: string;
  label: string;
  sub?: string;
  icon: LucideIcon;
  x: number; // 0-100
  y: number; // 0-100
  tone?: Tone;
}

interface DiagEdge {
  from: string;
  to: string;
  dashed?: boolean;
}

interface DiagStep {
  title: string;
  detail: string;
  nodes: string[];
}

interface Diagram {
  title: string;
  hint: string;
  height: string; // tailwind height class del lienzo
  nodes: DiagNode[];
  edges: DiagEdge[];
  steps: DiagStep[];
}

/* ------------------------------------------------------------------ *
 * Configuración por pregunta (contenido fiel a rfi-content.ts)
 * ------------------------------------------------------------------ */
const DIAGRAMS: Record<number, Diagram> = {
  1: {
    title: "Dimensión del proveedor",
    hint: "La escala de SYSDE alrededor de la relación con Banco Atlas.",
    height: "h-[340px] sm:h-[360px]",
    nodes: [
      { id: "sysde", label: "SYSDE · SAF+", sub: "casa de software 100% financiera", icon: Landmark, x: 50, y: 46, tone: "core" },
      { id: "fact", label: "USD 10M", sub: "facturación anual", icon: CircleDollarSign, x: 15, y: 16 },
      { id: "equipo", label: "160 especialistas", sub: "fábricas CR · PE · CO · SV + SVA", icon: Users, x: 85, y: 16 },
      { id: "clientes", label: "800+ instituciones", sub: "en producción · LatAm y África Occ.", icon: Building2, x: 15, y: 80 },
      { id: "anios", label: "35+ años", sub: "operación ininterrumpida", icon: History, x: 85, y: 80 },
    ],
    edges: [
      { from: "sysde", to: "fact" },
      { from: "sysde", to: "equipo" },
      { from: "sysde", to: "clientes" },
      { from: "sysde", to: "anios" },
    ],
    steps: [
      { title: "Especialización exclusiva", detail: "SYSDE desarrolla únicamente plataformas para el sector financiero: toda la inversión de I+D se concentra en este dominio.", nodes: ["sysde"] },
      { title: "Facturación anual", detail: "USD 10 millones anuales aproximados, con ingresos recurrentes de mantenimiento y servicios.", nodes: ["sysde", "fact"] },
      { title: "Equipo técnico dedicado", detail: "160 profesionales entre las fábricas de Costa Rica, Perú, Colombia y El Salvador y las unidades SVA de la región.", nodes: ["sysde", "equipo"] },
      { title: "Base instalada", detail: "Más de 800 instituciones financieras con la solución en producción en América Latina y África Occidental.", nodes: ["sysde", "clientes"] },
      { title: "Continuidad de largo plazo", detail: "35+ años de operación sustentan acompañar a Banco Atlas durante todo el ciclo de vida de un core (7–10 años). Proveedor independiente: sin conflicto de interés con el negocio del banco.", nodes: ["sysde", "anios"] },
    ],
  },

  2: {
    title: "Arquitectura del stack SAF+",
    hint: "Sigue el recorrido de una petición por todas las capas.",
    height: "h-[420px] sm:h-[440px]",
    nodes: [
      { id: "canal", label: "Angular 21", sub: "canales web responsivos", icon: MonitorSmartphone, x: 50, y: 8 },
      { id: "gw", label: "API Gateway", sub: "REST · OpenAPI · JWT/MFA", icon: Network, x: 50, y: 29, tone: "core" },
      { id: "core", label: "Microservicios C# · .NET 10 LTS", sub: "runtime único · sin Java", icon: Server, x: 50, y: 52, tone: "core" },
      { id: "grpc", label: "gRPC", sub: "interno · baja latencia", icon: Zap, x: 14, y: 52 },
      { id: "mq", label: "RabbitMQ 4 · Consul", sub: "eventos · descubrimiento", icon: Waypoints, x: 86, y: 52 },
      { id: "db", label: "SQL Server 2022", sub: "TDE AES-256 en reposo", icon: Database, x: 30, y: 76 },
      { id: "redis", label: "Redis 7", sub: "caché en memoria", icon: Zap, x: 70, y: 76 },
      { id: "infra", label: "Docker · Azure · TLS 1.3", sub: "on-prem, nube o híbrido · ISO 27001", icon: Container, x: 50, y: 93, tone: "ext" },
    ],
    edges: [
      { from: "canal", to: "gw" },
      { from: "gw", to: "core" },
      { from: "core", to: "grpc", dashed: true },
      { from: "core", to: "mq", dashed: true },
      { from: "core", to: "db" },
      { from: "core", to: "redis" },
      { from: "db", to: "infra", dashed: true },
      { from: "redis", to: "infra", dashed: true },
    ],
    steps: [
      { title: "El canal origina la petición", detail: "Interfaz web responsiva en Angular 21 con HTML5 y CSS3.", nodes: ["canal"] },
      { title: "API-First en la puerta", detail: "El API Gateway valida JWT/MFA (integrable con Entra ID) y publica servicios REST documentados con Swagger/OpenAPI.", nodes: ["canal", "gw"] },
      { title: "El dominio procesa en .NET 10", detail: "Microservicios C# sobre .NET 10 LTS, runtime único en toda la plataforma; sin dependencia de Java en ninguna capa.", nodes: ["gw", "core"] },
      { title: "Comunicación interna", detail: "gRPC para llamadas de baja latencia entre microservicios; RabbitMQ 4 como broker asincrónico y Consul para descubrimiento.", nodes: ["core", "grpc", "mq"] },
      { title: "Persistencia cifrada", detail: "SQL Server 2022 con TDE AES-256 en reposo y caché en memoria con Redis 7.", nodes: ["core", "db", "redis"] },
      { title: "Contenedores en cualquier nube", detail: "100% de los servicios en Docker, portables a Kubernetes sin rediseño. On-premise, Azure o híbrido; TLS 1.3 en tránsito, alineado a ISO/IEC 27001.", nodes: ["db", "redis", "infra"] },
    ],
  },

  3: {
    title: "Integración SIPAP / Bancard · API-First",
    hint: "Simula una transferencia: el núcleo nunca se toca.",
    height: "h-[340px] sm:h-[360px]",
    nodes: [
      { id: "core", label: "SAF+ Core", sub: "el núcleo nunca se recompila", icon: Landmark, x: 11, y: 50, tone: "core" },
      { id: "gw", label: "API Gateway", sub: "capa de integración · API-First", icon: Network, x: 36, y: 50, tone: "core" },
      { id: "cs", label: "Conector SIPAP", sub: "Inventiva · despliegue propio", icon: ArrowLeftRight, x: 63, y: 24, tone: "ally" },
      { id: "cb", label: "Conector Bancard", sub: "Inventiva · certificación local", icon: CreditCard, x: 63, y: 76, tone: "ally" },
      { id: "sipap", label: "SIPAP / SNP", sub: "LBTR · ACH", icon: Banknote, x: 89, y: 24, tone: "ext" },
      { id: "bancard", label: "Bancard", sub: "switch de pagos", icon: CreditCard, x: 89, y: 76, tone: "ext" },
    ],
    edges: [
      { from: "core", to: "gw" },
      { from: "gw", to: "cs" },
      { from: "gw", to: "cb" },
      { from: "cs", to: "sipap" },
      { from: "cb", to: "bancard" },
    ],
    steps: [
      { title: "Nace la orden de pago", detail: "La operación se origina en SAF+. Bajo el principio API-First las integraciones viven fuera del núcleo.", nodes: ["core"] },
      { title: "Capa de integración", detail: "El API Gateway + Integrador de Aplicaciones Empresariales publica el servicio; cada conector tiene su propio ciclo de despliegue.", nodes: ["core", "gw"] },
      { title: "Riel local probado · SIPAP", detail: "Inventiva cuenta con conexión operativa a SIPAP/SNP (ACH/LBTR) y conoce sus procesos de certificación.", nodes: ["gw", "cs", "sipap"] },
      { title: "Riel local probado · Bancard", detail: "La conexión a Bancard también es operativa hoy, del lado de Inventiva.", nodes: ["gw", "cb", "bancard"] },
      { title: "Cambio de especificación", detail: "Se atiende en el conector correspondiente, sin recompilar ni intervenir el core.", nodes: ["cs", "cb"] },
      { title: "Por qué «Parcial»", detail: "Las dos mitades están probadas por separado; su despliegue conjunto se dimensiona, ejecuta y certifica dentro del proyecto, con plan definido en la etapa de RFP.", nodes: ["core", "gw", "cs", "cb", "sipap", "bancard"] },
    ],
  },

  4: {
    title: "Motor contable centralizado",
    hint: "Todo movimiento termina en un único libro mayor — por parametrización.",
    height: "h-[360px] sm:h-[380px]",
    nodes: [
      { id: "tarj", label: "Tarjetas y medios de pago", icon: CreditCard, x: 13, y: 12 },
      { id: "canales", label: "Canales digitales", icon: MonitorSmartphone, x: 13, y: 37 },
      { id: "teso", label: "Tesorería", icon: Banknote, x: 13, y: 62 },
      { id: "leg", label: "Sistemas propios / legados", sub: "si el banco los conserva", icon: Server, x: 13, y: 87, tone: "ext" },
      { id: "motor", label: "Motor de parametrización", sub: "reglas por producto · canal · movimiento", icon: Calculator, x: 48, y: 50, tone: "core" },
      { id: "asiento", label: "Asiento automático", icon: BookOpenCheck, x: 73, y: 50 },
      { id: "libro", label: "Libro mayor único", sub: "trazabilidad end-to-end", icon: Landmark, x: 91, y: 50, tone: "core" },
    ],
    edges: [
      { from: "tarj", to: "motor" },
      { from: "canales", to: "motor" },
      { from: "teso", to: "motor" },
      { from: "leg", to: "motor", dashed: true },
      { from: "motor", to: "asiento" },
      { from: "asiento", to: "libro" },
    ],
    steps: [
      { title: "Movimientos en toda la operación", detail: "Tarjetas, canales digitales y tesorería generan movimientos de forma continua sobre los módulos nativos de SAF+.", nodes: ["tarj", "canales", "teso"] },
      { title: "También los sistemas que se conservan", detail: "Si el banco mantiene sistemas propios, legados o de terceros, SAF+ centraliza sus movimientos por el mismo mecanismo — sin sistema adicional ni middleware.", nodes: ["leg", "motor"] },
      { title: "Parametrización, no desarrollo", detail: "Reglas contables parametrizables por producto, canal y tipo de movimiento definen cómo se contabiliza cada operación.", nodes: ["tarj", "canales", "teso", "leg", "motor"] },
      { title: "Asiento generado automáticamente", detail: "El módulo de Cuentas y Tesorería genera los asientos de forma interna y automática desde cada dominio funcional.", nodes: ["motor", "asiento"] },
      { title: "Un solo libro contable", detail: "El libro mayor único del banco, con trazabilidad end-to-end del movimiento al asiento contable.", nodes: ["asiento", "libro"] },
    ],
  },

  5: {
    title: "Escalamiento N1 → N3",
    hint: "Recorre el viaje de una incidencia; cambia la severidad para ver el SLA.",
    height: "h-[300px] sm:h-[320px]",
    nodes: [
      { id: "banco", label: "Banco Atlas", sub: "reporta la incidencia", icon: Building2, x: 9, y: 34, tone: "ext" },
      { id: "n1", label: "N1 · Inventiva", sub: "mesa local en Asunción · español", icon: Headset, x: 30, y: 34, tone: "ally" },
      { id: "n2s", label: "N2 en sitio · Inventiva", sub: "parametrización · presencial", icon: Wrench, x: 51, y: 34, tone: "ally" },
      { id: "n2e", label: "N2 especializado · SVA", sub: "bitácoras · BD · terceros", icon: ShieldCheck, x: 72, y: 34, tone: "core" },
      { id: "n3", label: "N3 · Fábricas SYSDE", sub: "parches y versiones", icon: Factory, x: 91, y: 34, tone: "core" },
      { id: "comite", label: "Comité ejecutivo", sub: "SYSDE + Inventiva · S1 sostenida", icon: Users, x: 51, y: 82 },
    ],
    edges: [
      { from: "banco", to: "n1" },
      { from: "n1", to: "n2s" },
      { from: "n2s", to: "n2e" },
      { from: "n2e", to: "n3" },
      { from: "n2e", to: "comite", dashed: true },
    ],
    steps: [
      { title: "Incidencia reportada", detail: "Punto único de contacto en horario de Asunción y 100% en español — no un modelo remoto desde otro país.", nodes: ["banco", "n1"] },
      { title: "N1 en país", detail: "Recepción, registro y clasificación por severidad; consultas funcionales, soporte en sitio y resolución de incidencias conocidas.", nodes: ["n1"] },
      { title: "N2 presencial · Inventiva", detail: "Primer análisis funcional y acompañamiento presencial: parametrización de primer nivel y coordinación local.", nodes: ["n1", "n2s"] },
      { title: "N2 especializado · SVA regional", detail: "Diagnóstico con bitácoras y base de datos, resolución por configuración avanzada y coordinación con terceros (SIPAP/SNP, Bancard).", nodes: ["n2s", "n2e"] },
      { title: "N3 solo defecto de producto", detail: "Las fábricas corrigen código y liberan parches. Reciben únicamente lo que N2 especializado acredita como defecto de producto.", nodes: ["n2e", "n3"] },
      { title: "Escalamiento ejecutivo", detail: "Comité de servicio conjunto SYSDE + Inventiva con participación de la dirección ante severidad crítica sostenida.", nodes: ["n2e", "comite"] },
    ],
  },

  6: {
    title: "Red de clientes prioritarios",
    hint: "Cinco instituciones divulgables alrededor de SAF+.",
    height: "h-[340px] sm:h-[360px]",
    nodes: [
      { id: "saf", label: "SAF+ · SYSDE", sub: "referencias verificables", icon: Landmark, x: 50, y: 50, tone: "core" },
      { id: "b1", label: "Broxel", sub: "Fintech / medios de pago · México", icon: CreditCard, x: 16, y: 16 },
      { id: "b2", label: "Banco Santa Cruz", sub: "Banco múltiple · Rep. Dominicana", icon: Building2, x: 84, y: 16 },
      { id: "b3", label: "Banco Adopem", sub: "Microfinanzas · Rep. Dominicana", icon: Users, x: 13, y: 80 },
      { id: "b4", label: "Credicomer", sub: "Ahorro y crédito · El Salvador", icon: Banknote, x: 50, y: 91 },
      { id: "b5", label: "Unicomer", sub: "Retail y consumo · El Salvador", icon: Globe2, x: 87, y: 80 },
    ],
    edges: [
      { from: "saf", to: "b1" },
      { from: "saf", to: "b2" },
      { from: "saf", to: "b3" },
      { from: "saf", to: "b4" },
      { from: "saf", to: "b5" },
    ],
    steps: [
      { title: "Broxel · México", detail: "Fintech y medios de pago operando sobre la plataforma SYSDE.", nodes: ["saf", "b1"] },
      { title: "Banco Santa Cruz · RD", detail: "Banco múltiple de República Dominicana.", nodes: ["saf", "b2"] },
      { title: "Banco Adopem · RD", detail: "Banco de ahorro y crédito enfocado en microfinanzas.", nodes: ["saf", "b3"] },
      { title: "Credicomer · El Salvador", detail: "Sociedad de ahorro y crédito.", nodes: ["saf", "b4"] },
      { title: "Unicomer · El Salvador", detail: "Grupo regional de retail y financiamiento al consumo. Además: Factor & Valor (Colombia) y ABCDIN (Chile).", nodes: ["saf", "b5"] },
      { title: "Verificación directa", detail: "SYSDE coordina llamadas o sesiones con las contrapartes de Banco Atlas y EY en la etapa de RFP.", nodes: ["saf", "b1", "b2", "b3", "b4", "b5"] },
    ],
  },
};

/* ------------------------------------------------------------------ *
 * Estilos por tono
 * ------------------------------------------------------------------ */
const toneBox: Record<Tone, { on: string; off: string; icon: string; iconOn: string }> = {
  core: {
    on: "bg-gradient-hero text-white shadow-sysde ring-2 ring-primary/60",
    off: "bg-card text-foreground border border-primary/40",
    icon: "bg-primary/10 text-primary",
    iconOn: "bg-white/15 text-white",
  },
  ally: {
    on: "bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400/60",
    off: "bg-card text-foreground border border-emerald-500/40",
    icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    iconOn: "bg-white/15 text-white",
  },
  ext: {
    on: "bg-slate-700 text-white shadow-lg ring-2 ring-slate-400/60",
    off: "bg-card text-foreground border border-border",
    icon: "bg-muted text-muted-foreground",
    iconOn: "bg-white/15 text-white",
  },
  plain: {
    on: "bg-gradient-hero text-white shadow-sysde ring-2 ring-primary/60",
    off: "bg-card text-foreground border border-border",
    icon: "bg-primary/10 text-primary",
    iconOn: "bg-white/15 text-white",
  },
};

const STEP_MS = 3000;

/* ------------------------------------------------------------------ *
 * Componente principal
 * ------------------------------------------------------------------ */
export function AnswerDemo({ n }: { n: number }) {
  const diagram = DIAGRAMS[n];
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [sev, setSev] = useState("S1");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeNodes = useMemo(() => {
    if (!diagram) return new Set<string>();
    if (picked) return new Set([picked]);
    if (step < 0) return null; // estado inicial: nada atenuado
    return new Set(diagram.steps[step]?.nodes ?? []);
  }, [diagram, step, picked]);

  useEffect(() => {
    if (!playing || !diagram) return;
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s + 1 >= diagram.steps.length) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, diagram]);

  if (!diagram) return null;

  const nodeById = Object.fromEntries(diagram.nodes.map((nd) => [nd.id, nd]));
  const current = step >= 0 ? diagram.steps[step] : null;
  const pickedNode = picked ? nodeById[picked] : null;
  const slaRow = sla.find((r) => r.sev === sev)!;

  const play = () => {
    setPicked(null);
    if (step >= diagram.steps.length - 1) setStep(0);
    else if (step < 0) setStep(0);
    setPlaying((p) => !p);
  };
  const jump = (delta: number) => {
    setPicked(null);
    setPlaying(false);
    setStep((s) => Math.min(diagram.steps.length - 1, Math.max(0, (s < 0 ? -1 : s) + delta)));
  };
  const reset = () => {
    setPicked(null);
    setPlaying(false);
    setStep(-1);
  };

  return (
    <div>
      {/* Header + controles */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            <MousePointerClick className="h-3.5 w-3.5" />
            Demo interactiva · {diagram.title}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{diagram.hint}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => jump(-1)}
            disabled={step <= 0}
            aria-label="Paso anterior"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:border-primary/40 hover:text-primary disabled:opacity-35"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={play}
            className="sheen inline-flex h-8 items-center gap-1.5 rounded-lg bg-gradient-hero px-3.5 text-xs font-semibold text-white shadow-sysde transition hover:brightness-110"
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? "Pausar" : step >= 0 ? "Continuar" : "Reproducir"}
          </button>
          <button
            onClick={() => jump(1)}
            disabled={step >= diagram.steps.length - 1}
            aria-label="Paso siguiente"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:border-primary/40 hover:text-primary disabled:opacity-35"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          {step >= 0 && (
            <button
              onClick={reset}
              aria-label="Reiniciar demo"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Selector de severidad (solo Q5) */}
      {n === 5 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-2.5">
          <div className="text-mono px-1 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Severidad</div>
          {sla.map((r) => (
            <button
              key={r.sev}
              onClick={() => setSev(r.sev)}
              className={[
                "text-mono rounded-lg px-2.5 py-1 text-[11px] font-bold transition",
                sev === r.sev
                  ? "bg-gradient-hero text-white shadow-sysde"
                  : "border border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-primary",
              ].join(" ")}
            >
              {r.sev}
            </button>
          ))}
          <div className="text-mono ml-auto flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[10px] text-foreground/80">
            <span><span className="text-muted-foreground">Respuesta</span> <strong className="text-primary">{slaRow.respuesta}</strong></span>
            <span><span className="text-muted-foreground">Solución</span> <strong className="text-primary">{slaRow.solucion}</strong></span>
            <span><span className="text-muted-foreground">Cobertura</span> <strong className="text-primary">{slaRow.cobertura}</strong></span>
          </div>
        </div>
      )}

      {/* Lienzo del diagrama */}
      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-background/60">
        <div className={`relative min-w-[620px] ${diagram.height}`}>
          {/* Fondo grid */}
          <div className="pointer-events-none absolute inset-0 bg-grid-sysde opacity-25 mask-radial-fade" />

          {/* Conexiones */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {diagram.edges.map((e) => {
              const a = nodeById[e.from];
              const b = nodeById[e.to];
              const isActive =
                activeNodes !== null && activeNodes.has(e.from) && activeNodes.has(e.to);
              const midX = (a.x + b.x) / 2;
              const d = `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
              return (
                <g key={`${e.from}-${e.to}`}>
                  <path
                    d={d}
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    stroke={isActive ? "hsl(352 85% 50%)" : "hsl(352 40% 50% / 0.25)"}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    strokeLinecap="round"
                    strokeDasharray={e.dashed || isActive ? "6 6" : undefined}
                    className={isActive ? "arc-flow" : undefined}
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodos */}
          {diagram.nodes.map((nd) => {
            const tone = toneBox[nd.tone ?? "plain"];
            const isOn = activeNodes !== null && activeNodes.has(nd.id);
            const dimmed = activeNodes !== null && !isOn;
            const Icon = nd.icon;
            return (
              <button
                key={nd.id}
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setPicked((p) => (p === nd.id ? null : nd.id));
                }}
                className={[
                  "absolute z-10 w-[132px] -translate-x-1/2 -translate-y-1/2 rounded-xl p-2 text-left shadow-card-soft transition-all duration-300 sm:w-[148px] sm:p-2.5",
                  isOn ? `${tone.on} scale-105` : tone.off,
                  dimmed ? "opacity-35" : "opacity-100",
                ].join(" ")}
                style={{ left: `${nd.x}%`, top: `${nd.y}%` }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md sm:h-7 sm:w-7 ${isOn ? tone.iconOn : tone.icon}`}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                  </span>
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-[11px] font-bold leading-tight sm:text-xs">{nd.label}</span>
                    {nd.sub && (
                      <span className={`line-clamp-2 text-[9px] leading-tight sm:text-[10px] ${isOn ? "text-white/80" : "text-muted-foreground"}`}>
                        {nd.sub}
                      </span>
                    )}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Narración */}
      <div className="mt-3 flex items-start gap-3 rounded-xl border border-border bg-card p-3.5">
        <div className="text-mono flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-hero text-[11px] font-black text-white shadow-sysde">
          {pickedNode ? "i" : step >= 0 ? String(step + 1).padStart(2, "0") : "▶"}
        </div>
        <div className="min-w-0 flex-1">
          {pickedNode ? (
            <>
              <div className="text-sm font-bold text-foreground">{pickedNode.label}</div>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {pickedNode.sub ?? "Componente del diagrama."}{" "}
                <span className="text-primary">Pulsa Reproducir para la demo completa.</span>
              </p>
            </>
          ) : current ? (
            <>
              <div className="text-sm font-bold text-foreground">{current.title}</div>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{current.detail}</p>
            </>
          ) : (
            <>
              <div className="text-sm font-bold text-foreground">Explora la respuesta en movimiento</div>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                Pulsa <strong className="text-primary">Reproducir</strong> para recorrer el flujo paso a paso, o toca
                cualquier nodo del diagrama para ver su detalle.
              </p>
            </>
          )}
        </div>
        {/* Dots de progreso */}
        <div className="hidden shrink-0 items-center gap-1 self-center sm:flex">
          {diagram.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setPicked(null);
                setPlaying(false);
                setStep(i);
              }}
              aria-label={`Paso ${i + 1}`}
              className={[
                "h-1.5 rounded-full transition-all",
                i === step ? "w-5 bg-gradient-hero" : "w-1.5 bg-border hover:bg-primary/40",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
