import type { SectionId } from "./PlatformShell";
import { questions } from "@/lib/rfi-content";
import {
  LayoutDashboard,
  CalendarClock,
  Building2,
  Users,
  ClipboardCheck,
  BadgeCheck,
  Globe2,
  ScrollText,
} from "lucide-react";

const nivelDot: Record<string, string> = {
  Sí: "bg-emerald-400",
  Parcial: "bg-amber-400",
  No: "bg-rose-400",
};

export function Sidebar({
  active,
  onSelect,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}) {
  const items: { id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "overview", label: "Panel general", icon: LayoutDashboard },
    { id: "proceso", label: "Datos del proceso", icon: CalendarClock },
    { id: "proveedor", label: "Proveedor", icon: Building2 },
    { id: "contactos", label: "Contactos", icon: Users },
    { id: "instrucciones", label: "Instrucciones", icon: ClipboardList },
  ];

  const tail: { id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "referencias", label: "Referencias regionales", icon: Globe2 },
    { id: "condiciones", label: "Condiciones generales", icon: ScrollText },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/5 bg-surface-1/80 backdrop-blur-xl lg:flex lg:flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-white/5 px-5 py-5">
        <div className="relative">
          <div className="h-9 w-9 rounded-lg bg-gradient-hero shadow-sysde" />
          <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 pulse-dot" />
        </div>
        <div className="min-w-0">
          <div className="text-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            SYSDE · Inventiva
          </div>
          <div className="truncate font-heading text-sm font-bold">RFI Core Bancario</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
        <SectionLabel>Contexto</SectionLabel>
        <div className="mt-2 space-y-1">
          {items.map((it) => (
            <NavItem
              key={it.id}
              icon={it.icon}
              label={it.label}
              active={active === it.id}
              onClick={() => onSelect(it.id)}
            />
          ))}
        </div>

        <SectionLabel className="mt-6">Preguntas del RFI</SectionLabel>
        <div className="mt-2 space-y-1">
          {questions.map((q) => {
            const isActive = active === `q${q.n}`;
            return (
              <button
                key={q.n}
                onClick={() => onSelect(`q${q.n}` as SectionId)}
                className={[
                  "group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-all",
                  isActive
                    ? "bg-primary/15 text-foreground ring-1 ring-primary/40"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                ].join(" ")}
              >
                <span
                  className={[
                    "text-mono flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold",
                    isActive
                      ? "bg-gradient-hero text-white shadow-sysde"
                      : "bg-white/5 text-muted-foreground group-hover:text-foreground",
                  ].join(" ")}
                >
                  0{q.n}
                </span>
                <span className="min-w-0 flex-1 truncate">Pregunta {q.n}</span>
                <span className="flex items-center gap-1.5">
                  {q.cumplimiento && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${nivelDot[q.cumplimiento] ?? "bg-white/40"}`}
                      title={q.cumplimiento}
                    />
                  )}
                  <BadgeCheck
                    className={[
                      "h-3.5 w-3.5",
                      q.madurez === "Avanzado"
                        ? "text-emerald-400"
                        : q.madurez === "Intermedio"
                          ? "text-amber-400"
                          : "text-slate-500",
                    ].join(" ")}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <SectionLabel className="mt-6">Anexos</SectionLabel>
        <div className="mt-2 space-y-1">
          {tail.map((it) => (
            <NavItem
              key={it.id}
              icon={it.icon}
              label={it.label}
              active={active === it.id}
              onClick={() => onSelect(it.id)}
            />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/5 p-4">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Cliente
          </div>
          <div className="mt-1 font-heading text-sm font-bold">Banco Atlas S.A.</div>
          <div className="text-[11px] text-muted-foreground">Paraguay · EY (advisor)</div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-all",
        active
          ? "bg-primary/15 text-foreground ring-1 ring-primary/40"
          : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
      ].join(" ")}
    >
      <Icon className="h-4 w-4" />
      <span className="truncate">{label}</span>
    </button>
  );
}

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-mono px-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 ${className}`}>
      {children}
    </div>
  );
}
