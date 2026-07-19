## Objetivo

Convertir el documento **RFI Core Banco Atlas — SYSDE / Inventiva (17-Jul-2026)** en un sitio web de una sola página, ultra estructurado y visualmente potente ("chuzo"), reutilizando exactamente el design system del proyecto **Loan Feature Map**:

- Rojo SYSDE `#C8102E` como color primario
- Tipografía Montserrat (títulos) + Inter (cuerpo)
- Utilidades `bg-gradient-hero`, `shadow-sysde`, `text-gradient-sysde`, `bg-grid-sysde`
- Radios y sombras del sistema, dark mode listo

## Estructura del sitio (una sola ruta `/`)

Layout tipo "documento premium" con navegación sticky lateral (TOC) y secciones ancladas:

```text
┌────────────────────────────────────────────────────────┐
│ TopBar: Logo SYSDE  ·  Banco Atlas RFI  · badge fecha  │
├─────────────┬──────────────────────────────────────────┤
│  TOC        │  HERO (gradient rojo + grid)             │
│  sticky     │  ─ Datos del proceso (cards)             │
│  numerada   │  ─ Contexto & Objetivo                   │
│  1..6       │  ─ Proveedor & Contactos                 │
│             │  ─ Instrucciones                         │
│             │  ─ Preguntas 1–6 (acordeón/cards)        │
│             │  ─ Referencias regionales (tabla)        │
│             │  ─ Condiciones generales                 │
└─────────────┴──────────────────────────────────────────┘
```

### Secciones

1. **Hero** — fondo `bg-gradient-hero` + `bg-grid-sysde-light`, título "RFI Core Bancario · Banco Atlas × SYSDE", subtítulo, chips (Asunción 2026, Emisión 10-Jul, Cierre 17-Jul, Canal: Email), CTA "Ir a las preguntas".

2. **Datos del proceso** — grid de 6 KPI cards con icono (Institución, Tipo, Objeto, Emisión, Cierre, Canal).

3. **Contexto & Objetivo** — bloque tipográfico con callout destacado: *"Este documento NO representa un compromiso de contratación"*.

4. **Proveedor & Contactos** — card SYSDE (Costa Rica · +35 años) + subgrid con 2 contactos (CCO Alberto Wheelock, CEO Eduardo Wheelock) con email/tel/WhatsApp clicables. Card aparte para canales oficiales Banco Atlas / EY (Carlos Rolón, Diego Fleitas, Lezlie Monge).

5. **Instrucciones RFI** — lista con iconos: formato, calidad, evaluación, envío, consultas + badges de cumplimiento (Sí/No/Parcial) y madurez (Básico/Intermedio/Avanzado).

6. **Preguntas 1–6** — el corazón del sitio. Cada pregunta como card grande numerada con:
   - Header rojo con nº grande y título
   - "Orientación al proveedor" (bloque muted)
   - "Respuesta del proveedor" (bloque destacado)
   - Badges **Nivel de cumplimiento** y **Nivel de madurez** en la esquina
   - Contenido en prose con listas, sub-secciones (stack tecnológico, huella operativa, backups, integraciones SIPAP/Bancard, etc.)

   Preguntas identificadas:
   1. Facturación anual, tamaño de equipo, cantidad de clientes en producción — *Avanzado*
   2. Lenguajes y stack (C# / .NET 10 LTS) — Sí / Avanzado
   3. Contabilidad centralizada por parametrización — Sí / Avanzado
   4. Backups, RPO ≤ 15 min, retenciones, WORM
   5. Soporte N1/N2 hispanohablante en Paraguay (Inventiva) — presencial regional
   6. SIPAP/SNP (ACH/LBTR) y Bancard API-first — Parcial / Intermedio

7. **Referencias regionales** — tabla estilizada (Unicomer y otras) + mapa/lista de huella SYSDE (Costa Rica, Perú, Colombia, México, El Salvador, RD, Paraguay via Inventiva).

8. **Condiciones generales** — checklist final.

9. **Footer** — contactos, fecha límite grande, disclaimer confidencial.

## Componentes UI (shadcn ya disponibles)

- `Card`, `Badge`, `Separator`, `Accordion` (para orientación colapsable en preguntas), `Table`, `Button`
- Iconos: `lucide-react` (Building2, Calendar, Mail, Phone, ShieldCheck, Server, Database, Globe, MapPin, FileCheck)

## Cambios técnicos

- Reemplazar `src/styles.css` con el design system SYSDE de "Loan Feature Map" (rojo #C8102E, Montserrat/Inter, utilidades gradient/grid/shadow).
- Añadir fuentes Google (Montserrat 600/700/800 + Inter 400/500/600) vía `<link>` en `head()` de `__root.tsx`.
- Actualizar metadata en `__root.tsx`: title "RFI Core Bancario — Banco Atlas × SYSDE", description, og.
- Reescribir `src/routes/index.tsx` como la landing completa del RFI.
- Crear componentes en `src/components/rfi/`:
  - `Hero.tsx`
  - `ProcessData.tsx`
  - `ContextSection.tsx`
  - `VendorContacts.tsx`
  - `Instructions.tsx`
  - `Questions.tsx` (+ data en `questions.ts`)
  - `References.tsx`
  - `Conditions.tsx`
  - `SideToc.tsx` (navegación lateral sticky con scroll-spy)
  - `TopBar.tsx`, `SiteFooter.tsx`
- Data centralizada en `src/lib/rfi-content.ts` con todos los textos del documento (fiel al original, en español).

## Detalles de diseño (para que quede "chuzo")

- Hero con overlay grid y un gran número "6" translúcido detrás del título aludiendo a las 6 preguntas.
- Cada pregunta con un "chip" de nº grande (`text-7xl font-heading text-gradient-sysde`) al lado del título.
- Badges de cumplimiento con color: Sí = rojo SYSDE sólido, Parcial = ámbar suave, No = gris.
- Badges de madurez con outline y punto de color (Avanzado = rojo lleno, Intermedio = medio, Básico = vacío).
- Cards con `shadow-sysde` sutil en hover, borde 1px, `rounded-2xl`.
- Tipografía: h1 clamp(2.5rem, 5vw, 4.5rem), tracking tight.
- Sección de contactos con avatares circulares con iniciales sobre gradient rojo.
- Tabla de clientes con header rojo y filas zebra sutil.
- Print stylesheet mínima para que el PDF del sitio también salga bien.

## Fuera de alcance

- No se agrega backend, base de datos, autenticación ni formularios.
- No se toca la lógica de router/SSR más allá de la ruta `/` existente.
- El contenido es el del documento subido, sin inventar cifras nuevas.
