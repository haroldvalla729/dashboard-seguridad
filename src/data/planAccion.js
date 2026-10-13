export const planAccion = {
  "seccion": "mitigacion",
  "numero_seccion_del_trabajo": 4,
  "titulo": "Mitigación: plan de acción vinculado a los riesgos",
  "empresa": "CODEXA Soluciones Tecnológicas S.A.S.",
  "tipo_de_caso": "Caso ficticio de estudio",
  "fecha_elaboracion": "2026-10-13",
  "objetivo": "Vincular las cinco situaciones de riesgo R-01 a R-05 con medidas de mitigación verificables y con el plan de acción del trabajo de CODEXA.",
  "alcance": "Cinco activos críticos o importantes (A-01 a A-05), con los cinco riesgos R-01 a R-05 descritos en el PDF del proyecto.",
  "criterios": {
    "evaluacion": "El documento clasifica tres riesgos como Crítico, uno Alto y uno Moderado; no comunica los valores individuales de probabilidad e impacto.",
    "niveles_reportados": {
      "Crítico": "15–25 puntos",
      "Alto": "10–14 puntos",
      "Moderado": "5–9 puntos"
    },
    "priorizacion": "Se propone prioridad Alta para riesgos Crítico o Alto y Media para el Moderado. Es una clasificación operativa del plan, no una tabla de puntuaciones del documento.",
    "plazos": "Se trasladan literalmente los plazos de las cinco acciones de la página 13; cuando una acción no tiene plazo en el PDF se indica expresamente.",
    "estado": "Medidas propuestas en el trabajo; no se dispone de evidencia de ejecución.",
    "iso": "Controles indicados por referencia a ISO/IEC 27001:2022; las asociaciones específicas entre controles y riesgos son propuestas para el dashboard."
  },
  "resumen": {
    "total_riesgos_vinculados": 5,
    "total_acciones_principales": 5,
    "por_prioridad": {
      "Alta": 4,
      "Media": 1,
      "Baja": 0
    },
    "por_nivel_riesgo": {
      "Crítico": 3,
      "Alto": 1,
      "Moderado": 1
    },
    "acciones_propuestas": 5,
    "acciones_ejecutadas": 0
  },
  "plan_accion": [
    {
      "id_accion": "M-01",
      "id_riesgo": "R-01",
      "id_activo": "A-01",
      "prioridad": "Alta",
      "tratamiento": "Mitigar",
      "accion": "Implementar MFA y control formal de privilegios en PostgreSQL y accesos administrativos",
      "responsable": "Jefe de Infraestructura / Coordinador de TI",
      "plazo_estimado": {
        "dias_calendario": 7,
        "descripcion": "MFA: 1 semana; controles de acceso: 3 semanas"
      },
      "plazos_complementarios": [
        {
          "actividad": "Control formal de accesos y revisión periódica",
          "dias_calendario": 21
        }
      ],
      "control": "A.8.5 · A.5.15 · A.5.18",
      "controles_iso_27001_2022": [
        {
          "codigo": "8.5",
          "nombre": "Autenticación segura"
        },
        {
          "codigo": "5.15",
          "nombre": "Control de acceso"
        },
        {
          "codigo": "5.18",
          "nombre": "Derechos de acceso"
        }
      ],
      "actividades": [
        "Habilitar MFA en los accesos administrativos a la base PostgreSQL y a los sistemas críticos.",
        "Aplicar permisos por roles (RBAC) y el principio de menor privilegio.",
        "Solicitar aprobación de los propietarios antes de habilitar privilegios.",
        "Revisar trimestralmente las cuentas y revocar accesos inmediatamente al desvincular personal."
      ],
      "indicador": "Porcentaje de cuentas privilegiadas cubiertas por MFA y revisión de permisos",
      "meta_de_verificacion": "100 % de cuentas administrativas cubiertas por MFA; revisiones trimestrales registradas (meta propuesta)",
      "evidencias_esperadas": [
        "Configuración MFA",
        "Matriz de roles y accesos aprobada",
        "Actas de revisión trimestral"
      ],
      "fundamento": "PDF: acceso a PostgreSQL sin MFA, política RBAC y plan de acción de 1 y 3 semanas (pp. 5, 10, 13).",
      "id": "R-01",
      "activo": "Base de datos transaccional (PostgreSQL)",
      "activo_afectado": "Base de datos transaccional (PostgreSQL)",
      "amenaza": "Acceso no autorizado y exfiltración de información",
      "vuln": "Contraseñas débiles o reutilizadas; ausencia de MFA y revisión periódica de privilegios.",
      "vulnerabilidad": "Contraseñas débiles o reutilizadas; ausencia de MFA y revisión periódica de privilegios.",
      "evaluacion_riesgo": {
        "probabilidad": null,
        "impacto": null,
        "puntaje": null,
        "nivel": "Crítico"
      },
      "prob": null,
      "imp": null,
      "estado": "Propuesto",
      "riesgo_residual": "Pendiente de reevaluación después de ejecutar controles",
      "accion_principal": "Implementar MFA y control formal de privilegios en PostgreSQL y accesos administrativos"
    },
    {
      "id_accion": "M-02",
      "id_riesgo": "R-02",
      "id_activo": "A-04",
      "prioridad": "Alta",
      "tratamiento": "Mitigar",
      "accion": "Capacitar al personal contra phishing y proteger el correo corporativo",
      "responsable": "Coordinador de TI (propuesto para coordinar la actividad)",
      "plazo_estimado": {
        "dias_calendario": null,
        "descripcion": "Talleres trimestrales; fecha de inicio no definida en el documento"
      },
      "plazos_complementarios": [],
      "control": "A.6.3 · A.8.5",
      "controles_iso_27001_2022": [
        {
          "codigo": "6.3",
          "nombre": "Concienciación, educación y formación en seguridad de la información"
        },
        {
          "codigo": "8.5",
          "nombre": "Autenticación segura"
        }
      ],
      "actividades": [
        "Realizar talleres trimestrales y simulaciones periódicas de correos engañosos para los 48 colaboradores.",
        "Configurar y comprobar SPF, DKIM y DMARC para el dominio institucional.",
        "Activar MFA en el correo y monitorear inicios de sesión anómalos.",
        "Establecer el reporte inmediato y cierre de sesiones ante credenciales expuestas."
      ],
      "indicador": "Porcentaje de colaboradores capacitados y dominio con autenticación del correo verificada",
      "meta_de_verificacion": "48 colaboradores incluidos en el programa trimestral y SPF/DKIM/DMARC verificados (meta propuesta)",
      "evidencias_esperadas": [
        "Registros de asistencia",
        "Reportes de simulaciones de phishing",
        "Resultados de SPF, DKIM y DMARC"
      ],
      "fundamento": "PDF: correo institucional, SPF/DKIM/DMARC, talleres trimestrales y procedimiento ante phishing (pp. 5, 9, 11).",
      "id": "R-02",
      "activo": "Correo institucional y colaboración",
      "activo_afectado": "Correo institucional y colaboración",
      "amenaza": "Phishing e ingeniería social",
      "vuln": "Sin programa de concienciación; SPF, DKIM y DMARC sin configuración correcta.",
      "vulnerabilidad": "Sin programa de concienciación; SPF, DKIM y DMARC sin configuración correcta.",
      "evaluacion_riesgo": {
        "probabilidad": null,
        "impacto": null,
        "puntaje": null,
        "nivel": "Crítico"
      },
      "prob": null,
      "imp": null,
      "estado": "Propuesto",
      "riesgo_residual": "Pendiente de reevaluación después de ejecutar controles",
      "accion_principal": "Capacitar al personal contra phishing y proteger el correo corporativo"
    },
    {
      "id_accion": "M-03",
      "id_riesgo": "R-03",
      "id_activo": "A-03",
      "prioridad": "Alta",
      "tratamiento": "Mitigar y preparar recuperación",
      "accion": "Aplicar parches programados, respaldos 3-2-1 y plan de continuidad del SaaS",
      "responsable": "Jefe de Infraestructura / Líder de Desarrollo; Gerencia para continuidad",
      "plazo_estimado": {
        "dias_calendario": 14,
        "descripcion": "Parches y respaldos: 2 semanas; plan de continuidad: 1 mes"
      },
      "plazos_complementarios": [
        {
          "actividad": "Plan de Continuidad del Negocio",
          "dias_calendario": 30
        }
      ],
      "control": "A.8.8 · A.8.13 · A.5.30",
      "controles_iso_27001_2022": [
        {
          "codigo": "8.8",
          "nombre": "Gestión de vulnerabilidades técnicas"
        },
        {
          "codigo": "8.13",
          "nombre": "Respaldo de la información"
        },
        {
          "codigo": "5.30",
          "nombre": "Preparación de las TIC para continuidad del negocio"
        }
      ],
      "actividades": [
        "Definir mantenimiento quincenal para aplicar actualizaciones en las instancias de aplicación y repositorios.",
        "Implementar respaldos 3-2-1: tres copias, dos medios, una fuera del sitio y cifrada.",
        "Ejecutar pruebas de restauración semestrales y documentar su resultado.",
        "Preparar infraestructura alternativa en nube y procedimientos de recuperación.",
        "Validar que la plataforma SaaS y la base transaccional puedan recuperarse dentro del máximo de 4 horas definido en el plan de continuidad."
      ],
      "indicador": "Porcentaje de respaldos verificados; cumplimiento de ventanas de parches y simulacros de recuperación",
      "meta_de_verificacion": "Respaldos restaurables y recuperación objetivo de 4 horas según el plan (validación pendiente)",
      "evidencias_esperadas": [
        "Programación de mantenimiento",
        "Registros de respaldos 3-2-1",
        "Actas de pruebas semestrales",
        "Plan y simulacro de continuidad"
      ],
      "fundamento": "PDF: riesgo ransomware A-03, respaldo 3-2-1, actualizaciones quincenales, 4 horas y plan de acción (pp. 5, 8, 12-13).",
      "id": "R-03",
      "activo": "Servidores de aplicación en la nube",
      "activo_afectado": "Servidores de aplicación en la nube",
      "amenaza": "Ransomware o interrupción del servicio SaaS",
      "vuln": "Actualizaciones sin calendario definido; falta de pruebas de restauración de respaldos.",
      "vulnerabilidad": "Actualizaciones sin calendario definido; falta de pruebas de restauración de respaldos.",
      "evaluacion_riesgo": {
        "probabilidad": null,
        "impacto": null,
        "puntaje": null,
        "nivel": "Crítico"
      },
      "prob": null,
      "imp": null,
      "estado": "Propuesto",
      "riesgo_residual": "Pendiente de reevaluación después de ejecutar controles",
      "accion_principal": "Aplicar parches programados, respaldos 3-2-1 y plan de continuidad del SaaS"
    },
    {
      "id_accion": "M-04",
      "id_riesgo": "R-04",
      "id_activo": "A-02",
      "prioridad": "Alta",
      "tratamiento": "Mitigar",
      "accion": "Restringir y revisar los accesos a GitLab y los secretos de despliegue",
      "responsable": "Líder de Desarrollo / Coordinador de TI y propietarios de activos",
      "plazo_estimado": {
        "dias_calendario": 21,
        "descripcion": "Controles formales de acceso: 3 semanas"
      },
      "plazos_complementarios": [],
      "control": "A.8.4 · A.5.18",
      "controles_iso_27001_2022": [
        {
          "codigo": "8.4",
          "nombre": "Acceso al código fuente"
        },
        {
          "codigo": "5.18",
          "nombre": "Derechos de acceso"
        }
      ],
      "actividades": [
        "Revisar los privilegios sobre el repositorio GitLab y aplicar mínimo privilegio.",
        "Revocar de inmediato credenciales y permisos al desvincular a un colaborador.",
        "Localizar secretos incrustados en el repositorio y migrarlos a almacenamiento de secretos (medida propuesta).",
        "Formalizar aprobaciones y trazabilidad de cambios antes de desplegar código."
      ],
      "indicador": "Porcentaje de cuentas GitLab revisadas y accesos de personal desvinculado revocados",
      "meta_de_verificacion": "100 % de cuentas revisadas; accesos de desvinculados revocados (meta propuesta)",
      "evidencias_esperadas": [
        "Reporte de permisos GitLab",
        "Registro de revocación de usuarios",
        "Constancia de corrección de secretos expuestos"
      ],
      "fundamento": "PDF: riesgo de secretos y permisos persistentes en GitLab, control de cambios y revisión formal de accesos (pp. 5, 7, 10, 13).",
      "id": "R-04",
      "activo": "Repositorio GitLab de código fuente",
      "activo_afectado": "Repositorio GitLab de código fuente",
      "amenaza": "Fuga de código fuente y secretos de despliegue",
      "vuln": "Credenciales incrustadas; accesos no revocados tras la desvinculación de colaboradores.",
      "vulnerabilidad": "Credenciales incrustadas; accesos no revocados tras la desvinculación de colaboradores.",
      "evaluacion_riesgo": {
        "probabilidad": null,
        "impacto": null,
        "puntaje": null,
        "nivel": "Alto"
      },
      "prob": null,
      "imp": null,
      "estado": "Propuesto",
      "riesgo_residual": "Pendiente de reevaluación después de ejecutar controles",
      "accion_principal": "Restringir y revisar los accesos a GitLab y los secretos de despliegue"
    },
    {
      "id_accion": "M-05",
      "id_riesgo": "R-05",
      "id_activo": "A-05",
      "prioridad": "Media",
      "tratamiento": "Mitigar",
      "accion": "Cifrar los 36 portátiles y bloquear dispositivos USB no autorizados",
      "responsable": "Coordinador de TI",
      "plazo_estimado": {
        "dias_calendario": null,
        "descripcion": "Plazo no indicado en el documento; debe programarse"
      },
      "plazos_complementarios": [],
      "control": "A.8.1 · A.8.24",
      "controles_iso_27001_2022": [
        {
          "codigo": "8.1",
          "nombre": "Dispositivos de punto final de usuario"
        },
        {
          "codigo": "8.24",
          "nombre": "Uso de criptografía"
        }
      ],
      "actividades": [
        "Habilitar cifrado completo de discos con BitLocker o FileVault en los 36 portátiles corporativos.",
        "Aplicar restricciones de uso de memorias USB externas.",
        "Evitar que información operativa sensible dependa solo del almacenamiento local.",
        "Verificar recuperación de acceso y cumplimiento del cifrado en el inventario de portátiles."
      ],
      "indicador": "Porcentaje de equipos portátiles con cifrado completo y bloqueo de USB no autorizados",
      "meta_de_verificacion": "36 de 36 portátiles con cifrado activo y control de medios externos (meta propuesta)",
      "evidencias_esperadas": [
        "Inventario de 36 equipos",
        "Reporte de cifrado activo",
        "Configuración de bloqueo de USB"
      ],
      "fundamento": "PDF: riesgo de robo de portátiles y medida de cifrado BitLocker/FileVault y USB (pp. 5, 9).",
      "id": "R-05",
      "activo": "Equipos portátiles de desarrollo y soporte",
      "activo_afectado": "Equipos portátiles de desarrollo y soporte",
      "amenaza": "Pérdida o robo de equipos con información sensible",
      "vuln": "Discos sin cifrar; archivos locales y traslado frecuente de portátiles.",
      "vulnerabilidad": "Discos sin cifrar; archivos locales y traslado frecuente de portátiles.",
      "evaluacion_riesgo": {
        "probabilidad": null,
        "impacto": null,
        "puntaje": null,
        "nivel": "Moderado"
      },
      "prob": null,
      "imp": null,
      "estado": "Propuesto",
      "riesgo_residual": "Pendiente de reevaluación después de ejecutar controles",
      "accion_principal": "Cifrar los 36 portátiles y bloquear dispositivos USB no autorizados"
    }
  ],
  "plan_accion_original_documento": [
    {
      "id": "AP-01",
      "accion": "Implementar autenticación multifactor (MFA) en sistemas críticos",
      "responsable": "Jefe de Infraestructura / Coordinador de TI",
      "prioridad": "Alta",
      "plazo": "1 semana",
      "id_riesgos_vinculados": [
        "R-01",
        "R-02"
      ]
    },
    {
      "id": "AP-02",
      "accion": "Implementar y validar el esquema de respaldos 3-2-1",
      "responsable": "Jefe de Infraestructura",
      "prioridad": "Alta",
      "plazo": "2 semanas",
      "id_riesgos_vinculados": [
        "R-03"
      ]
    },
    {
      "id": "AP-03",
      "accion": "Establecer un programa de gestión de vulnerabilidades y actualizaciones",
      "responsable": "Jefe de Infraestructura / Líder de Desarrollo",
      "prioridad": "Alta",
      "plazo": "2 semanas",
      "id_riesgos_vinculados": [
        "R-03",
        "R-04"
      ]
    },
    {
      "id": "AP-04",
      "accion": "Implementar controles formales de acceso y revisión periódica de privilegios",
      "responsable": "Coordinador de TI / Propietarios de activos",
      "prioridad": "Alta",
      "plazo": "3 semanas",
      "id_riesgos_vinculados": [
        "R-01",
        "R-04"
      ]
    },
    {
      "id": "AP-05",
      "accion": "Elaborar y probar el Plan de Continuidad del Negocio",
      "responsable": "Gerencia / Infraestructura y Soporte",
      "prioridad": "Alta",
      "plazo": "1 mes",
      "id_riesgos_vinculados": [
        "R-03"
      ]
    }
  ],
  "amenazas_complementarias_documentadas_sin_codigo": [
    "Errores humanos en el repositorio y ausencia de un procedimiento formal de cambios",
    "Ausencia de copias de seguridad validadas",
    "Ataques a la página web favorecidos por falta de firewall de aplicaciones (WAF)"
  ],
  "referencia_fuente": {
    "documento": "Sistema de Gestión de Seguridad de la Información S4 – Trabajo Práctico Experimental 2 (documento proporcionado, pp. 5-13)",
    "paginas_riesgos": "5-7",
    "paginas_medidas": "8-11",
    "paginas_continuidad_y_plan": "12-13"
  },
  "nota": "Los cinco tratamientos se vinculan únicamente a los riesgos de CODEXA y no incorporan puntuaciones individuales no documentadas."
};