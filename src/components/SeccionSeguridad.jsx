import { useState } from "react";
import { seguridad } from "../data/seguridad";
import "./styles/SeccionSeguridad.css";

const plural = (n, singular, pluralTexto) =>
  `${n} ${n === 1 ? singular : pluralTexto}`;

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
                        .replace(/[̀-ͯ]/g, "")}`}
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
          <p>
            Medidas complementarias para proteger instalaciones, equipos,
            sistemas y datos. Elige un tipo de seguridad y haz clic en una categoría
            para ver sus medidas.
          </p>
        </div>

        <MedidasSeguridad
          grupos={[
            { clave: "fisica", letra: "F", datos: seguridadFisica },
            { clave: "logica", letra: "L", datos: seguridadLogica },
          ]}
        />
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

/*
 * Seguridad física y lógica con pestañas: solo se ve un grupo a la vez, así
 * que la diferencia de categorías entre ambos no deja espacios en blanco.
 * Dentro del grupo, cada categoría es una tarjeta que se expande al hacer clic.
 */
function MedidasSeguridad({ grupos }) {
  const [activo, setActivo] = useState(grupos[0].clave);
  // Se guardan como "grupo:categoría" para conservar lo abierto al cambiar de pestaña
  const [abiertas, setAbiertas] = useState(() => new Set());

  const grupo = grupos.find((g) => g.clave === activo) ?? grupos[0];
  const { clave, letra, datos } = grupo;
  const categorias = datos.categorias ?? [];
  const idDe = (cat) => `${clave}:${cat.categoria}`;

  const todasAbiertas =
    categorias.length > 0 && categorias.every((cat) => abiertas.has(idDe(cat)));

  const alternar = (id) =>
    setAbiertas((previo) => {
      const nuevo = new Set(previo);
      if (nuevo.has(id)) {
        nuevo.delete(id);
      } else {
        nuevo.add(id);
      }
      return nuevo;
    });

  const alternarTodas = () =>
    setAbiertas((previo) => {
      const nuevo = new Set(previo);
      categorias.forEach((cat) => {
        if (todasAbiertas) {
          nuevo.delete(idDe(cat));
        } else {
          nuevo.add(idDe(cat));
        }
      });
      return nuevo;
    });

  // Flechas izquierda/derecha para moverse entre pestañas
  const alTeclear = (e, indice) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const paso = e.key === "ArrowRight" ? 1 : -1;
    const siguiente = grupos[(indice + paso + grupos.length) % grupos.length];
    setActivo(siguiente.clave);
    document.getElementById(`seguridad-tab-${siguiente.clave}`)?.focus();
  };

  return (
    <div>
      <div className="seguridad-tabs" role="tablist" aria-label="Tipo de seguridad">
        {grupos.map((g, indice) => (
          <button
            key={g.clave}
            type="button"
            role="tab"
            id={`seguridad-tab-${g.clave}`}
            aria-selected={g.clave === clave}
            aria-controls={`seguridad-panel-${g.clave}`}
            tabIndex={g.clave === clave ? 0 : -1}
            className="seguridad-tab"
            onClick={() => setActivo(g.clave)}
            onKeyDown={(e) => alTeclear(e, indice)}
          >
            <span className="seguridad-medidas-icono">{g.letra}</span>
            <span className="seguridad-tab-texto">
              <strong>{g.datos.titulo}</strong>
              <small>Categorías de controles</small>
            </span>
            <span className="seguridad-tab-contador">
              {g.datos.categorias?.length ?? 0}
            </span>
          </button>
        ))}
      </div>

      <div
        key={clave}
        className="seguridad-grupo"
        role="tabpanel"
        id={`seguridad-panel-${clave}`}
        aria-labelledby={`seguridad-tab-${clave}`}
      >
        <div className="seguridad-medidas-titulo">
          <div>
            <p>{datos.descripcion}</p>
          </div>

          {categorias.length > 0 && (
            <button
              type="button"
              className="seguridad-accion-todas"
              onClick={alternarTodas}
            >
              {todasAbiertas ? "Contraer todas" : "Expandir todas"}
            </button>
          )}
        </div>

        <div className="seguridad-categorias-grid">
          {categorias.map((cat, indice) => {
            const id = idDe(cat);
            const abierta = abiertas.has(id);
            const idPanel = `seguridad-${clave}-${indice}`;
            const nMedidas = cat.medidas?.length ?? 0;

            return (
              <article
                key={id}
                className={`seguridad-categoria-card ${abierta ? "expandido" : ""}`}
              >
                <h5 className="seguridad-categoria-titulo">
                  <button
                    type="button"
                    className="seguridad-categoria-cabecera"
                    aria-expanded={abierta}
                    aria-controls={idPanel}
                    onClick={() => alternar(id)}
                  >
                    <span className="seguridad-categoria-icono" aria-hidden="true">
                      {cat.icono}
                    </span>

                    <span className="seguridad-categoria-nombre">
                      {cat.categoria}
                    </span>

                    <span className="seguridad-categoria-meta">
                      {cat.controlISO && (
                        <span className="seguridad-control-iso">{cat.controlISO}</span>
                      )}
                      <span className="seguridad-categoria-conteo">
                        {plural(nMedidas, "medida", "medidas")}
                      </span>
                    </span>

                    <span className="seguridad-chevron" aria-hidden="true" />
                  </button>
                </h5>

                <div className="seguridad-categoria-panel" id={idPanel}>
                  <div>
                    <div className="seguridad-categoria-cuerpo">
                      <ul className="seguridad-lista">
                        {cat.medidas.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>

                      {cat.riesgosMitigados && (
                        <p className="seguridad-riesgos-mitigados">
                          <strong>Mitiga:</strong> {cat.riesgosMitigados.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
