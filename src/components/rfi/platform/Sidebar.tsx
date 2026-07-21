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
  X,
} from "lucide-react";

const nivelDot: Record<string, string> = {
  Sí: "bg-emerald-500",
  Parcial: "bg-amber-500",
  No: "bg-rose-500",
};

export function Sidebar({
  active,
  onSelect,
  mobileOpen = false,
  onCloseMobile,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
  const items: { id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "overview", label: "Panel general", icon: LayoutDashboard },
    { id: "proceso", label: "Datos del proceso", icon: CalendarClock },
    { id: "proveedor", label: "Proveedor", icon: Building2 },
    { id: "contactos", label: "Contactos", icon: Users },
    { id: "instrucciones", label: "Instrucciones", icon: ClipboardCheck },
  ];

  const tail: { id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "referencias", label: "Referencias regionales", icon: Globe2 },
    { id: "condiciones", label: "Condiciones generales", icon: ScrollText },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
          aria-hidden
        />
      )}

      <aside
        className={[
          "flex h-dvh w-72 shrink-0 flex-col border-r border-border/70 bg-surface-1/95 backdrop-blur-xl",
          "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]",
          "fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:z-auto lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-border/70 px-5 py-5">
          <div className="relative">
            <div className="h-9 w-9 rounded-lg bg-gradient-hero shadow-sysde" />
            <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 pulse-dot" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              SYSDE · Inventiva
            </div>
            <div className="truncate font-heading text-sm font-bold">RFI Core Bancario</div>
          </div>
          {onCloseMobile && (
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={onCloseMobile}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          )}
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
                  "group relative flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-all hover:translate-x-0.5",
                  isActive
                    ? "bg-primary/15 text-foreground ring-1 ring-primary/40"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-gradient-hero shadow-sysde" />
                )}
                <span
                  className={[
                    "text-mono flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold",
                    isActive
                      ? "bg-gradient-hero text-white shadow-sysde"
                      : "bg-muted text-muted-foreground group-hover:text-foreground",
                  ].join(" ")}
                >
                  0{q.n}
                </span>
                <span className="min-w-0 flex-1 truncate">Pregunta {q.n}</span>
                <span className="flex items-center gap-1.5">
                  {q.cumplimiento && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${nivelDot[q.cumplimiento] ?? "bg-muted-foreground"}`}
                      title={q.cumplimiento}
                    />
                  )}
                  <BadgeCheck
                    className={[
                      "h-3.5 w-3.5",
                      q.madurez === "Avanzado"
                        ? "text-emerald-600"
                        : q.madurez === "Intermedio"
                          ? "text-amber-600"
                          : "text-muted-foreground",
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
        <div className="border-t border-border/70 p-4">
          <div className="rounded-xl border border-border bg-muted/40 p-3">
            <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Cliente
            </div>
            <div className="mt-1 font-heading text-sm font-bold">Banco Atlas S.A.</div>
            <div className="text-[11px] text-muted-foreground">Paraguay · EY (advisor)</div>
          </div>
        </div>
      </aside>
    </>
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
        "group relative flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-all hover:translate-x-0.5",
        active
          ? "bg-primary/15 text-foreground ring-1 ring-primary/40"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      ].join(" ")}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-gradient-hero shadow-sysde" />
      )}
      <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
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
