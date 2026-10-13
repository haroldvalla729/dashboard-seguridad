import { useMemo, useState } from "react";
import { planAccion } from "../data/planAccion";
import "./styles/SeccionPlan.css";

const prioridades = ["Alta", "Media", "Baja"];

const clasePorPrioridad = {
  Alta: "alta",
  Media: "media",
  Baja: "baja",
};

const clasePorNivel = {
  Crítico: "critico",
  Alto: "alto",
  Moderado: "medio",
  Medio: "medio",
  Bajo: "bajo",
};

export default function SeccionPlan() {
  const [fPrioridad, setFPrioridad] = useState("");
  const [buscar, setBuscar] = useState("");

  const acciones = planAccion.plan_accion;

  const filtrados = useMemo(() => {
    const texto = buscar.trim().toLowerCase();

    return acciones.filter((a) => {
      const coincidePrioridad =
        !fPrioridad || a.prioridad === fPrioridad;

      const coincideBusqueda =
        !texto ||
        [
          a.id_accion,
          a.id_riesgo,
          a.id_activo,
          a.accion_principal,
          a.amenaza,
          a.responsable,
          a.control,
          a.indicador,
          a.activo_afectado,
        ].some((v) =>
          String(v ?? "").toLowerCase().includes(texto)
        );

      return coincidePrioridad && coincideBusqueda;
    });
  }, [acciones, fPrioridad, buscar]);

  const { por_prioridad, por_nivel_riesgo } = planAccion.resumen;

  return (
    <section id="plan" className="seccion-plan">
      {/* Header */}
      <header className="plan-header">
        <span className="plan-etiqueta">
          05 · Tratamiento y mitigación
        </span>
        <h2>Plan de Acción</h2>
        <p>{planAccion.objetivo}</p>
        <p className="plan-alcance">{planAccion.alcance}</p>
      </header>

      {/* KPIs */}
      <div className="plan-kpi-grid">
        <article className="plan-kpi kpi-total">
          <div className="kpi-top">
            <span className="plan-kpi-titulo">Acciones</span>
            <span className="kpi-punto" aria-hidden="true" />
          </div>
          <strong className="plan-kpi-numero">
            {planAccion.resumen.total_acciones_principales}
          </strong>
          <span className="plan-kpi-detalle">
            Riesgos con tratamiento propuesto
          </span>
        </article>

        <article className="plan-kpi kpi-alta">
          <div className="kpi-top">
            <span className="plan-kpi-titulo">Prioridad alta</span>
            <span className="kpi-punto" aria-hidden="true" />
          </div>
          <strong className="plan-kpi-numero">
            {por_prioridad.Alta}
          </strong>
          <span className="plan-kpi-detalle">Atención prioritaria</span>
        </article>

        <article className="plan-kpi kpi-media">
          <div className="kpi-top">
            <span className="plan-kpi-titulo">Prioridad media</span>
            <span className="kpi-punto" aria-hidden="true" />
          </div>
          <strong className="plan-kpi-numero">
            {por_prioridad.Media}
          </strong>
          <span className="plan-kpi-detalle">
            Seguimiento planificado
          </span>
        </article>

        <article className="plan-kpi kpi-baja">
          <div className="kpi-top">
            <span className="plan-kpi-titulo">Prioridad baja</span>
            <span className="kpi-punto" aria-hidden="true" />
          </div>
          <strong className="plan-kpi-numero">
            {por_prioridad.Baja}
          </strong>
          <span className="plan-kpi-detalle">Mejoras programables</span>
        </article>
      </div>

      {/* Distribución por nivel de riesgo */}
      <div className="plan-bloque">
        <div className="plan-subheader">
          <h3>Distribución por nivel de riesgo</h3>
          <p>
            Los riesgos vinculados al plan se clasifican según el
            nivel reportado en el documento fuente.
          </p>
        </div>

        <div className="plan-niveles-grid">
          {Object.entries(por_nivel_riesgo).map(([nivel, cantidad]) => (
            <article
              key={nivel}
              className={`plan-nivel-card nivel-${clasePorNivel[nivel] ?? "medio"}`}
            >
              <span className="plan-nivel-etiqueta">{nivel}</span>
              <strong className="plan-nivel-numero">{cantidad}</strong>
              <span className="plan-nivel-detalle">
                {cantidad === 1 ? "riesgo" : "riesgos"}
              </span>
            </article>
          ))}
        </div>
      </div>

      {/* Filtros */}
      <div className="plan-bloque">
        <div className="plan-subheader">
          <h3>Acciones de mitigación</h3>
          <p>
            Consulta el control ISO asociado, la acción propuesta y
            los plazos para cada riesgo.
          </p>
        </div>

        <div className="plan-filtros">
          <label>
            <span>Prioridad</span>
            <select
              value={fPrioridad}
              onChange={(e) => setFPrioridad(e.target.value)}
            >
              <option value="">Todas</option>
              {prioridades.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>

          <label className="plan-busqueda">
            <span>Buscar</span>
            <input
              type="search"
              placeholder="Acción, responsable, control, activo…"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="plan-limpiar"
            onClick={() => {
              setFPrioridad("");
              setBuscar("");
            }}
          >
            Limpiar
          </button>
        </div>

        <div className="plan-tabla-info" aria-live="polite">
          <span>
            Mostrando <strong>{filtrados.length}</strong> de{" "}
            <strong>{acciones.length}</strong> acciones
          </span>
        </div>

        {/* Cards de acciones */}
        <div className="plan-acciones">
          {filtrados.map((a) => {
            const claseP =
              clasePorPrioridad[a.prioridad] ?? "baja";
            const claseN =
              clasePorNivel[a.evaluacion_riesgo?.nivel] ?? "medio";

            return (
              <article key={a.id_accion} className="plan-accion-card">
                {/* Cabecera de la card */}
                <header className="plan-accion-head">
                  <div className="plan-accion-ids">
                    <span className="plan-id-accion">
                      {a.id_accion}
                    </span>
                    <span className="plan-id-sep">·</span>
                    <span className="plan-id-riesgo">
                      {a.id_riesgo}
                    </span>
                    <span className="plan-id-sep">·</span>
                    <span className="plan-id-activo">
                      {a.id_activo}
                    </span>
                  </div>

                  <div className="plan-accion-badges">
                    <span className={`plan-badge plan-badge-${claseN}`}>
                      Riesgo {a.evaluacion_riesgo?.nivel ?? "—"}
                    </span>
                    <span className={`plan-badge plan-badge-${claseP}`}>
                      Prioridad {a.prioridad}
                    </span>
                  </div>
                </header>

                {/* Título y activo */}
                <h4 className="plan-accion-titulo">
                  {a.accion_principal}
                </h4>

                <p className="plan-accion-activo">
                  <span className="plan-label">Activo afectado:</span>{" "}
                  {a.activo_afectado}
                </p>

                <p className="plan-accion-amenaza">
                  <span className="plan-label">Amenaza:</span>{" "}
                  {a.amenaza}
                </p>

                {/* Meta info */}
                <div className="plan-meta">
                  <div className="plan-meta-item">
                    <span className="plan-meta-label">Responsable</span>
                    <span className="plan-meta-valor">
                      {a.responsable}
                    </span>
                  </div>

                  <div className="plan-meta-item">
                    <span className="plan-meta-label">Plazo</span>
                    <span className="plan-meta-valor">
                      {a.plazo_estimado?.descripcion ?? "Sin plazo"}
                    </span>
                  </div>

                  <div className="plan-meta-item">
                    <span className="plan-meta-label">Tratamiento</span>
                    <span className="plan-meta-valor">{a.tratamiento}</span>
                  </div>

                  <div className="plan-meta-item">
                    <span className="plan-meta-label">Estado</span>
                    <span className="plan-meta-valor">{a.estado}</span>
                  </div>
                </div>

                {/* Controles ISO */}
                {a.controles_iso_27001_2022?.length > 0 && (
                  <div className="plan-controles">
                    <span className="plan-label">
                      Controles ISO/IEC 27001:2022
                    </span>
                    <div className="plan-controles-lista">
                      {a.controles_iso_27001_2022.map((c) => (
                        <span
                          key={c.codigo}
                          className="plan-control-chip"
                          title={`A.${c.codigo} · ${c.nombre}`}
                        >
                          <strong>A.{c.codigo}</strong>
                          <span>{c.nombre}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actividades */}
                {a.actividades?.length > 0 && (
                  <details className="plan-detalle">
                    <summary>
                      Actividades ({a.actividades.length})
                    </summary>
                    <ul className="plan-actividades">
                      {a.actividades.map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </details>
                )}

                {/* Indicador */}
                {a.indicador && (
                  <div className="plan-indicador">
                    <span className="plan-label">Indicador</span>
                    <p className="plan-indicador-texto">{a.indicador}</p>
                    {a.meta_de_verificacion && (
                      <p className="plan-meta-verificacion">
                        <em>Meta:</em> {a.meta_de_verificacion}
                      </p>
                    )}
                  </div>
                )}

                {/* Evidencias */}
                {a.evidencias_esperadas?.length > 0 && (
                  <div className="plan-evidencias">
                    <span className="plan-label">Evidencias esperadas</span>
                    <ul className="plan-evidencias-lista">
                      {a.evidencias_esperadas.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}

          {filtrados.length === 0 && (
            <p className="plan-vacio">
              No hay acciones que coincidan con los filtros aplicados.
            </p>
          )}
        </div>
      </div>

      {/* Plan original del documento */}
      <div className="plan-bloque">
        <div className="plan-subheader">
          <h3>Plan original del documento</h3>
          <p>
            Acciones tal como aparecen en el PDF fuente, sin
            modificaciones.
          </p>
        </div>

        <div className="plan-original-tabla-contenedor">
          <table className="plan-original-tabla">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Acción</th>
                <th scope="col">Responsable</th>
                <th scope="col">Prioridad</th>
                <th scope="col">Plazo</th>
                <th scope="col">Riesgos</th>
              </tr>
            </thead>
            <tbody>
              {planAccion.plan_accion_original_documento.map((ap) => (
                <tr key={ap.id}>
                  <td className="plan-id-cell">{ap.id}</td>
                  <td>{ap.accion}</td>
                  <td>{ap.responsable}</td>
                  <td>
                    <span
                      className={`plan-badge plan-badge-${clasePorPrioridad[ap.prioridad] ?? "baja"}`}
                    >
                      {ap.prioridad}
                    </span>
                  </td>
                  <td>{ap.plazo}</td>
                  <td className="plan-riesgos-cell">
                    {ap.id_riesgos_vinculados.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Nota final */}
      <p className="plan-nota">
        {planAccion.nota}
      </p>
    </section>
  );
}