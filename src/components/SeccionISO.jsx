
import { controlesISO } from "../data/iso27001";
import "./styles/SeccionISO.css";

export default function SeccionISO() {
  return (
    <section id="iso" className="seccion-iso">
      <header className="iso-header">
        <span className="iso-etiqueta">
          MARCO DE SEGURIDAD
        </span>

        <h2>ISO 27001 – Controles Aplicados</h2>

        <p>
          Controles de seguridad seleccionados para reducir los riesgos,
          proteger los activos de información y fortalecer el sistema de
          gestión de seguridad de la información de la organización.
        </p>
      </header>

      <div className="iso-resumen">
        <div>
          <span className="iso-resumen-numero">
            {controlesISO.length}
          </span>
          <span className="iso-resumen-texto">
            Controles seleccionados
          </span>
        </div>

        <p>
          Cada control contribuye a prevenir incidentes, disminuir
          vulnerabilidades y mejorar la protección de la información.
        </p>
      </div>

      <div className="iso-controles-grid">
        {controlesISO.map((control) => (
          <article
            key={control.codigo}
            className="card iso-control-card"
          >
            <div className="iso-control-cabecera">
              <span className="iso-control-codigo">
                {control.codigo}
              </span>

              <span
                className="iso-control-indicador"
                aria-hidden="true"
              >
                ✓
              </span>
            </div>

            <h3>{control.nombre}</h3>

            <p>{control.desc}</p>
          </article>
        ))}
      </div>

      {controlesISO.length === 0 && (
        <p className="iso-sin-controles">
          No hay controles registrados todavía.
        </p>
      )}
    </section>
  );
}
