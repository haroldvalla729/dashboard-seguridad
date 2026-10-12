export const empresa = {
  "seccion": "contexto_empresarial",
  "version": "1.1",
  "empresa": {
    "nombre": "TecnoAndes S.A.",
    "actividad": "Desarrollo de software y servicios en la nube",
    "sector": "Tecnología de la información",
    "ubicacion": "Quito, Ecuador",
    "sede": "Quito, Ecuador",
    "numero_empleados": 45,
    "mision": "Proveer soluciones tecnológicas seguras y confiables.",
    "descripcion_tecnologica": "La empresa desarrolla software a medida y ofrece hosting y administración de servidores, bases de datos, soporte técnico y facturación electrónica a sus clientes, operando sobre infraestructura en la nube y servidores propios."
  },
  "procesos": [
    {
      "id": "P01",
      "nombre": "Desarrollo de software a medida",
      "tipo": "Misional",
      "descripcion": "Análisis, diseño, programación y pruebas de aplicaciones para clientes.",
      "responsable": "Jefe de Desarrollo",
      "criticidad": "Alta"
    },
    {
      "id": "P02",
      "nombre": "Hosting y administración de servidores",
      "tipo": "Misional",
      "descripcion": "Alojamiento y operación de los servidores y aplicaciones de los clientes.",
      "responsable": "Jefe de Infraestructura",
      "criticidad": "Crítica"
    },
    {
      "id": "P03",
      "nombre": "Soporte técnico a clientes",
      "tipo": "Misional",
      "descripcion": "Atención de incidentes y requerimientos de los clientes.",
      "responsable": "Líder de Soporte",
      "criticidad": "Media"
    },
    {
      "id": "P04",
      "nombre": "Gestión de bases de datos",
      "tipo": "Misional",
      "descripcion": "Administración, respaldo y optimización de bases de datos propias y de clientes.",
      "responsable": "Administrador de BD",
      "criticidad": "Crítica"
    },
    {
      "id": "P05",
      "nombre": "Facturación electrónica",
      "tipo": "Misional",
      "descripcion": "Emisión y envío de comprobantes electrónicos autorizados por el SRI.",
      "responsable": "Líder de Facturación",
      "criticidad": "Alta"
    }
  ],
  "activos": [
    {
      "id": "A01",
      "nombre": "Código fuente y repositorios (Git)",
      "tipo": "Información",
      "descripcion": "Código de los productos propios y de los proyectos de clientes.",
      "ubicacion": "Repositorio en la nube",
      "propietario": "Jefe de Desarrollo",
      "criticidad": "Crítica",
      "procesos_relacionados": [
        "P01"
      ]
    },
    {
      "id": "A02",
      "nombre": "Bases de datos de clientes",
      "tipo": "Información",
      "descripcion": "Datos de negocio y datos personales de clientes y sus usuarios finales.",
      "ubicacion": "Servidores de BD",
      "propietario": "Administrador de BD",
      "criticidad": "Crítica",
      "procesos_relacionados": [
        "P02",
        "P04",
        "P05"
      ]
    },
    {
      "id": "A03",
      "nombre": "Servidores de producción (hosting)",
      "tipo": "Hardware",
      "descripcion": "Servidores físicos y virtuales que alojan las aplicaciones de los clientes.",
      "ubicacion": "Centro de datos / nube",
      "propietario": "Jefe de Infraestructura",
      "criticidad": "Crítica",
      "procesos_relacionados": [
        "P02",
        "P04"
      ]
    },
    {
      "id": "A04",
      "nombre": "Plataforma de facturación electrónica",
      "tipo": "Software",
      "descripcion": "Sistema que genera, firma y envía comprobantes electrónicos al SRI.",
      "ubicacion": "Servidor de aplicaciones",
      "propietario": "Líder de Facturación",
      "criticidad": "Crítica",
      "procesos_relacionados": [
        "P05"
      ]
    },
    {
      "id": "A05",
      "nombre": "Firmas electrónicas y certificados digitales",
      "tipo": "Información",
      "descripcion": "Certificados y claves usados para firmar comprobantes y cifrar comunicaciones.",
      "ubicacion": "Módulo seguro / servidor",
      "propietario": "Líder de Facturación",
      "criticidad": "Crítica",
      "procesos_relacionados": [
        "P05",
        "P02"
      ]
    },
    {
      "id": "A06",
      "nombre": "Infraestructura en la nube",
      "tipo": "Servicio en la nube",
      "descripcion": "Servicios cloud contratados para hosting, almacenamiento y desarrollo.",
      "ubicacion": "Proveedor cloud",
      "propietario": "Jefe de Infraestructura",
      "criticidad": "Alta",
      "procesos_relacionados": [
        "P01",
        "P02"
      ]
    },
    {
      "id": "A07",
      "nombre": "Respaldos (backups)",
      "tipo": "Información",
      "descripcion": "Copias de seguridad de bases de datos, servidores y código.",
      "ubicacion": "Almacenamiento local y nube",
      "propietario": "Administrador de BD",
      "criticidad": "Alta",
      "procesos_relacionados": [
        "P02",
        "P04"
      ]
    },
    {
      "id": "A08",
      "nombre": "Red corporativa, firewall y VPN",
      "tipo": "Infraestructura de red",
      "descripcion": "Equipos de red y accesos remotos seguros para el personal.",
      "ubicacion": "Oficinas Quito",
      "propietario": "Jefe de Infraestructura",
      "criticidad": "Alta",
      "procesos_relacionados": [
        "P01",
        "P02",
        "P03",
        "P04",
        "P05"
      ]
    },
    {
      "id": "A09",
      "nombre": "Sistema de tickets y soporte",
      "tipo": "Software",
      "descripcion": "Plataforma de registro y seguimiento de incidentes de clientes.",
      "ubicacion": "Servidor de aplicaciones",
      "propietario": "Líder de Soporte",
      "criticidad": "Media",
      "procesos_relacionados": [
        "P03"
      ]
    },
    {
      "id": "A10",
      "nombre": "Equipos de desarrollo (laptops y estaciones)",
      "tipo": "Hardware",
      "descripcion": "Equipos del personal técnico con acceso a código y a entornos de clientes.",
      "ubicacion": "Oficinas Quito",
      "propietario": "Jefe de Desarrollo",
      "criticidad": "Media",
      "procesos_relacionados": [
        "P01",
        "P03"
      ]
    },
    {
      "id": "A11",
      "nombre": "Credenciales y cuentas privilegiadas",
      "tipo": "Información",
      "descripcion": "Usuarios administradores, claves de acceso y llaves de servidores y bases de datos.",
      "ubicacion": "Gestor de contraseñas",
      "propietario": "Jefe de Infraestructura",
      "criticidad": "Crítica",
      "procesos_relacionados": [
        "P01",
        "P02",
        "P04"
      ]
    },
    {
      "id": "A12",
      "nombre": "Personal técnico (desarrolladores y administradores)",
      "tipo": "Personas",
      "descripcion": "Empleados con conocimiento y acceso privilegiado a sistemas e información.",
      "ubicacion": "Oficinas Quito",
      "propietario": "Gerencia",
      "criticidad": "Alta",
      "procesos_relacionados": [
        "P01",
        "P02",
        "P03",
        "P04",
        "P05"
      ]
    },
    {
      "id": "A13",
      "nombre": "Correo y herramientas de colaboración",
      "tipo": "Servicio en la nube",
      "descripcion": "Correo corporativo y mensajería para comunicación interna y con clientes.",
      "ubicacion": "Nube",
      "propietario": "Jefe de Infraestructura",
      "criticidad": "Media",
      "procesos_relacionados": [
        "P01",
        "P03"
      ]
    },
    {
      "id": "A14",
      "nombre": "Seguridad física del centro de datos y oficinas",
      "tipo": "Seguridad física",
      "descripcion": "Control de acceso, cámaras, UPS y climatización de salas de servidores.",
      "ubicacion": "Oficinas Quito",
      "propietario": "Jefe de Infraestructura",
      "criticidad": "Alta",
      "procesos_relacionados": [
        "P02"
      ]
    }
  ],
  "resumen_activos": {
    "total": 14,
    "por_tipo": {
      "Información": 5,
      "Hardware": 2,
      "Software": 2,
      "Servicio en la nube": 2,
      "Infraestructura de red": 1,
      "Personas": 1,
      "Seguridad física": 1
    },
    "por_criticidad": {
      "Crítica": 6,
      "Alta": 5,
      "Media": 3
    }
  }
};