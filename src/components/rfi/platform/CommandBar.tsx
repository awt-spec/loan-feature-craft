import type { SectionId } from "./PlatformShell";
import { process } from "@/lib/rfi-content";
import { ThemeToggle } from "./ThemeToggle";
import { ChevronRight, Signal, Timer, FileDown, Menu } from "lucide-react";

function daysUntil(iso: string) {
  const d = new Date(iso).getTime();
  const now = Date.now();
  return Math.max(0, Math.ceil((d - now) / (1000 * 60 * 60 * 24)));
}

const labels: Partial<Record<SectionId, string>> = {
  overview: "Panel general",
  proceso: "Contexto y proceso",
  proveedor: "Proveedor",
  contactos: "Contactos",
  instrucciones: "Instrucciones",
  referencias: "Referencias regionales",
  condiciones: "Condiciones generales",
};

export function CommandBar({
  active,
  onNavigate,
  onOpenMenu,
}: {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
  onOpenMenu?: () => void;
}) {
  const isQuestion = active.startsWith("q");
  const label = isQuestion ? `Pregunta ${active.slice(1)}` : (labels[active] ?? "Panel");
  const days = daysUntil("2026-07-17");

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="flex items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6 md:px-10">
        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Abrir menú de navegación"
          onClick={onOpenMenu}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Breadcrumb (compact on mobile) */}
        <button
          onClick={() => onNavigate("overview")}
          className="text-mono hidden shrink-0 text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground sm:inline"
        >
          RFI · 2026
        </button>
        <ChevronRight className="hidden h-3.5 w-3.5 shrink-0 text-muted-foreground/50 sm:block" />
        <div className="min-w-0 truncate font-heading text-sm font-semibold">{label}</div>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <StatusPill />
          <DeadlinePill days={days} closes={process.cierre} />
          <ThemeToggle />
          <button className="hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground md:inline-flex">
            <FileDown className="h-3.5 w-3.5" />
            Exportar .docx
          </button>
        </div>
      </div>
    </header>
  );
}

function StatusPill() {
  return (
    <div className="hidden items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-700 md:inline-flex dark:text-emerald-300">
      <Signal className="h-3 w-3 pulse-dot" />
      <span className="text-mono uppercase tracking-[0.18em]">En preparación</span>
    </div>
  );
}

function DeadlinePill({ days, closes }: { days: number; closes: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] sm:gap-2 sm:px-3">
      <Timer className="h-3 w-3 shrink-0 text-primary" />
      <span className="text-mono hidden uppercase tracking-[0.18em] text-muted-foreground sm:inline">
        Cierre
      </span>
      <span className="text-mono font-semibold text-foreground">{days}d</span>
      <span className="hidden text-muted-foreground md:inline">· {closes}</span>
    </div>
  );
}
