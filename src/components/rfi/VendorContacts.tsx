import { Globe, Mail, Phone, Building2, Users } from "lucide-react";
import { vendor, canales } from "@/lib/rfi-content";
import { SectionTitle } from "./SectionTitle";

export function VendorContacts() {
  return (
    <section id="proveedor" className="mx-auto max-w-6xl px-6 py-20">
      <SectionTitle eyebrow="Sección 3 · 4.1" title="Proveedor y canales de comunicación" />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Vendor card */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-dark p-8 text-white">
          <div className="absolute inset-0 bg-grid-sysde-light opacity-30" />
          <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  Proveedor
                </div>
                <h3 className="mt-2 font-heading text-3xl font-black md:text-4xl">
                  {vendor.razon}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-white/75">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1">
                    <Building2 className="h-3.5 w-3.5" /> {vendor.pais}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1">
                    <Users className="h-3.5 w-3.5" /> {vendor.anios}
                  </span>
                  <a
                    href={`https://${vendor.web}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 hover:bg-white/10"
                  >
                    <Globe className="h-3.5 w-3.5" /> {vendor.web}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {vendor.contactos.map((c) => (
                <div key={c.email} className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-hero font-heading text-sm font-black text-white shadow-sysde">
                      {c.iniciales}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-heading text-base font-bold">{c.nombre}</div>
                      <div className="mt-0.5 text-xs text-white/70">{c.cargo}</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1.5 text-sm">
                    <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-white/90 hover:text-white">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      <span className="truncate">{c.email}</span>
                    </a>
                    <a href={`tel:${c.tel.replace(/\s/g, "")}`} className="flex items-center gap-2 text-white/90 hover:text-white">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      {c.tel}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Channels card */}
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card-soft">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Canales oficiales
          </div>
          <h3 className="mt-2 font-heading text-2xl font-black text-foreground">
            Banco Atlas · EY
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Todas las comunicaciones en idioma español. Contacto fuera de estos canales puede ser motivo de
            descalificación.
          </p>
          <ul className="mt-6 space-y-4">
            {canales.map((c) => (
              <li key={c.email} className="flex items-start gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-xs font-black text-accent-foreground">
                  {c.iniciales}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-heading font-bold text-foreground">{c.nombre}</div>
                  <div className="text-xs text-muted-foreground">{c.cargo}</div>
                  <a href={`mailto:${c.email}`} className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                    <Mail className="h-3 w-3" /> {c.email}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
