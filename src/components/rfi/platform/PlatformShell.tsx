import { useEffect, useMemo, useRef, useState } from "react";
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

      <div className="relative z-10 flex min-h-screen">
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
            className="scrollbar-thin flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <div className="mx-auto max-w-6xl">{content}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
