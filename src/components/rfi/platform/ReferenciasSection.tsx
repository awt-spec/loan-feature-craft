import { useMemo, useState } from "react";
import {
  references,
  regionMeta,
  categoryMeta,
  footprint,
  getFlag,
  getFlags,
  type Reference,
  type RegionKey,
  type CategoryKey,
} from "@/lib/references";
import { WorldMap } from "./WorldMap";
import { Reveal, SpotlightCard, CountUp } from "./motion";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  ExternalLink,
  Filter,
  Globe2,
  Layers,
  MapPin,
  Search,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";

const modelStyles: Record<string, string> = {
  SaaS: "bg-primary/15 text-primary ring-primary/30",
  "On Premise": "bg-slate-500/15 text-slate-800 ring-slate-500/30 dark:text-slate-200",
};
function pillForModel(m: string) {
  if (m.includes("/")) return "bg-amber-500/15 text-amber-900 ring-amber-500/40 dark:text-amber-200";
  return modelStyles[m] ?? "bg-muted text-foreground ring-border";
}

type FilterKey = "all" | "near-py" | RegionKey | CategoryKey | "implementing";

const filterGroups: { key: FilterKey; label: string; hint?: string }[] = [
  { key: "all", label: "Todas" },
  { key: "near-py", label: "Cerca de Paraguay", hint: "Cono Sur + Brasil + Andina" },
  { key: "implementing", label: "En implementación" },
  { key: "banca", label: "Banca & Financieras" },
  { key: "pensiones", label: "Pensiones & AFP" },
  { key: "cooperativa", label: "Cooperativas" },
  { key: "factoring", label: "Factoring & Leasing" },
  { key: "microfinanzas", label: "Microfinanzas" },
  { key: "corporativo", label: "Corporativo" },
];

const NEAR_PY: RegionKey[] = ["cono-sur", "brasil", "andina"];

function matchFilter(r: Reference, f: FilterKey) {
  if (f === "all") return true;
  if (f === "near-py") return NEAR_PY.includes(r.region);
  if (f === "implementing") return r.status === "en-implementacion";
  if (f in regionMeta) return r.region === (f as RegionKey);
  if (f in categoryMeta) return r.category === (f as CategoryKey);
  return true;
}

export function ReferenciasSection() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Reference | null>(null);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return references
      .filter((r) => matchFilter(r, filter))
      .filter(
        (r) =>
          !t ||
          r.name.toLowerCase().includes(t) ||
          r.country.toLowerCase().includes(t) ||
          r.product.toLowerCase().includes(t),
      )
      .sort((a, b) => a.distanceRank - b.distanceRank);
  }, [filter, q]);

  // Group by region preserving proximity order
  const grouped = useMemo(() => {
    const map = new Map<RegionKey, Reference[]>();
    for (const r of filtered) {
      const arr = map.get(r.region) ?? [];
      arr.push(r);
      map.set(r.region, arr);
    }
    return Array.from(map.entries()).sort(
      ([a], [b]) => regionMeta[a].order - regionMeta[b].order,
    );
  }, [filtered]);

  // KPI totals (across full dataset, not filtered)
  const kpis = useMemo(() => {
    const countries = new Set<string>();
    references.forEach((r) => (r.countries ?? [r.country]).forEach((c) => countries.add(c)));
    const pensions = references.filter((r) => r.category === "pensiones").length;
    const banca = references.filter((r) => r.category === "banca").length;
    return { total: references.length, countries: countries.size, pensions, banca };
  }, []);

  return (
    <div className="space-y-8 pb-16 sm:space-y-10 sm:pb-20">
      {/* ─────────────────── HERO ─────────────────── */}
      <header className="relative overflow-hidden rounded-2xl border border-border bg-cinematic text-white shadow-sysde sm:rounded-3xl">
        <div className="pointer-events-none absolute inset-0 bg-grid-sysde-light opacity-40 mask-radial-fade" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative grid gap-6 p-5 sm:p-6 md:grid-cols-[1fr_auto] md:gap-8 md:p-10">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.24em] text-white/85">
              <span className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary pulse-dot" />
              <span className="truncate">Anexo · Casos verificables</span>
            </div>
            <h1 className="mt-3 font-heading text-2xl font-black leading-[1.1] tracking-tight sm:text-3xl md:text-5xl">
              Referencias SYSDE ordenadas
              <br className="hidden md:inline" />
              <span className="text-shimmer-light"> desde Paraguay hacia afuera</span>
            </h1>
            <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-white/90 sm:text-sm md:text-base">
              Instituciones financieras, AFP, cooperativas y microfinanzas operando sobre las
              plataformas SYSDE. La lista abre con los mercados más cercanos a Banco Atlas —
              Cono Sur, Brasil y región Andina — y se expande hacia Mesoamérica, Caribe y África.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:min-w-[280px]">
            <Kpi icon={Building2} label="Instituciones" value={String(kpis.total)} />
            <Kpi icon={Globe2} label="Países" value={String(kpis.countries)} />
            <Kpi icon={Users} label="Pensiones" value={String(kpis.pensions)} />
            <Kpi icon={Star} label="Banca" value={String(kpis.banca)} />
          </div>
        </div>
      </header>

      {/* ─────────────────── PRESENCIA OPERATIVA + MAPA MUNDI ─────────────────── */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-card-soft sm:rounded-3xl sm:p-6 md:p-8">
        <Reveal className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              <Globe2 className="h-3.5 w-3.5 shrink-0 animate-spin-slow" /> <span className="truncate">Presencia operativa SYSDE</span>
            </div>
            <h2 className="mt-2 font-heading text-lg font-black tracking-tight sm:text-xl md:text-2xl">
              Cobertura global para atender <span className="text-shimmer">Paraguay</span>
            </h2>
            <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-foreground/70 sm:text-sm">
              Clientes en 4 continentes, con fábricas de desarrollo, oficinas y soporte
              hispanohablante desplegados por toda la región latinoamericana.
            </p>
          </div>
          <div className="text-mono shrink-0 text-[10px] uppercase tracking-wider text-foreground/70">
            9 mercados operativos · 1 aliado local
          </div>
        </Reveal>

        {/* Global stat strip */}
        <Reveal delay={80}>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <GlobeStat value={400} suffix="+" label="Clientes financieros" />
            <GlobeStat value={34} label="Países" />
            <GlobeStat value={4} label="Continentes" />
            <GlobeStat value={1500} suffix="+" label="Proyectos ejecutados" />
          </div>
        </Reveal>

        {/* World map */}
        <Reveal delay={140} className="mt-6">
          <WorldMap />
        </Reveal>

        {/* Footprint cards */}
        <div className="mt-6 flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
          <MapPin className="h-3.5 w-3.5 shrink-0" /> Huella instalada · oficinas, fábricas y soporte
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {footprint.map((f, idx) => (
            <Reveal key={f.pais} delay={idx * 55}>
              <SpotlightCard
                className={[
                  "group relative h-full overflow-hidden rounded-2xl border p-4 transition",
                  f.highlight
                    ? "border-primary/50 bg-gradient-hero text-white shadow-sysde"
                    : "border-border bg-background text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-soft",
                ].join(" ")}
              >
                {f.highlight && (
                  <div className="pointer-events-none absolute inset-0 bg-grid-sysde-light opacity-30" />
                )}
                <div className="relative flex items-start justify-between">
                  <div
                    className={[
                      "flex h-9 w-9 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110",
                      f.highlight
                        ? "bg-white/15 ring-white/30"
                        : "bg-primary/10 text-primary ring-primary/20",
                    ].join(" ")}
                  >
                    <MapPin className="h-4 w-4" strokeWidth={2.25} />
                  </div>
                  <span className="text-2xl leading-none">{getFlag(f.pais)}</span>
                </div>
                <div className="relative mt-3 font-heading text-base font-black">{f.pais}</div>
                <div className="relative mt-2 flex flex-wrap gap-1.5">
                  {f.roles.map((r) => (
                    <span
                      key={r}
                      className={[
                        "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                        f.highlight
                          ? "border-white/40 bg-white/10 text-white"
                          : "border-border bg-muted/60 text-foreground/80",
                      ].join(" ")}
                    >
                      {r}
                    </span>
                  ))}
                </div>
                {f.note && (
                  <div
                    className={[
                      "relative mt-3 text-[11px] leading-snug",
                      f.highlight ? "text-white/95" : "text-foreground/70",
                    ].join(" ")}
                  >
                    {f.note}
                  </div>
                )}
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────────────── CONTROLS ─────────────────── */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-card-soft sm:rounded-3xl md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md md:flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/60" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar institución, país o producto…"
              className="w-full rounded-xl border border-border bg-background px-10 py-2.5 text-sm text-foreground shadow-sm outline-none transition placeholder:text-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-foreground/60 transition hover:bg-muted hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="text-mono flex items-center gap-2 text-[10px] uppercase tracking-wider text-foreground/70">
            <Filter className="h-3 w-3" />
            <span className="font-bold text-primary">{filtered.length}</span> de {references.length}
          </div>
        </div>

        <div className="mt-4 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          {filterGroups.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                title={f.hint}
                className={[
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                  active
                    ? "border-primary bg-gradient-hero text-white shadow-sysde"
                    : "border-border bg-background text-foreground/85 hover:border-primary/40 hover:text-primary",
                ].join(" ")}
              >
                {f.key === "near-py" && <Sparkles className="h-3 w-3" />}
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ─────────────────── GROUPED GRID ─────────────────── */}
      {grouped.length === 0 && (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          No hay referencias que coincidan con los filtros.
        </div>
      )}

      {grouped.map(([region, list], gIdx) => (
        <section key={region} className="relative">
          {/* Region rail */}
          <div className="mb-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:mb-5">
            <div className="text-mono flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-hero text-[11px] font-black text-white shadow-sysde">
              {String(gIdx + 1).padStart(2, "0")}
            </div>
            <div className="min-w-0">
              <div className="text-mono truncate text-[10px] uppercase tracking-[0.22em] text-primary">
                Región · {regionMeta[region].short}
              </div>
              <h2 className="truncate font-heading text-lg font-black tracking-tight sm:text-xl md:text-2xl">
                {regionMeta[region].label}
              </h2>
            </div>
            <div className="text-mono shrink-0 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-bold text-foreground/80 sm:px-3 sm:text-[11px]">
              {list.length}
              <span className="hidden sm:inline"> {list.length === 1 ? "referencia" : "referencias"}</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((r, i) => (
              <ReferenceCard
                key={`${region}-${r.name}-${i}`}
                r={r}
                highlight={NEAR_PY.includes(r.region)}
                onOpen={() => setSelected(r)}
              />
            ))}
          </div>
        </section>
      ))}

      {/* ─────────────────── MODAL ─────────────────── */}
      {selected && <DetailModal r={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/[0.08] p-3 backdrop-blur sm:rounded-2xl sm:p-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-hero text-white shadow-sysde ring-1 ring-white/30 sm:h-8 sm:w-8">
          <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
        </div>
        <div className="text-mono truncate text-[9px] uppercase tracking-[0.2em] text-white/85 sm:text-[10px]">
          {label}
        </div>
      </div>
      <div className="text-mono mt-1.5 font-heading text-xl font-black text-white sm:mt-2 sm:text-2xl">{value}</div>
    </div>
  );
}

function GlobeStat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4 transition hover:border-primary/40 hover:shadow-card-soft">
      <div className="text-mono font-heading text-2xl font-black text-gradient-sysde sm:text-3xl">
        <CountUp value={value} suffix={suffix} />
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
    </div>
  );
}

function ReferenceCard({
  r,
  highlight,
  onOpen,
}: {
  r: Reference;
  highlight: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className={[
        "group relative overflow-hidden rounded-2xl border bg-card p-4 text-left shadow-card-soft transition sm:p-5",
        "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sysde",
        highlight ? "border-primary/30" : "border-border",
      ].join(" ")}
    >
      {highlight && (
        <div className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/30">
          <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} /> <span className="hidden sm:inline">Cerca de </span>PY
        </div>
      )}
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-primary/15" />

      <div className="relative">
        {/* Head */}
        <div className="flex items-start gap-3">
          <div className="shrink-0 text-2xl leading-none">{getFlag(r.country)}</div>
          <div className={["min-w-0 flex-1", highlight ? "pr-12 sm:pr-16" : ""].join(" ")}>
            <h3 className="font-heading text-[15px] font-black leading-tight text-foreground transition group-hover:text-primary sm:text-base">
              {r.name}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-foreground/70">
              <MapPin className="h-3 w-3 shrink-0" strokeWidth={2.25} />
              <span className="line-clamp-1">
                {r.countries ? `${r.countries.length} países · ${r.country}` : r.country}
              </span>
            </div>
          </div>
        </div>

        {/* Meta pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/30">
            {r.product}
          </span>
          <span
            className={[
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1",
              pillForModel(r.model),
            ].join(" ")}
          >
            <Layers className="h-2.5 w-2.5" strokeWidth={2.5} /> {r.model}
          </span>
          {r.status === "en-implementacion" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-500/40 dark:text-amber-200">
              <Clock className="h-2.5 w-2.5" strokeWidth={2.5} /> En impl.
            </span>
          )}
        </div>

        {/* Stats */}
        {(r.affiliates || r.funds) && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {r.affiliates && (
              <div className="rounded-lg border border-border bg-muted/60 p-2">
                <div className="text-mono flex items-center gap-1 text-[9px] uppercase tracking-wider text-foreground/70">
                  <Users className="h-2.5 w-2.5" /> Afiliados
                </div>
                <div className="text-mono mt-0.5 font-heading text-sm font-black text-foreground">
                  {r.affiliates}
                </div>
              </div>
            )}
            {r.funds && (
              <div className="rounded-lg border border-primary/30 bg-primary/10 p-2">
                <div className="text-mono flex items-center gap-1 text-[9px] uppercase tracking-wider text-primary">
                  <DollarSign className="h-2.5 w-2.5" /> Fondos
                </div>
                <div className="text-mono mt-0.5 font-heading text-sm font-black text-primary">
                  {r.funds}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Detail */}
        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-foreground/85">
          {r.detail}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between gap-2 text-[11px] text-foreground/70">
          <span className="text-mono truncate uppercase tracking-wider">
            #{r.distanceRank.toString().padStart(2, "0")} desde PY
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-primary sm:opacity-0 sm:transition sm:group-hover:opacity-100">
            Ver detalle <ChevronRight className="h-3 w-3" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </button>
  );
}

function DetailModal({ r, onClose }: { r: Reference; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-md animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card shadow-2xl animate-in zoom-in-95"
      >
        {/* Head */}
        <div className="relative overflow-hidden border-b border-border bg-cinematic p-6 text-white md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-grid-sysde-light opacity-30" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/40 blur-3xl" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative flex items-start gap-3">
            <div className="text-4xl leading-none">{getFlag(r.country)}</div>
            <div className="min-w-0 flex-1 pr-10">
              <div className="text-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
                {regionMeta[r.region].label} · #{r.distanceRank.toString().padStart(2, "0")}
              </div>
              <h3 className="mt-1 font-heading text-2xl font-black leading-tight text-white md:text-3xl">
                {r.name}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 ring-white/25">
                  {r.product}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 ring-white/25">
                  <Layers className="h-3 w-3" /> {r.model}
                </span>
                {r.status === "en-implementacion" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/25 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-100 ring-1 ring-amber-300/40">
                    <Clock className="h-3 w-3" /> En implementación
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Country flags row for multi-country */}
          {r.countries && r.countries.length > 1 && (
            <div className="relative mt-5 flex flex-wrap gap-2">
              {r.countries.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white ring-1 ring-white/20"
                >
                  <span>{getFlag(c)}</span> {c}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="space-y-6 p-6 md:p-8">
          {(r.affiliates || r.funds) && (
            <div className="grid gap-3 sm:grid-cols-2">
              {r.affiliates && (
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/40 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Users className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <div>
                    <div className="text-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Afiliados
                    </div>
                    <div className="text-mono font-heading text-xl font-black text-foreground">
                      {r.affiliates}
                    </div>
                  </div>
                </div>
              )}
              {r.funds && (
                <div className="flex items-center gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-sysde">
                    <DollarSign className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <div>
                    <div className="text-mono text-[10px] uppercase tracking-wider text-primary">
                      Fondos administrados
                    </div>
                    <div className="text-mono font-heading text-xl font-black text-primary">
                      {r.funds}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              Alcance de la solución
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/90">{r.detail}</p>
          </div>

          <div className="rounded-2xl border-l-4 border-primary bg-accent/60 p-4">
            <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} /> Resultado
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{r.result}</p>
          </div>

          {r.modules && r.modules.length > 0 && (
            <div>
              <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                Módulos implementados
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {r.modules.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                  >
                    <CheckCircle2 className="h-3 w-3 text-primary" strokeWidth={2.5} /> {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(r.contact || r.website) && (
            <div className="grid gap-3 sm:grid-cols-2">
              {r.contact && (
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="text-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Referencia de contacto
                  </div>
                  <div className="mt-1 font-heading text-sm font-bold text-foreground">
                    {r.contact}
                  </div>
                </div>
              )}
              {r.website && (
                <a
                  href={r.website}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-background p-4 transition hover:border-primary/40 hover:bg-primary/5"
                >
                  <div>
                    <div className="text-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Sitio web
                    </div>
                    <div className="mt-1 text-mono text-sm font-bold text-primary">
                      {r.website.replace(/^https?:\/\//, "")}
                    </div>
                  </div>
                  <ExternalLink
                    className="h-4 w-4 text-primary transition group-hover:translate-x-0.5"
                    strokeWidth={2.25}
                  />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
