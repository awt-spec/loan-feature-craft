import { ArrowDown, CalendarDays, Mail, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      <div className="absolute inset-0 bg-grid-sysde-light mask-radial-fade opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 select-none font-heading text-[28rem] font-black leading-none text-white/5"
      >
        6
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Request for Information · 2026
        </div>
        <h1 className="max-w-4xl font-heading text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          RFI Core Bancario
          <span className="block text-white/70">Banco Atlas × SYSDE</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
          Respuesta formal de <strong className="text-white">SYSDE Internacional Inc.</strong> junto a su
          aliado local <strong className="text-white">Inventiva</strong> al proceso de selección de plataforma
          tecnológica de Core Bancario acompañado por EY.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Chip icon={<MapPin className="h-3.5 w-3.5" />} label="Asunción, Paraguay" />
          <Chip icon={<CalendarDays className="h-3.5 w-3.5" />} label="Emisión · 10 Jul 2026" />
          <Chip icon={<CalendarDays className="h-3.5 w-3.5" />} label="Cierre · 17 Jul 2026" />
          <Chip icon={<Mail className="h-3.5 w-3.5" />} label="Canal · Correo electrónico" />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#preguntas"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-white/90 hover:shadow-2xl"
          >
            Ir a las 6 preguntas
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#proveedor"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Datos del proveedor
          </a>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/10 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 text-xs uppercase tracking-[0.2em] text-white/75">
          <span>Banco Atlas S.A.</span>
          <span className="hidden sm:inline">Acompañamiento EY</span>
          <span>SYSDE · Inventiva</span>
          <span className="hidden md:inline">Confidencial</span>
        </div>
      </div>
    </section>
  );
}

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
      {icon}
      {label}
    </span>
  );
}
