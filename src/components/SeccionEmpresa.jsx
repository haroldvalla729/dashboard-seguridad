import { empresa } from "../data/empresa";
import "./styles/SeccionEmpresa.css";

export default function SeccionEmpresa() {
  return (
    <section id="empresa" className="seccion-empresa">
      <header className="empresa-header">
        <span className="empresa-etiqueta">
          ORGANIZACIÓN
        </span>
        <h2>Información de la Empresa</h2>
        <p>
          Conoce la organización, sus procesos principales
          y los activos tecnológicos que requieren protección.
        </p>
      </header>

      <div className="empresa-grid">
        <article className="card empresa-perfil">
          <div className="empresa-card-title">
            <span className="empresa-icono">01</span>
            <h3>Perfil empresarial</h3>
          </div>

          <h4 className="empresa-nombre">
            {empresa.nombre}
          </h4>

          <p>
            <strong>Actividad:</strong> {empresa.actividad}
          </p>

          <p>
            <strong>Sede:</strong> {empresa.sede}
          </p>

          <p>
            <strong>Empleados:</strong> {empresa.empleados}
          </p>

          <div className="empresa-mision">
            <h4>Misión</h4>
            <p>{empresa.mision}</p>
          </div>
        </article>

        <article className="card empresa-procesos">
          <div className="empresa-card-title">
            <span className="empresa-icono">02</span>
            <h3>Procesos principales</h3>
          </div>

          <ul className="empresa-lista">
            {empresa.procesos.map((proceso) => (
              <li key={proceso}>{proceso}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="empresa-activos">
        <div className="empresa-activos-header">
          <div>
            <span className="empresa-etiqueta">
              INFRAESTRUCTURA
            </span>
            <h3>Activos tecnológicos</h3>
          </div>

          <span className="empresa-activos-total">
            {empresa.activos.length} activos
          </span>
        </div>

        <div className="empresa-activos-grid">
          {empresa.activos.map((activo) => (
            <article className="card empresa-activo" key={activo}>
              <span className="empresa-activo-indicador" />
              <span>{activo}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
