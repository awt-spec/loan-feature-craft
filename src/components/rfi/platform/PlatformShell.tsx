import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { CommandBar } from "./CommandBar";
import { Overview } from "./Overview";
import { QuestionView } from "./QuestionView";
import {
  ProcesoSection,
  ProveedorSection,
  ContactosSection,
  InstruccionesSection,
  CondicionesSection,
} from "./Sections";
import { ReferenciasSection } from "./ReferenciasSection";
import { questions } from "@/lib/rfi-content";

export type SectionId =
  | "overview"
  | "proceso"
  | "proveedor"
  | "contactos"
  | "instrucciones"
  | `q${number}`
  | "referencias"
  | "condiciones";

export function PlatformShell() {
  const [active, setActive] = useState<SectionId>("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const handleNavigate = (id: SectionId) => {
    setActive(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const content = useMemo(() => {
    if (active === "overview") return <Overview onNavigate={handleNavigate} />;
    if (active === "proceso") return <ProcesoSection />;
    if (active === "proveedor") return <ProveedorSection />;
    if (active === "contactos") return <ContactosSection />;
    if (active === "instrucciones") return <InstruccionesSection />;
    if (active === "referencias") return <ReferenciasSection />;
    if (active === "condiciones") return <CondicionesSection />;
    if (active.startsWith("q")) {
      const n = parseInt(active.slice(1), 10);
      const q = questions.find((x) => x.n === n);
      if (q) return <QuestionView question={q} onNavigate={handleNavigate} />;
    }
    return null;
  }, [active]);

  return (
    <div className="bg-platform relative min-h-screen text-foreground">
      {/* Animated aurora backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="aurora-1 absolute -left-[10%] top-[-10%] h-[46vw] w-[46vw] rounded-full bg-primary/25 blur-[120px]" />
        <div className="aurora-2 absolute right-[-12%] top-[12%] h-[40vw] w-[40vw] rounded-full bg-[hsl(220_90%_55%/0.14)] blur-[130px]" />
        <div className="aurora-3 absolute bottom-[-14%] left-[28%] h-[42vw] w-[42vw] rounded-full bg-primary/18 blur-[130px]" />
        <div className="animate-grid-pan absolute inset-0 bg-grid-sysde opacity-[0.35] mask-radial-fade" />
      </div>

      <div className="relative z-10 flex min-h-screen pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
        <Sidebar
          active={active}
          onSelect={handleNavigate}
          mobileOpen={menuOpen}
          onCloseMobile={() => setMenuOpen(false)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <CommandBar
            active={active}
            onNavigate={handleNavigate}
            onOpenMenu={() => setMenuOpen(true)}
          />
          <main
            ref={mainRef}
            key={active}
            className="scrollbar-thin flex-1 overflow-y-auto px-4 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-6 sm:pt-8 sm:pb-[calc(2rem+env(safe-area-inset-bottom))] md:px-10 md:pt-10 md:pb-[calc(2.5rem+env(safe-area-inset-bottom))] animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <div className="mx-auto max-w-6xl">
              {content}
              {/* Espacio para el bottom nav móvil de preguntas */}
              {active.startsWith("q") && <div aria-hidden className="h-20 lg:hidden" />}
            </div>
          </main>
        </div>
      </div>

      {/* Bottom nav de preguntas — solo móvil, zona del pulgar */}
      {active.startsWith("q") && (
        <QuestionBottomNav
          current={parseInt(active.slice(1), 10)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

function QuestionBottomNav({
  current,
  onNavigate,
}: {
  current: number;
  onNavigate: (id: SectionId) => void;
}) {
  return (
    <nav
      aria-label="Navegación de preguntas"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-300 lg:hidden"
    >
      <div className="flex items-center gap-1.5 px-3 py-2">
        <button
          type="button"
          aria-label="Pregunta anterior"
          disabled={current <= 1}
          onClick={() => onNavigate(`q${current - 1}` as SectionId)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition active:scale-95 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-1">
          {questions.map((q) => {
            const isActive = q.n === current;
            return (
              <button
                key={q.n}
                type="button"
                aria-label={`Pregunta ${q.n}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onNavigate(`q${q.n}` as SectionId)}
                className={[
                  "text-mono h-11 min-w-0 flex-1 rounded-xl text-[12px] font-bold transition active:scale-95",
                  isActive
                    ? "bg-gradient-hero text-white shadow-sysde"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
              >
                0{q.n}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Pregunta siguiente"
          disabled={current >= questions.length}
          onClick={() => onNavigate(`q${current + 1}` as SectionId)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition active:scale-95 disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
    </nav>
  );
}
