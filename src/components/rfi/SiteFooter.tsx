export function SiteFooter() {
  return (
    <footer className="bg-gradient-dark text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-heading text-2xl font-black">
              <span className="text-primary">SYSDE</span> · Inventiva
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Plataforma SAF+ · Core bancario integral. Respuesta formal al RFI de Banco Atlas S.A., con
              acompañamiento de EY.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Fecha límite</div>
            <div className="mt-2 font-heading text-4xl font-black">17 · Jul · 2026</div>
            <div className="mt-1 text-sm text-white/70">Canal · Correo electrónico</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Contactos</div>
            <ul className="mt-3 space-y-1.5 text-sm text-white/85">
              <li>carlos.rolon@atlas.com.py</li>
              <li>diego.fleitas@atlas.com.py</li>
              <li>lezlie.monge@cr.ey.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-white/50">
          <span>Documento confidencial</span>
          <span>Banco Atlas × SYSDE × Inventiva · 2026</span>
        </div>
      </div>
    </footer>
  );
}
