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

const plural = (n, singular, pluralTexto) =>
  `${n} ${n === 1 ? singular : pluralTexto}`;

export default function SeccionPlan() {
  const [fPrioridad, setFPrioridad] = useState("");
  const [fNivel, setFNivel] = useState("");
  const [buscar, setBuscar] = useState("");

  // Tarjetas abiertas (se pueden abrir varias a la vez)
  const [abiertas, setAbiertas] = useState(() => new Set());

  const acciones = planAccion.plan_accion;
  const { por_prioridad, por_nivel_riesgo } = planAccion.resumen;

  const niveles = Object.keys(por_nivel_riesgo);

  const filtrados = useMemo(() => {
    const texto = buscar.trim().toLowerCase();

    return acciones.filter((a) => {
      const coincidePrioridad = !fPrioridad || a.prioridad === fPrioridad;
      const coincideNivel =
        !fNivel || a.evaluacion_riesgo?.nivel === fNivel;

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
        ].some((v) => String(v ?? "").toLowerCase().includes(texto));

      return coincidePrioridad && coincideNivel && coincideBusqueda;
    });
  }, [acciones, fPrioridad, fNivel, buscar]);

  // Activa un valor o lo quita si ya estaba activo
  const alternar = (setter, valor) =>
    setter((actual) => (actual === valor ? "" : valor));

  const limpiarFiltros = () => {
    setFPrioridad("");
    setFNivel("");
    setBuscar("");
  };

  const filtrosActivos = [
    fPrioridad && {
      clave: "prioridad",
      texto: `Prioridad: ${fPrioridad}`,
      quitar: () => setFPrioridad(""),
    },
    fNivel && {
      clave: "nivel",
      texto: `Riesgo: ${fNivel}`,
      quitar: () => setFNivel(""),
    },
    buscar.trim() && {
      clave: "buscar",
      texto: `Búsqueda: “${buscar.trim()}”`,
      quitar: () => setBuscar(""),
    },
  ].filter(Boolean);

  const alternarTarjeta = (id) =>
    setAbiertas((previo) => {
      const nuevo = new Set(previo);
      if (nuevo.has(id)) {
        nuevo.delete(id);
      } else {
        nuevo.add(id);
      }
      return nuevo;
    });

  const todasAbiertas =
    filtrados.length > 0 &&
    filtrados.every((a) => abiertas.has(a.id_accion));

  const alternarTodas = () =>
    setAbiertas((previo) => {
      const nuevo = new Set(previo);
      filtrados.forEach((a) =>
        todasAbiertas ? nuevo.delete(a.id_accion) : nuevo.add(a.id_accion)
      );
      return nuevo;
    });

  // Clic en cualquier parte de la tarjeta abre o cierra el detalle,
  // salvo que se esté seleccionando texto o se haga clic dentro del detalle.
  const alClicTarjeta = (evento, id) => {
    if (evento.target.closest(".plan-accion-detalle")) return;
    if (window.getSelection?.()?.toString()) return;
    alternarTarjeta(id);
  };

  const kpis = [
    {
      prioridad: null,
      clase: "kpi-total",
      titulo: "Acciones",
      valor: planAccion.resumen.total_acciones_principales,
      detalle: "Riesgos con tratamiento propuesto",
    },
    {
      prioridad: "Alta",
      clase: "kpi-alta",
      titulo: "Prioridad alta",
      valor: por_prioridad.Alta,
      detalle: "Atención prioritaria",
    },
    {
      prioridad: "Media",
      clase: "kpi-media",
      titulo: "Prioridad media",
      valor: por_prioridad.Media,
      detalle: "Seguimiento planificado",
    },
    {
      prioridad: "Baja",
      clase: "kpi-baja",
      titulo: "Prioridad baja",
      valor: por_prioridad.Baja,
      detalle: "Mejoras programables",
    },
  ];

  return (
    <section id="plan" className="seccion-plan">
      {/* Header */}
      <header className="plan-header">
        <span className="plan-etiqueta">05 · Tratamiento y mitigación</span>
        <h2>Plan de Acción</h2>
        <p>{planAccion.objetivo}</p>
        <p className="plan-alcance">{planAccion.alcance}</p>
      </header>

      {/* KPIs: clic = filtrar por prioridad */}
      <div className="plan-kpi-grid">
        {kpis.map((kpi) => {
          const esFiltro = kpi.prioridad !== null;

          return (
            <button
              type="button"
              key={kpi.clase}
              className={`plan-kpi ${kpi.clase} es-filtro`}
              aria-pressed={esFiltro ? fPrioridad === kpi.prioridad : undefined}
              title={
                esFiltro
                  ? `Filtrar por prioridad ${kpi.prioridad.toLowerCase()}`
                  : "Quitar todos los filtros"
              }
              onClick={() =>
                esFiltro
                  ? alternar(setFPrioridad, kpi.prioridad)
                  : limpiarFiltros()
              }
            >
              <span className="kpi-top">
                <span className="plan-kpi-titulo">{kpi.titulo}</span>
                <span className="kpi-punto" aria-hidden="true" />
              </span>
              <strong className="plan-kpi-numero">{kpi.valor}</strong>
              <span className="plan-kpi-detalle">{kpi.detalle}</span>
            </button>
          );
        })}
      </div>

      {/* Distribución por nivel de riesgo: clic = filtrar por nivel */}
      <div className="plan-bloque">
        <div className="plan-subheader">
          <h3>Distribución por nivel de riesgo</h3>
          <p>
            Los riesgos vinculados al plan se clasifican según el nivel
            reportado en el documento fuente. Haz clic en un nivel para
            filtrar las acciones.
          </p>
        </div>

        <div className="plan-niveles-grid">
          {Object.entries(por_nivel_riesgo).map(([nivel, cantidad]) => (
            <button
              type="button"
              key={nivel}
              className={`plan-nivel-card nivel-${
                clasePorNivel[nivel] ?? "medio"
              }`}
              aria-pressed={fNivel === nivel}
              title={`Filtrar por riesgo ${nivel.toLowerCase()}`}
              onClick={() => alternar(setFNivel, nivel)}
            >
              <span className="plan-nivel-etiqueta">{nivel}</span>
              <strong className="plan-nivel-numero">{cantidad}</strong>
              <span className="plan-nivel-detalle">
                {cantidad === 1 ? "riesgo" : "riesgos"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Acciones de mitigación */}
      <div className="plan-bloque">
        <div className="plan-subheader">
          <h3>Acciones de mitigación</h3>
          <p>
            Consulta el control ISO asociado, la acción propuesta y los
            plazos para cada riesgo. Haz clic en una acción para ver sus
            actividades, indicador y evidencias esperadas.
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
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Nivel de riesgo</span>
            <select value={fNivel} onChange={(e) => setFNivel(e.target.value)}>
              <option value="">Todos</option>
              {niveles.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
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
            onClick={limpiarFiltros}
          >
            Limpiar
          </button>
        </div>

        {filtrosActivos.length > 0 && (
          <div className="plan-chips" aria-label="Filtros activos">
            {filtrosActivos.map((filtro) => (
              <button
                type="button"
                key={filtro.clave}
                className="plan-chip"
                onClick={filtro.quitar}
              >
                {filtro.texto}
              </button>
            ))}
          </div>
        )}

        <div className="plan-tabla-info" aria-live="polite">
          <span>
            Mostrando <strong>{filtrados.length}</strong> de{" "}
            <strong>{acciones.length}</strong> acciones
          </span>

          {filtrados.length > 0 && (
            <button
              type="button"
              className="plan-accion-todas"
              onClick={alternarTodas}
            >
              {todasAbiertas ? "Contraer todas" : "Expandir todas"}
            </button>
          )}
        </div>

        {/* Tarjetas de acciones (2 columnas, expandibles) */}
        <div className="plan-acciones">
          {filtrados.map((a, indice) => {
            const claseP = clasePorPrioridad[a.prioridad] ?? "baja";
            const claseN = clasePorNivel[a.evaluacion_riesgo?.nivel] ?? "medio";
            const abierta = abiertas.has(a.id_accion);
            const idPanel = `plan-detalle-${a.id_accion}`;

            const nActividades = a.actividades?.length ?? 0;
            const nEvidencias = a.evidencias_esperadas?.length ?? 0;

            return (
              <article
                key={a.id_accion}
                className={`plan-accion-card nivel-${claseN} ${
                  abierta ? "expandido" : ""
                }`}
                style={{ "--i": indice }}
                onClick={(e) => alClicTarjeta(e, a.id_accion)}
              >
                {/* Cabecera */}
                <header className="plan-accion-head">
                  <div className="plan-accion-ids">
                    <span className="plan-id-accion">{a.id_accion}</span>
                    <span className="plan-id-sep">·</span>
                    <span className="plan-id-riesgo">{a.id_riesgo}</span>
                    <span className="plan-id-sep">·</span>
                    <span className="plan-id-activo">{a.id_activo}</span>
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

                {/* Título, activo y amenaza */}
                <h4 className="plan-accion-titulo">{a.accion_principal}</h4>

                <p className="plan-accion-activo">
                  <span className="plan-label">Activo afectado</span>
                  {a.activo_afectado}
                </p>

                <p className="plan-accion-amenaza">
                  <span className="plan-label">Amenaza</span>
                  {a.amenaza}
                </p>

                {/* Responsable, tratamiento, plazo y estado */}
                <div className="plan-meta">
                  <div className="plan-meta-item">
                    <span className="plan-meta-label">Responsable</span>
                    <span className="plan-meta-valor">{a.responsable}</span>
                  </div>

                  <div className="plan-meta-item">
                    <span className="plan-meta-label">Tratamiento</span>
                    <span className="plan-meta-valor">{a.tratamiento}</span>
                  </div>

                  <div className="plan-meta-item">
                    <span className="plan-meta-label">Plazo</span>
                    <span className="plan-meta-valor">
                      {a.plazo_estimado?.descripcion ?? "Sin plazo"}
                    </span>
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

                {/* Botón de despliegue (el clic sube hasta la tarjeta) */}
                <button
                  type="button"
                  className="plan-accion-toggle"
                  aria-expanded={abierta}
                  aria-controls={idPanel}
                >
                  <span className="plan-toggle-texto">
                    {abierta
                      ? "Ocultar detalle"
                      : "Ver actividades, indicador y evidencias"}
                  </span>

                  <span className="plan-toggle-conteo">
                    {[
                      nActividades > 0 &&
                        plural(nActividades, "actividad", "actividades"),
                      nEvidencias > 0 &&
                        plural(nEvidencias, "evidencia", "evidencias"),
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>

                  <span className="plan-chevron" aria-hidden="true" />
                </button>

                {/* Detalle desplegable */}
                <div className="plan-accion-detalle" id={idPanel}>
                  <div>
                    <div className="plan-detalle-cuerpo">
                      {/* Actividades */}
                      {nActividades > 0 && (
                        <div className="plan-actividades-bloque">
                          <span className="plan-label">Actividades</span>
                          <ol className="plan-actividades">
                            {a.actividades.map((act, i) => (
                              <li key={i}>{act}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Indicador */}
                      {a.indicador && (
                        <div className="plan-indicador">
                          <span className="plan-label">Indicador</span>
                          <p className="plan-indicador-texto">
                            {a.indicador}
                          </p>
                          {a.meta_de_verificacion && (
                            <p className="plan-meta-verificacion">
                              <em>Meta:</em> {a.meta_de_verificacion}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Evidencias */}
                      {nEvidencias > 0 && (
                        <div className="plan-evidencias">
                          <span className="plan-label">
                            Evidencias esperadas
                          </span>
                          <ul className="plan-evidencias-lista">
                            {a.evidencias_esperadas.map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {filtrados.length === 0 && (
            <div className="plan-vacio">
              <p>No hay acciones que coincidan con los filtros aplicados.</p>
              <button type="button" onClick={limpiarFiltros}>
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Plan original del documento */}
      <div className="plan-bloque">
        <div className="plan-subheader">
          <h3>Plan original del documento</h3>
          <p>
            Acciones tal como aparecen en el PDF fuente, sin modificaciones.
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
                      className={`plan-badge plan-badge-${
                        clasePorPrioridad[ap.prioridad] ?? "baja"
                      }`}
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
      <p className="plan-nota">{planAccion.nota}</p>
    </section>
  );
}