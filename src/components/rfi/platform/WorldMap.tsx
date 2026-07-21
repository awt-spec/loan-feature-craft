import { useEffect, useMemo, useState } from "react";
import { MAP_W, MAP_H, worldPins, worldLandPath, type WorldPin } from "@/lib/world-map";

const tierStyle: Record<
  WorldPin["tier"],
  { dot: string; size: number; ping?: string; z: number; label: string }
> = {
  hub: { dot: "bg-white ring-2 ring-primary", size: 16, ping: "bg-white/70", z: 40, label: "Casa matriz" },
  target: { dot: "bg-amber-300 ring-2 ring-white", size: 15, ping: "bg-amber-300/70", z: 45, label: "Destino · Paraguay" },
  office: { dot: "bg-primary ring-1 ring-white/70", size: 11, ping: "bg-primary/60", z: 30, label: "Oficina / Fábrica" },
  sva: { dot: "bg-rose-400 ring-1 ring-white/60", size: 9, z: 20, label: "Soporte SVA" },
  client: { dot: "bg-primary/60 ring-1 ring-white/30", size: 6, z: 10, label: "Cliente" },
};

const legend: { tier: WorldPin["tier"]; label: string }[] = [
  { tier: "hub", label: "Casa matriz (CR)" },
  { tier: "target", label: "Destino · Paraguay" },
  { tier: "office", label: "Oficina / Fábrica" },
  { tier: "sva", label: "Soporte SVA" },
  { tier: "client", label: "Cliente en producción" },
];

export function WorldMap() {
  const [active, setActive] = useState<string | null>(null);
  // Traveling pulses are added only after mount and when motion is allowed
  // (SMIL ignores prefers-reduced-motion; gate it in JS to stay SSR-safe).
  const [flow, setFlow] = useState(false);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setFlow(true);
  }, []);

  const hub = useMemo(() => worldPins.find((p) => p.tier === "hub")!, []);
  // Arcs: hub → target (bold) + hub → every office/sva
  const arcs = useMemo(() => {
    const targets = worldPins.filter((p) => p.tier === "target" || p.tier === "office" || p.tier === "sva");
    return targets.map((t) => {
      const x1 = hub.x, y1 = hub.y, x2 = t.x, y2 = t.y;
      const mx = (x1 + x2) / 2;
      const dist = Math.hypot(x2 - x1, y2 - y1);
      const cx = mx;
      const cy = Math.min(y1, y2) - dist * 0.28 - 8;
      const len = dist * 1.25;
      return { name: t.name, d: `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`, len, main: t.tier === "target" };
    });
  }, [hub]);

  return (
    <div className="relative">
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-cinematic">
        <div className="pointer-events-none absolute inset-0 bg-grid-sysde-light opacity-20" />

        <div className="relative w-full" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="mapGlow" cx="50%" cy="0%" r="80%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>

            {/* Landmasses */}
            <path
              d={worldLandPath}
              fill="rgba(255,255,255,0.10)"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={0.5}
              strokeLinejoin="round"
            />
            <rect width={MAP_W} height={MAP_H} fill="url(#mapGlow)" />

            {/* Connection arcs */}
            {arcs.map((a, i) => (
              <path
                key={a.name}
                id={`arc-${i}`}
                d={a.d}
                fill="none"
                stroke={a.main ? "rgba(253,224,71,0.95)" : "rgba(255,255,255,0.5)"}
                strokeWidth={a.main ? 1.6 : 0.8}
                strokeLinecap="round"
                strokeDasharray={a.main ? "5 5" : "3 5"}
                className="arc-flow"
                style={{ ["--arc-len" as string]: a.len, animationDelay: `${i * 0.12}s`, opacity: a.main ? 1 : 0.7 }}
              />
            ))}

            {/* Traveling pulses along each arc (hub → destino / región) */}
            {flow &&
              arcs.map((a, i) => (
                <circle
                  key={`pulse-${a.name}`}
                  r={a.main ? 3.2 : 2}
                  fill={a.main ? "rgb(253 224 71)" : "#fff"}
                  opacity={a.main ? 1 : 0.85}
                  style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.9))" }}
                >
                  <animateMotion
                    dur={`${a.main ? 2.6 : 3.4}s`}
                    begin={`${i * 0.25}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  >
                    <mpath href={`#arc-${i}`} />
                  </animateMotion>
                </circle>
              ))}
          </svg>

          {/* HTML pin layer (crisp dots + tooltips) */}
          <div className="absolute inset-0">
            {worldPins.map((p, i) => {
              const s = tierStyle[p.tier];
              const isActive = active === p.name;
              const withPing = p.tier === "hub" || p.tier === "target" || p.tier === "office";
              return (
                <div
                  key={p.name}
                  className="pin-pop absolute"
                  style={{
                    left: `${(p.x / MAP_W) * 100}%`,
                    top: `${(p.y / MAP_H) * 100}%`,
                    zIndex: isActive ? 60 : s.z,
                    animationDelay: `${0.4 + i * 0.03}s`,
                  }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(p.name)}
                    onMouseLeave={() => setActive((a) => (a === p.name ? null : a))}
                    onFocus={() => setActive(p.name)}
                    onBlur={() => setActive((a) => (a === p.name ? null : a))}
                    onClick={() => setActive((a) => (a === p.name ? null : p.name))}
                    aria-label={p.name}
                    className="group relative block -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {withPing && (
                      <span
                        className={`map-ping absolute left-1/2 top-1/2 rounded-full ${s.ping ?? ""}`}
                        style={{ width: s.size, height: s.size }}
                      />
                    )}
                    <span
                      className={`relative block rounded-full shadow-[0_0_10px_rgba(0,0,0,0.4)] transition-transform duration-200 group-hover:scale-125 ${s.dot}`}
                      style={{ width: s.size, height: s.size }}
                    />
                  </button>

                  {isActive && (
                    <div
                      className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[200px] -translate-x-1/2 rounded-xl border border-white/15 bg-[hsl(348_60%_10%/0.96)] px-3 py-2 text-left shadow-xl backdrop-blur"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm leading-none">{p.flag}</span>
                        <span className="font-heading text-[13px] font-bold text-white">{p.name}</span>
                      </div>
                      <div className="text-mono mt-0.5 text-[9px] uppercase tracking-[0.16em] text-white/60">
                        {tierStyle[p.tier].label}
                      </div>
                      {p.roles && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {p.roles.map((r) => (
                            <span
                              key={r}
                              className="rounded-full border border-white/20 bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/90"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      )}
                      {p.note && <div className="mt-1 text-[10px] leading-snug text-white/70">{p.note}</div>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 px-4 py-3 sm:px-6">
          {legend.map((l) => {
            const s = tierStyle[l.tier];
            return (
              <div key={l.tier} className="flex items-center gap-1.5">
                <span
                  className={`block rounded-full ${s.dot}`}
                  style={{ width: Math.min(s.size, 12), height: Math.min(s.size, 12) }}
                />
                <span className="text-mono text-[10px] uppercase tracking-wider text-white/75">{l.label}</span>
              </div>
            );
          })}
          <div className="text-mono ml-auto hidden text-[10px] uppercase tracking-wider text-white/50 sm:block">
            Toca un punto para ver el detalle
          </div>
        </div>
      </div>
    </div>
  );
}
