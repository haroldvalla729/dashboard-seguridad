export const cia = [
  { titulo: "Confidencialidad", icono: "🔒", desc: "Solo personal autorizado accede..." },
  { titulo: "Integridad", icono: "✅", desc: "Los datos no se alteran sin autorización..." },
  { titulo: "Disponibilidad", icono: "⚡", desc: "La información está accesible cuando se necesita..." },
];

export const clasificacion = [
  { nivel: "Crítico", desc: "Acceso restringido", ejemplo: "Datos financieros", control: "Cifrado + MFA" },
  { nivel: "Confidencial", desc: "Solo personal interno", ejemplo: "Código fuente", control: "NDA + rol" },
  { nivel: "Interno", desc: "Uso dentro de la empresa", ejemplo: "Manuales", control: "Autenticación" },
  { nivel: "Público", desc: "Libre divulgación", ejemplo: "Marketing", control: "Ninguno" },
];

export const seguridadFisica = [
  "Control biométrico en data center",
  "Cámaras CCTV 24/7",
  "UPS y generadores",
];

export const seguridadLogica = [
  "Firewall perimetral (Fortinet)",
  "Antivirus EDR en endpoints",
  "VPN para acceso remoto",
  "Autenticación MFA",
];