import { cn } from "@/lib/utils";
import type { Nivel, Madurez } from "@/lib/rfi-content";

const nivelStyles: Record<Nivel, string> = {
  "Sí": "bg-primary text-primary-foreground border-primary",
  "Parcial": "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800",
  "No": "bg-muted text-muted-foreground border-border",
};

const madurezDots: Record<Madurez, number> = {
  "Básico": 1,
  "Intermedio": 2,
  "Avanzado": 3,
};

export function NivelBadge({ nivel }: { nivel: Nivel }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        nivelStyles[nivel],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      Cumplimiento: {nivel}
    </span>
  );
}

export function MadurezBadge({ madurez }: { madurez: Madurez }) {
  const filled = madurezDots[madurez];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
      <span className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              i <= filled ? "bg-primary" : "bg-border",
            )}
          />
        ))}
      </span>
      Madurez: {madurez}
    </span>
  );
}
