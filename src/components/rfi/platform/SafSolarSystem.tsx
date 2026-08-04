import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Wallet,
  CreditCard,
  Smartphone,
  Building2,
  Shield,
  BarChart3,
  FileText,
  Bell,
  ArrowLeft,
  Banknote,
  HandCoins,
  Car,
  LineChart,
  Factory,
  Receipt,
  Landmark,
  PiggyBank,
  CircleDollarSign,
  Phone,
  TabletSmartphone,
  MessageSquare,
  Construction,
  Lock,
  Key,
  UserCheck,
  FileCheck,
  Scale,
  TrendingUp,
  PieChart,
  Database,
  FileSpreadsheet,
  Printer,
  FileDigit,
  Send,
  Mail,
  BellRing,
  AlertCircle,
  MousePointerClick,
} from "lucide-react";
import { Reveal } from "./motion";
import { LoanEntryButton, LoanDiagram } from "./LoanFunctionality";

type SubModule = { icon: LucideIcon; title: string };

type MainModule = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  subModules: SubModule[];
};

const modules: MainModule[] = [
  {
    id: "colocacion",
    icon: Wallet,
    title: "Colocación",
    description: "Productos de crédito y financiamiento",
    subModules: [
      { icon: Banknote, title: "Préstamos de Consumo" },
      { icon: HandCoins, title: "Microcrédito" },
      { icon: Car, title: "Prendario" },
      { icon: LineChart, title: "Líneas de Crédito" },
      { icon: CircleDollarSign, title: "Capital de Trabajo" },
      { icon: Factory, title: "Arrendamiento" },
      { icon: Receipt, title: "Factoraje" },
    ],
  },
  {
    id: "captacion",
    icon: CreditCard,
    title: "Captación",
    description: "Productos de ahorro y depósitos",
    subModules: [
      { icon: PiggyBank, title: "Cuentas de Ahorro" },
      { icon: Landmark, title: "Depósitos a Plazo" },
      { icon: CreditCard, title: "Cuentas Corrientes" },
      { icon: CreditCard, title: "Tarjeta de Débito" },
      { icon: CircleDollarSign, title: "Fondeo" },
    ],
  },
  {
    id: "canales",
    icon: Smartphone,
    title: "Canales Digitales",
    description: "Plataformas móviles y web",
    subModules: [
      { icon: Wallet, title: "Billetera Móvil" },
      { icon: Phone, title: "Banca Móvil" },
      { icon: TabletSmartphone, title: "Originación Móvil" },
      { icon: MessageSquare, title: "Gestión de Cobranza" },
      { icon: Construction, title: "Avances de Obra" },
    ],
  },
  {
    id: "tesoreria",
    icon: Building2,
    title: "Tesorería",
    description: "Gestión financiera y contable",
    subModules: [
      { icon: Landmark, title: "Cajas" },
      { icon: Building2, title: "Cuentas Bancarias" },
      { icon: FileSpreadsheet, title: "Contabilidad" },
      { icon: TrendingUp, title: "Activos Fijos" },
      { icon: PieChart, title: "Presupuesto" },
    ],
  },
  {
    id: "seguridad",
    icon: Shield,
    title: "Seguridad",
    description: "Control de accesos y cumplimiento",
    subModules: [
      { icon: Lock, title: "Control de Accesos" },
      { icon: Key, title: "Gestión de Roles" },
      { icon: UserCheck, title: "Autenticación · MFA" },
      { icon: FileCheck, title: "Auditoría" },
      { icon: Scale, title: "Cumplimiento" },
    ],
  },
  {
    id: "reporteria",
    icon: BarChart3,
    title: "Reportería y BI",
    description: "Análisis y reportes regulatorios",
    subModules: [
      { icon: TrendingUp, title: "Dashboards" },
      { icon: PieChart, title: "Análisis de Datos" },
      { icon: Database, title: "Business Intelligence" },
      { icon: FileSpreadsheet, title: "Reportes Regulatorios" },
    ],
  },
  {
    id: "facturacion",
    icon: FileText,
    title: "Facturación",
    description: "Documentos electrónicos",
    subModules: [
      { icon: FileDigit, title: "Facturas Electrónicas" },
      { icon: Printer, title: "Impresión" },
      { icon: Receipt, title: "Notas de Crédito" },
      { icon: FileCheck, title: "Validación" },
    ],
  },
  {
    id: "notificaciones",
    icon: Bell,
    title: "Notificaciones",
    description: "Alertas multi-canal",
    subModules: [
      { icon: Mail, title: "Email" },
      { icon: Send, title: "SMS" },
      { icon: BellRing, title: "Push" },
      { icon: AlertCircle, title: "Alertas" },
    ],
  },
];

function pos(index: number, total: number, radius: number) {
  const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}

export function SafSolarSystem() {
  const [selected, setSelected] = useState<MainModule | null>(null);
  const [loansView, setLoansView] = useState(false);
  const SelectedIcon = selected?.icon;

  const mainRadius = 250;
  const subRadius = 165;

  if (loansView) {
    return <LoanDiagram onBack={() => setLoansView(false)} />;
  }

  return (
    <section>
      <div className="flex flex-col gap-2">
        <div className="text-mono inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-primary">
          <MousePointerClick className="h-3.5 w-3.5" strokeWidth={2.25} />
          Mapa funcional interactivo
        </div>
        <h2 className="font-heading text-2xl font-black tracking-tight md:text-3xl">
          Ecosistema modular <span className="text-shimmer">SAF+</span>
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {selected
            ? `Componentes del módulo ${selected.title}.`
            : "Un core central y ocho módulos en órbita. Toca cualquier módulo para desplegar sus componentes."}
        </p>
      </div>

      <Reveal>
        <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-surface-2/60 px-2 py-6 md:px-8 md:py-10">
          <div className="pointer-events-none absolute inset-0 bg-grid-sysde mask-radial-fade opacity-30" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative flex items-center justify-center">
            <div className="origin-center scale-[0.52] sm:scale-[0.7] md:scale-90 lg:scale-100">
              {!selected ? (
                <div
                  className="relative animate-[fade-in_0.4s_ease-out]"
                  style={{ width: mainRadius * 2 + 120, height: mainRadius * 2 + 120 }}
                >
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/25"
                    style={{ width: mainRadius * 2, height: mainRadius * 2 }}
                  />
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
                    style={{ width: mainRadius * 1.35, height: mainRadius * 1.35 }}
                  />

                  {/* Core */}
                  <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-gradient-hero text-white shadow-sysde ring-1 ring-white/20">
                      <span className="font-heading text-3xl font-black text-white">SAF+</span>
                      <span className="text-mono text-[10px] uppercase tracking-[0.24em] text-white/80">
                        Core
                      </span>
                    </div>
                  </div>

                  {modules.map((m, i) => {
                    const p = pos(i, modules.length, mainRadius);
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setSelected(m)}
                        className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)` }}
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-hero text-white shadow-sysde ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-7 w-7 text-white" strokeWidth={2.25} />
                        </div>
                        <div className="absolute left-1/2 top-full mt-2 w-40 -translate-x-1/2">
                          <span className="inline-block rounded-full border border-white/10 bg-surface-2/90 px-2 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                            {m.title}
                          </span>
                          <span className="mt-1 block text-[11px] leading-tight text-muted-foreground opacity-0 transition group-hover:opacity-100">
                            {m.description}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div
                  className="relative animate-[fade-in_0.4s_ease-out]"
                  style={{ width: subRadius * 2 + 160, height: mainRadius * 2 + 120 }}
                >
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/25"
                    style={{ width: subRadius * 2, height: subRadius * 2 }}
                  />
                  <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-full bg-gradient-hero px-3 text-center text-white shadow-sysde ring-1 ring-white/20">
                      {SelectedIcon && <SelectedIcon className="h-7 w-7 text-white" strokeWidth={2.25} />}
                      <span className="text-xs font-bold leading-tight text-white">{selected.title}</span>
                    </div>
                  </div>

                  {selected.subModules.map((s, i) => {
                    const p = pos(i, selected.subModules.length, subRadius);
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.title}
                        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)` }}
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-surface-2 text-primary shadow-sm">
                          <Icon className="h-6 w-6" strokeWidth={2.25} />
                        </div>
                        <div className="absolute left-1/2 top-full mt-2 w-36 -translate-x-1/2 text-center text-[11px] font-medium leading-tight text-foreground">
                          {s.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {selected && (
            <div className="relative mt-2 flex justify-center">
              <button
                onClick={() => setSelected(null)}
                className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/20"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2.5} /> Volver al ecosistema
              </button>
            </div>
          )}
        </div>
      </Reveal>

      <LoanFunctionality />
    </section>
  );
}
