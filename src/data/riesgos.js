export const riesgos = [
  {
      "N°": "1",
      "Riesgo": "Acceso no autorizado a información.",
      "Descripción del riesgo": "Empleados o terceros acceden a datos sensibles sin autorización.",
      "Consecuencia": "Pérdida de confidencialidad y filtración de datos de clientes.",
      "Probabilidad": "Alta",
      "Impacto": "Alto",
      "Nivel de Riesgo": "Crítico"
  },
  {
      "N°": "2",
      "Riesgo": "Ausencia de conciencia en seguridad.",
      "Descripción del riesgo": "Personal sin formación comete errores operativos o cae en ataques de ingeniería social.",
      "Consecuencia": "Vulnerabilidad de los activos por errores humanos accidentales.",
      "Probabilidad": "Alta",
      "Impacto": "Medio",
      "Nivel de Riesgo": "Alto"
  },
  {
      "N°": "3",
      "Riesgo": "Robo de activos físicos o digitales.",
      "Descripción del riesgo": "Equipos o soportes de almacenamiento con información crítica sin control de inventario.",
      "Consecuencia": "Indisponibilidad o robo de propiedad intelectual y datos financieros.",
      "Probabilidad": "Media",
      "Impacto": "Alto",
      "Nivel de Riesgo": "Alto"
  },
  {
      "N°": "4",
      "Riesgo": "Fallos en la criptografía de datos.",
      "Descripción del riesgo": "Datos sensibles almacenados o transmitidos sin cifrado adecuado.",
      "Consecuencia": "Exposición de información confidencial ante interceptaciones.",
      "Probabilidad": "Media",
      "Impacto": "Alto",
      "Nivel de Riesgo": "Alto"
  },
  {
      "N°": "5",
      "Riesgo": "Daños físicos o ambientales.",
      "Descripción del riesgo": "Incendios, inundaciones o accesos físicos no autorizados al centro de procesamiento.",
      "Consecuencia": "Destrucción de instalaciones e interrupción total de los sistemas.",
      "Probabilidad": "Baja",
      "Impacto": "Alto",
      "Nivel de Riesgo": "Medio"
  },
  {
      "N°": "6",
      "Riesgo": "Vulnerabilidades en operaciones TIC.",
      "Descripción del riesgo": "Falta de actualización de definiciones de virus o fallos en el monitoreo de registros.",
      "Consecuencia": "Infección por malware o ejecución de operaciones incorrectas.",
      "Probabilidad": "Alta",
      "Impacto": "Medio",
      "Nivel de Riesgo": "Alto"
  },
  {
      "N°": "7",
      "Riesgo": "Inseguridad en las redes de comunicación.",
      "Descripción del riesgo": "Falta de protección en la transmisión de datos a través de redes públicas o internas.",
      "Consecuencia": "Alteración de la información en tránsito.",
      "Probabilidad": "Media",
      "Impacto": "Medio",
      "Nivel de Riesgo": "Medio"
  },
  {
      "N°": "8",
      "Riesgo": "Errores en desarrollo de sistemas.",
      "Descripción del riesgo": "Defectos de codificación o fallas de seguridad integradas durante el ciclo de vida del software.",
      "Consecuencia": "Compromiso de la integridad de los sistemas y brechas funcionales.",
      "Probabilidad": "Media",
      "Impacto": "Alto",
      "Nivel de Riesgo": "Alto"
  },
  {
      "N°": "9",
      "Riesgo": "Riesgos por terceros y proveedores.",
      "Descripción del riesgo": "Proveedores externos con acceso a los sistemas de la empresa sin controles de seguridad estrictos.",
      "Consecuencia": "Fugas de información y incumplimiento de acuerdos de nivel de servicio (SLA).",
      "Probabilidad": "Alta",
      "Impacto": "Alto",
      "Nivel de Riesgo": "Crítico"
  },
  {
      "N°": "10",
      "Riesgo": "Gestión deficiente de incidentes de seguridad.",
      "Descripción del riesgo": "Falta de un enfoque coherente para reportar debilidades e infracciones de seguridad.",
      "Consecuencia": "Retraso en la contención de amenazas, agravando el daño a la organización.",
      "Probabilidad": "Media",
      "Impacto": "Alto",
      "Nivel de Riesgo": "Alto"
  },
  {
      "N°": "11",
      "Riesgo": "Interrupción de la continuidad del negocio.",
      "Descripción del riesgo": "Ausencia de planes para mantener los servicios de información ante desastres o crisis.",
      "Consecuencia": "Incumplimiento de la continuidad operativa y parálisis comercial.",
      "Probabilidad": "Baja",
      "Impacto": "Alto",
      "Nivel de Riesgo": "Medio"
  },
  {
      "N°": "12",
      "Riesgo": "Incumplimiento legal y regulatorio.",
      "Descripción del riesgo": "No acatar normativas vigentes o cláusulas contractuales de seguridad de datos.",
      "Consecuencia": "Sanciones legales, multas económicas y daño a la reputación corporativa.",
      "Probabilidad": "Media",
      "Impacto": "Alto",
      "Nivel de Riesgo": "Alto"
  }
];

export function calcularNivel(prob, imp) {
  const s = prob * imp;
  if (s >= 16) return "Crítico";
  if (s >= 12) return "Alto";
  if (s >= 6)  return "Medio";
  return "Bajo";
}