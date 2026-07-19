import { useEffect, useState } from "react";
import { toc } from "@/lib/rfi-content";
import { cn } from "@/lib/utils";

export function TopBar() {
  const [active, setActive] = useState<string>("proceso");

  useEffect(() => {
    const ids = toc.map((t) => t.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero font-heading text-xs font-black text-primary-foreground shadow-sysde">
            RFI
          </span>
          <span className="hidden font-heading text-sm font-black uppercase tracking-widest text-foreground sm:inline">
            Banco Atlas × <span className="text-primary">SYSDE</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {toc.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                active === t.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </a>
          ))}
        </nav>
        <span className="hidden rounded-full border border-primary/30 bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary md:inline">
          Cierre 17·Jul·2026
        </span>
      </div>
    </header>
  );
}
