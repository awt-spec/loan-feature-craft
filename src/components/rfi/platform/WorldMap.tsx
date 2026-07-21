import { useEffect, useMemo, useRef, useState } from "react";
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

// Deterministic star field (seeded — identical on server & client, no hydration drift)
const STARS = (() => {
  let s = 20260717;
  const rnd = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  return Array.from({ length: 78 }, () => ({
    x: +(rnd() * MAP_W).toFixed(1),
    y: +(rnd() * MAP_H).toFixed(1),
    r: +(0.4 + rnd() * 0.9).toFixed(2),
    d: +(rnd() * 3.2).toFixed(2),
  }));
})();

export function WorldMap({
  highlightCountries = null,
  clickableCountries,
  selectedCountry = null,
  onPick,
}: {
  highlightCountries?: Set<string> | null;
  clickableCountries?: Set<string>;
  selectedCountry?: string | null;
  onPick?: (country: string) => void;
} = {}) {
  const [active, setActive] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const reduceRef = useRef(false);

  // Traveling pulses / radar rings only after mount + when motion is allowed
  const [flow, setFlow] = useState(false);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reduceRef.current = reduce;
    if (!reduce) setFlow(true);
  }, []);

  const hub = useMemo(() => worldPins.find((p) => p.tier === "hub")!, []);
  const rings = useMemo(() => worldPins.filter((p) => p.tier === "hub" || p.tier === "target"), []);
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

  // Parallax — write CSS vars directly on the container (no re-render)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el || reduceRef.current) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="animate-in fade-in zoom-in-95 relative w-full overflow-hidden rounded-2xl border border-white/10 bg-cinematic duration-700"
      >
        {/* Atmospheric depth glow (deepest parallax layer) */}
        <div
          aria-hidden
          className="map-parallax pointer-events-none absolute inset-0"
          style={{ ["--depth" as string]: -22 }}
        >
          <div className="absolute left-[26%] top-[42%] h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[90px]" />
          <div className="absolute right-[12%] top-[30%] h-[35%] w-[35%] rounded-full bg-[hsl(14_90%_55%/0.18)] blur-[100px]" />
        </div>

        {/* Hint de scroll — solo móvil */}
        <div className="text-mono pointer-events-none absolute right-3 top-3 z-30 rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-white/90 backdrop-blur sm:hidden">
          Desliza para explorar →
        </div>

        <div className="scrollbar-thin overflow-x-auto">
        <div className="relative min-w-[720px] sm:min-w-0" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="map-parallax absolute inset-0 h-full w-full"
            style={{ ["--depth" as string]: 10 }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="mapGlow" cx="50%" cy="0%" r="80%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
              <radialGradient id="mapVignette" cx="50%" cy="45%" r="75%">
                <stop offset="55%" stopColor="rgba(0,0,0,0)" />
                <stop offset="100%" stopColor="rgba(60,0,10,0.55)" />
              </radialGradient>
              <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.75)" />
              </linearGradient>
              <pattern id="landDots" width="6.5" height="6.5" patternUnits="userSpaceOnUse">
                <circle cx="1.1" cy="1.1" r="0.85" fill="rgba(255,255,255,0.55)" />
              </pattern>
              <clipPath id="landClip">
                <path d={worldLandPath} />
              </clipPath>
              <filter id="bloom" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Twinkling star field (ocean) */}
            <g>
              {STARS.map((st, i) => (
                <circle
                  key={i}
                  cx={st.x}
                  cy={st.y}
                  r={st.r}
                  fill="#fff"
                  className="twinkle"
                  style={{ animationDelay: `${st.d}s`, opacity: 0.15 }}
                />
              ))}
            </g>

            {/* Land — faint base + holographic dot-matrix */}
            <path d={worldLandPath} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.20)" strokeWidth={0.4} strokeLinejoin="round" />
            <g clipPath="url(#landClip)">
              <rect width={MAP_W} height={MAP_H} fill="url(#landDots)" />
            </g>
            <rect width={MAP_W} height={MAP_H} fill="url(#mapGlow)" />

            {/* Radar rings on hub + destino */}
            {flow &&
              rings.map((p) =>
                [0, 1].map((k) => (
                  <circle
                    key={`${p.name}-ring-${k}`}
                    cx={p.x}
                    cy={p.y}
                    r={3}
                    fill="none"
                    stroke={p.tier === "target" ? "rgba(253,224,71,0.9)" : "rgba(255,255,255,0.9)"}
                    strokeWidth={0.8}
                  >
                    <animate attributeName="r" values="3;22" dur="3s" begin={`${k * 1.5}s`} repeatCount="indefinite" />
                    <animate attributeName="stroke-width" values="1.2;0" dur="3s" begin={`${k * 1.5}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0" dur="3s" begin={`${k * 1.5}s`} repeatCount="indefinite" />
                  </circle>
                )),
              )}

            {/* Connection arcs (with bloom) */}
            <g filter="url(#bloom)">
              {arcs.map((a, i) => (
                <path
                  key={a.name}
                  id={`arc-${i}`}
                  d={a.d}
                  fill="none"
                  stroke={a.main ? "rgba(253,224,71,0.95)" : "url(#arcGrad)"}
                  strokeWidth={a.main ? 1.6 : 0.8}
                  strokeLinecap="round"
                  strokeDasharray={a.main ? "5 5" : "3 5"}
                  className="arc-flow"
                  style={{ ["--arc-len" as string]: a.len, animationDelay: `${i * 0.12}s`, opacity: a.main ? 1 : 0.7 }}
                />
              ))}
            </g>

            {/* Traveling pulses */}
            {flow && (
              <g filter="url(#bloom)">
                {arcs.map((a, i) => (
                  <circle
                    key={`pulse-${a.name}`}
                    r={a.main ? 3.2 : 2}
                    fill={a.main ? "rgb(253 224 71)" : "#fff"}
                    opacity={a.main ? 1 : 0.85}
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
              </g>
            )}

            <rect width={MAP_W} height={MAP_H} fill="url(#mapVignette)" />
          </svg>

          {/* Light sweep */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="map-sweep absolute -inset-y-4 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          </div>

          {/* HTML pin layer (crisp dots + tooltips) */}
          <div className="map-parallax absolute inset-0" style={{ ["--depth" as string]: 16 }}>
            {worldPins.map((p, i) => {
              const s = tierStyle[p.tier];
              const isActive = active === p.name;
              const isSelected = selectedCountry === p.name;
              const isClickable = !clickableCountries || clickableCountries.has(p.name);
              const isAnchor = p.tier === "hub" || p.tier === "target";
              const dimmed =
                !isAnchor &&
                !isSelected &&
                ((highlightCountries !== null && !highlightCountries.has(p.name)) || selectedCountry !== null);
              const withPing = p.tier === "hub" || p.tier === "target" || p.tier === "office";
              return (
                <div
                  key={p.name}
                  className="pin-pop absolute transition-opacity duration-300"
                  style={{
                    left: `${(p.x / MAP_W) * 100}%`,
                    top: `${(p.y / MAP_H) * 100}%`,
                    zIndex: isActive || isSelected ? 60 : s.z,
                    opacity: dimmed ? 0.28 : 1,
                    animationDelay: `${0.4 + i * 0.03}s`,
                  }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(p.name)}
                    onMouseLeave={() => setActive((a) => (a === p.name ? null : a))}
                    onFocus={() => setActive(p.name)}
                    onBlur={() => setActive((a) => (a === p.name ? null : a))}
                    onClick={() => {
                      setActive((a) => (a === p.name ? null : p.name));
                      if (isClickable) onPick?.(p.name);
                    }}
                    aria-label={p.name}
                    className={`group relative block -translate-x-1/2 -translate-y-1/2 p-3 sm:p-1.5 ${isClickable ? "cursor-pointer" : "cursor-default"}`}
                  >
                    {withPing && !dimmed && (
                      <span
                        className={`map-ping absolute left-1/2 top-1/2 rounded-full ${s.ping ?? ""}`}
                        style={{ width: s.size, height: s.size }}
                      />
                    )}
                    {isSelected && (
                      <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-amber-300"
                        style={{ width: s.size + 10, height: s.size + 10 }}
                      />
                    )}
                    <span
                      className={`relative block rounded-full shadow-[0_0_12px_rgba(0,0,0,0.5)] transition-transform duration-200 group-hover:scale-125 ${s.dot} ${isSelected ? "scale-125" : ""}`}
                      style={{ width: s.size, height: s.size }}
                    />
                  </button>

                  {isActive && (
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[200px] -translate-x-1/2 rounded-xl border border-white/15 bg-[hsl(348_60%_10%/0.96)] px-3 py-2 text-left shadow-xl backdrop-blur">
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
                      {isClickable && (
                        <div className="text-mono mt-1.5 text-[9px] uppercase tracking-wider text-amber-300">
                          {isSelected ? "✓ Filtrando · toca para quitar" : "→ Toca para ver referencias"}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
