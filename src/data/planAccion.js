export const planAccion = {
    "seccion": "mitigacion",
    "numero_seccion_del_trabajo": 4,
    "titulo": "Mitigación: plan de acción vinculado a los riesgos",
    "empresa": "TecnoAndes S.A.",
    "fecha_elaboracion": "2026-10-13",
    "objetivo": "Definir medidas concretas y verificables para reducir la probabilidad o el impacto de los riesgos R01–R12 registrados en el dashboard de seguridad de la información de TecnoAndes S.A.",
    "alcance": "Los 12 riesgos identificados en src/data/riesgos.js del proyecto web, con responsables asociados a las funciones descritas en src/data/empresa.js.",
    "criterios": {
        "evaluacion": "Puntaje = probabilidad × impacto (escala de 1 a 5). Se mantienen los umbrales de la función calcularNivel del dashboard.",
        "niveles": {
        "Crítico": "16 a 25",
        "Alto": "12 a 15",
        "Medio": "6 a 11",
        "Bajo": "1 a 5"
        },
        "priorizacion": "Las prioridades Alta, Media y Baja reproducen las registradas en riesgos.js. Prioridad de ejecución y nivel calculado de riesgo son campos diferentes.",
        "plazos": "Plazos propuestos en días calendario, contados desde la aprobación del plan; no representan fechas ni compromisos ya confirmados.",
        "referencias_iso": "El campo control_referencial_del_dashboard conserva los códigos heredados presentes en el proyecto. Los controles_iso_27001_2022 se proponen como referencia temática a los controles del Anexo A en la edición 2022.",
        "estado": "Todas las acciones se encuentran propuestas; no existe evidencia de implementación dentro de los archivos aportados."
    },
    "resumen": {
        "total_riesgos_vinculados": 12,
        "total_acciones_principales": 12,
        "por_prioridad": {
        "Alta": 7,
        "Media": 4,
        "Baja": 1
        },
        "por_nivel_riesgo": {
        "Crítico": 3,
        "Alto": 6,
        "Medio": 3
        },
        "acciones_propuestas": 12,
        "acciones_ejecutadas": 0
    },
    "plan_accion": [
        {
        "id_accion": "M01",
        "id_riesgo": "R01",
        "activo_afectado": "Servidores de Producción",
        "amenaza": "Ataque DDoS",
        "vulnerabilidad": "Sin anti-DDoS",
        "evaluacion_riesgo": {
            "probabilidad": 4,
            "impacto": 5,
            "puntaje": 20,
            "nivel": "Crítico"
        },
        "prioridad": "Alta",
        "tratamiento": "Mitigar",
        "accion_principal": "Contratar Anti-DDoS",
        "descripcion": "Reducir la indisponibilidad de los servidores de producción ocasionada por tráfico malicioso y ataques distribuidos de denegación de servicio (DDoS).",
        "control_referencial_del_dashboard": "A.13",
        "controles_iso_27001_2022": [
            {
            "codigo": "8.20",
            "nombre": "Seguridad de redes"
            },
            {
            "codigo": "8.21",
            "nombre": "Seguridad de los servicios de red"
            },
            {
            "codigo": "8.16",
            "nombre": "Actividades de seguimiento"
            }
        ],
        "responsable": "Jefe de Infraestructura",
        "areas_de_apoyo": [
            "Líder de Soporte"
        ],
        "plazo_estimado": {
            "dias_calendario": 14,
            "inicio": "A partir de la aprobación del plan"
        },
        "actividades": [
            "Evaluar y seleccionar un servicio de protección anti-DDoS compatible con los servidores de producción y el hosting.",
            "Activar protección de red y aplicaciones, establecer límites de tráfico y reglas de filtrado.",
            "Configurar alertas, monitoreo de disponibilidad y procedimientos de escalamiento con el proveedor.",
            "Realizar una prueba controlada de mitigación y registrar sus resultados."
        ],
        "indicador": "Porcentaje de servicios críticos cubiertos por protección anti-DDoS",
        "meta_de_verificacion": "100 % de los servicios críticos de producción protegidos y una prueba controlada documentada.",
        "evidencias_esperadas": [
            "Contrato o configuración del servicio anti-DDoS",
            "Capturas de las reglas y alertas activadas",
            "Informe de prueba controlada"
        ],
        "estado": "Propuesto",
        "riesgo_residual": "Pendiente de evaluar después de implementar y verificar el tratamiento.",
        "id": "R01",
        "activo": "Servidores de Producción",
        "vuln": "Sin anti-DDoS",
        "prob": 4,
        "imp": 5,
        "control": "A.13",
        "accion": "Contratar Anti-DDoS"
        },
        {
        "id_accion": "M02",
        "id_riesgo": "R02",
        "activo_afectado": "Base de Datos Clientes",
        "amenaza": "Fuga de información",
        "vulnerabilidad": "Datos sin cifrar",
        "evaluacion_riesgo": {
            "probabilidad": 3,
            "impacto": 5,
            "puntaje": 15,
            "nivel": "Alto"
        },
        "prioridad": "Alta",
        "tratamiento": "Mitigar",
        "accion_principal": "Cifrado AES-256",
        "descripcion": "Evitar la exposición de información personal y empresarial almacenada en bases de datos de clientes mediante cifrado y control de accesos.",
        "control_referencial_del_dashboard": "A.10",
        "controles_iso_27001_2022": [
            {
            "codigo": "8.24",
            "nombre": "Uso de criptografía"
            },
            {
            "codigo": "8.3",
            "nombre": "Restricción de acceso a la información"
            },
            {
            "codigo": "8.12",
            "nombre": "Prevención de fuga de datos"
            }
        ],
        "responsable": "Administrador de BD",
        "areas_de_apoyo": [
            "Jefe de Infraestructura"
        ],
        "plazo_estimado": {
            "dias_calendario": 30,
            "inicio": "A partir de la aprobación del plan"
        },
        "actividades": [
            "Identificar bases de datos y campos que almacenan información sensible de los clientes.",
            "Habilitar cifrado en reposo con algoritmos y configuraciones robustas, como AES-256 cuando la plataforma lo admita, y TLS para conexiones.",
            "Administrar las claves de cifrado fuera de código fuente, con acceso limitado y rotación programada.",
            "Verificar acceso autorizado, integridad de los datos y restauración de respaldos cifrados."
        ],
        "indicador": "Porcentaje de bases de datos de clientes con cifrado verificado",
        "meta_de_verificacion": "100 % de las bases de datos identificadas como sensibles con cifrado verificado en reposo y en tránsito.",
        "evidencias_esperadas": [
            "Inventario de datos sensibles",
            "Configuración de cifrado y gestión de claves",
            "Acta de verificación de conexión segura y restauración"
        ],
        "estado": "Propuesto",
        "riesgo_residual": "Pendiente de evaluar después de implementar y verificar el tratamiento.",
        "id": "R02",
        "activo": "Base de Datos Clientes",
        "vuln": "Datos sin cifrar",
        "prob": 3,
        "imp": 5,
        "control": "A.10",
        "accion": "Cifrado AES-256"
        },
        {
        "id_accion": "M03",
        "id_riesgo": "R03",
        "activo_afectado": "Plataforma Cloud",
        "amenaza": "Acceso no autorizado",
        "vulnerabilidad": "Credenciales débiles",
        "evaluacion_riesgo": {
            "probabilidad": 4,
            "impacto": 4,
            "puntaje": 16,
            "nivel": "Crítico"
        },
        "prioridad": "Alta",
        "tratamiento": "Mitigar",
        "accion_principal": "Activar MFA",
        "descripcion": "Prevenir accesos no autorizados a la infraestructura en la nube por uso de contraseñas débiles o credenciales comprometidas.",
        "control_referencial_del_dashboard": "A.9",
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
            "codigo": "8.2",
            "nombre": "Derechos de acceso privilegiado"
            }
        ],
        "responsable": "Jefe de Infraestructura",
        "areas_de_apoyo": [
            "Administrador de BD"
        ],
        "plazo_estimado": {
            "dias_calendario": 7,
            "inicio": "A partir de la aprobación del plan"
        },
        "actividades": [
            "Inventariar las cuentas de administración y operación de la plataforma cloud.",
            "Exigir autenticación multifactor en todas las cuentas con acceso a infraestructura y consolas administrativas.",
            "Eliminar cuentas compartidas y restringir permisos conforme al principio de menor privilegio.",
            "Revisar registros de acceso y comprobar que MFA se aplica a todas las cuentas definidas."
        ],
        "indicador": "Porcentaje de cuentas administrativas cloud con MFA habilitado",
        "meta_de_verificacion": "100 % de cuentas administrativas cloud con MFA activo y evidencia de comprobación.",
        "evidencias_esperadas": [
            "Inventario de cuentas privilegiadas",
            "Capturas de MFA habilitado",
            "Registro de revisión de accesos"
        ],
        "estado": "Propuesto",
        "riesgo_residual": "Pendiente de evaluar después de implementar y verificar el tratamiento.",
        "id": "R03",
        "activo": "Plataforma Cloud",
        "vuln": "Credenciales débiles",
        "prob": 4,
        "imp": 4,
        "control": "A.9",
        "accion": "Activar MFA"
        },
        {
        "id_accion": "M04",
        "id_riesgo": "R04",
        "activo_afectado": "Sitio Web",
        "amenaza": "Inyección SQL",
        "vulnerabilidad": "Sin validación",
        "evaluacion_riesgo": {
            "probabilidad": 3,
            "impacto": 4,
            "puntaje": 12,
            "nivel": "Alto"
        },
        "prioridad": "Alta",
        "tratamiento": "Mitigar",
        "accion_principal": "WAF + OWASP",
        "descripcion": "Reducir los ataques de inyección SQL en aplicaciones web mediante validaciones seguras del lado servidor y controles de protección.",
        "control_referencial_del_dashboard": "A.14",
        "controles_iso_27001_2022": [
            {
            "codigo": "8.28",
            "nombre": "Codificación segura"
            },
            {
            "codigo": "8.29",
            "nombre": "Pruebas de seguridad en el desarrollo y la aceptación"
            },
            {
            "codigo": "8.26",
            "nombre": "Requisitos de seguridad de las aplicaciones"
            }
        ],
        "responsable": "Jefe de Desarrollo",
        "areas_de_apoyo": [
            "Jefe de Infraestructura"
        ],
        "plazo_estimado": {
            "dias_calendario": 21,
            "inicio": "A partir de la aprobación del plan"
        },
        "actividades": [
            "Revisar puntos de entrada y consultas a base de datos de las aplicaciones publicadas.",
            "Corregir consultas inseguras mediante parámetros preparados, validación del lado servidor y privilegios mínimos de acceso a bases de datos.",
            "Desplegar un firewall de aplicaciones web (WAF) con reglas pertinentes a ataques de inyección.",
            "Ejecutar pruebas de seguridad basadas en OWASP y corregir los hallazgos antes de publicar cambios."
        ],
        "indicador": "Porcentaje de hallazgos de inyección SQL críticos corregidos",
        "meta_de_verificacion": "100 % de hallazgos críticos corregidos y WAF habilitado en los servicios web expuestos.",
        "evidencias_esperadas": [
            "Resultados de pruebas de seguridad antes y después",
            "Cambios de código revisados",
            "Registro de reglas del WAF"
        ],
        "estado": "Propuesto",
        "riesgo_residual": "Pendiente de evaluar después de implementar y verificar el tratamiento.",
        "id": "R04",
        "activo": "Sitio Web",
        "vuln": "Sin validación",
        "prob": 3,
        "imp": 4,
        "control": "A.14",
        "accion": "WAF + OWASP"
        },
        {
        "id_accion": "M05",
        "id_riesgo": "R05",
        "activo_afectado": "Correo Corporativo",
        "amenaza": "Phishing",
        "vulnerabilidad": "Falta concientización",
        "evaluacion_riesgo": {
            "probabilidad": 5,
            "impacto": 3,
            "puntaje": 15,
            "nivel": "Alto"
        },
        "prioridad": "Media",
        "tratamiento": "Mitigar",
        "accion_principal": "Capacitación",
        "descripcion": "Disminuir la probabilidad de que el personal entregue credenciales o información a través de correos fraudulentos.",
        "control_referencial_del_dashboard": "A.7",
        "controles_iso_27001_2022": [
            {
            "codigo": "6.3",
            "nombre": "Concienciación, educación y formación en seguridad de la información"
            },
            {
            "codigo": "5.24",
            "nombre": "Planificación y preparación para la gestión de incidentes de seguridad de la información"
            }
        ],
        "responsable": "Líder de Soporte",
        "areas_de_apoyo": [
            "Jefe de Infraestructura",
            "Gerencia"
        ],
        "plazo_estimado": {
            "dias_calendario": 30,
            "inicio": "A partir de la aprobación del plan"
        },
        "actividades": [
            "Preparar una capacitación para los 45 empleados sobre identificación y reporte de phishing.",
            "Implementar un canal claro para reportar correos sospechosos y difundir las instrucciones de respuesta.",
            "Realizar simulaciones controladas de correos fraudulentos y compartir retroalimentación.",
            "Repetir actividades de concienciación y evaluar la mejora trimestralmente."
        ],
        "indicador": "Porcentaje de empleados capacitados y tasa de reporte en simulaciones",
        "meta_de_verificacion": "100 % de los 45 empleados capacitados; realizar al menos una simulación y documentar sus resultados.",
        "evidencias_esperadas": [
            "Material de capacitación",
            "Lista de asistencia",
            "Reporte agregado de simulación y acciones de mejora"
        ],
        "estado": "Propuesto",
        "riesgo_residual": "Pendiente de evaluar después de implementar y verificar el tratamiento.",
        "id": "R05",
        "activo": "Correo Corporativo",
        "vuln": "Falta concientización",
        "prob": 5,
        "imp": 3,
        "control": "A.7",
        "accion": "Capacitación"
        },
        {
        "id_accion": "M06",
        "id_riesgo": "R06",
        "activo_afectado": "Equipos de Desarrollo",
        "amenaza": "Ransomware",
        "vulnerabilidad": "Antivirus desactualizado",
        "evaluacion_riesgo": {
            "probabilidad": 3,
            "impacto": 5,
            "puntaje": 15,
            "nivel": "Alto"
        },
        "prioridad": "Alta",
        "tratamiento": "Mitigar",
        "accion_principal": "Desplegar EDR",
        "descripcion": "Contener el riesgo de ransomware en estaciones de desarrollo mediante protección de endpoints y actualización oportuna.",
        "control_referencial_del_dashboard": "A.12",
        "controles_iso_27001_2022": [
            {
            "codigo": "8.7",
            "nombre": "Protección contra software malicioso"
            },
            {
            "codigo": "8.8",
            "nombre": "Gestión de vulnerabilidades técnicas"
            },
            {
            "codigo": "8.1",
            "nombre": "Dispositivos de usuario final"
            }
        ],
        "responsable": "Jefe de Desarrollo",
        "areas_de_apoyo": [
            "Jefe de Infraestructura"
        ],
        "plazo_estimado": {
            "dias_calendario": 21,
            "inicio": "A partir de la aprobación del plan"
        },
        "actividades": [
            "Inventariar las estaciones de trabajo y verificar sus agentes de protección y actualizaciones.",
            "Implementar una solución EDR (detección y respuesta en endpoints) con protección activa, alertas y aislamiento.",
            "Programar actualizaciones del sistema operativo y aplicaciones con prioridad para vulnerabilidades críticas.",
            "Simular una detección segura y comprobar procedimientos de aislamiento y recuperación."
        ],
        "indicador": "Porcentaje de equipos de desarrollo con EDR activo y actualizado",
        "meta_de_verificacion": "100 % de equipos de desarrollo inventariados con protección EDR activa y monitorizada.",
        "evidencias_esperadas": [
            "Inventario de estaciones de trabajo",
            "Panel de cobertura EDR",
            "Reporte de prueba de detección y actualización"
        ],
        "estado": "Propuesto",
        "riesgo_residual": "Pendiente de evaluar después de implementar y verificar el tratamiento.",
        "id": "R06",
        "activo": "Equipos de Desarrollo",
        "vuln": "Antivirus desactualizado",
        "prob": 3,
        "imp": 5,
        "control": "A.12",
        "accion": "Desplegar EDR"
        },
        {
        "id_accion": "M07",
        "id_riesgo": "R07",
        "activo_afectado": "Credenciales",
        "amenaza": "Robo de contraseñas",
        "vulnerabilidad": "Reutilización",
        "evaluacion_riesgo": {
            "probabilidad": 4,
            "impacto": 4,
            "puntaje": 16,
            "nivel": "Crítico"
        },
        "prioridad": "Alta",
        "tratamiento": "Mitigar",
        "accion_principal": "Gestor + MFA",
        "descripcion": "Evitar el robo o abuso de contraseñas reutilizadas mediante gestión centralizada de secretos y autenticación multifactor.",
        "control_referencial_del_dashboard": "A.9",
        "controles_iso_27001_2022": [
            {
            "codigo": "5.17",
            "nombre": "Información de autenticación"
            },
            {
            "codigo": "8.5",
            "nombre": "Autenticación segura"
            },
            {
            "codigo": "5.18",
            "nombre": "Derechos de acceso"
            }
        ],
        "responsable": "Jefe de Infraestructura",
        "areas_de_apoyo": [
            "Jefe de Desarrollo",
            "Administrador de BD"
        ],
        "plazo_estimado": {
            "dias_calendario": 14,
            "inicio": "A partir de la aprobación del plan"
        },
        "actividades": [
            "Inventariar las cuentas críticas y detectar usos compartidos o reutilización de contraseñas.",
            "Adoptar un gestor corporativo de contraseñas o bóveda de secretos con permisos individuales.",
            "Activar MFA y sustituir credenciales compartidas por cuentas personales siempre que sea posible.",
            "Definir rotación ante compromiso, altas y bajas de personal, y revisión periódica de cuentas privilegiadas."
        ],
        "indicador": "Porcentaje de cuentas críticas gestionadas con bóveda y MFA",
        "meta_de_verificacion": "100 % de cuentas críticas inventariadas y protegidas con una gestión de secretos aprobada y MFA donde sea compatible.",
        "evidencias_esperadas": [
            "Inventario de credenciales críticas sin revelar contraseñas",
            "Política de contraseñas y secretos",
            "Reporte de MFA y revisión de permisos"
        ],
        "estado": "Propuesto",
        "riesgo_residual": "Pendiente de evaluar después de implementar y verificar el tratamiento.",
        "id": "R07",
        "activo": "Credenciales",
        "vuln": "Reutilización",
        "prob": 4,
        "imp": 4,
        "control": "A.9",
        "accion": "Gestor + MFA"
        },
        {
        "id_accion": "M08",
        "id_riesgo": "R08",
        "activo_afectado": "Dispositivos Móviles",
        "amenaza": "Pérdida/robo",
        "vulnerabilidad": "Sin cifrado",
        "evaluacion_riesgo": {
            "probabilidad": 3,
            "impacto": 3,
            "puntaje": 9,
            "nivel": "Medio"
        },
        "prioridad": "Media",
        "tratamiento": "Mitigar",
        "accion_principal": "MDM + borrado remoto",
        "descripcion": "Proteger los datos empresariales ante pérdida o robo de equipos móviles que se utilicen para actividades laborales.",
        "control_referencial_del_dashboard": "A.11",
        "controles_iso_27001_2022": [
            {
            "codigo": "8.1",
            "nombre": "Dispositivos de usuario final"
            },
            {
            "codigo": "7.9",
            "nombre": "Seguridad de los activos fuera de las instalaciones"
            },
            {
            "codigo": "8.24",
            "nombre": "Uso de criptografía"
            }
        ],
        "responsable": "Jefe de Infraestructura",
        "areas_de_apoyo": [
            "Líder de Soporte"
        ],
        "plazo_estimado": {
            "dias_calendario": 30,
            "inicio": "A partir de la aprobación del plan"
        },
        "actividades": [
            "Registrar los dispositivos móviles autorizados para acceder a los servicios corporativos.",
            "Activar cifrado completo, bloqueo automático y políticas de acceso seguro.",
            "Implantar gestión de dispositivos móviles (MDM) y la posibilidad de bloqueo o borrado remoto de datos corporativos.",
            "Comprobar mediante una prueba autorizada la ejecución del bloqueo o borrado remoto y documentarla."
        ],
        "indicador": "Porcentaje de dispositivos corporativos registrados y cifrados",
        "meta_de_verificacion": "100 % de dispositivos corporativos autorizados registrados en MDM con cifrado y capacidad de bloqueo o borrado remoto.",
        "evidencias_esperadas": [
            "Inventario de dispositivos autorizados",
            "Políticas y panel MDM",
            "Acta de prueba de bloqueo o borrado remoto"
        ],
        "estado": "Propuesto",
        "riesgo_residual": "Pendiente de evaluar después de implementar y verificar el tratamiento.",
        "id": "R08",
        "activo": "Dispositivos Móviles",
        "vuln": "Sin cifrado",
        "prob": 3,
        "imp": 3,
        "control": "A.11",
        "accion": "MDM + borrado remoto"
        },
        {
        "id_accion": "M09",
        "id_riesgo": "R09",
        "activo_afectado": "Servidores",
        "amenaza": "Corte eléctrico",
        "vulnerabilidad": "UPS vencida",
        "evaluacion_riesgo": {
            "probabilidad": 2,
            "impacto": 4,
            "puntaje": 8,
            "nivel": "Medio"
        },
        "prioridad": "Media",
        "tratamiento": "Mitigar",
        "accion_principal": "Renovar UPS",
        "descripcion": "Reducir la indisponibilidad de servidores por fallos del suministro eléctrico o equipos UPS al final de su vida útil.",
        "control_referencial_del_dashboard": "A.11",
        "controles_iso_27001_2022": [
            {
            "codigo": "7.11",
            "nombre": "Servicios de apoyo"
            },
            {
            "codigo": "8.14",
            "nombre": "Redundancia de instalaciones de procesamiento de información"
            }
        ],
        "responsable": "Jefe de Infraestructura",
        "areas_de_apoyo": [
            "Gerencia"
        ],
        "plazo_estimado": {
            "dias_calendario": 21,
            "inicio": "A partir de la aprobación del plan"
        },
        "actividades": [
            "Inspeccionar los equipos UPS que protegen servidores locales y determinar su capacidad y estado.",
            "Sustituir baterías o UPS fuera de servicio según evaluación técnica.",
            "Configurar monitoreo de autonomía, alertas y apagado controlado de sistemas.",
            "Ejecutar una prueba segura de conmutación y documentar tiempos de autonomía."
        ],
        "indicador": "Porcentaje de equipos UPS críticos con mantenimiento y prueba vigentes",
        "meta_de_verificacion": "100 % de UPS que respaldan servidores críticos con inspección y prueba de autonomía documentadas.",
        "evidencias_esperadas": [
            "Informe de inspección técnica",
            "Factura o registro de sustitución/mantenimiento",
            "Acta de prueba de autonomía"
        ],
        "estado": "Propuesto",
        "riesgo_residual": "Pendiente de evaluar después de implementar y verificar el tratamiento.",
        "id": "R09",
        "activo": "Servidores",
        "vuln": "UPS vencida",
        "prob": 2,
        "imp": 4,
        "control": "A.11",
        "accion": "Renovar UPS"
        },
        {
        "id_accion": "M10",
        "id_riesgo": "R10",
        "activo_afectado": "Backups",
        "amenaza": "Pérdida de datos",
        "vulnerabilidad": "Backups no verificados",
        "evaluacion_riesgo": {
            "probabilidad": 3,
            "impacto": 5,
            "puntaje": 15,
            "nivel": "Alto"
        },
        "prioridad": "Alta",
        "tratamiento": "Mitigar",
        "accion_principal": "Backup 3-2-1",
        "descripcion": "Evitar pérdidas de información de clientes por respaldos incompletos, dañados o que nunca se han restaurado.",
        "control_referencial_del_dashboard": "A.12",
        "controles_iso_27001_2022": [
            {
            "codigo": "8.13",
            "nombre": "Respaldo de información"
            },
            {
            "codigo": "5.30",
            "nombre": "Preparación de las TIC para la continuidad del negocio"
            }
        ],
        "responsable": "Administrador de BD",
        "areas_de_apoyo": [
            "Jefe de Infraestructura"
        ],
        "plazo_estimado": {
            "dias_calendario": 21,
            "inicio": "A partir de la aprobación del plan"
        },
        "actividades": [
            "Identificar las bases de datos, servidores y repositorios que deben incluirse en los respaldos.",
            "Aplicar la estrategia 3-2-1: tres copias de los datos, en dos tipos de medios y al menos una fuera del entorno principal; proteger las copias contra alteración.",
            "Automatizar respaldos cifrados, verificar su finalización y definir tiempos de retención según necesidades.",
            "Ejecutar una prueba de restauración por cada conjunto crítico y documentar los resultados."
        ],
        "indicador": "Porcentaje de sistemas críticos con respaldo exitoso y restauración probada",
        "meta_de_verificacion": "100 % de los sistemas críticos incluidos en el esquema 3-2-1 y con al menos una prueba inicial de restauración satisfactoria.",
        "evidencias_esperadas": [
            "Política y calendario de respaldos",
            "Registros de tareas automáticas",
            "Actas de restauración verificada"
        ],
        "estado": "Propuesto",
        "riesgo_residual": "Pendiente de evaluar después de implementar y verificar el tratamiento.",
        "id": "R10",
        "activo": "Backups",
        "vuln": "Backups no verificados",
        "prob": 3,
        "imp": 5,
        "control": "A.12",
        "accion": "Backup 3-2-1"
        },
        {
        "id_accion": "M11",
        "id_riesgo": "R11",
        "activo_afectado": "Red corporativa",
        "amenaza": "Intrusión interna",
        "vulnerabilidad": "Red plana",
        "evaluacion_riesgo": {
            "probabilidad": 3,
            "impacto": 4,
            "puntaje": 12,
            "nivel": "Alto"
        },
        "prioridad": "Media",
        "tratamiento": "Mitigar",
        "accion_principal": "Segmentar VLANs",
        "descripcion": "Limitar el movimiento lateral y los accesos internos indebidos mediante segmentación de la red corporativa.",
        "control_referencial_del_dashboard": "A.13",
        "controles_iso_27001_2022": [
            {
            "codigo": "8.22",
            "nombre": "Segregación de redes"
            },
            {
            "codigo": "8.20",
            "nombre": "Seguridad de redes"
            },
            {
            "codigo": "8.32",
            "nombre": "Gestión de cambios"
            }
        ],
        "responsable": "Jefe de Infraestructura",
        "areas_de_apoyo": [
            "Líder de Soporte"
        ],
        "plazo_estimado": {
            "dias_calendario": 45,
            "inicio": "A partir de la aprobación del plan"
        },
        "actividades": [
            "Levantar un esquema de red y clasificar segmentos de servidores, administración, desarrollo e invitados.",
            "Diseñar VLAN y reglas de firewall que permitan exclusivamente las comunicaciones necesarias.",
            "Implantar de forma progresiva la segmentación con una ventana de cambios autorizada.",
            "Verificar mediante pruebas de conectividad y bloqueo que los segmentos aislados no tengan acceso no autorizado."
        ],
        "indicador": "Porcentaje de segmentos críticos aislados con reglas verificadas",
        "meta_de_verificacion": "100 % de los segmentos críticos definidos implementados y probados contra accesos no autorizados.",
        "evidencias_esperadas": [
            "Diagrama lógico de red actualizado",
            "Configuración de VLAN y firewall",
            "Resultados de pruebas de segmentación"
        ],
        "estado": "Propuesto",
        "riesgo_residual": "Pendiente de evaluar después de implementar y verificar el tratamiento.",
        "id": "R11",
        "activo": "Red corporativa",
        "vuln": "Red plana",
        "prob": 3,
        "imp": 4,
        "control": "A.13",
        "accion": "Segmentar VLANs"
        },
        {
        "id_accion": "M12",
        "id_riesgo": "R12",
        "activo_afectado": "Proveedores Cloud",
        "amenaza": "Incumplimiento",
        "vulnerabilidad": "Sin cláusulas",
        "evaluacion_riesgo": {
            "probabilidad": 2,
            "impacto": 3,
            "puntaje": 6,
            "nivel": "Medio"
        },
        "prioridad": "Baja",
        "tratamiento": "Mitigar",
        "accion_principal": "Revisar contratos",
        "descripcion": "Reducir la exposición contractual y operativa ante incumplimientos de proveedores de servicios cloud.",
        "control_referencial_del_dashboard": "A.15",
        "controles_iso_27001_2022": [
            {
            "codigo": "5.19",
            "nombre": "Seguridad de la información en las relaciones con proveedores"
            },
            {
            "codigo": "5.20",
            "nombre": "Seguridad de la información en los acuerdos con proveedores"
            },
            {
            "codigo": "5.23",
            "nombre": "Seguridad de la información para el uso de servicios en la nube"
            }
        ],
        "responsable": "Gerencia",
        "areas_de_apoyo": [
            "Jefe de Infraestructura"
        ],
        "plazo_estimado": {
            "dias_calendario": 60,
            "inicio": "A partir de la aprobación del plan"
        },
        "actividades": [
            "Inventariar los proveedores cloud que soportan procesos y activos críticos.",
            "Revisar contratos respecto a confidencialidad, protección de datos, disponibilidad, subcontratación e incidentes.",
            "Incorporar o negociar cláusulas de seguridad, niveles de servicio (SLA), notificación de incidentes y responsabilidades.",
            "Establecer revisión periódica del desempeño y del cumplimiento de condiciones acordadas."
        ],
        "indicador": "Porcentaje de proveedores cloud críticos con evaluación y cláusulas de seguridad",
        "meta_de_verificacion": "100 % de proveedores cloud críticos revisados y con plan de regularización contractual documentado.",
        "evidencias_esperadas": [
            "Registro de proveedores críticos",
            "Lista de verificación contractual",
            "Contratos revisados o plan de regularización aprobado"
        ],
        "estado": "Propuesto",
        "riesgo_residual": "Pendiente de evaluar después de implementar y verificar el tratamiento.",
        "id": "R12",
        "activo": "Proveedores Cloud",
        "vuln": "Sin cláusulas",
        "prob": 2,
        "imp": 3,
        "control": "A.15",
        "accion": "Revisar contratos"
        }
    ],
    "compatibilidad_web": {
        "proyecto": "dashboard-seguridad-main / React y Vite",
        "componente": "src/components/SeccionPlan.jsx",
        "archivo_json": "src/data/mitigacion_plan_accion_tecnoandes.json",
        "campos_tabla": [
        "id",
        "amenaza",
        "control",
        "accion",
        "prioridad"
        ],
        "vinculo": "id coincide con riesgos.js, de R01 a R12",
        "nota": "La tabla original sigue utilizando los códigos ISO abreviados del dashboard (por ejemplo A.13). El detalle de cada acción muestra los controles recomendados del Anexo A de ISO/IEC 27001:2022, sin reemplazar silenciosamente los códigos originales.",
        "estado": "Los plazos y acciones son propuestas de mitigación; no se han verificado ejecuciones."
    }
};