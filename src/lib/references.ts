// SYSDE — Referencias regionales
// Ordenadas por cercanía geográfica a Paraguay (Asunción)
// para el RFI Banco Atlas S.A.

export type ReferenceStatus = "activo" | "en-implementacion";

export interface Reference {
  name: string;
  country: string;
  countries?: string[];
  region: RegionKey;
  distanceRank: number; // menor = más cerca de Paraguay
  category: CategoryKey;
  model: string;
  product: string;
  detail: string;
  result: string;
  modules?: string[];
  contact?: string;
  website?: string;
  affiliates?: string;
  funds?: string;
  status?: ReferenceStatus;
}

export type RegionKey =
  | "cono-sur"
  | "andina"
  | "brasil"
  | "mesoamerica"
  | "caribe"
  | "norteamerica"
  | "africa"
  | "global";

export type CategoryKey =
  | "banca"
  | "pensiones"
  | "cooperativa"
  | "factoring"
  | "microfinanzas"
  | "corporativo";

export const regionMeta: Record<RegionKey, { label: string; short: string; order: number }> = {
  "cono-sur":     { label: "Cono Sur",        short: "S. Sur",  order: 1 },
  andina:         { label: "Región Andina",   short: "Andina",  order: 2 },
  brasil:         { label: "Brasil",          short: "Brasil",  order: 3 },
  mesoamerica:    { label: "Mesoamérica",     short: "MesoAm.", order: 4 },
  caribe:         { label: "Caribe",          short: "Caribe",  order: 5 },
  norteamerica:   { label: "Norteamérica",    short: "NorteAm.",order: 6 },
  africa:         { label: "África",          short: "África",  order: 7 },
  global:         { label: "Cobertura Global",short: "Global",  order: 8 },
};

export const categoryMeta: Record<CategoryKey, { label: string }> = {
  banca:          { label: "Banca & Financieras" },
  pensiones:      { label: "Pensiones & AFP" },
  cooperativa:    { label: "Cooperativas" },
  factoring:      { label: "Factoring & Leasing" },
  microfinanzas:  { label: "Microfinanzas" },
  corporativo:    { label: "Corporativo" },
};

export const countryFlags: Record<string, string> = {
  Paraguay: "🇵🇾",
  Uruguay: "🇺🇾",
  Argentina: "🇦🇷",
  Chile: "🇨🇱",
  Bolivia: "🇧🇴",
  Brasil: "🇧🇷",
  Perú: "🇵🇪",
  Colombia: "🇨🇴",
  Ecuador: "🇪🇨",
  Venezuela: "🇻🇪",
  México: "🇲🇽",
  Guatemala: "🇬🇹",
  "El Salvador": "🇸🇻",
  Honduras: "🇭🇳",
  Nicaragua: "🇳🇮",
  "Costa Rica": "🇨🇷",
  Panamá: "🇵🇦",
  "República Dominicana": "🇩🇴",
  Cuba: "🇨🇺",
  "Puerto Rico": "🇵🇷",
  "Trinidad y Tobago": "🇹🇹",
  "Estados Unidos": "🇺🇸",
  Ruanda: "🇷🇼",
  Yibuti: "🇩🇯",
  Mali: "🇲🇱",
  Guinea: "🇬🇳",
  Senegal: "🇸🇳",
  Tanzania: "🇹🇿",
  "Burkina Faso": "🇧🇫",
  Centroamérica: "🌎",
  Global: "🌐",
};

export function getFlag(country: string): string {
  if (countryFlags[country]) return countryFlags[country];
  for (const [k, f] of Object.entries(countryFlags)) if (country.includes(k)) return f;
  return "🌎";
}
export function getFlags(r: Reference): string[] {
  return r.countries?.length ? r.countries.map(getFlag) : [getFlag(r.country)];
}

// -----------------------------------------------------------------------------
// Referencias — ordenadas por cercanía a Paraguay
// distanceRank crece con la distancia (Uruguay = 1, Global = 999)
// -----------------------------------------------------------------------------

export const references: Reference[] = [
  // ═══════════════════════════════════════════════════════════════════
  // CONO SUR — vecinos inmediatos de Paraguay
  // ═══════════════════════════════════════════════════════════════════
  {
    name: "República AFAP",
    country: "Uruguay",
    region: "cono-sur",
    distanceRank: 1,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Administradora de fondos de ahorro previsional del Banco República. Gestión integral con SYSDE Pensiones en un entorno de plena vigencia regulatoria uruguaya.",
    result: "Líder del mercado previsional uruguayo. +1.6M de afiliados atendidos.",
    affiliates: "1.6M",
    funds: "$22,000M USD",
  },
  {
    name: "Integración AFAP",
    country: "Uruguay",
    region: "cono-sur",
    distanceRank: 1,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Plataforma SYSDE Pensiones para la administración de fondos de ahorro previsional. Operación multi-fondo con integración contable y regulatoria.",
    result: "Gestión eficiente de más de 1.65 millones de afiliados.",
    affiliates: "1,654,967",
    funds: "$22,103M USD",
  },
  {
    name: "AFAP Sura",
    country: "Uruguay",
    region: "cono-sur",
    distanceRank: 1,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Filial del Grupo Sura en Uruguay. SYSDE Pensiones como núcleo operativo con soporte para el estándar regulatorio local.",
    result: "Presencia regional consolidada con administración de fondos previsionales.",
    affiliates: "7.8M",
    funds: "$11,512M USD",
  },
  {
    name: "Unión Capital AFAP",
    country: "Uruguay",
    region: "cono-sur",
    distanceRank: 1,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "AFAP uruguaya con foco en gestión eficiente de aportes personales y patronales. Corre sobre la plataforma SYSDE Pensiones.",
    result: "Administra pensiones para más de 375 mil afiliados uruguayos.",
    affiliates: "375,255",
    funds: "$3,789M USD",
  },
  {
    name: "Futuro de Bolivia AFP",
    country: "Bolivia",
    region: "cono-sur",
    distanceRank: 2,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Principal administradora de fondos de pensiones en Bolivia. Implementación de SYSDE Pensiones para el ciclo completo de aportes, rentabilidad y beneficios.",
    result: "Líder del sistema previsional boliviano.",
    affiliates: "500,000",
    funds: "$20,998M USD",
  },
  {
    name: "AFP Habitat",
    country: "Chile",
    region: "cono-sur",
    distanceRank: 3,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Una de las principales AFP del sistema chileno. Uso de SYSDE Pensiones para gestión de fondos.",
    result: "Administración eficiente de fondos previsionales con tecnología SYSDE.",
    affiliates: "587,097",
    funds: "$821M USD",
  },

  // ═══════════════════════════════════════════════════════════════════
  // BRASIL — frontera norte
  // ═══════════════════════════════════════════════════════════════════
  {
    name: "Petros",
    country: "Brasil",
    region: "brasil",
    distanceRank: 4,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Fundo de pensão de Petrobras — uno de los mayores fondos de pensiones de Brasil. SYSDE Pensiones da soporte a la operación.",
    result: "Gestión de pensiones para más de 220 mil participantes.",
    affiliates: "220,000",
    funds: "$784M USD",
  },
  {
    name: "Tokio Marine Seguradora",
    country: "Brasil",
    region: "brasil",
    distanceRank: 4,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Administración de fondos de pensiones y seguros bajo SYSDE Pensiones dentro del grupo asegurador japonés en Brasil.",
    result: "Gestión previsional con respaldo global de Tokio Marine.",
    affiliates: "52,000",
    funds: "$37.1M USD",
  },

  // ═══════════════════════════════════════════════════════════════════
  // REGIÓN ANDINA
  // ═══════════════════════════════════════════════════════════════════
  {
    name: "Prima AFP",
    country: "Perú",
    region: "andina",
    distanceRank: 5,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "AFP peruana referencial del sistema privado. Corre sobre SYSDE Pensiones con integraciones al ecosistema SBS/SUNAT.",
    result: "Gestión eficiente para millones de afiliados peruanos.",
    affiliates: "2.3M",
    funds: "$13,078M USD",
  },
  {
    name: "ProFuturo AFP",
    country: "Perú",
    region: "andina",
    distanceRank: 5,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Administradora de fondos de pensiones peruana con la plataforma SYSDE Pensiones.",
    result: "Gestión previsional para trabajadores peruanos con altos estándares regulatorios.",
    affiliates: "1.7M",
    funds: "$26.3M USD",
  },
  {
    name: "Porvenir",
    country: "Colombia",
    region: "andina",
    distanceRank: 6,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Mayor administradora de pensiones y cesantías de Colombia. SYSDE Pensiones sostiene la operación multi-fondo.",
    result: "Cobertura nacional con la mayor cartera previsional de Colombia.",
    affiliates: "14.8M",
    funds: "$47,000M USD",
  },
  {
    name: "Colfondos (Habitat)",
    country: "Colombia",
    region: "andina",
    distanceRank: 6,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Fondo de pensiones y cesantías colombiano dentro de Grupo Habitat. Uso de SYSDE Pensiones.",
    result: "Gestión previsional para más de 5.2 millones de afiliados colombianos.",
    affiliates: "5.2M",
    funds: "$12,500M USD",
  },
  {
    name: "Factor y Valor",
    country: "Colombia",
    region: "andina",
    distanceRank: 6,
    category: "factoring",
    model: "SaaS",
    product: "SAF (Factoring)",
    detail:
      "Administración de cartera de Factoring. Más de una década como aliado financiero de pymes colombianas.",
    result: "Operación de Factoring para pymes con soluciones de capital de trabajo.",
    contact: "Jorge Ivan Bedoya Correa — Director General",
  },
  {
    name: "Mercantil Pensiones",
    country: "Venezuela",
    region: "andina",
    distanceRank: 7,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Administración de fondos de pensiones del grupo Mercantil. Uso de SYSDE Pensiones.",
    result: "Gestión previsional para más de 100 mil afiliados.",
    affiliates: "100,007",
    funds: "$150.28M USD",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MESOAMÉRICA — México y Centroamérica
  // ═══════════════════════════════════════════════════════════════════
  {
    name: "Afore XXI Banorte",
    country: "México",
    region: "mesoamerica",
    distanceRank: 10,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Una de las mayores Afores de México. SYSDE Pensiones como núcleo de operación de fondos de retiro.",
    result: "Administración de fondos de retiro para millones de trabajadores mexicanos.",
    affiliates: "7.2M",
    funds: "$49,597M USD",
  },
  {
    name: "Banorte Pensiones",
    country: "México",
    region: "mesoamerica",
    distanceRank: 10,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Gestión de pensiones y fondos de retiro con SYSDE Pensiones dentro del grupo Banorte.",
    result: "Cobertura previsional a gran escala en el mercado mexicano.",
    affiliates: "12M",
    funds: "$39,633M USD",
  },
  {
    name: "Afore Pensionissste Contigo",
    country: "México",
    region: "mesoamerica",
    distanceRank: 10,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Afore del sector público mexicano. SYSDE Pensiones administra fondos de retiro.",
    result: "Fondos de retiro para trabajadores del sector público mexicano.",
    affiliates: "1M",
    funds: "$27,000M USD",
  },
  {
    name: "Inbursa Afore",
    country: "México",
    region: "mesoamerica",
    distanceRank: 10,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Afore del grupo financiero Inbursa sobre SYSDE Pensiones.",
    result: "Fondos de retiro para más de 1.1 millones de afiliados.",
    affiliates: "1.1M",
    funds: "$9,291M USD",
  },
  {
    name: "Profuturo (Scotiabank)",
    country: "México",
    region: "mesoamerica",
    distanceRank: 10,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Afore respaldada por Scotiabank. Gestión de fondos de retiro con SYSDE Pensiones.",
    result: "Administración de fondos de retiro para 1.7 millones de trabajadores.",
    affiliates: "1.7M",
    funds: "$6,503M USD",
  },
  {
    name: "MetLife Pensiones",
    country: "México",
    region: "mesoamerica",
    distanceRank: 10,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Administración de fondos de pensiones y seguros con SYSDE Pensiones.",
    result: "Gestión de pensiones con respaldo de aseguradora global.",
    affiliates: "698,784",
    funds: "$12,000M USD",
  },
  {
    name: "Principal Pensiones",
    country: "México",
    region: "mesoamerica",
    distanceRank: 10,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Administración de fondos de retiro con SYSDE Pensiones y respaldo del grupo financiero internacional Principal.",
    result: "Gestión de fondos de retiro a gran escala en México.",
    affiliates: "3,085,011",
    funds: "$12,500M USD",
  },
  {
    name: "ION",
    country: "México",
    region: "mesoamerica",
    distanceRank: 10,
    category: "banca",
    model: "On Premise / SaaS",
    product: "nSAF + SAF+",
    detail:
      "Implementación exitosa de nSAF para industria inmobiliaria: crédito puente y financiamiento de vivienda. SAF+ en proceso. App móvil para avance de obras.",
    result: "+1,090 sueños de vivienda cumplidos, +$15 mil MDP en construcción, +10 mil viviendas financiadas.",
    contact: "Edgar Rojas Flores — Líder nSAF",
  },
  {
    name: "Broxel",
    country: "México",
    countries: ["México", "Estados Unidos"],
    region: "mesoamerica",
    distanceRank: 10,
    category: "banca",
    model: "SaaS",
    product: "SYSDE SAF",
    detail:
      "Implementación de SYSDE SAF como core central para Banca Digital. Broxel lanzó una de las primeras Super Apps en México.",
    result: "Primera Fintech Digital en México. Tarjetas Débito/Crédito en entorno digital (México y USA).",
    contact: "Rodrigo Díaz — VP Operaciones",
  },
  {
    name: "Bankaool",
    country: "México",
    region: "mesoamerica",
    distanceRank: 10,
    category: "banca",
    model: "On Premise / SaaS",
    product: "SYSDE SAF",
    detail:
      "Evolución con SYSDE desde cooperativa hasta banco de primer piso. Operación 100% digital 24×7.",
    result: "+25 años en operación. Licencia bancaria desde 2019.",
    contact: "Randall González — CTO",
  },
  {
    name: "Financiera MultiMoney",
    country: "Centroamérica",
    countries: ["Guatemala", "El Salvador", "Honduras", "Nicaragua", "Costa Rica"],
    region: "mesoamerica",
    distanceRank: 12,
    category: "banca",
    model: "SaaS",
    product: "SYSDE Banca",
    detail:
      "Core Bancario SYSDE Banca operando a nivel regional. Ecosistema Akros como corporativo tecnológico.",
    result: "+10 años en operación regional exitosa.",
    modules: ["Seguridad", "Préstamos", "Cobranza", "Ahorros", "Depósitos", "Contabilidad", "PLD", "Factoraje"],
    contact: "Ernesto Fernández Lang — Presidente",
    website: "https://multimoney.com/",
  },
  {
    name: "Grupo CMI",
    country: "Guatemala +11 países",
    countries: ["Guatemala","El Salvador","Honduras","Nicaragua","Costa Rica","Panamá","México","Colombia","Ecuador","Perú","Chile","República Dominicana"],
    region: "mesoamerica",
    distanceRank: 12,
    category: "factoring",
    model: "SaaS",
    product: "SAF+",
    detail:
      "SAF+ para Factoring y Leasing multi-país y multi-moneda. Integración con SAP Business One.",
    result: "En ejecución — Plataforma end-to-end para Factoring, Leasing y Crédito Puente.",
    modules: ["Factoring", "Leasing", "Crédito Puente"],
    website: "https://somoscmi.com/es/",
    status: "en-implementacion",
  },
  {
    name: "Financiera MVA",
    country: "Guatemala",
    region: "mesoamerica",
    distanceRank: 12,
    category: "banca",
    model: "On Premise / SaaS",
    product: "SYSDE Banca",
    detail: "SYSDE Banca apoyando el crecimiento de PyMEs guatemaltecas con módulos completos de core.",
    result: "Implementación exitosa con módulos completos de core bancario.",
    modules: ["Seguridad", "Préstamos", "Cobranza", "Ahorros", "Depósitos", "Contabilidad", "PLD", "Factoraje"],
    contact: "Mario Ernesto López Pineda — Gerente General",
    website: "https://www.financieramva.com/",
  },
  {
    name: "AMC",
    country: "El Salvador",
    region: "mesoamerica",
    distanceRank: 13,
    category: "banca",
    model: "SaaS",
    product: "SAF+",
    detail:
      "Plataforma modular todo-incluido, end-to-end, multimoneda con trazabilidad total. Alineada a nuevas regulaciones vigentes en El Salvador.",
    result: "En ejecución desde agosto de 2025.",
    website: "https://amc.com.sv",
    status: "en-implementacion",
  },
  {
    name: "AFP Confía",
    country: "El Salvador",
    region: "mesoamerica",
    distanceRank: 13,
    category: "pensiones",
    model: "On Premise / SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Implementación desde su fundación en 1998. Líder en fondos previsionales en Centroamérica y el Caribe.",
    result: "+15 años en operación. +1.8M de trabajadores salvadoreños atendidos.",
    contact: "Luis Diego Varaona Magaña — Dir. Operaciones y Tecnología",
    website: "https://www.confia.com.sv/",
    affiliates: "1.8M",
    funds: "$8,219M USD",
  },
  {
    name: "AFP Crecer",
    country: "El Salvador",
    region: "mesoamerica",
    distanceRank: 13,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Administración de fondos de pensiones en El Salvador con SYSDE Pensiones.",
    result: "Cobertura para 1.5 millones de trabajadores salvadoreños.",
    affiliates: "1.5M",
    funds: "$4,505M USD",
  },
  {
    name: "RAP",
    country: "Honduras",
    region: "mesoamerica",
    distanceRank: 14,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Régimen de Aportaciones Privadas. Implementación de SYSDE Pensiones para fondos previsionales.",
    result: "Gestión de pensiones para más de 273 mil afiliados hondureños.",
    affiliates: "273,101",
    funds: "$1,540M USD",
  },
  {
    name: "AFP Atlántida",
    country: "Honduras",
    region: "mesoamerica",
    distanceRank: 14,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Administración de fondos de pensiones en Honduras con SYSDE Pensiones.",
    result: "Gestión previsional para trabajadores hondureños.",
    affiliates: "78,000",
    funds: "$1,157M USD",
  },
  {
    name: "AFP Atlántico",
    country: "Honduras",
    region: "mesoamerica",
    distanceRank: 14,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Administración de fondos de pensiones en Honduras con SYSDE Pensiones.",
    result: "Gestión previsional para más de 104 mil afiliados.",
    affiliates: "104,047",
    funds: "$382.7M USD",
  },
  {
    name: "AFPC Occidente",
    country: "Honduras",
    region: "mesoamerica",
    distanceRank: 14,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Administradora de fondos de pensiones y cesantías en Honduras con SYSDE Pensiones.",
    result: "Gestión previsional para más de 82 mil afiliados hondureños.",
    affiliates: "82,539",
    funds: "$161.5M USD",
  },
  {
    name: "Dos Pinos",
    country: "Costa Rica",
    countries: ["Costa Rica","Guatemala","El Salvador","Honduras","Nicaragua","Panamá","República Dominicana"],
    region: "mesoamerica",
    distanceRank: 15,
    category: "corporativo",
    model: "SaaS",
    product: "SAF+",
    detail:
      "SYSDE SAF+ optimizando operaciones con módulos de Seguridad, Clientes, Contabilidad, SICVECA, Préstamos y Líneas de Crédito. Integración con SAP B1.",
    result: "+200 puntos de venta en Centroamérica, +70 años de historia, +10M consumidores.",
    modules: ["Seguridad", "Clientes", "Contabilidad", "SICVECA", "Préstamos", "Líneas de Crédito"],
    contact: "Kelvin Calvo Brown — Consultor de Estrategia TI",
    status: "en-implementacion",
  },
  {
    name: "COOPECAR R.L.",
    country: "Costa Rica",
    region: "mesoamerica",
    distanceRank: 15,
    category: "cooperativa",
    model: "On Premise / SaaS",
    product: "SAF (Cooperativas)",
    detail:
      "SYSDE SAF para Cooperativas. Cuentas de Efectivo, Depósitos, Préstamos, Contabilidad, Cajas, SICVECA.",
    result: "Cliente activo desde 2006 con mantenimiento y actualizaciones regulatorias continuas.",
    modules: ["Cuentas de Efectivo", "Depósitos", "Préstamos", "Contabilidad", "Cajas", "SICVECA"],
    contact: "MBA Carmen Milena Arce Alfaro — Gerente General",
  },
  {
    name: "SOFIMSA",
    country: "Costa Rica",
    region: "mesoamerica",
    distanceRank: 15,
    category: "factoring",
    model: "SaaS",
    product: "SAF+",
    detail: "SaaS en Microsoft Azure de Factoring administrado por SYSDE SAF+.",
    result: "Cartera de Factoring con soluciones de capital de trabajo.",
  },
  {
    name: "BNVital",
    country: "Costa Rica",
    region: "mesoamerica",
    distanceRank: 15,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail:
      "Operadora de pensiones del Banco Nacional de Costa Rica. Implementación de SYSDE Pensiones.",
    result: "Gestión de pensiones para más de 540 mil afiliados costarricenses.",
    affiliates: "540,946",
    funds: "$4,981M USD",
  },
  {
    name: "Popular Pensiones",
    country: "Costa Rica",
    region: "mesoamerica",
    distanceRank: 15,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Operadora de pensiones del Banco Popular sobre SYSDE Pensiones.",
    result: "Líder en administración de fondos de pensiones en Costa Rica.",
    affiliates: "1,728,132",
    funds: "$10,568M USD",
  },
  {
    name: "Pensiones BAC Credomatic",
    country: "Costa Rica",
    region: "mesoamerica",
    distanceRank: 15,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Operadora de pensiones de BAC Credomatic. Implementación de SYSDE Pensiones.",
    result: "Gestión de pensiones para más de 472 mil afiliados en Costa Rica.",
    affiliates: "472,148",
    funds: "$3,969M USD",
  },
  {
    name: "CCSS",
    country: "Costa Rica",
    region: "mesoamerica",
    distanceRank: 15,
    category: "corporativo",
    model: "On Premise / SaaS",
    product: "FileMaster",
    detail:
      "Migración exitosa de expedientes digitales de FileMaster con +6,120 usuarios activos hacia la nube.",
    result: "Optimización de gestión, seguridad y accesibilidad con infraestructura escalable.",
  },
  {
    name: "Grupo Apex",
    country: "Centroamérica",
    countries: ["Guatemala","El Salvador","Honduras","Nicaragua","Costa Rica","Panamá"],
    region: "mesoamerica",
    distanceRank: 16,
    category: "corporativo",
    model: "SaaS",
    product: "SAF+",
    detail: "Implementación de SAF+ para operaciones financieras del grupo, con integración corporativa.",
    result: "En ejecución.",
    status: "en-implementacion",
  },
  {
    name: "Arkfin Soluciones",
    country: "Centroamérica",
    countries: ["Guatemala","El Salvador","Honduras","Nicaragua","Costa Rica","Panamá"],
    region: "mesoamerica",
    distanceRank: 16,
    category: "corporativo",
    model: "SaaS",
    product: "SAF+",
    detail: "SAF+ modular adaptado a soluciones financieras específicas del negocio.",
    result: "En ejecución.",
    status: "en-implementacion",
  },
  {
    name: "Unicomer Caribbean Holding",
    country: "Centroamérica",
    countries: ["Guatemala","El Salvador","Honduras","Nicaragua","Costa Rica","Panamá","República Dominicana","Trinidad y Tobago"],
    region: "mesoamerica",
    distanceRank: 16,
    category: "banca",
    model: "On Premise / SaaS",
    product: "SYSDE Banca + SYSDE Tarjetas",
    detail:
      "SYSDE Banca y SYSDE Tarjetas: Cobranzas, Cuentas, Créditos (Retail), Depósitos, Contabilidad, PLD, Central de Riesgos, Inversiones.",
    result: "Operando desde 2008; expansiones a El Salvador (2011) y Nicaragua (2014). +30 marcas, +1,200 tiendas, +13,000 colaboradores en 26 países.",
    modules: ["Cobranzas","Créditos","Depósitos","Contabilidad","PLD","Inversiones","Tarjetas"],
    contact: "Guillermo J. Simán — Vice Chairman",
  },

  // ═══════════════════════════════════════════════════════════════════
  // CARIBE
  // ═══════════════════════════════════════════════════════════════════
  {
    name: "Banco ADOPEM",
    country: "República Dominicana",
    region: "caribe",
    distanceRank: 20,
    category: "banca",
    model: "On Premise / SaaS",
    product: "Core Bancario",
    detail:
      "Core Bancario con 12 módulos. Institución orientada a finanzas productivas para sectores no bancarizados.",
    result: "Parte del Grupo Fundación Microfinanzas BBVA. Impacto en inclusión financiera.",
    contact: "Mercedes Canalda — Presidente Ejecutiva",
  },
  {
    name: "AFP Reservas",
    country: "República Dominicana",
    region: "caribe",
    distanceRank: 20,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Administración de fondos de pensiones sobre SYSDE Pensiones. Líder del mercado previsional dominicano.",
    result: "Gestión eficiente para más de 724 mil afiliados.",
    affiliates: "724,504",
    funds: "$3,409M USD",
  },
  {
    name: "AFP Siembra",
    country: "República Dominicana",
    region: "caribe",
    distanceRank: 20,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Administración de fondos de pensiones en República Dominicana con SYSDE Pensiones.",
    result: "Gestión eficiente para más de 1.1 millones de afiliados.",
    affiliates: "1.1M",
    funds: "$4,228M USD",
  },
  {
    name: "AFP Popular",
    country: "República Dominicana",
    region: "caribe",
    distanceRank: 20,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Administración de fondos de pensiones en República Dominicana con SYSDE Pensiones.",
    result: "Gestión previsional para más de 1.6 millones de afiliados dominicanos.",
    affiliates: "1,644,169",
    funds: "$6,576M USD",
  },
  {
    name: "Seguros Universal",
    country: "República Dominicana",
    region: "caribe",
    distanceRank: 20,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Administración de fondos de pensiones y seguros con SYSDE Pensiones.",
    result: "Gestión previsional para más de 38 mil afiliados dominicanos.",
    affiliates: "38,498",
    funds: "$95.1M USD",
  },

  // ═══════════════════════════════════════════════════════════════════
  // ÁFRICA — microfinanzas
  // ═══════════════════════════════════════════════════════════════════
  {
    name: "CFE Rwanda",
    country: "Ruanda",
    region: "africa",
    distanceRank: 90,
    category: "microfinanzas",
    model: "SaaS",
    product: "SAF",
    detail: "SAF (2004) para automatizar contabilidad, préstamos y arrendamiento.",
    result: "En 2015, Bank of Africa adquirió el 90%. Transformación a banco comercial.",
  },
  {
    name: "CNEC Djibouti",
    country: "Yibuti",
    region: "africa",
    distanceRank: 90,
    category: "microfinanzas",
    model: "SaaS",
    product: "SAF",
    detail: "SAF (2009) para optimizar operaciones financieras para grupos vulnerables.",
    result: "En 2011, fusión con CPEC. Inclusión financiera de mujeres emprendedoras.",
  },
  {
    name: "Nyogondemeso-Soba",
    country: "Mali",
    region: "africa",
    distanceRank: 90,
    category: "cooperativa",
    model: "SaaS",
    product: "SAF+",
    detail: "SAF+ tras fusión de dos cooperativas. Ahorro, crédito y transferencias.",
    result: "Gobernanza democrática y apoyo a la lucha contra la pobreza.",
  },
  {
    name: "CPECG",
    country: "Guinea",
    region: "africa",
    distanceRank: 90,
    category: "microfinanzas",
    model: "SaaS",
    product: "SAF",
    detail: "SAF para gestión financiera. +150,000 clientes en 27 sucursales.",
    result: "Reconocimiento por su desempeño en microfinanzas e inclusión.",
  },
  {
    name: "CTI",
    country: "Senegal",
    region: "africa",
    distanceRank: 90,
    category: "microfinanzas",
    model: "SaaS",
    product: "SAF",
    detail: "Informatización de 72 Systèmes Financiers Décentralisés (SFD) en Senegal.",
    result: "72 instituciones financieras descentralizadas informatizadas exitosamente.",
  },
  {
    name: "Dunduliza",
    country: "Tanzania",
    region: "africa",
    distanceRank: 90,
    category: "cooperativa",
    model: "SaaS",
    product: "SAF",
    detail: "Fortalecimiento de cooperativas de ahorro y crédito (SACCOs) en Tanzania.",
    result: "Mejora operativa y fomento del desarrollo económico local.",
  },
  {
    name: "FCPB",
    country: "Burkina Faso",
    region: "africa",
    distanceRank: 90,
    category: "microfinanzas",
    model: "SaaS",
    product: "SAF",
    detail: "Transformación digital de la red de microfinanzas más grande de Burkina Faso (fundada en 1972).",
    result: "+1,200 empleados, 455 dirigentes. Inclusión financiera exitosa.",
  },
  {
    name: "FCRMD",
    country: "Mali",
    region: "africa",
    distanceRank: 90,
    category: "cooperativa",
    model: "SaaS",
    product: "SAF",
    detail: "Modernización de cooperativas rurales mutualistas del Delta en Mali.",
    result: "Inclusión económica de mujeres y jóvenes en áreas rurales.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // GLOBAL / CORPORATIVO
  // ═══════════════════════════════════════════════════════════════════
  {
    name: "Alcatel-Lucent Pensiones",
    country: "Global",
    region: "global",
    distanceRank: 999,
    category: "pensiones",
    model: "SaaS",
    product: "SYSDE Pensiones",
    detail: "Administración de fondos de pensiones corporativos con SYSDE Pensiones.",
    result: "Gestión de pensiones corporativas a nivel global.",
    affiliates: "78,400",
    funds: "$40.67B USD",
  },
];

// Presencia operativa SYSDE (footprint)
export const footprint = [
  { pais: "Paraguay",             roles: ["SVA vía Inventiva"], highlight: true, note: "Aliado local para el RFI de Banco Atlas" },
  { pais: "Costa Rica",           roles: ["HQ", "Oficina", "Fábrica", "SVA"], note: "Casa matriz SYSDE" },
  { pais: "El Salvador",          roles: ["Oficina", "Fábrica", "SVA"] },
  { pais: "México",               roles: ["Oficina", "SVA"] },
  { pais: "Colombia",             roles: ["Oficina", "Fábrica", "SVA"] },
  { pais: "Perú",                 roles: ["Oficina", "Fábrica", "SVA"] },
  { pais: "República Dominicana", roles: ["SVA"] },
  { pais: "Senegal",              roles: ["Oficina"] },
];
