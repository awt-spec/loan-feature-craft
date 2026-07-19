import { MapPin } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

const footprint = [
  { pais: "Costa Rica", roles: ["Oficina", "Fábrica", "SVA"] },
  { pais: "Perú", roles: ["Oficina", "Fábrica", "SVA"] },
  { pais: "Colombia", roles: ["Oficina", "Fábrica", "SVA"] },
  { pais: "El Salvador", roles: ["Oficina", "Fábrica", "SVA"] },
  { pais: "México", roles: ["Oficina", "SVA"] },
  { pais: "República Dominicana", roles: ["SVA"] },
  { pais: "Paraguay", roles: ["SVA vía Inventiva"], highlight: true },
  { pais: "Senegal", roles: ["Oficina"] },
];

export function References() {
  return (
    <section id="referencias" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Huella operativa"
          title="Presencia regional SYSDE"
          description="Estructura instalada en los mercados donde atiende a sus clientes prioritarios."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {footprint.map((f) => (
            <div
              key={f.pais}
              className={`rounded-2xl border p-5 transition-all ${
                f.highlight
                  ? "border-primary/40 bg-gradient-hero text-primary-foreground shadow-sysde"
                  : "border-border bg-card text-foreground shadow-card-soft"
              }`}
            >
              <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                f.highlight ? "bg-white/20" : "bg-accent text-accent-foreground"
              }`}>
                <MapPin className="h-4 w-4" />
              </div>
              <div className="mt-3 font-heading text-lg font-black">{f.pais}</div>
              <div className={`mt-1 flex flex-wrap gap-1.5 text-[11px] font-semibold uppercase tracking-wider ${
                f.highlight ? "text-white/85" : "text-muted-foreground"
              }`}>
                {f.roles.map((r) => (
                  <span key={r} className={`rounded-full border px-2 py-0.5 ${
                    f.highlight ? "border-white/30" : "border-border"
                  }`}>{r}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
