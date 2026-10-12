
import {
  cia,
  clasificacion,
  seguridadFisica,
  seguridadLogica,
} from "../data/seguridad";

import "./styles/SeccionSeguridad.css";

export default function SeccionSeguridad() {
  return (
    <section id="seguridad" className="seccion-seguridad">
      <header className="seguridad-header">
        <span className="seguridad-etiqueta">
          PROTECCIÓN DE LA INFORMACIÓN
        </span>

        <h2>Seguridad de la Información</h2>

        <p>
          Principios, niveles de clasificación y medidas para
          proteger los activos de información de la organización.
        </p>
      </header>

      {/* Principios de seguridad */}
      <div className="seguridad-bloque">
        <div className="seguridad-subheader">
          <h3>Principios fundamentales</h3>
          <p>Confidencialidad, integridad y disponibilidad.</p>
        </div>

        <div className="seguridad-cia-grid">
          {cia.map((c) => (
            <article className="card seguridad-cia-card" key={c.titulo}>
              <div className="seguridad-cia-icono" aria-hidden="true">
                {c.icono}
              </div>

              <h4>{c.titulo}</h4>
              <p>{c.desc}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Clasificación de la información */}
      <div className="seguridad-bloque">
        <div className="seguridad-subheader">
          <h3>Clasificación de la Información</h3>
          <p>
            Niveles de sensibilidad, ejemplos y controles de protección.
          </p>
        </div>

        <div className="seguridad-tabla-contenedor">
          <table className="seguridad-tabla">
            <thead>
              <tr>
                <th scope="col">Nivel</th>
                <th scope="col">Descripción</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">Control</th>
              </tr>
            </thead>

            <tbody>
              {clasificacion.map((c) => (
                <tr key={c.nivel}>
                  <td>
                    <span
                      className={`seguridad-badge seguridad-nivel-${c.nivel
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/\s+/g, "-")}`}
                    >
                      {c.nivel}
                    </span>
                  </td>

                  <td>{c.desc}</td>
                  <td>{c.ejemplo}</td>
                  <td>{c.control}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seguridad física y lógica */}
      <div className="seguridad-bloque">
        <div className="seguridad-subheader">
          <h3>Seguridad Física y Lógica</h3>
          <p>
            Medidas complementarias para proteger instalaciones,
            equipos, sistemas y datos.
          </p>
        </div>

        <div className="seguridad-medidas-grid">
          <article className="card seguridad-medidas-card">
            <div className="seguridad-medidas-titulo">
              <span className="seguridad-medidas-icono" aria-hidden="true">
                F
              </span>
              <div>
                <h4>Seguridad física</h4>
                <p>Protección de instalaciones y equipos.</p>
              </div>
            </div>

            <ul className="seguridad-lista">
              {seguridadFisica.map((medida) => (
                <li key={medida}>{medida}</li>
              ))}
            </ul>
          </article>

          <article className="card seguridad-medidas-card">
            <div className="seguridad-medidas-titulo">
              <span className="seguridad-medidas-icono" aria-hidden="true">
                L
              </span>
              <div>
                <h4>Seguridad lógica</h4>
                <p>Protección de sistemas y recursos digitales.</p>
              </div>
            </div>

            <ul className="seguridad-lista">
              {seguridadLogica.map((medida) => (
                <li key={medida}>{medida}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
