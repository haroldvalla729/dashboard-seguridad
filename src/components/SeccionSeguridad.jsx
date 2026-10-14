import { seguridad } from "../data/seguridad";
import "./styles/SeccionSeguridad.css";

export default function SeccionSeguridad() {
  const {
    meta,
    principiosCID,
    clasificacionInformacion,
    seguridadFisica,
    seguridadLogica,
    matrizControlesCID,
  } = seguridad;

  return (
    <section id="seguridad" className="seccion-seguridad">
      {/* ============ HEADER ============ */}
      <header className="seguridad-header">
        <span className="seguridad-etiqueta">
          02 · PROTECCIÓN DE LA INFORMACIÓN
        </span>
        <h2>{meta.seccion}</h2>
        <p>{meta.descripcion}</p>
        <p className="seguridad-normas">
          Normas de referencia: {meta.normasReferencia.join(" · ")}
        </p>
      </header>

      {/* ============ PRINCIPIOS CID ============ */}
      <div className="seguridad-bloque">
        <div className="seguridad-subheader">
          <h3>{principiosCID.titulo}</h3>
          <p>{principiosCID.descripcion}</p>
        </div>

        <div className="seguridad-cia-grid">
          {principiosCID.items.map((c) => (
            <article
              key={c.id}
              className="card seguridad-cia-card"
              style={{ borderTop: `5px solid ${c.color}` }}
            >
              <div className="seguridad-cia-icono" aria-hidden="true">
                {c.icono}
              </div>

              <h4>{c.titulo}</h4>
              <p>{c.definicion}</p>

              <p className="seguridad-aplicacion">
                <strong>Aplicación en CODEXA:</strong> {c.aplicacionCodexa}
              </p>

              <div className="seguridad-cia-meta">
                <span><strong>Controles:</strong> {c.controlesAplicados.join(", ")}</span>
                <span><strong>Riesgos:</strong> {c.riesgosAsociados.join(", ")}</span>
                <span><strong>Indicador:</strong> {c.indicadorExito}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ============ CLASIFICACIÓN ============ */}
      <div className="seguridad-bloque">
        <div className="seguridad-subheader">
          <h3>{clasificacionInformacion.titulo}</h3>
          <p>{clasificacionInformacion.descripcion}</p>
        </div>

        <div className="seguridad-leyenda">
          {clasificacionInformacion.escalaClasificacion.map((e) => (
            <span key={e.nivel} className="seguridad-leyenda-item">
              <i style={{ background: e.color }} />
              <strong>{e.nivel}:</strong> {e.descripcion}
            </span>
          ))}
        </div>

        <div className="seguridad-tabla-contenedor">
          <table className="seguridad-tabla">
            <thead>
              <tr>
                <th>Código</th>
                <th>Activo</th>
                <th>Tipo</th>
                <th>Clasificación</th>
                <th>C / I / D</th>
                <th>Propietario</th>
                <th>Riesgos</th>
              </tr>
            </thead>
            <tbody>
              {clasificacionInformacion.activos.map((a) => (
                <tr key={a.codigo}>
                  <td>{a.codigo}</td>
                  <td>
                    <strong>{a.nombre}</strong>
                    <br />
                    <small>{a.justificacion}</small>
                  </td>
                  <td>{a.tipo}</td>
                  <td>
                    <span
                      className={`seguridad-badge seguridad-nivel-${a.clasificacion
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")}`}
                    >
                      {a.clasificacion}
                    </span>
                  </td>
                  <td>{a.c} / {a.i} / {a.d}</td>
                  <td>{a.propietario}</td>
                  <td>{a.riesgosAsociados?.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============ SEGURIDAD FÍSICA Y LÓGICA ============ */}
      <div className="seguridad-bloque">
        <div className="seguridad-subheader">
          <h3>Seguridad Física y Lógica</h3>
          <p>Medidas complementarias para proteger instalaciones, equipos, sistemas y datos.</p>
        </div>

        <div className="seguridad-medidas-grid">
          {/* FÍSICA */}
          <article className="card seguridad-medidas-card">
            <div className="seguridad-medidas-titulo">
              <span className="seguridad-medidas-icono">F</span>
              <div>
                <h4>{seguridadFisica.titulo}</h4>
                <p>{seguridadFisica.descripcion}</p>
              </div>
            </div>

            {seguridadFisica.categorias.map((cat) => (
              <div key={cat.categoria} className="seguridad-categoria">
                <h5>
                  {cat.icono} {cat.categoria}
                  <small> · {cat.controlISO}</small>
                </h5>
                <ul className="seguridad-lista">
                  {cat.medidas.map((m) => <li key={m}>{m}</li>)}
                </ul>
              </div>
            ))}
          </article>

          {/* LÓGICA */}
          <article className="card seguridad-medidas-card">
            <div className="seguridad-medidas-titulo">
              <span className="seguridad-medidas-icono">L</span>
              <div>
                <h4>{seguridadLogica.titulo}</h4>
                <p>{seguridadLogica.descripcion}</p>
              </div>
            </div>

            {seguridadLogica.categorias.map((cat) => (
              <div key={cat.categoria} className="seguridad-categoria">
                <h5>
                  {cat.icono} {cat.categoria}
                  <small> · {cat.controlISO}</small>
                </h5>
                <ul className="seguridad-lista">
                  {cat.medidas.map((m) => <li key={m}>{m}</li>)}
                </ul>
                {cat.riesgosMitigados && (
                  <p className="seguridad-riesgos-mitigados">
                    <strong>Mitiga:</strong> {cat.riesgosMitigados.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </article>
        </div>
      </div>

      {/* ============ MATRIZ CID ============ */}
      <div className="seguridad-bloque">
        <div className="seguridad-subheader">
          <h3>{matrizControlesCID.titulo}</h3>
          <p>{matrizControlesCID.descripcion}</p>
        </div>

        <div className="seguridad-cia-grid">
          {matrizControlesCID.datos.map((d) => (
            <article
              key={d.principio}
              className="card seguridad-cia-card"
              style={{ borderTop: `5px solid ${d.color}` }}
            >
              <h4>{d.principio}</h4>
              <p style={{ fontSize: "2rem", fontWeight: 700, color: d.color }}>
                {d.controles}
              </p>
              <p>controles aplicados</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}