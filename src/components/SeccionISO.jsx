import { controlesISO } from "../data/iso27001";
import "./styles/SeccionISO.css";

export default function SeccionISO() {
  const {
    meta,
    introduccion,
    resumenAnexoA,
    controlesAplicados,
    estructuraNorma,
    cicloPHVA,
    integracionOtrasNormas,
  } = controlesISO;

  return (
    <section id="iso" className="seccion-iso">
      {/* ============ HEADER ============ */}
      <header className="iso-header">
        <span className="iso-etiqueta">03 · MARCO DE SEGURIDAD</span>
        <h2>{meta.seccion} — Controles Aplicados</h2>
        <p>{meta.descripcion}</p>
        <p className="iso-normas">
          <strong>Norma principal:</strong> {meta.normaPrincipal}
        </p>
      </header>

      {/* ============ INTRODUCCIÓN ============ */}
      <div className="iso-bloque">
        <div className="iso-subheader">
          <h3>{introduccion.titulo}</h3>
          <p>{introduccion.descripcion}</p>
        </div>

        <div className="iso-intro-grid">
          <div className="card iso-intro-card">
            <h4>Objetivo</h4>
            <p>{introduccion.objetivo}</p>
          </div>
          <div className="card iso-intro-card">
            <h4>Enfoque</h4>
            <p>{introduccion.enfoque}</p>
          </div>
          <div className="card iso-intro-card iso-intro-codexa">
            <h4>Aplicación en CODEXA</h4>
            <p>{introduccion.aplicacionCodexa}</p>
          </div>
        </div>
      </div>

      {/* ============ RESUMEN ANEXO A ============ */}
      <div className="iso-bloque">
        <div className="iso-subheader">
          <h3>{resumenAnexoA.titulo}</h3>
          <p>{resumenAnexoA.descripcion}</p>
        </div>

        <div className="iso-resumen">
          <div>
            <span className="iso-resumen-numero">{resumenAnexoA.totalControles}</span>
            <span className="iso-resumen-texto">Controles en el Anexo A</span>
          </div>
          <div>
            <span className="iso-resumen-numero">
              {controlesAplicados.totalSeleccionados}
            </span>
            <span className="iso-resumen-texto">Seleccionados para CODEXA</span>
          </div>
        </div>

        <div className="iso-categorias-grid">
          {resumenAnexoA.categorias.map((cat) => (
            <article
              key={cat.nombre}
              className="card iso-categoria-card"
              style={{ borderTop: `5px solid ${cat.color}` }}
            >
              <div className="iso-categoria-icono">{cat.icono}</div>
              <h4>{cat.nombre}</h4>
              <p className="iso-categoria-numero" style={{ color: cat.color }}>
                {cat.cantidad}
              </p>
              <p className="iso-categoria-label">controles</p>

              <ul className="iso-categoria-ejemplos">
                {cat.ejemplos.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      {/* ============ CONTROLES APLICADOS ============ */}
      <div className="iso-bloque">
        <div className="iso-subheader">
          <h3>{controlesAplicados.titulo}</h3>
          <p>{controlesAplicados.descripcion}</p>
        </div>

        <div className="iso-riesgos-list">
          {controlesAplicados.detalle.map((grupo) => (
            <article key={grupo.riesgo} className="card iso-riesgo-card">
              <div className="iso-riesgo-header">
                <span
                  className={`iso-riesgo-badge ${
                    grupo.nivelRiesgo.toLowerCase().includes("crítico")
                      ? "critico"
                      : grupo.nivelRiesgo.toLowerCase().includes("alto")
                      ? "alto"
                      : "medio"
                  }`}
                >
                  {grupo.nivelRiesgo}
                </span>
                <h4>{grupo.riesgo}</h4>
                <p className="iso-riesgo-activo">
                  <strong>Activo:</strong> {grupo.activo}
                </p>
              </div>

              <div className="iso-riesgo-controles">
                {grupo.controles.map((c) => (
                  <div key={c.codigo} className="iso-control-item">
                    <div className="iso-control-cabecera">
                      <span className="iso-control-codigo">{c.codigo}</span>
                      <span className="iso-control-categoria">{c.categoria}</span>
                    </div>
                    <h5>{c.nombre}</h5>
                    <p>{c.comoAyuda}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ============ ESTRUCTURA DE LA NORMA ============ */}
      <div className="iso-bloque">
        <div className="iso-subheader">
          <h3>{estructuraNorma.titulo}</h3>
          <p>{estructuraNorma.descripcion}</p>
        </div>

        <div className="iso-capitulos-grid">
          {estructuraNorma.capitulos.map((cap) => (
            <article key={cap.numero} className="card iso-capitulo-card">
              <div className="iso-capitulo-header">
                <span className="iso-capitulo-numero">
                  Cap. {cap.numero}
                </span>
                <span
                  className={`iso-capitulo-grupo grupo-${cap.grupo
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")}`}
                >
                  {cap.grupo}
                </span>
              </div>

              <h4>{cap.titulo}</h4>
              <p>{cap.descripcion}</p>

              <ul className="iso-capitulo-caracteristicas">
                {cap.caracteristicas.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>

              <p className="iso-capitulo-codexa">
                <strong>CODEXA:</strong> {cap.aplicacionCodexa}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* ============ CICLO PHVA ============ */}
      <div className="iso-bloque">
        <div className="iso-subheader">
          <h3>{cicloPHVA.titulo}</h3>
          <p>{cicloPHVA.descripcion}</p>
        </div>

        <div className="iso-phva-grid">
          {cicloPHVA.fases.map((fase) => (
            <article
              key={fase.nombre}
              className="card iso-phva-card"
              style={{ borderTop: `5px solid ${fase.color}` }}
            >
              <div className="iso-phva-icono">{fase.icono}</div>
              <h4 style={{ color: fase.color }}>{fase.nombre}</h4>
              <p>{fase.descripcion}</p>
              <p className="iso-phva-caps">
                <strong>Capítulos:</strong> {fase.capitulosRelacionados.join(", ")}
              </p>
              <p className="iso-phva-codexa">
                <strong>CODEXA:</strong> {fase.aplicacionCodexa}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* ============ INTEGRACIÓN OTRAS NORMAS ============ */}
      <div className="iso-bloque">
        <div className="iso-subheader">
          <h3>{integracionOtrasNormas.titulo}</h3>
          <p>{integracionOtrasNormas.descripcion}</p>
        </div>

        <div className="iso-tabla-contenedor">
          <table className="iso-tabla">
            <thead>
              <tr>
                <th>Norma</th>
                <th>Enfoque</th>
                <th>¿Certificable?</th>
                <th>Aporte</th>
              </tr>
            </thead>
            <tbody>
              {integracionOtrasNormas.cuadroComparativo.map((n) => (
                <tr key={n.norma}>
                  <td><strong>{n.norma}</strong></td>
                  <td>{n.enfoque}</td>
                  <td>
                    <span className={`iso-badge ${n.certificable ? "si" : "no"}`}>
                      {n.certificable ? "Sí" : "No"}
                    </span>
                  </td>
                  <td>{n.aporte}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}