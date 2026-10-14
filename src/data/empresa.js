export const empresa = {
  "seccion": "contexto_empresarial",
  "version": "2.0",
  "empresa": {
    "nombre": "CODEXA Soluciones Tecnológicas S.A.S.",
    "tipo_empresa": "Empresa de tecnología: desarrollo, comercialización y operación de software financiero en modalidad SaaS",
    "tamano": "Mediana empresa",
    "actividad": "Desarrollo y operación de un sistema de gestión financiera SaaS para cooperativas de ahorro y crédito de los segmentos 3 a 5, con soporte técnico remoto y servicios de integración",
    "ubicacion": "Milagro, provincia del Guayas, Ecuador (sede administrativa y de desarrollo); infraestructura productiva en proveedor de nube pública (IaaS)",
    "numero_empleados": 48,
    "areas": [
      {
        "area": "Desarrollo",
        "colaboradores": 22
      },
      {
        "area": "Infraestructura y Soporte",
        "colaboradores": 14
      },
      {
        "area": "Comercial",
        "colaboradores": 7
      },
      {
        "area": "Administración",
        "colaboradores": 5
      }
    ],
    "alcance": {
      "cooperativas_activas": 31,
      "socios_finales_aprox": 140000,
      "modelo_datos": "Base multiempresa (multi-tenant)"
    },
    "servicios": [
      "Plataforma SaaS de gestión financiera",
      "Soporte técnico remoto",
      "Servicios de integración con los sistemas de los clientes"
    ],
    "informacion_que_gestiona": [
      "Datos personales de los socios (cédula, nombres, dirección, teléfono, actividad económica)",
      "Datos financieros (saldos, movimientos, garantías y calificación crediticia)",
      "Código fuente propietario y credenciales de despliegue de la plataforma",
      "Contratos, acuerdos de nivel de servicio (SLA) y documentación contable",
      "Expedientes laborales del personal"
    ],
    "sistemas_y_servicios_tecnologicos": [
      "Base de datos transaccional de producción (PostgreSQL, multiempresa)",
      "Repositorio de código fuente (GitLab autoalojado)",
      "Servidores de aplicación en la nube (3 instancias productivas, IaaS)",
      "Correo institucional y plataforma de colaboración documental en la nube",
      "Equipos portátiles de desarrollo y soporte (36 unidades)"
    ],
    "marco_normativo": {
      "obligatorio": [
        "Ley Orgánica de Protección de Datos Personales y su Reglamento General",
        "Exigencias contractuales de clientes supervisados"
      ],
      "voluntario": [
        "ISO/IEC 27001:2022",
        "ISO/IEC 27002:2022",
        "ISO/IEC 27005:2022",
        "ISO 22301:2019"
      ]
    },
    "motivacion_sgsi": "Dos clientes exigen la certificación ISO/IEC 27001 como requisito de renovación contractual; la empresa aún no tiene inventario formal de activos ni política de seguridad aprobada."
  },
  "procesos": [
    {
      "id": "P-01",
      "nombre": "Desarrollo del producto SaaS",
      "tipo": "Misional",
      "descripcion": "Diseño, programación, pruebas y despliegue de la plataforma financiera.",
      "responsable": "Líder de Desarrollo",
      "criticidad": "Alta",
      "tiempo_max_interrupcion_horas": null
    },
    {
      "id": "P-02",
      "nombre": "Plataforma SaaS (operación y hosting)",
      "tipo": "Misional",
      "descripcion": "Operación de la plataforma en la nube que atiende a las 31 cooperativas.",
      "responsable": "Jefe de Infraestructura",
      "criticidad": "Crítica",
      "tiempo_max_interrupcion_horas": 4
    },
    {
      "id": "P-03",
      "nombre": "Gestión de base de datos transaccional",
      "tipo": "Misional",
      "descripcion": "Administración y respaldo de la base multiempresa con datos personales y financieros.",
      "responsable": "Jefe de Infraestructura",
      "criticidad": "Crítica",
      "tiempo_max_interrupcion_horas": 4
    },
    {
      "id": "P-04",
      "nombre": "Atención a cooperativas (soporte técnico)",
      "tipo": "Misional",
      "descripcion": "Soporte técnico remoto a las cooperativas clientes.",
      "responsable": "Infraestructura y Soporte",
      "criticidad": "Alta",
      "tiempo_max_interrupcion_horas": 8
    },
    {
      "id": "P-05",
      "nombre": "Servicios de integración",
      "tipo": "Misional",
      "descripcion": "Integración de la plataforma con los sistemas de los clientes.",
      "responsable": "Infraestructura y Soporte",
      "criticidad": "Media",
      "tiempo_max_interrupcion_horas": 8
    },
    {
      "id": "P-06",
      "nombre": "Gestión comercial",
      "tipo": "Apoyo",
      "descripcion": "Propuestas, contratos e historial de servicios con clientes.",
      "responsable": "Área Comercial",
      "criticidad": "Media",
      "tiempo_max_interrupcion_horas": null
    },
    {
      "id": "P-07",
      "nombre": "Administración y talento humano",
      "tipo": "Apoyo",
      "descripcion": "Información financiera interna, contratos y expedientes laborales.",
      "responsable": "Área Administrativa",
      "criticidad": "Media",
      "tiempo_max_interrupcion_horas": null
    }
  ],
  "activos": [
    {
      "id": "A-01",
      "nombre": "Base de datos transaccional de producción (PostgreSQL, multiempresa)",
      "tipo": "Información / datos",
      "descripcion": "Datos personales y financieros de ~140.000 socios de 31 cooperativas.",
      "ubicacion": "Servidores productivos en nube",
      "propietario": "Jefe de Infraestructura",
      "importancia": "Alta",
      "origen": "Guía S4",
      "riesgo_asociado": "R-01",
      "nivel_riesgo_guia": "Crítico",
      "que_podria_ocurrir": "Robo o exfiltración por acceso no autorizado: cuentas administrativas con contraseñas débiles y reutilizadas, sin MFA ni revisión periódica de privilegios.",
      "procesos_relacionados": [
        "P-02",
        "P-03"
      ]
    },
    {
      "id": "A-02",
      "nombre": "Repositorio de código fuente (GitLab autoalojado)",
      "tipo": "Propiedad intelectual",
      "descripcion": "Código propietario del producto y secretos de despliegue.",
      "ubicacion": "GitLab autoalojado",
      "propietario": "Líder de Desarrollo",
      "importancia": "Alta",
      "origen": "Guía S4",
      "riesgo_asociado": "R-04",
      "nivel_riesgo_guia": "Alto",
      "que_podria_ocurrir": "Fuga de código y secretos por credenciales incrustadas y accesos que no se revocan al desvincular colaboradores.",
      "procesos_relacionados": [
        "P-01"
      ]
    },
    {
      "id": "A-03",
      "nombre": "Servidores de aplicación en la nube (3 instancias productivas, IaaS)",
      "tipo": "Servicio / hardware virtual",
      "descripcion": "Instancias que ejecutan la plataforma SaaS; su caída afecta a las 31 cooperativas.",
      "ubicacion": "Proveedor de nube pública",
      "propietario": "Jefe de Infraestructura",
      "importancia": "Alta",
      "origen": "Guía S4",
      "riesgo_asociado": "R-03",
      "nivel_riesgo_guia": "Crítico",
      "que_podria_ocurrir": "Ransomware o interrupción del servicio por actualizaciones sin calendario y sin pruebas de restauración de respaldos.",
      "procesos_relacionados": [
        "P-02",
        "P-04",
        "P-05"
      ]
    },
    {
      "id": "A-04",
      "nombre": "Correo institucional y plataforma de colaboración documental",
      "tipo": "Servicio en la nube",
      "descripcion": "Correo y documentos compartidos de los 48 colaboradores.",
      "ubicacion": "Nube",
      "propietario": "Coordinador de TI",
      "importancia": "Alta",
      "origen": "Guía S4",
      "riesgo_asociado": "R-02",
      "nivel_riesgo_guia": "Crítico",
      "que_podria_ocurrir": "Phishing e ingeniería social por falta de concienciación y de registros SPF, DKIM y DMARC bien configurados.",
      "procesos_relacionados": [
        "P-01",
        "P-04",
        "P-06",
        "P-07"
      ]
    },
    {
      "id": "A-05",
      "nombre": "Equipos portátiles de desarrollo y soporte (36 unidades)",
      "tipo": "Hardware / endpoint",
      "descripcion": "Portátiles con código, credenciales y datos de trabajo.",
      "ubicacion": "Oficinas Milagro y uso externo",
      "propietario": "Coordinador de TI",
      "importancia": "Media",
      "origen": "Guía S4",
      "riesgo_asociado": "R-05",
      "nivel_riesgo_guia": "Moderado",
      "que_podria_ocurrir": "Pérdida o robo con información sensible: discos sin cifrado, archivos solo en local y traslado frecuente fuera de la oficina.",
      "procesos_relacionados": [
        "P-01",
        "P-04"
      ]
    },
    {
      "id": "A-06",
      "nombre": "Contratos, SLA y documentación contable",
      "tipo": "Información",
      "descripcion": "Contratos con cooperativas, acuerdos de nivel de servicio y registros contables.",
      "ubicacion": "Archivo digital y físico",
      "propietario": "Administración (por designar)",
      "importancia": "Media",
      "origen": "Complementario",
      "riesgo_asociado": null,
      "nivel_riesgo_guia": null,
      "que_podria_ocurrir": "Activo mencionado en la información que gestiona la empresa; no tiene riesgo asignado en la Guía S4.",
      "procesos_relacionados": [
        "P-06",
        "P-07"
      ]
    },
    {
      "id": "A-07",
      "nombre": "Expedientes laborales del personal",
      "tipo": "Información",
      "descripcion": "Datos personales y laborales de los 48 colaboradores.",
      "ubicacion": "Archivo de Administración",
      "propietario": "Administración (por designar)",
      "importancia": "Media",
      "origen": "Complementario",
      "riesgo_asociado": null,
      "nivel_riesgo_guia": null,
      "que_podria_ocurrir": "Activo mencionado en la información que gestiona la empresa; no tiene riesgo asignado en la Guía S4.",
      "procesos_relacionados": [
        "P-07"
      ]
    }
  ],
  "resumen_activos": {
    "total": 7,
    "por_importancia": {
      "Alta": 4,
      "Media": 3
    },
    "por_tipo": {
      "Información / datos": 1,
      "Propiedad intelectual": 1,
      "Servicio / hardware virtual": 1,
      "Servicio en la nube": 1,
      "Hardware / endpoint": 1,
      "Información": 2
    }
  }
};