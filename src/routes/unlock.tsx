import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { unlockSite } from "@/lib/gate.functions";

export const Route = createFileRoute("/unlock")({
  head: () => ({
    meta: [
      { title: "Acceso restringido — RFI Core Bancario · Banco Atlas × SYSDE" },
      {
        name: "description",
        content:
          "Ingresa la contraseña compartida para acceder a la plataforma de respuesta al RFI de Banco Atlas.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: UnlockPage,
});

function UnlockPage() {
  const router = useRouter();
  const unlock = useServerFn(unlockSite);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const { ok } = await unlock({ data: { password } });
      if (ok) {
        await router.navigate({ to: "/" });
      } else {
        setError(true);
        setPassword("");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-platform relative flex min-h-screen items-center justify-center px-4 py-12 text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="aurora-1 absolute -left-[10%] top-[-10%] h-[46vw] w-[46vw] rounded-full bg-primary/25 blur-[120px]" />
        <div className="aurora-3 absolute bottom-[-14%] left-[28%] h-[42vw] w-[42vw] rounded-full bg-primary/18 blur-[130px]" />
        <div className="animate-grid-pan absolute inset-0 bg-grid-sysde opacity-[0.35] mask-radial-fade" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-lg bg-gradient-hero shadow-sysde" />
            <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 pulse-dot" />
          </div>
          <div>
            <div className="text-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              SYSDE · Inventiva
            </div>
            <div className="font-heading text-sm font-bold">RFI Core Bancario</div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl border border-border/70 p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30">
              <Lock className="h-4 w-4 text-primary" strokeWidth={2.25} />
            </div>
            <div>
              <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Acceso restringido
              </div>
              <h1 className="font-heading text-lg font-bold">Ingresa la contraseña</h1>
            </div>
          </div>

          <p className="mb-6 text-sm text-muted-foreground">
            Este documento contiene la respuesta formal al RFI de Banco Atlas. Solicítala al equipo
            de SYSDE · Inventiva si aún no la tienes.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-mono mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Contraseña
              </span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none ring-primary/40 transition focus:border-primary focus:ring-2"
                placeholder="••••••••••••"
              />
            </label>

            {error && (
              <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-700 dark:text-rose-300">
                Contraseña incorrecta. Verifica e intenta nuevamente.
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-hero px-4 py-2.5 text-sm font-semibold text-white shadow-sysde transition hover:brightness-110 disabled:opacity-50"
            >
              {loading ? "Verificando..." : "Entrar"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          <div className="mt-6 flex items-center gap-2 border-t border-border/60 pt-4 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            Sesión cifrada · válida por 7 días en este dispositivo
          </div>
        </div>

        <div className="text-mono mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          Banco Atlas S.A. · Paraguay · 2026
        </div>
      </div>
    </div>
  );
}
