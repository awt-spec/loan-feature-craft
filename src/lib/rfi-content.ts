export type Nivel = "Sí" | "No" | "Parcial";
export type Madurez = "Básico" | "Intermedio" | "Avanzado";

export type QuestionBlock =
  | { kind: "p"; text: string; strong?: string }
  | { kind: "ul"; items: { strong?: string; text: string }[] }
  | { kind: "h"; text: string }
  | { kind: "callout"; text: string };

export type Question = {
  n: number;
  title: string;
  orientacion: string;
  cumplimiento?: Nivel;
  madurez?: Madurez;
  blocks: QuestionBlock[];
};

export const process = {
  institucion: "Banco Atlas S.A.",
  tipo: "Request for Information (RFI)",
  objeto: "Evaluación preliminar de proveedores de Core Bancario",
  emision: "10 de Julio 2026",
  cierre: "17 de Julio 2026",
  canal: "Correo electrónico",
};

export const vendor = {
  razon: "SYSDE Internacional Inc.",
  pais: "Costa Rica",
  anios: "Más de 35 años",
  web: "www.sysde.com",
  contactos: [
    {
      nombre: "Alberto Wheelock Talavera",
      cargo: "Chief Commercial Officer (CCO)",
      email: "alwheelock@sysde.com",
      tel: "+506 6347 3842",
      iniciales: "AW",
    },
    {
      nombre: "Eduardo Wheelock",
      cargo: "Chief Executive Officer (CEO)",
      email: "ewheelock@sysde.com",
      tel: "+506 8897 5153",
      iniciales: "EW",
    },
  ],
};

export const contexto = {
  intro:
    "Banco Atlas S.A., con el acompañamiento de EY, se encuentra en la etapa preliminar del proceso de modernización de su plataforma de Core Bancario.",
  proposito:
    "El presente RFI tiene como propósito recopilar información calificada de los proveedores del mercado a fin de determinar cuáles cumplen con los requisitos mínimos para avanzar en una etapa de propuesta formal (RFP). Las respuestas serán utilizadas exclusivamente con fines de análisis y precalificación.",
  aviso: "Este documento NO representa un compromiso de contratación.",
  etapas: [
    { titulo: "Emisión del RFI", detalle: "10 de Julio 2026 · Banco Atlas publica el documento", estado: "done" as const },
    { titulo: "Consultas", detalle: "Vía contactos oficiales · respuestas consolidadas", estado: "done" as const },
    { titulo: "Cierre de recepción", detalle: "17 de Julio 2026 · envío por correo en formato editable", estado: "active" as const },
    { titulo: "Evaluación y precalificación", detalle: "Análisis de claridad, experiencia y capacidad regional", estado: "next" as const },
    { titulo: "Invitación al RFP", detalle: "Los proveedores que superen la evaluación pasan a propuesta formal", estado: "next" as const },
  ],
};

export const canales = [
  {
    nombre: "Carlos Rolón",
    cargo: "Sub-Gerente de Infraestructura y Producción · Banco Atlas",
    email: "carlos.rolon@atlas.com.py",
    iniciales: "CR",
  },
  {
    nombre: "Diego Fleitas",
    cargo: "Gerente de TI · Banco Atlas",
    email: "diego.fleitas@atlas.com.py",
    iniciales: "DF",
  },
  {
    nombre: "Lezlie Monge",
    cargo: "Gerente · EY",
    email: "lezlie.monge@cr.ey.com",
    iniciales: "LM",
  },
];

export const instrucciones = [
  {
    titulo: "Formato de respuesta",
    detalle:
      "Completar este mismo documento sin modificar su estructura. No eliminar, alterar ni reordenar las preguntas. Se puede adjuntar documentación adicional indicando la pregunta de referencia. Todas las respuestas en idioma español.",
  },
  {
    titulo: "Calidad de la información",
    detalle:
      "Claras, concretas y específicas, basadas en experiencia comprobable y sustentadas con ejemplos o referencias cuando aplique. Indicar Nivel de cumplimiento (Sí/No/Parcial) y Nivel de madurez (Básico/Intermedio/Avanzado).",
  },
  {
    titulo: "Consideraciones para evaluación",
    detalle:
      "Claridad de la información, evidencia de experiencia en el sector financiero, nivel de detalle técnico y funcional, y capacidad de implementación en la región.",
  },
  {
    titulo: "Envío de la información",
    detalle:
      "El documento completo debe remitirse en formato editable (Word) al canal definido. Fecha límite: 17 de Julio 2026.",
  },
  {
    titulo: "Canal de consultas",
    detalle:
      "Toda consulta debe canalizarse por los contactos oficiales de la Sección 4.1. Las consultas y sus respuestas podrán compartirse de forma consolidada con todos los participantes.",
  },
];

export const questions: Question[] = [
  {
    n: 1,
    title:
      "¿Cuál es la facturación anual aproximada de la empresa, la cantidad de desarrolladores/personal técnico dedicado a la solución, y la cantidad total de clientes con la solución implementada actualmente?",
    orientacion:
      "Indique cifras aproximadas de facturación anual, tamaño del equipo de desarrollo/técnico y número total de clientes activos con la solución en producción.",
    madurez: "Avanzado",
    blocks: [
      {
        kind: "p",
        text: "SYSDE Internacional Inc. es una casa de software especializada de forma exclusiva en plataformas para el sector financiero, con más de 35 años de operación continua en América Latina y África Occidental. La solución objeto de este RFI es SAF+, la plataforma de core bancario integral (banca universal) de SYSDE.",
      },
      {
        kind: "ul",
        items: [
          { strong: "Facturación anual aproximada", text: "USD 10 millones." },
          {
            strong: "Personal técnico dedicado a la solución",
            text: "160 profesionales, distribuidos entre las fábricas de desarrollo de Costa Rica, Perú, Colombia y El Salvador y las unidades de servicio y soporte (SVA) de la región. Cubre arquitectura, desarrollo, aseguramiento de calidad, implementación y soporte.",
          },
          {
            strong: "Clientes con la solución implementada",
            text: "más de 800 instituciones financieras con la solución en producción en América Latina y África Occidental.",
          },
        ],
      },
      {
        kind: "p",
        strong: "Solidez y continuidad.",
        text: "Los más de 35 años de operación ininterrumpida y la base de más de 800 instituciones financieras atendidas, con ingresos recurrentes de mantenimiento y servicios, sustentan la capacidad del proveedor de acompañar a Banco Atlas durante todo el ciclo de vida de un core (7 a 10 años). La especialización exclusiva en software financiero concentra la inversión de I+D en este dominio.",
      },
      {
        kind: "p",
        strong: "Independencia del proveedor.",
        text: "SYSDE es un proveedor tecnológico independiente. No pertenece a un grupo financiero ni opera entidades que compitan con las instituciones que atiende, por lo que no existe conflicto de interés entre el proveedor del core y el negocio del banco.",
      },
    ],
  },
  {
    n: 2,
    title:
      "¿En qué lenguajes de programación y stack tecnológico están desarrolladas la mayoría de sus implementaciones actuales?",
    orientacion:
      "Describa el stack tecnológico predominante (lenguajes, plataformas, bases de datos) utilizado en sus implementaciones vigentes.",
    cumplimiento: "Sí",
    madurez: "Avanzado",
    blocks: [
      {
        kind: "p",
        text: "La totalidad de las implementaciones vigentes de SAF+ se construye sobre un stack Microsoft moderno, homogéneo entre clientes y con un único runtime:",
      },
      {
        kind: "ul",
        items: [
          {
            strong: "Lenguaje y runtime (backend)",
            text: "C# sobre .NET 10 LTS, runtime único en toda la plataforma; sin dependencia de Java (JDK/JRE) en ninguna capa.",
          },
          {
            strong: "Servicios e interoperabilidad",
            text: "API REST documentadas con Swagger/OpenAPI (API-First); gRPC para la comunicación interna de baja latencia entre microservicios.",
          },
          { strong: "Front-end", text: "Angular 21.x con HTML5 y CSS3, interfaz web responsiva." },
          {
            strong: "Base de datos",
            text: "Microsoft SQL Server 2022 con cifrado en reposo TDE AES-256; caché en memoria con Redis 7.x.",
          },
          {
            strong: "Mensajería y descubrimiento",
            text: "RabbitMQ 4.x como broker asincrónico y HashiCorp Consul 1.x para el descubrimiento de servicios.",
          },
          {
            strong: "Contenedores y despliegue",
            text: "Docker Engine/Swarm, 100% de los servicios en contenedores estándar, versionados y reversibles. Imagen portable a otros orquestadores —incluido Kubernetes— sin rediseño de la aplicación, con escalado horizontal por módulo.",
          },
          {
            strong: "Infraestructura",
            text: "on-premise, nube (Microsoft Azure) e híbrido, con clientes productivos en los tres esquemas; red virtual con subredes segregadas y balanceador de carga.",
          },
          {
            strong: "Seguridad",
            text: "cifrado TLS 1.3 en tránsito y TDE AES-256 en reposo; bóveda de claves (Key Vault); autenticación JWT y MFA integrable con Entra ID; RBAC y bitácora de auditoría. Alineado a ISO/IEC 27001.",
          },
        ],
      },
      {
        kind: "p",
        strong: "Cobertura de core bancario.",
        text: "SAF+ es una plataforma de core bancario integral para banca universal: cubre ambos lados del balance y la operación transaccional del banco. Arquitectura de microservicios por dominio —Clientes, Depósitos y Cuentas, Crédito y Préstamos, Factoraje, Leasing, Tarjetas y Medios de Pago, Canales Digitales, Tesorería, Contabilidad y Reportería Regulatoria, Seguridad/PLD—, 100% contenerizada y API-First, orquestada por un API Gateway central.",
      },
      {
        kind: "p",
        strong: "Vigencia tecnológica.",
        text: "SAF+ opera exclusivamente sobre versiones con soporte vigente del fabricante: alineamiento a ciclos LTS, migración planificada al menos seis meses antes del fin de soporte, y disposición a incluir cláusula contractual de vigencia. El runtime único (.NET 10 LTS) reduce la matriz de ciclo de vida a un solo componente.",
      },
      {
        kind: "p",
        strong: "Continuidad y recuperación.",
        text: "Recuperación ante desastres en esquema activo-pasivo sobre región secundaria de Azure, con conmutación documentada.",
      },
      {
        kind: "p",
        strong: "Convivencia con la infraestructura instalada.",
        text: "La persistencia de SAF+ es SQL Server. Su capa de integración se conecta a Oracle y SQL Server, ERP (SAP), CRM (Salesforce) y sistemas legados, permitiendo operar en paralelo con la plataforma vigente durante la transición y después de ella.",
      },
    ],
  },
  {
    n: 3,
    title:
      "¿Cuentan con experiencia comprobada integrando con SIPAP/SNP (ACH/LBTR) y Bancard en producción, bajo un enfoque de arquitectura desacoplado (API-first)?",
    orientacion:
      "Indique si cuenta con conectores o experiencia previa certificada. Mencione clientes o implementaciones donde se haya realizado, si es públicamente divulgable.",
    cumplimiento: "Parcial",
    madurez: "Intermedio",
    blocks: [
      {
        kind: "p",
        text: "La respuesta honesta es Parcial. La solución que SYSDE propone para Banco Atlas combina dos capacidades ya probadas por separado que aún no se han desplegado juntas en un mismo entorno de producción:",
      },
      {
        kind: "p",
        strong: "a) Conectividad con SIPAP/SNP (ACH/LBTR) y Bancard — Inventiva.",
        text: "Inventiva, aliado local de SYSDE en Paraguay, cuenta con conexión operativa a SIPAP/SNP (ACH/LBTR) y a Bancard, y conoce el riel local y sus procesos de certificación.",
      },
      {
        kind: "p",
        strong: "b) Capa de integración desacoplada — nativa de SAF+.",
        text: "SAF+ incorpora un API Gateway de última generación diseñado para conexiones con rieles de pago y procesadores. Bajo el principio API-First, las integraciones viven en la capa de integración (API Gateway + Integrador de Aplicaciones Empresariales), nunca dentro del núcleo. Cada conector tiene su propio ciclo de despliegue: un cambio de especificación se atiende en el conector correspondiente, sin recompilar ni intervenir el core.",
      },
      {
        kind: "p",
        strong: "Por qué Parcial y no Sí pleno.",
        text: "Lo que aún no existe es el despliegue conjunto de ambas capacidades —los conectores de Inventiva sobre el API Gateway de SAF+— en un mismo entorno de producción. Es una integración de bajo riesgo porque cada mitad ya está probada; se dimensiona, ejecuta y certifica dentro del proyecto, con plan y tiempos definidos en la etapa de RFP.",
      },
      {
        kind: "p",
        strong: "Referencias verificables.",
        text: "SYSDE atiende a más de 800 instituciones financieras en América Latina y el Caribe; en la Pregunta 6 se detallan las instituciones prioritarias. La conectividad de Inventiva con SIPAP/SNP y Bancard, y las integraciones vía API Gateway de SAF+, pueden verificarse directamente con las contrapartes, sujeto a su autorización.",
      },
    ],
  },
  {
    n: 4,
    title:
      "¿Su Core Bancario puede centralizar y registrar automáticamente en la contabilidad general los movimientos generados por otros sistemas del banco (tarjetas, tesorería, canales digitales), o requeriría un sistema adicional para conectarlos?",
    orientacion:
      "Indique si la capacidad es nativa, configurable o requiere desarrollo/middleware adicional. Describa brevemente el mecanismo utilizado.",
    cumplimiento: "Sí",
    madurez: "Avanzado",
    blocks: [
      {
        kind: "p",
        text: "La capacidad está incorporada en el producto y se resuelve por parametrización, sin sistema adicional ni middleware de terceros. Cuando estas funciones operan sobre los módulos nativos de SAF+ (tarjetas y medios de pago, canales digitales, tesorería), la contabilidad se genera de forma interna y automática. Cuando el banco decide conservar sistemas propios, legados o de terceros para alguna de esas funciones, SAF+ centraliza sus movimientos en la contabilidad general por el mismo mecanismo de parametrización.",
      },
      {
        kind: "p",
        strong: "Motor contable centralizado.",
        text: "El módulo de Cuentas y Tesorería de SAF+ mantiene el libro contable único del banco, con asientos generados de forma automática desde cada dominio funcional según reglas parametrizables por producto, canal y tipo de movimiento. Trazabilidad end-to-end del movimiento al asiento contable.",
      },
    ],
  },
  {
    n: 5,
    title:
      "¿Cuentan con equipo de soporte N1/N2 hispanohablante físicamente en Paraguay o la región, o el modelo de atención es 100% remoto desde otro país?",
    orientacion:
      "Describa la ubicación de su equipo de soporte, idioma de atención y modelo de escalamiento (N1/N2/N3).",
    cumplimiento: "Sí",
    madurez: "Avanzado",
    blocks: [
      {
        kind: "p",
        text: "Modelo de atención: presencial en la región y en Paraguay, no 100% remoto desde otro país. Idioma: 100% español.",
      },
      {
        kind: "p",
        strong: "Presencia en Paraguay.",
        text: "SYSDE opera junto a Inventiva (inventiva.net), su aliado local, responsable de la presencia en país para la implementación y la atención de primer nivel y en sitio, en horario de Asunción y en idioma español. Inventiva aporta la cercanía y el conocimiento del mercado local; SYSDE aporta la ingeniería de producto y el soporte funcional y técnico especializado (N2/N3) desde su estructura regional.",
      },
      { kind: "h", text: "Huella operativa de SYSDE" },
      {
        kind: "ul",
        items: [
          { strong: "Oficinas", text: "Costa Rica, Perú, Colombia, México, El Salvador y Senegal." },
          { strong: "Fábricas de desarrollo", text: "Costa Rica, Perú, Colombia y El Salvador." },
          {
            strong: "Unidades de servicio y soporte (SVA)",
            text: "Costa Rica, Perú, Colombia, México, El Salvador, República Dominicana y Paraguay (vía Inventiva).",
          },
        ],
      },
      { kind: "h", text: "Modelo de escalamiento" },
      {
        kind: "ul",
        items: [
          {
            strong: "N1 — Inventiva (en país)",
            text: "Mesa de servicio local en Asunción y punto único de contacto: recepción, registro, clasificación por severidad; consultas funcionales; soporte en sitio; resolución de incidencias conocidas.",
          },
          {
            strong: "N2 en sitio — Inventiva (Paraguay)",
            text: "Primer análisis funcional y acompañamiento presencial: parametrización de primer nivel, apoyo operativo y coordinación local.",
          },
          {
            strong: "N2 especializado — SYSDE (SVA regional)",
            text: "Diagnóstico, análisis de bitácoras y BD, resolución por configuración avanzada, coordinación con terceros integrados (SIPAP/SNP, Bancard, procesadores).",
          },
          {
            strong: "N3 — SYSDE (fábricas de producto)",
            text: "Corrección de código, liberación de parches y versiones, evolución de la plataforma. Recibe solo lo que N2 especializado acredita como defecto de producto.",
          },
          {
            strong: "Escalamiento ejecutivo",
            text: "Comité de servicio conjunto SYSDE + Inventiva con participación de la dirección para severidad crítica sostenida.",
          },
        ],
      },
      { kind: "h", text: "Continuidad y respaldos (grado bancario, principio 3-2-1)" },
      {
        kind: "ul",
        items: [
          { strong: "Disponibilidad", text: "99.9% plataforma; 99.95% núcleo transaccional." },
          { strong: "RTO", text: "≤ 2 horas (≤ 1 hora núcleo crítico)." },
          { strong: "RPO", text: "≤ 15 min, tendiendo a 0 en el libro contable mediante replicación continua." },
          { strong: "Log de transacciones", text: "log shipping cada 15 minutos, base del RPO y de la recuperación point-in-time." },
          { strong: "Retenciones", text: "Diario 35 días · Semanal 12 semanas · Mensual 24 meses · Cierre anual ≥ 10 años." },
          { strong: "Copias inmutables (WORM)", text: "bloqueo legal contra borrado o alteración, defensa ante ransomware." },
          { strong: "Geo-redundancia", text: "copia primaria + réplica en segunda región de Azure; AES-256 en reposo y TLS en tránsito." },
          { strong: "Pruebas de restauración", text: "ejercicios trimestrales documentados con validación del RTO comprometido." },
        ],
      },
      {
        kind: "callout",
        text: "Los niveles de servicio son el modelo estándar de SYSDE, con carácter informativo en este RFI. El compromiso contractual se acuerda en la etapa de RFP, dimensionado al alcance, criticidad y ventana operativa que defina Banco Atlas.",
      },
    ],
  },
  {
    n: 6,
    title:
      "¿Podría compartirnos una lista de sus 4 clientes prioritarios en Paraguay y/o la región, indicando el tipo de entidad (banco universal, cooperativa, financiera)?",
    orientacion:
      "Indique nombre de los clientes prioritarios (si es públicamente divulgable), tipo de entidad y país.",
    cumplimiento: "Sí",
    madurez: "Avanzado",
    blocks: [
      {
        kind: "p",
        strong: "Criterio de divulgación.",
        text: "Las instituciones listadas son públicamente divulgables. SYSDE puede coordinar referencias verificables —llamada o sesión virtual con la contraparte de Banco Atlas y de EY— en la etapa de RFP. El alcance específico implementado en cada institución se detalla, con referencia verificable directa, en la etapa de RFP.",
      },
    ],
  },
];

export const sla = [
  { sev: "S1", nombre: "Crítica — operación del banco detenida", respuesta: "1 hora", solucion: "4 h (solución o temporal)", cobertura: "24x7" },
  { sev: "S2", nombre: "Alta — función crítica degradada, con temporal", respuesta: "2 horas", solucion: "8 horas hábiles", cobertura: "24x7" },
  { sev: "S3", nombre: "Media — función no crítica afectada", respuesta: "4 h hábiles", solucion: "5 días hábiles", cobertura: "Horario hábil" },
  { sev: "S4", nombre: "Baja — consulta, mejora o documentación", respuesta: "8 h hábiles", solucion: "Siguiente liberación", cobertura: "Horario hábil" },
];

export const clientes = [
  { n: 1, nombre: "Broxel", tipo: "Fintech / medios de pago", pais: "México" },
  { n: 2, nombre: "Banco Santa Cruz", tipo: "Banco múltiple", pais: "República Dominicana" },
  { n: 3, nombre: "Banco Adopem", tipo: "Banco de ahorro y crédito (microfinanzas)", pais: "República Dominicana" },
  { n: 4, nombre: "Credicomer", tipo: "Sociedad de ahorro y crédito", pais: "El Salvador" },
  { n: 5, nombre: "Unicomer (Grupo Unicomer)", tipo: "Retail y financiamiento al consumo", pais: "El Salvador" },
];

export const otrasInstituciones = "Factor & Valor (factoraje, Colombia) y ABCDIN (crédito al consumo, Chile).";

export const condiciones = [
  "Las respuestas deben enviarse antes de la fecha límite indicada en la Sección 1.",
  "Banco Atlas se reserva el derecho de solicitar información complementaria.",
  "Este RFI no genera ninguna obligación contractual para ninguna de las partes.",
  "La información provista será tratada con carácter confidencial.",
  "Los proveedores que pasen la evaluación de este RFI serán invitados a participar en el proceso de RFP.",
];

export const toc = [
  { id: "proceso", label: "Datos del proceso" },
  { id: "contexto", label: "Contexto y objetivo" },
  { id: "proveedor", label: "Proveedor y contactos" },
  { id: "instrucciones", label: "Instrucciones" },
  { id: "preguntas", label: "Preguntas 1–6" },
  { id: "referencias", label: "Referencias regionales" },
  { id: "condiciones", label: "Condiciones generales" },
];
