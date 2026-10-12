
import { useMemo, useState } from "react";
import { riesgos } from "../data/riesgos";
import "./styles/SeccionPlan.css";

const prioridades = ["Alta", "Media", "Baja"];

export default function SeccionPlan() {
  const [fPrioridad, setFPrioridad] = useState("");

  const filtrados = useMemo(
    () =>
      riesgos.filter(
        (r) => !fPrioridad || r.prioridad === fPrioridad
      ),
    [fPrioridad]
  );

  const contarPrioridad = (prioridad) =>
    riesgos.filter((r) => r.prioridad === prioridad).length;

  return (
    <section id="plan" className="seccion-plan">
      <header className="plan-header">
        <span className="plan-etiqueta">
          TRATAMIENTO Y MITIGACIÓN
        </span>

        <h2>Plan de Acción</h2>

        <p>
          Medidas propuestas para reducir los riesgos identificados,
          aplicar controles de seguridad y establecer prioridades
          de tratamiento para los activos de información.
        </p>
      </header>

      <div className="plan-resumen-grid">
        <article className="plan-resumen-card">
          <span className="plan-resumen-titulo">
            Acciones registradas
          </span>
          <strong className="plan-resumen-numero">
            {riesgos.length}
          </strong>
          <span className="plan-resumen-detalle">
            Riesgos con tratamiento propuesto
          </span>
        </article>

        <article className="plan-resumen-card">
          <span className="plan-resumen-titulo">
            Prioridad alta
          </span>
          <strong className="plan-resumen-numero plan-prioridad-alta">
            {contarPrioridad("Alta")}
          </strong>
          <span className="plan-resumen-detalle">
            Atención prioritaria
          </span>
        </article>

        <article className="plan-resumen-card">
          <span className="plan-resumen-titulo">
            Prioridad media
          </span>
          <strong className="plan-resumen-numero plan-prioridad-media">
            {contarPrioridad("Media")}
          </strong>
          <span className="plan-resumen-detalle">
            Seguimiento y ejecución planificada
          </span>
        </article>

        <article className="plan-resumen-card">
          <span className="plan-resumen-titulo">
            Prioridad baja
          </span>
          <strong className="plan-resumen-numero plan-prioridad-baja">
            {contarPrioridad("Baja")}
          </strong>
          <span className="plan-resumen-detalle">
            Mejoras programables
          </span>
        </article>
      </div>

      <div className="plan-contenido">
        <div className="plan-subheader">
          <div>
            <h3>Acciones de mitigación</h3>
            <p>
              Consulta el control ISO asociado y la acción propuesta
              para cada riesgo.
            </p>
          </div>
        </div>

        <div className="plan-filtros">
          <label htmlFor="plan-prioridad">
            Filtrar por prioridad
          </label>

          <select
            id="plan-prioridad"
            value={fPrioridad}
            onChange={(e) => setFPrioridad(e.target.value)}
          >
            <option value="">Todas las prioridades</option>
            {prioridades.map((prioridad) => (
              <option key={prioridad} value={prioridad}>
                Prioridad {prioridad.toLowerCase()}
              </option>
            ))}
          </select>

          <span className="plan-resultados">
            {filtrados.length} de {riesgos.length} acciones
          </span>

          {fPrioridad && (
            <button
              type="button"
              className="plan-limpiar"
              onClick={() => setFPrioridad("")}
            >
              Limpiar filtro
            </button>
          )}
        </div>

        <div className="plan-tabla-contenedor">
          <table className="plan-tabla">
            <thead>
              <tr>
                <th scope="col">Riesgo identificado</th>
                <th scope="col">Control ISO 27001</th>
                <th scope="col">Acción de mitigación</th>
                <th scope="col">Prioridad</th>
              </tr>
            </thead>

            <tbody>
              {filtrados.map((riesgo) => {
                const clasePrioridad = {
                  Alta: "alta",
                  Media: "media",
                  Baja: "baja",
                }[riesgo.prioridad] || "sin-clasificar";

                return (
                  <tr key={riesgo.id}>
                    <td>
                      <div className="plan-riesgo">
                        <span className="plan-riesgo-id">
                          {riesgo.id}
                        </span>
                        <span>{riesgo.amenaza}</span>
                      </div>
                    </td>

                    <td>
                      <span className="plan-control">
                        {riesgo.control || "Por definir"}
                      </span>
                    </td>

                    <td>{riesgo.accion || "Por definir"}</td>

                    <td>
                      <span
                        className={`plan-badge plan-badge-${clasePrioridad}`}
                      >
                        {riesgo.prioridad || "Sin clasificar"}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={4} className="plan-vacio">
                    No hay acciones registradas para esta prioridad.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="plan-nota">
          Las prioridades deben revisarse periódicamente según el
          nivel de riesgo, la eficacia de los controles y los recursos
          disponibles para implementar las medidas.
        </p>
      </div>
    </section>
  );
}
