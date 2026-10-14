export const riesgos = [
  // ============================================================
  // RIESGOS PRINCIPALES DE CODEXA (Guía S4)
  // Escala: 1-4 Bajo · 5-9 Moderado · 10-14 Alto · 15-25 Crítico
  // ============================================================

  // ---------- R-01 · Base de datos (A-01) ----------
  {
    // Legacy
    "N°": "1",
    "Riesgo": "Acceso no autorizado a información",
    "Descripción del riesgo": "Empleados o terceros acceden a datos personales y financieros de ~140.000 socios sin autorización.",
    "Consecuencia": "Pérdida de confidencialidad, filtración de datos de clientes y activación del régimen sancionador de la LOPDP.",
    "Probabilidad": "Alta",
    "Impacto": "Alto",
    "Nivel de Riesgo": "Crítico",
    // Enriquecido
    id: "R-01",
    activoId: "A-01",
    activoNombre: "Base de datos transaccional (PostgreSQL multiempresa)",
    amenaza: "Robo o exfiltración de información por acceso no autorizado",
    vulnerabilidad: "Cuentas administrativas con contraseñas débiles y reutilizadas, sin MFA ni revisión periódica de privilegios.",
    probabilidad: 4,
    impacto: 5,
    nivelValor: 20,
    categoria: "Tecnológico",
    controlesAplicados: [
      { codigo: "A.5.15", nombre: "Control de acceso" },
      { codigo: "A.8.2", nombre: "Derechos de acceso privilegiado" },
      { codigo: "A.8.5", nombre: "Autenticación segura" },
    ],
  },

  // ---------- R-02 · Correo institucional (A-04) ----------
  {
    "N°": "2",
    "Riesgo": "Phishing e ingeniería social",
    "Descripción del riesgo": "Personal sin formación comete errores operativos o cae en ataques de ingeniería social.",
    "Consecuencia": "Compromiso de cuentas institucionales, acceso a contratos y facturación, y propagación a sistemas internos.",
    "Probabilidad": "Alta",
    "Impacto": "Alto",
    "Nivel de Riesgo": "Crítico",
    id: "R-02",
    activoId: "A-04",
    activoNombre: "Correo institucional y plataforma de colaboración documental",
    amenaza: "Phishing e ingeniería social dirigida al personal",
    vulnerabilidad: "Ausencia de programa de concienciación y de registros SPF, DKIM y DMARC correctamente configurados.",
    probabilidad: 4,
    impacto: 4,
    nivelValor: 16,
    categoria: "Personas",
    controlesAplicados: [
      { codigo: "A.6.3", nombre: "Concienciación, educación y capacitación" },
      { codigo: "A.8.23", nombre: "Filtrado web" },
      { codigo: "A.5.14", nombre: "Transferencia de información" },
    ],
  },

  // ---------- R-03 · Servidores de aplicación (A-03) ----------
  {
    "N°": "3",
    "Riesgo": "Ransomware o interrupción del servicio",
    "Descripción del riesgo": "Cifrado malicioso o caída de las instancias productivas que sostienen el SaaS de 31 cooperativas.",
    "Consecuencia": "Indisponibilidad simultánea del servicio para las 31 cooperativas e interrupción financiera de las mismas.",
    "Probabilidad": "Media",
    "Impacto": "Alto",
    "Nivel de Riesgo": "Crítico",
    id: "R-03",
    activoId: "A-03",
    activoNombre: "Servidores de aplicación en la nube",
    amenaza: "Ransomware o interrupción del servicio",
    vulnerabilidad: "Actualizaciones sin calendario definido y ausencia de pruebas de restauración de respaldos.",
    probabilidad: 3,
    impacto: 5,
    nivelValor: 15,
    categoria: "Tecnológico",
    controlesAplicados: [
      { codigo: "A.8.8", nombre: "Gestión de vulnerabilidades técnicas" },
      { codigo: "A.8.13", nombre: "Copias de respaldo" },
      { codigo: "A.5.30", nombre: "Preparación TIC para continuidad" },
    ],
  },

  // ---------- R-04 · Repositorio de código (A-02) ----------
  {
    "N°": "4",
    "Riesgo": "Fuga de código fuente y secretos de despliegue",
    "Descripción del riesgo": "Divulgación no autorizada del código propietario y de credenciales de despliegue.",
    "Consecuencia": "Pérdida de propiedad intelectual y posible explotación de fallos por parte de terceros.",
    "Probabilidad": "Media",
    "Impacto": "Alto",
    "Nivel de Riesgo": "Alto",
    id: "R-04",
    activoId: "A-02",
    activoNombre: "Repositorio de código fuente (GitLab autoalojado)",
    amenaza: "Fuga de código fuente y secretos de despliegue",
    vulnerabilidad: "Credenciales incrustadas en el código y accesos que no se revocan al desvincular colaboradores.",
    probabilidad: 3,
    impacto: 4,
    nivelValor: 12,
    categoria: "Tecnológico",
    controlesAplicados: [
      { codigo: "A.8.4", nombre: "Acceso al código fuente" },
      { codigo: "A.5.11", nombre: "Devolución de activos" },
      { codigo: "A.6.5", nombre: "Responsabilidades al finalizar el empleo" },
    ],
  },

  // ---------- R-05 · Portátiles corporativos (A-05) ----------
  {
    "N°": "5",
    "Riesgo": "Pérdida o robo de portátil con información sensible",
    "Descripción del riesgo": "Robo o extravío de un portátil con copias locales de código y respaldos de prueba.",
    "Consecuencia": "Acceso a credenciales y datos confidenciales almacenados localmente en el equipo del colaborador.",
    "Probabilidad": "Media",
    "Impacto": "Medio",
    "Nivel de Riesgo": "Moderado",
    id: "R-05",
    activoId: "A-05",
    activoNombre: "Equipos portátiles de desarrollo y soporte (36 unidades)",
    amenaza: "Pérdida o robo del equipo con información sensible",
    vulnerabilidad: "Discos sin cifrado, archivos de trabajo almacenados solo en local y traslado frecuente fuera de la oficina.",
    probabilidad: 3,
    impacto: 3,
    nivelValor: 9,
    categoria: "Físico",
    controlesAplicados: [
      { codigo: "A.8.1", nombre: "Dispositivos endpoint" },
      { codigo: "A.8.24", nombre: "Uso de criptografía" },
      { codigo: "A.7.9", nombre: "Seguridad de activos fuera de las instalaciones" },
    ],
  },

  // ============================================================
  // RIESGOS COMPLEMENTARIOS
  // ============================================================

  // ---------- R-06 · Base de datos (A-01) ----------
  {
    "N°": "6",
    "Riesgo": "Inyección SQL o manipulación de datos",
    "Descripción del riesgo": "Atacante explota entradas no validadas para alterar o extraer datos del sistema.",
    "Consecuencia": "Compromiso de la integridad de saldos y movimientos de los socios.",
    "Probabilidad": "Media",
    "Impacto": "Alto",
    "Nivel de Riesgo": "Alto",
    id: "R-06",
    activoId: "A-01",
    activoNombre: "Base de datos transaccional",
    amenaza: "Inyección SQL o manipulación de datos en la plataforma",
    vulnerabilidad: "Ausencia de validación de entradas y de pruebas de seguridad en el ciclo de desarrollo.",
    probabilidad: 3,
    impacto: 4,
    nivelValor: 12,
    categoria: "Tecnológico",
    controlesAplicados: [
      { codigo: "A.8.28", nombre: "Codificación segura" },
      { codigo: "A.8.32", nombre: "Gestión de cambios" },
    ],
  },

  // ---------- R-07 · Servidores de aplicación (A-03) ----------
  {
    "N°": "7",
    "Riesgo": "Ataque DDoS a la plataforma SaaS",
    "Descripción del riesgo": "Saturación del servicio por tráfico malicioso masivo.",
    "Consecuencia": "Interrupción del servicio durante horas o días, afectando a las 31 cooperativas.",
    "Probabilidad": "Media",
    "Impacto": "Alto",
    "Nivel de Riesgo": "Alto",
    id: "R-07",
    activoId: "A-03",
    activoNombre: "Servidores de aplicación en la nube",
    amenaza: "Ataque DDoS a la plataforma SaaS",
    vulnerabilidad: "Ausencia de firewall de aplicaciones web (WAF) y de límites de tasa.",
    probabilidad: 3,
    impacto: 4,
    nivelValor: 12,
    categoria: "Tecnológico",
    controlesAplicados: [
      { codigo: "A.8.20", nombre: "Seguridad en redes" },
      { codigo: "A.8.21", nombre: "Seguridad de servicios de red" },
    ],
  },

  // ---------- R-08 · Repositorio de código (A-02) ----------
  {
    "N°": "8",
    "Riesgo": "Acceso no autorizado por exempleados",
    "Descripción del riesgo": "Excolaborador conserva credenciales activas después de su desvinculación.",
    "Consecuencia": "Fuga de propiedad intelectual y alteración del repositorio.",
    "Probabilidad": "Baja",
    "Impacto": "Medio",
    "Nivel de Riesgo": "Moderado",
    id: "R-08",
    activoId: "A-02",
    activoNombre: "Repositorio de código fuente",
    amenaza: "Acceso no autorizado por exempleados",
    vulnerabilidad: "Falta de procedimiento formal de revocación de accesos al terminar la relación laboral.",
    probabilidad: 2,
    impacto: 3,
    nivelValor: 6,
    categoria: "Organizativo",
    controlesAplicados: [
      { codigo: "A.5.11", nombre: "Devolución de activos" },
      { codigo: "A.6.5", nombre: "Responsabilidades al finalizar el empleo" },
    ],
  },

  // ---------- R-09 · Servidores de aplicación (A-03) ----------
  {
    "N°": "9",
    "Riesgo": "Riesgos por terceros y proveedores",
    "Descripción del riesgo": "Proveedores externos con acceso a los sistemas de la empresa sin controles de seguridad estrictos.",
    "Consecuencia": "Fugas de información e incumplimiento de acuerdos de nivel de servicio (SLA).",
    "Probabilidad": "Alta",
    "Impacto": "Alto",
    "Nivel de Riesgo": "Crítico",
    id: "R-09",
    activoId: "A-03",
    activoNombre: "Servidores de aplicación (proveedor de nube IaaS)",
    amenaza: "Riesgo por terceros y proveedores",
    vulnerabilidad: "Ausencia de evaluación formal de proveedores y de cláusulas de seguridad en contratos.",
    probabilidad: 4,
    impacto: 4,
    nivelValor: 16,
    categoria: "Organizativo",
    controlesAplicados: [
      { codigo: "A.5.19", nombre: "Seguridad de la información en las relaciones con proveedores" },
      { codigo: "A.5.22", nombre: "Seguimiento y revisión de servicios de proveedores" },
    ],
  },

  // ---------- R-10 · Correo institucional (A-04) ----------
  {
    "N°": "10",
    "Riesgo": "Gestión deficiente de incidentes de seguridad",
    "Descripción del riesgo": "Falta de un enfoque coherente para reportar debilidades e infracciones de seguridad.",
    "Consecuencia": "Retraso en la contención de amenazas, agravando el daño a la organización.",
    "Probabilidad": "Media",
    "Impacto": "Alto",
    "Nivel de Riesgo": "Alto",
    id: "R-10",
    activoId: "A-04",
    activoNombre: "Correo institucional y colaboración documental",
    amenaza: "Gestión deficiente de incidentes de seguridad",
    vulnerabilidad: "Ausencia de procedimiento formal de gestión de incidentes y de mesa de ayuda 24/7.",
    probabilidad: 3,
    impacto: 4,
    nivelValor: 12,
    categoria: "Organizativo",
    controlesAplicados: [
      { codigo: "A.5.24", nombre: "Planificación y preparación de la gestión de incidentes" },
      { codigo: "A.5.26", nombre: "Respuesta a incidentes de seguridad" },
    ],
  },

  // ---------- R-11 · Servidores de aplicación (A-03) ----------
  {
    "N°": "11",
    "Riesgo": "Interrupción de la continuidad del negocio",
    "Descripción del riesgo": "Ausencia de planes para mantener los servicios de información ante desastres o crisis.",
    "Consecuencia": "Incumplimiento de la continuidad operativa y parálisis comercial.",
    "Probabilidad": "Baja",
    "Impacto": "Medio",
    "Nivel de Riesgo": "Moderado",
    id: "R-11",
    activoId: "A-03",
    activoNombre: "Servidores de aplicación en la nube",
    amenaza: "Interrupción de la continuidad del negocio",
    vulnerabilidad: "Falta de un Plan de Continuidad del Negocio (PCN) probado y de infraestructura alternativa.",
    probabilidad: 2,
    impacto: 3,
    nivelValor: 6,
    categoria: "Organizativo",
    controlesAplicados: [
      { codigo: "A.5.29", nombre: "Seguridad de la información durante la interrupción" },
      { codigo: "A.5.30", nombre: "Preparación de las TIC para la continuidad" },
    ],
  },

  // ---------- R-12 · Base de datos (A-01) ----------
  {
    "N°": "12",
    "Riesgo": "Incumplimiento legal y regulatorio",
    "Descripción del riesgo": "No acatar normativas vigentes o cláusulas contractuales de seguridad de datos.",
    "Consecuencia": "Sanciones legales, multas económicas y daño a la reputación corporativa.",
    "Probabilidad": "Media",
    "Impacto": "Alto",
    "Nivel de Riesgo": "Alto",
    id: "R-12",
    activoId: "A-01",
    activoNombre: "Base de datos transaccional (datos personales y financieros)",
    amenaza: "Incumplimiento legal y regulatorio (LOPDP)",
    vulnerabilidad: "Ausencia de política de seguridad aprobada y de registro de actividades de tratamiento.",
    probabilidad: 3,
    impacto: 4,
    nivelValor: 12,
    categoria: "Organizativo",
    controlesAplicados: [
      { codigo: "A.5.31", nombre: "Requisitos legales, estatutarios, regulatorios y contractuales" },
      { codigo: "A.5.34", nombre: "Privacidad y protección de datos personales" },
    ],
  },
];

// ============================================================
// RESUMEN CALCULADO
// ============================================================
export const resumenRiesgos = {
  total: riesgos.length,
  porNivel: {
    Crítico: riesgos.filter((r) => r["Nivel de Riesgo"] === "Crítico").length,
    Alto: riesgos.filter((r) => r["Nivel de Riesgo"] === "Alto").length,
    Moderado: riesgos.filter((r) => r["Nivel de Riesgo"] === "Moderado").length,
    Bajo: riesgos.filter((r) => r["Nivel de Riesgo"] === "Bajo").length,
  },
  porCategoria: {
    Tecnológico: riesgos.filter((r) => r.categoria === "Tecnológico").length,
    Personas: riesgos.filter((r) => r.categoria === "Personas").length,
    Físico: riesgos.filter((r) => r.categoria === "Físico").length,
    Organizativo: riesgos.filter((r) => r.categoria === "Organizativo").length,
  },
};