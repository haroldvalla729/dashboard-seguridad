// 🔥 ESTE ES EL ARCHIVO MÁS IMPORTANTE
// Agregar/quitar riesgos solo modificando este array
export const riesgos = [
  { id:"R01", activo:"Servidores de Producción", amenaza:"Ataque DDoS", vuln:"Sin anti-DDoS", prob:4, imp:5, control:"A.13", accion:"Contratar Anti-DDoS", prioridad:"Alta" },
  { id:"R02", activo:"Base de Datos Clientes", amenaza:"Fuga de información", vuln:"Datos sin cifrar", prob:3, imp:5, control:"A.10", accion:"Cifrado AES-256", prioridad:"Alta" },
  { id:"R03", activo:"Plataforma Cloud", amenaza:"Acceso no autorizado", vuln:"Credenciales débiles", prob:4, imp:4, control:"A.9", accion:"Activar MFA", prioridad:"Alta" },
  { id:"R04", activo:"Sitio Web", amenaza:"Inyección SQL", vuln:"Sin validación", prob:3, imp:4, control:"A.14", accion:"WAF + OWASP", prioridad:"Alta" },
  { id:"R05", activo:"Correo Corporativo", amenaza:"Phishing", vuln:"Falta concientización", prob:5, imp:3, control:"A.7", accion:"Capacitación", prioridad:"Media" },
  { id:"R06", activo:"Equipos de Desarrollo", amenaza:"Ransomware", vuln:"Antivirus desactualizado", prob:3, imp:5, control:"A.12", accion:"Desplegar EDR", prioridad:"Alta" },
  { id:"R07", activo:"Credenciales", amenaza:"Robo de contraseñas", vuln:"Reutilización", prob:4, imp:4, control:"A.9", accion:"Gestor + MFA", prioridad:"Alta" },
  { id:"R08", activo:"Dispositivos Móviles", amenaza:"Pérdida/robo", vuln:"Sin cifrado", prob:3, imp:3, control:"A.11", accion:"MDM + borrado remoto", prioridad:"Media" },
  { id:"R09", activo:"Servidores", amenaza:"Corte eléctrico", vuln:"UPS vencida", prob:2, imp:4, control:"A.11", accion:"Renovar UPS", prioridad:"Media" },
  { id:"R10", activo:"Backups", amenaza:"Pérdida de datos", vuln:"Backups no verificados", prob:3, imp:5, control:"A.12", accion:"Backup 3-2-1", prioridad:"Alta" },
  { id:"R11", activo:"Red corporativa", amenaza:"Intrusión interna", vuln:"Red plana", prob:3, imp:4, control:"A.13", accion:"Segmentar VLANs", prioridad:"Media" },
  { id:"R12", activo:"Proveedores Cloud", amenaza:"Incumplimiento", vuln:"Sin cláusulas", prob:2, imp:3, control:"A.15", accion:"Revisar contratos", prioridad:"Baja" },
];

// Función auxiliar (no tocar)
export function calcularNivel(prob, imp) {
  const s = prob * imp;
  if (s >= 16) return "Crítico";
  if (s >= 12) return "Alto";
  if (s >= 6)  return "Medio";
  return "Bajo";
}