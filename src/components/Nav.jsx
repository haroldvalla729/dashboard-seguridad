import "./styles/Nav.css";

export default function Nav() {
  const links = [
    ["empresa","Empresa"],
    ["seguridad","Seguridad Info"],
    ["iso","ISO 27001"],
    ["riesgos","Riesgos"],
    ["plan","Plan de Acción"],
  ];
  return (
    <nav className="nav" aria-label="Navegación principal">
      {links.map(([id, txt]) => (
        <a key={id} href={`#${id}`}>
          {txt}
        </a>
      ))}
    </nav>
  );
}
