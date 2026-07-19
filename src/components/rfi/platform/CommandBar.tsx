import type { SectionId } from "./PlatformShell";
import { process } from "@/lib/rfi-content";
import { ChevronRight, Signal, Timer, FileDown } from "lucide-react";

function daysUntil(iso: string) {
  const d = new Date(iso).getTime();
  const now = Date.now();
  return Math.max(0, Math.ceil((d - now) / (1000 * 60 * 60 * 24)));
}

const labels: Partial<Record<SectionId, string>> = {
  overview: "Panel general",
  proceso: "Datos del proceso",
  proveedor: "Proveedor",
  contactos: "Contactos",
  instrucciones: "Instrucciones",
  referencias: "Referencias regionales",
  condiciones: "Condiciones generales",
};

export function CommandBar({ active, onNavigate }: { active: SectionId; onNavigate: (id: SectionId) => void }) {
  const isQuestion = active.startsWith("q");
  const label = isQuestion ? `Pregunta ${active.slice(1)}` : (labels[active] ?? "Panel");
  const days = daysUntil("2026-07-17");

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="flex items-center gap-4 px-6 py-3 md:px-10">
        {/* Breadcrumb */}
        <button
          onClick={() => onNavigate("overview")}
          className="text-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
        >
          RFI · 2026
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
        <div className="font-heading text-sm font-semibold">{label}</div>

        <div className="ml-auto flex items-center gap-3">
          <StatusPill />
          <DeadlinePill days={days} closes={process.cierre} />
          <button className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground md:inline-flex">
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
    <div className="hidden items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-3 py-1 text-[11px] font-medium text-emerald-300 md:inline-flex">
      <Signal className="h-3 w-3 pulse-dot" />
      <span className="text-mono uppercase tracking-[0.18em]">En preparación</span>
    </div>
  );
}

function DeadlinePill({ days, closes }: { days: number; closes: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px]">
      <Timer className="h-3 w-3 text-primary" />
      <span className="text-mono uppercase tracking-[0.18em] text-muted-foreground">Cierre</span>
      <span className="text-mono font-semibold text-foreground">{days} días</span>
      <span className="hidden text-muted-foreground md:inline">· {closes}</span>
    </div>
  );
}
