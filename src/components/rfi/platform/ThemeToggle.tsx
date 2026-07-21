import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("sysde-theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={dark ? "Tema claro" : "Tema oscuro"}
      className="group relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-primary/40 hover:text-primary"
    >
      {/* Avoid hydration flash: render nothing until mounted */}
      {mounted &&
        (dark ? (
          <Sun className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2.25} />
        ) : (
          <Moon className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" strokeWidth={2.25} />
        ))}
    </button>
  );
}
