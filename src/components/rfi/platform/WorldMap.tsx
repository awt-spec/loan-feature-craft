import { useEffect, useMemo, useRef, useState } from "react";
import { MAP_W, MAP_H, worldPins, worldLandPath, type WorldPin } from "@/lib/world-map";

const tierStyle: Record<
  WorldPin["tier"],
  { dot: string; size: number; ping?: string; z: number; label: string }
> = {
  hub: { dot: "bg-white ring-2 ring-primary", size: 17, ping: "bg-white/70", z: 40, label: "Holding regional" },
  target: { dot: "bg-amber-300 ring-2 ring-white", size: 16, ping: "bg-amber-300/70", z: 45, label: "Destino · Paraguay" },
  office: { dot: "bg-primary ring-2 ring-white/80", size: 12, ping: "bg-primary/60", z: 30, label: "Oficina / Fábrica" },
  sva: { dot: "bg-rose-400 ring-2 ring-white/70", size: 10, z: 20, label: "Soporte SVA" },
  client: { dot: "bg-primary/70 ring-1 ring-white/40", size: 7, z: 10, label: "Cliente" },
};

/* Recorte de franjas polares vacías: los continentes ocupan más pantalla */
const CROP_Y = 12;
const CROP_H = 470;

/* Lado de la etiqueta por país (evita colisiones en el clúster centroamericano) */
const LABEL_SIDE: Record<string, "right" | "left" | "top" | "bottom"> = {
  "Costa Rica": "left",
  "El Salvador": "top",
  "México": "top",
  "República Dominicana": "top",
  "Perú": "bottom",
  Nicaragua: "bottom",
  "Haití": "left",
  "Burkina Faso": "top",
  Togo: "bottom",
};

const labelPos: Record<"right" | "left" | "top" | "bottom", string> = {
  right: "left-[11px] top-0 -translate-y-1/2",
  left: "right-[11px] top-0 -translate-y-1/2 text-right",
  top: "bottom-[11px] left-0 -translate-x-1/2 text-center",
  bottom: "top-[11px] left-0 -translate-x-1/2 text-center",
};

/* En vista global el clúster centroamericano es muy denso: estas etiquetas
 * solo aparecen al hacer zoom a América. */
const LABEL_ONLY_ZOOMED = new Set(["Costa Rica", "El Salvador"]);

const SHORT_NAME: Record<string, string> = {
  "República Dominicana": "Rep. Dominicana",
};

const legend: { tier: WorldPin["tier"]; label: string }[] = [
  { tier: "hub", label: "Holding (Panamá)" },
  { tier: "target", label: "Destino · Paraguay" },
  { tier: "office", label: "Oficina / Fábrica" },
  { tier: "sva", label: "Soporte SVA" },
  { tier: "client", label: "Cliente en producción" },
];

/* Campo de estrellas determinista (idéntico en server y cliente) */
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

/* ------------------------------------------------------------------ *
 * Regiones — presets de zoom (centro + escala sobre el lienzo 1000×500)
 * ------------------------------------------------------------------ */
type RegionKey = "global" | "america" | "africa" | "eurasia";

const REGIONS: { key: RegionKey; label: string; cx: number; cy: number; s: number }[] = [
  { key: "global", label: "Global", cx: MAP_W / 2, cy: MAP_H / 2, s: 1 },
  { key: "america", label: "América", cx: 278, cy: 225, s: 2 },
  { key: "africa", label: "África", cx: 548, cy: 245, s: 2.2 },
  { key: "eurasia", label: "Europa · Asia", cx: 705, cy: 130, s: 1.9 },
];

function regionOf(p: { x: number; y: number }): Exclude<RegionKey, "global"> {
  if (p.x < 430) return "america";
  if (p.y < 140 || p.x > 680) return "eurasia";
  return "africa";
}

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
  const [region, setRegion] = useState<RegionKey>("global");
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const reduceRef = useRef(false);

  // Pulsos/anillos SMIL solo tras montar y si el usuario permite movimiento
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
  // Arcos: la casa matriz conecta con TODOS los países (oficinas/SVA con
  // trazo fuerte y pulso; clientes con trazo sutil — África, Europa y Asia
  // incluidos).
  const { mainArcs, clientArcs } = useMemo(() => {
    const build = (t: WorldPin) => {
      const x1 = hub.x, y1 = hub.y, x2 = t.x, y2 = t.y;
      const mx = (x1 + x2) / 2;
      const dist = Math.hypot(x2 - x1, y2 - y1);
      const cx = mx;
      const cy = Math.min(y1, y2) - dist * 0.28 - 8;
      const len = dist * 1.25;
      return { name: t.name, d: `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`, len, main: t.tier === "target" };
    };
    return {
      mainArcs: worldPins.filter((p) => p.tier === "target" || p.tier === "office" || p.tier === "sva").map(build),
      clientArcs: worldPins.filter((p) => p.tier === "client").map(build),
    };
  }, [hub]);

  const counts = useMemo(() => {
    const c: Record<RegionKey, number> = { global: worldPins.length, america: 0, africa: 0, eurasia: 0 };
    worldPins.forEach((p) => c[regionOf(p)]++);
    return c;
  }, []);

  // Vista actual (zoom-to-point): translate + scale sobre coordenadas del lienzo
  const view = REGIONS.find((r) => r.key === region)!;
  const tx = MAP_W / 2 - view.s * view.cx;
  const ty = MAP_H / 2 - view.s * view.cy;
  const project = (p: { x: number; y: number }) => ({
    left: ((tx + view.s * p.x) / MAP_W) * 100,
    top: ((ty + view.s * p.y - CROP_Y) / CROP_H) * 100,
  });
  const inView = (pct: { left: number; top: number }) =>
    pct.left > -2 && pct.left < 102 && pct.top > -3 && pct.top < 103;

  // Parallax con el cursor (CSS vars, sin re-render)
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

  const pickRegion = (k: RegionKey) => {
    setActive(null);
    setRegion(k);
  };

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="animate-in fade-in zoom-in-95 relative w-full overflow-hidden rounded-2xl border border-white/10 bg-cinematic duration-700"
      >
        {/* Glow atmosférico (capa más profunda del parallax) */}
        <div
          aria-hidden
          className="map-parallax pointer-events-none absolute inset-0"
          style={{ ["--depth" as string]: -22 }}
        >
          <div className="absolute left-[26%] top-[42%] h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[90px]" />
          <div className="absolute right-[12%] top-[30%] h-[35%] w-[35%] rounded-full bg-[hsl(14_90%_55%/0.18)] blur-[100px]" />
        </div>

        {/* Selector de región — profundidad funcional */}
        <div className="relative z-20 flex flex-wrap items-center gap-1.5 border-b border-white/10 px-3 py-2.5 sm:px-4">
          <span className="text-mono mr-1 hidden text-[9px] uppercase tracking-[0.2em] text-white/50 sm:inline">
            Enfocar
          </span>
          {REGIONS.map((r) => {
            const isActive = region === r.key;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => pickRegion(r.key)}
                className={[
                  "text-mono inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[10px] font-bold uppercase tracking-[0.14em] transition sm:h-8",
                  isActive
                    ? "bg-gradient-hero text-white shadow-sysde"
                    : "border border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:text-white",
                ].join(" ")}
              >
                {r.label}
                <span className={isActive ? "text-white/80" : "text-white/50"}>{counts[r.key]}</span>
              </button>
            );
          })}
          <div className="text-mono ml-auto hidden text-[9px] uppercase tracking-[0.18em] text-white/40 lg:block">
            {region === "global" ? "Vista completa" : "Zoom activo · vuelve a Global para ver todo"}
          </div>
        </div>

        {/* Hint de scroll — solo móvil */}
        <div className="text-mono pointer-events-none absolute right-3 top-[60px] z-30 rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-white/90 backdrop-blur sm:hidden">
          Desliza para explorar →
        </div>

        <div className="scrollbar-thin overflow-x-auto">
        <div className="relative min-w-[720px] sm:min-w-0" style={{ aspectRatio: `${MAP_W} / ${CROP_H}` }}>
          {/* Estrellas — capa fija que NO hace zoom (profundidad de fondo) */}
          <svg
            viewBox={`0 ${CROP_Y} ${MAP_W} ${CROP_H}`}
            className="map-parallax absolute inset-0 h-full w-full"
            style={{ ["--depth" as string]: 4 }}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
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
          </svg>

          {/* Mapa — capa que hace zoom */}
          <svg
            viewBox={`0 ${CROP_Y} ${MAP_W} ${CROP_H}`}
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
              <filter id="landGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="rgba(255,180,190,0.25)" />
              </filter>
            </defs>

            {/* Grupo zoomable — transición cinematográfica entre regiones */}
            <g
              style={{
                transform: `translate(${tx}px, ${ty}px) scale(${view.s})`,
                transition: "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Tierra con glow suave + dot-matrix */}
              <path
                d={worldLandPath}
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth={0.5}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                filter="url(#landGlow)"
              />
              <g clipPath="url(#landClip)">
                <rect width={MAP_W} height={MAP_H} fill="url(#landDots)" />
              </g>

              {/* Anillos de radar */}
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
                      vectorEffect="non-scaling-stroke"
                    >
                      <animate attributeName="r" values="3;22" dur="3s" begin={`${k * 1.5}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.9;0" dur="3s" begin={`${k * 1.5}s`} repeatCount="indefinite" />
                    </circle>
                  )),
                )}

              {/* Arcos sutiles hacia clientes — África, Europa y Asia incluidos */}
              <g>
                {clientArcs.map((a, i) => (
                  <path
                    key={a.name}
                    d={a.d}
                    fill="none"
                    stroke="rgba(255,255,255,0.38)"
                    strokeWidth={0.8}
                    strokeLinecap="round"
                    strokeDasharray="3 6"
                    vectorEffect="non-scaling-stroke"
                    className="arc-flow"
                    style={{ animationDelay: `${i * 0.18}s`, opacity: 0.8 }}
                  />
                ))}
              </g>

              {/* Arcos de conexión principales (bloom) */}
              <g filter="url(#bloom)">
                {mainArcs.map((a, i) => (
                  <path
                    key={a.name}
                    id={`arc-${i}`}
                    d={a.d}
                    fill="none"
                    stroke={a.main ? "rgba(253,224,71,0.95)" : "url(#arcGrad)"}
                    strokeWidth={a.main ? 1.6 : 0.8}
                    strokeLinecap="round"
                    strokeDasharray={a.main ? "5 5" : "3 5"}
                    vectorEffect="non-scaling-stroke"
                    className="arc-flow"
                    style={{ ["--arc-len" as string]: a.len, animationDelay: `${i * 0.12}s`, opacity: a.main ? 1 : 0.7 }}
                  />
                ))}
              </g>

              {/* Pulsos viajeros */}
              {flow && (
                <g filter="url(#bloom)">
                  {mainArcs.map((a, i) => (
                    <circle
                      key={`pulse-${a.name}`}
                      r={(a.main ? 3.2 : 2) / view.s}
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
            </g>

            <rect width={MAP_W} height={MAP_H} fill="url(#mapGlow)" />
            <rect width={MAP_W} height={MAP_H} fill="url(#mapVignette)" />
          </svg>

          {/* Barrido de luz */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="map-sweep absolute -inset-y-4 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          </div>

          {/* Capa de pines HTML (nítidos, reposicionados con la vista) */}
          <div className="map-parallax absolute inset-0" style={{ ["--depth" as string]: 16 }}>
            {worldPins.map((p, i) => {
              const pct = project(p);
              if (!inView(pct)) return null;
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
                  className="pin-pop absolute transition-[left,top,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    left: `${pct.left}%`,
                    top: `${pct.top}%`,
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

                  {/* Etiqueta de localidad — clave siempre en desktop; clientes al hacer zoom */}
                  {!dimmed &&
                    (view.s > 1 || (p.tier !== "client" && !LABEL_ONLY_ZOOMED.has(p.name))) && (
                    <span
                      aria-hidden
                      className={[
                        "text-mono pointer-events-none absolute hidden whitespace-nowrap uppercase leading-none sm:block",
                        "[text-shadow:0_1px_4px_rgba(0,0,0,0.75)]",
                        labelPos[LABEL_SIDE[p.name] ?? "right"],
                        p.tier === "hub"
                          ? "text-[10px] font-black tracking-[0.12em] text-white"
                          : p.tier === "target"
                            ? "text-[10px] font-black tracking-[0.12em] text-amber-300"
                            : p.tier === "client"
                              ? "text-[8px] font-semibold tracking-[0.08em] text-white/75"
                              : "text-[9px] font-bold tracking-[0.1em] text-white/90",
                      ].join(" ")}
                    >
                      {SHORT_NAME[p.name] ?? p.name}
                    </span>
                  )}

                  {isActive && (
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[200px] -translate-x-1/2 rounded-xl border border-white/15 bg-[hsl(348_60%_10%/0.96)] px-3 py-2 text-left shadow-xl backdrop-blur">
                      <div className="flex items-center gap-1.5">
                        <span className="text-mono inline-flex h-5 min-w-7 shrink-0 items-center justify-center rounded-md border border-white/30 bg-white/10 px-1 text-[9px] font-bold leading-none text-white">
                          {p.flag}
                        </span>
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

        {/* Leyenda */}
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
