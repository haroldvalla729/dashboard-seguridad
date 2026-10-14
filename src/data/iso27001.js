export const controlesISO = {
  meta: {
    empresa: "CODEXA Soluciones Tecnológicas S.A.S.",
    seccion: "ISO/IEC 27001:2022",
    descripcion: "Controles de seguridad seleccionados para reducir los riesgos, proteger los activos de información y fortalecer el SGSI de CODEXA.",
    normaPrincipal: "ISO/IEC 27001:2022 — Information security management systems — Requirements",
    normasComplementarias: [
      "ISO/IEC 27002:2022 — Information security controls",
      "ISO/IEC 27005:2022 — Guidance on managing information security risks",
      "ISO 22301:2019 — Business continuity management systems",
    ],
  },

  introduccion: {
    titulo: "¿Qué es la ISO/IEC 27001?",
    descripcion: "La ISO/IEC 27001 es el estándar internacional emitido por la ISO y la IEC que define los requisitos para establecer, implementar, mantener y mejorar continuamente un Sistema de Gestión de Seguridad de la Información (SGSI).",
    objetivo: "Proteger la confidencialidad, integridad y disponibilidad de la información en cualquier formato, mediante un enfoque basado en el riesgo.",
    enfoque: "Risk-based: obliga a las organizaciones a analizar sus vulnerabilidades y amenazas para aplicar controles proporcionales a su nivel de exposición.",
    aplicacionCodexa: "CODEXA inició la implementación de un SGSI porque dos de sus clientes incorporaron la certificación ISO/IEC 27001 como requisito de renovación contractual, y porque la empresa aún no contaba con inventario formal de activos ni política de seguridad aprobada.",
  },

  resumenAnexoA: {
    titulo: "Anexo A — Catálogo de Controles ISO/IEC 27001:2022",
    descripcion: "La versión 2022 reorganizó el Anexo A en 93 controles agrupados en cuatro temas. No es una lista de cumplimiento obligatorio: la organización selecciona los controles que responden a sus riesgos y documenta la decisión (incluidas exclusiones y justificación) en la Declaración de Aplicabilidad exigida por la cláusula 6.1.3.",
    totalControles: 93,
    categorias: [
      {
        nombre: "Organizativos",
        cantidad: 37,
        color: "#2980b9",
        icono: "🏢",
        ejemplos: [
          "A.5.1 Políticas de seguridad",
          "A.5.7 Inteligencia de amenazas",
          "A.5.9 Inventario de activos",
          "A.5.14 Transferencia de información",
        ],
      },
      {
        nombre: "Personas",
        cantidad: 8,
        color: "#27ae60",
        icono: "👥",
        ejemplos: [
          "A.6.3 Concienciación y capacitación",
          "A.6.4 Proceso disciplinario",
          "A.6.5 Responsabilidades al finalizar el empleo",
        ],
      },
      {
        nombre: "Físicos",
        cantidad: 14,
        color: "#f39c12",
        icono: "🏛️",
        ejemplos: [
          "A.7.2 Controles de acceso físico",
          "A.7.9 Seguridad de activos fuera de las instalaciones",
          "A.7.14 Eliminación segura de equipos",
        ],
      },
      {
        nombre: "Tecnológicos",
        cantidad: 34,
        color: "#00a8b5",
        icono: "💻",
        ejemplos: [
          "A.8.2 Derechos de acceso privilegiado",
          "A.8.5 Autenticación segura",
          "A.8.8 Gestión de vulnerabilidades",
          "A.8.13 Copias de respaldo",
        ],
      },
    ],
  },

  controlesAplicados: {
    titulo: "Controles aplicados por riesgo en CODEXA",
    descripcion: "Selección de 12 controles de los 93 disponibles, todos justificables por un riesgo concreto identificado. Esta trazabilidad entre riesgo y control es lo que un auditor verifica en la Declaración de Aplicabilidad.",
    totalSeleccionados: 12,
    detalle: [
      {
        riesgo: "R-01 Robo o exfiltración de información por acceso no autorizado",
        nivelRiesgo: "Crítico (20)",
        activo: "A-01 Base de datos transaccional",
        controles: [
          {
            codigo: "A.5.15",
            nombre: "Control de acceso",
            categoria: "Organizativo",
            comoAyuda: "Limita el acceso a la base de datos a usuarios estrictamente autorizados según su rol.",
          },
          {
            codigo: "A.8.2",
            nombre: "Derechos de acceso privilegiado",
            categoria: "Tecnológico",
            comoAyuda: "Restringe y monitorea las cuentas administrativas, y la revisión trimestral elimina permisos heredados.",
          },
          {
            codigo: "A.8.5",
            nombre: "Autenticación segura",
            categoria: "Tecnológico",
            comoAyuda: "Hace inservible una contraseña robada: el atacante necesitaría además el segundo factor (MFA).",
          },
        ],
      },
      {
        riesgo: "R-02 Phishing e ingeniería social",
        nivelRiesgo: "Crítico (16)",
        activo: "A-04 Correo institucional",
        controles: [
          {
            codigo: "A.6.3",
            nombre: "Concienciación, educación y capacitación",
            categoria: "Personas",
            comoAyuda: "Reduce los errores del usuario, que sigue siendo el eslabón más explotado (62% de brechas en 2026).",
          },
          {
            codigo: "A.8.23",
            nombre: "Filtrado web",
            categoria: "Tecnológico",
            comoAyuda: "Disminuye el número de mensajes fraudulentos que llegan a la bandeja de entrada.",
          },
          {
            codigo: "A.5.14",
            nombre: "Transferencia de información",
            categoria: "Organizativo",
            comoAyuda: "Configuración correcta de SPF, DKIM y DMARC que evita la suplantación del dominio.",
          },
        ],
      },
      {
        riesgo: "R-03 Ransomware o interrupción del servicio",
        nivelRiesgo: "Crítico (15)",
        activo: "A-03 Servidores de aplicación",
        controles: [
          {
            codigo: "A.8.8",
            nombre: "Gestión de vulnerabilidades técnicas",
            categoria: "Tecnológico",
            comoAyuda: "Cierra la puerta de entrada más utilizada: las vulnerabilidades sin parchear (31% de los casos en 2026).",
          },
          {
            codigo: "A.8.13",
            nombre: "Copias de respaldo",
            categoria: "Tecnológico",
            comoAyuda: "Esquema 3-2-1 con pruebas de restauración semestrales que garantizan recuperación sin pagar rescate.",
          },
          {
            codigo: "A.5.30",
            nombre: "Preparación de las TIC para la continuidad",
            categoria: "Organizativo",
            comoAyuda: "Alineado con ISO 22301: define RTO y RPO para la plataforma SaaS que sirve a 31 cooperativas.",
          },
        ],
      },
      {
        riesgo: "R-04 Fuga de código fuente y secretos de despliegue",
        nivelRiesgo: "Alto (12)",
        activo: "A-02 Repositorio de código fuente",
        controles: [
          {
            codigo: "A.8.4",
            nombre: "Acceso al código fuente",
            categoria: "Tecnológico",
            comoAyuda: "Evita que las claves de producción viajen dentro del código mediante gestor centralizado de secretos.",
          },
          {
            codigo: "A.5.11",
            nombre: "Devolución de activos",
            categoria: "Organizativo",
            comoAyuda: "Asegura que el acceso termine el mismo día de la desvinculación laboral.",
          },
          {
            codigo: "A.6.5",
            nombre: "Responsabilidades al finalizar el empleo",
            categoria: "Personas",
            comoAyuda: "Cierra una de las vías de fuga más silenciosas: exempleados con accesos vigentes.",
          },
        ],
      },
      {
        riesgo: "R-05 Pérdida o robo de portátil con información sensible",
        nivelRiesgo: "Moderado (9)",
        activo: "A-05 Portátiles corporativos",
        controles: [
          {
            codigo: "A.8.1",
            nombre: "Dispositivos endpoint",
            categoria: "Tecnológico",
            comoAyuda: "Sincronización automática con el repositorio corporativo para recuperar datos.",
          },
          {
            codigo: "A.8.24",
            nombre: "Uso de criptografía",
            categoria: "Tecnológico",
            comoAyuda: "Vuelve ilegible el disco para quien tome el equipo: la pérdida se vuelve un problema de hardware, no una brecha de datos.",
          },
          {
            codigo: "A.7.9",
            nombre: "Seguridad de activos fuera de las instalaciones",
            categoria: "Físico",
            comoAyuda: "Políticas de traslado y borrado remoto que mitigan el riesgo fuera de la oficina.",
          },
        ],
      },
    ],
  },

  estructuraNorma: {
    titulo: "Estructura de la Norma (Capítulos 1-10)",
    descripcion: "Aunque los controles del Anexo A son la parte más visible, la ISO 27001 se estructura en 10 capítulos que definen el SGSI de extremo a extremo.",
    capitulos: [
      {
        numero: 1,
        titulo: "Alcance",
        grupo: "Introductorio",
        descripcion: "Aplicable a cualquier organización, sector y naturaleza. Determina si la empresa cumple o no con los requisitos de la norma.",
        caracteristicas: [
          "Considera la terminología estándar",
          "No obliga a conocer a fondo el resto de las normas de la familia para certificarse",
          "Asegura la coherencia técnica con otras normativas internacionales",
        ],
        aplicacionCodexa: "CODEXA delimita el alcance a su plataforma SaaS financiera, excluyendo procesos internos no relacionados.",
      },
      {
        numero: 2,
        titulo: "Referencias Normativas",
        grupo: "Introductorio",
        descripcion: "Documentos normativos indispensables para la aplicación del estándar.",
        caracteristicas: [
          "Considera la terminología estándar",
          "Asegura coherencia técnica con otras normativas internacionales",
        ],
        aplicacionCodexa: "Se referencia ISO/IEC 27002:2022, ISO/IEC 27005:2022 e ISO 22301:2019.",
      },
      {
        numero: 3,
        titulo: "Términos y Definiciones",
        grupo: "Introductorio",
        descripcion: "Lenguaje técnico estandarizado que evita interpretaciones erróneas en las auditorías.",
        caracteristicas: [
          "Evita interpretaciones erróneas entre auditores",
          "Permite que cualquier área de la empresa comprenda la norma",
          "Facilita la interoperabilidad técnica y de gestión entre empresas",
        ],
        aplicacionCodexa: "Alineación de vocabulario entre Desarrollo, Infraestructura, Comercial y Administración.",
      },
      {
        numero: 4,
        titulo: "Contexto de la Organización",
        grupo: "Planificar",
        descripcion: "Evalúa factores internos y externos que afectan la seguridad de la información.",
        caracteristicas: [
          "Evalúa factores internos y externos",
          "Identifica necesidades de proveedores, reguladores y empleados",
          "Precisa los límites definitivos del alcance del SGSI",
          "Analiza cómo interactúan los procesos con la seguridad",
        ],
        aplicacionCodexa: "Identifica como partes interesadas a las 31 cooperativas cliente, la LOPDP, el proveedor de nube y los 48 colaboradores.",
      },
      {
        numero: 5,
        titulo: "Liderazgo",
        grupo: "Planificar",
        descripcion: "Compromiso directo de la alta dirección con el SGSI.",
        caracteristicas: [
          "Se comunican responsabilidades y autoridades dentro de la organización",
          "Los objetivos de seguridad van de la mano con los objetivos generales",
          "Fomenta la comunicación de la seguridad en todos los niveles",
        ],
        aplicacionCodexa: "La dirección aprobó la política de seguridad y asignó recursos para la implementación del SGSI.",
      },
      {
        numero: 6,
        titulo: "Planificación",
        grupo: "Planificar",
        descripcion: "Define el proceso para identificar, analizar y evaluar amenazas, y establece metas de seguridad.",
        caracteristicas: [
          "Define el proceso para identificar, analizar y evaluar amenazas",
          "Establece metas ligadas a la estrategia corporativa y comunicadas a toda la plantilla",
          "Planifica de forma controlada cualquier modificación que afecte al SGSI",
        ],
        aplicacionCodexa: "Se evaluaron 5 riesgos con matriz P×I: 3 críticos (R-01, R-02, R-03), 1 alto (R-04) y 1 moderado (R-05).",
      },
      {
        numero: 7,
        titulo: "Soporte",
        grupo: "Hacer",
        descripcion: "Recursos, competencia, concienciación y control de la información documentada.",
        caracteristicas: [
          "Asignar los recursos humanos, financieros y tecnológicos necesarios",
          "Capacitar al personal y garantizar que sea apto para sus funciones",
          "Exige que los empleados entiendan la importancia de la seguridad",
          "Crear, actualizar, proteger y controlar la documentación y los registros",
        ],
        aplicacionCodexa: "Programa anual de capacitación con talleres trimestrales y simulaciones de phishing para los 48 colaboradores.",
      },
      {
        numero: 8,
        titulo: "Operación",
        grupo: "Hacer",
        descripcion: "Ejecución de los controles planificados y supervisión de procesos internos y externos.",
        caracteristicas: [
          "Aplica metodologías de análisis de riesgos a intervalos planificados o tras cambios significativos",
          "Supervisa, controla y evalúa los procesos de proveedores externos",
          "Mantiene evidencia para demostrar que los procesos se ejecutan según lo planificado",
        ],
        aplicacionCodexa: "Ventanas de mantenimiento quincenales, monitoreo de logs y gestión de incidentes documentados.",
      },
      {
        numero: 9,
        titulo: "Evaluación del Desempeño",
        grupo: "Verificar",
        descripcion: "Revisiones periódicas para verificar el cumplimiento normativo y la eficacia del SGSI.",
        caracteristicas: [
          "Se realizan revisiones periódicas planificadas para verificar el cumplimiento normativo",
          "Se revisa el estado del sistema para tomar decisiones",
          "Se aplica la metodología de planificar, hacer, verificar y actuar (PHVA)",
        ],
        aplicacionCodexa: "Auditorías internas semestrales y revisión anual de riesgos y controles por la dirección.",
      },
      {
        numero: 10,
        titulo: "Mejora",
        grupo: "Actuar",
        descripcion: "Corrección de fallas detectadas y mejora continua del sistema.",
        caracteristicas: [
          "Obliga a identificar las fallas del sistema y actuar de inmediato",
          "Busca la causa de origen de los problemas",
          "Implementa soluciones efectivas y hace seguimiento a su grado de éxito",
        ],
        aplicacionCodexa: "Registro de no conformidades, análisis causa-raíz y actualización de controles en cada ciclo.",
      },
    ],
  },

  cicloPHVA: {
    titulo: "Ciclo PHVA / PDCA en ISO 27001",
    descripcion: "La norma ISO 27001 no funciona como una lista de requisitos aislados, sino que está construida sobre la lógica del ciclo PHVA (Planificar, Hacer, Verificar, Actuar). Es la columna vertebral que permite que el sistema de gestión no se quede estático, sino que evolucione junto con los riesgos y el contexto de la organización.",
    fases: [
      {
        nombre: "Planificar",
        icono: "📝",
        color: "#2980b9",
        capitulosRelacionados: ["4", "5", "6", "7"],
        descripcion: "La organización define qué quiere proteger, identifica los riesgos que enfrenta y establece los objetivos de seguridad.",
        aplicacionCodexa: "Análisis del contexto, aprobación de la política por la dirección, evaluación de los 5 riesgos y definición del alcance del SGSI.",
      },
      {
        nombre: "Hacer",
        icono: "⚙️",
        color: "#27ae60",
        capitulosRelacionados: ["7", "8"],
        descripcion: "Puesta en marcha de las decisiones: se implementan los controles, se capacita al personal y se ejecutan los procedimientos definidos.",
        aplicacionCodexa: "Implementación de MFA, respaldo 3-2-1, gestión de vulnerabilidades, cifrado de portátiles y programa de concienciación.",
      },
      {
        nombre: "Verificar",
        icono: "🔍",
        color: "#f39c12",
        capitulosRelacionados: ["9"],
        descripcion: "Se revisa si lo implementado realmente está funcionando, mediante auditorías internas, revisiones de indicadores y seguimiento de incidentes.",
        aplicacionCodexa: "Auditorías internas semestrales, revisión de logs, pruebas de restauración y evaluación de indicadores CID.",
      },
      {
        nombre: "Actuar",
        icono: "🔄",
        color: "#e74c3c",
        capitulosRelacionados: ["10"],
        descripcion: "Cierra el ciclo con la corrección de fallas detectadas y la mejora de los procesos, para volver a empezar con una planificación más afinada.",
        aplicacionCodexa: "Análisis causa-raíz de incidentes, actualización de controles y ajuste de la matriz de riesgos.",
      },
    ],
  },

  integracionOtrasNormas: {
    titulo: "Integración con otras normas",
    descripcion: "CODEXA adopta un enfoque integrado que combina ISO 27001 con normas complementarias según su actividad de SaaS financiero.",
    cuadroComparativo: [
      { norma: "ISO/IEC 27001", enfoque: "Requisitos para establecer, implementar y mejorar un SGSI", certificable: true, aporte: "Marco general y certificable de gestión de seguridad de la información." },
      { norma: "ISO/IEC 27002", enfoque: "Buenas prácticas y controles de seguridad", certificable: false, aporte: "Complementa a la 27001 detallando cómo aplicar cada control." },
      { norma: "ISO/IEC 27005", enfoque: "Gestión de riesgos de seguridad de la información", certificable: false, aporte: "Lineamientos específicos para identificar y tratar riesgos." },
      { norma: "ISO 9001", enfoque: "Gestión de la calidad", certificable: true, aporte: "Se integra con la 27001 en organizaciones con sistema de gestión unificado." },
      { norma: "ISO 22301", enfoque: "Continuidad del negocio", certificable: true, aporte: "Enfocado en que la organización siga operando ante incidentes graves (RTO/RPO)." },
    ],
  },
};