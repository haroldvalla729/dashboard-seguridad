import { useMemo, useRef, useState } from "react";
import { controlesISO } from "../data/iso27001";
import "./styles/SeccionISO.css";

/* ------------------------------------------------------------
   Utilidades
   ------------------------------------------------------------ */
const normalizar = (texto) =>
  String(texto ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const nivelDe = (texto) => {
  const t = normalizar(texto);
  if (t.includes("critico")) return "critico";
  if (t.includes("alto")) return "alto";
  return "medio";
};

const ETIQUETA_NIVEL = { critico: "Crítico", alto: "Alto", medio: "Medio" };

const plural = (n, singular, pluralTexto) =>
  `${n} ${n === 1 ? singular : pluralTexto}`;

/* Todos los números que aparecen en un texto ("Cap. 4", "4, 5" → [4, 5]) */
const numerosDe = (valor) => String(valor ?? "").match(/\d+/g) ?? [];

/* Alterna un id dentro de un Set de React sin mutar el estado */
const alternarEnSet = (setEstado, id) =>
  setEstado((previo) => {
    const nuevo = new Set(previo);
    if (nuevo.has(id)) {
      nuevo.delete(id);
    } else {
      nuevo.add(id);
    }
    return nuevo;
  });

const VISTAS = [
  { id: "general", titulo: "Visión general", sub: "Objetivo y Anexo A" },
  { id: "controles", titulo: "Controles aplicados", sub: "Por riesgo de CODEXA" },
  { id: "norma", titulo: "Estructura y PHVA", sub: "Capítulos de la norma" },
  { id: "integracion", titulo: "Otras normas", sub: "Integración" },
];

/* ============================================================
   Componente principal
   ============================================================ */
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

  const [vista, setVista] = useState("general");
  // Categoría de control elegida desde "Visión general" (filtra la vista de controles)
  const [filtroCat, setFiltroCat] = useState(null);
  const raiz = useRef(null);

  const irA = (id) => {
    setVista(id);
    raiz.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const alTeclear = (e, indice) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const paso = e.key === "ArrowRight" ? 1 : -1;
    const siguiente = VISTAS[(indice + paso + VISTAS.length) % VISTAS.length];
    setVista(siguiente.id);
    document.getElementById(`iso-tab-${siguiente.id}`)?.focus();
  };

  return (
    <section id="iso" className="seccion-iso" ref={raiz}>
      {/* ============ HEADER ============ */}
      <header className="iso-header">
        <span className="iso-etiqueta">03 · MARCO DE SEGURIDAD</span>
        <h2>{meta.seccion} — Controles Aplicados</h2>
        <p>{meta.descripcion}</p>
        <p className="iso-normas">
          <strong>Norma principal:</strong> {meta.normaPrincipal}
        </p>
      </header>

      {/* ============ PESTAÑAS ============ */}
      <div className="iso-tabs" role="tablist" aria-label="Contenido de ISO 27001">
        {VISTAS.map((v, indice) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            id={`iso-tab-${v.id}`}
            aria-selected={vista === v.id}
            aria-controls={`iso-panel-${v.id}`}
            tabIndex={vista === v.id ? 0 : -1}
            className="iso-tab"
            onClick={() => setVista(v.id)}
            onKeyDown={(e) => alTeclear(e, indice)}
          >
            <span className="iso-tab-numero">{indice + 1}</span>
            <span className="iso-tab-texto">
              <strong>{v.titulo}</strong>
              <small>{v.sub}</small>
            </span>
          </button>
        ))}
      </div>

      {/* ============ VISTAS ============ */}
      <div
        key={vista}
        className="iso-vista"
        role="tabpanel"
        id={`iso-panel-${vista}`}
        aria-labelledby={`iso-tab-${vista}`}
      >
        {vista === "general" && (
          <VistaGeneral
            introduccion={introduccion}
            resumenAnexoA={resumenAnexoA}
            controlesAplicados={controlesAplicados}
            onVerControles={(categoria) => {
              setFiltroCat(categoria);
              irA("controles");
            }}
          />
        )}

        {vista === "controles" && (
          <VistaControles
            datos={controlesAplicados}
            filtroCat={filtroCat}
            setFiltroCat={setFiltroCat}
          />
        )}

        {vista === "norma" && (
          <VistaNorma estructuraNorma={estructuraNorma} cicloPHVA={cicloPHVA} />
        )}

        {vista === "integracion" && (
          <VistaIntegracion datos={integracionOtrasNormas} />
        )}
      </div>
    </section>
  );
}

/* ============================================================
   1 · Visión general: introducción + categorías del Anexo A
   ============================================================ */
function VistaGeneral({ introduccion, resumenAnexoA, controlesAplicados, onVerControles }) {
  const [seleccion, setSeleccion] = useState(0);

  // Controles únicos aplicados por categoría (a partir del detalle por riesgo)
  const aplicadosPorCategoria = useMemo(() => {
    const mapa = new Map();
    controlesAplicados.detalle.forEach((g) =>
      g.controles.forEach((c) => {
        if (!mapa.has(c.categoria)) mapa.set(c.categoria, new Set());
        mapa.get(c.categoria).add(c.codigo);
      })
    );
    return mapa;
  }, [controlesAplicados]);

  // Empareja el nombre de la categoría del Anexo A con la del control
  const categoriaDeControl = (nombre) => {
    const n = normalizar(nombre);
    for (const clave of aplicadosPorCategoria.keys()) {
      const k = normalizar(clave);
      if (k === n || k.includes(n) || n.includes(k)) return clave;
    }
    return null;
  };

  const categorias = resumenAnexoA.categorias;
  const actual = categorias[seleccion] ?? categorias[0];
  const claveActual = categoriaDeControl(actual.nombre);
  const aplicadosActual = claveActual ? aplicadosPorCategoria.get(claveActual).size : 0;

  return (
    <>
      {/* Introducción */}
      <div className="iso-bloque">
        <div className="iso-subheader">
          <h3>{introduccion.titulo}</h3>
          <p>{introduccion.descripcion}</p>
        </div>

        <div className="iso-intro-grid">
          <div className="iso-intro-card" style={{ "--i": 0 }}>
            <h4>Objetivo</h4>
            <p>{introduccion.objetivo}</p>
          </div>
          <div className="iso-intro-card" style={{ "--i": 1 }}>
            <h4>Enfoque</h4>
            <p>{introduccion.enfoque}</p>
          </div>
          <div className="iso-intro-card iso-intro-codexa" style={{ "--i": 2 }}>
            <h4>Aplicación en CODEXA</h4>
            <p>{introduccion.aplicacionCodexa}</p>
          </div>
        </div>
      </div>

      {/* Anexo A */}
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
          {categorias.map((cat, indice) => {
            const activa = indice === seleccion;
            const porcentaje = Math.round(
              (cat.cantidad / resumenAnexoA.totalControles) * 100
            );

            return (
              <button
                key={cat.nombre}
                type="button"
                className={`iso-categoria-card ${activa ? "activa" : ""}`}
                aria-pressed={activa}
                style={{ "--iso-color": cat.color, "--i": indice }}
                onClick={() => setSeleccion(indice)}
              >
                <span className="iso-categoria-icono" aria-hidden="true">
                  {cat.icono}
                </span>
                <span className="iso-categoria-nombre">{cat.nombre}</span>
                <span className="iso-categoria-numero">{cat.cantidad}</span>
                <span className="iso-categoria-label">
                  controles · {porcentaje}% del anexo
                </span>
                <span className="iso-categoria-barra" aria-hidden="true">
                  <span style={{ width: `${porcentaje}%` }} />
                </span>
              </button>
            );
          })}
        </div>

        {/* Detalle de la categoría elegida (un solo panel: sin saltos de altura) */}
        <div
          className="iso-categoria-detalle"
          style={{ "--iso-color": actual.color }}
          aria-live="polite"
        >
          <div className="iso-categoria-detalle-cabecera">
            <div>
              <h4>{actual.nombre}</h4>
              <p>
                {plural(actual.cantidad, "control", "controles")} en el Anexo A
                {claveActual &&
                  ` · ${plural(aplicadosActual, "aplicado", "aplicados")} en CODEXA`}
              </p>
            </div>

            {claveActual && (
              <button
                type="button"
                className="iso-accion"
                onClick={() => onVerControles(claveActual)}
              >
                Ver controles aplicados →
              </button>
            )}
          </div>

          <p className="iso-etiqueta-lista">Ejemplos</p>
          <ul className="iso-categoria-ejemplos">
            {actual.ejemplos.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   2 · Controles aplicados: filtros + tarjetas por riesgo expandibles
   ============================================================ */
function VistaControles({ datos, filtroCat, setFiltroCat }) {
  const [nivel, setNivel] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [abiertos, setAbiertos] = useState(() => new Set());

  const grupos = useMemo(
    () => datos.detalle.map((g) => ({ ...g, nivel: nivelDe(g.nivelRiesgo) })),
    [datos]
  );

  const categorias = useMemo(
    () => [...new Set(datos.detalle.flatMap((g) => g.controles.map((c) => c.categoria)))],
    [datos]
  );

  const q = normalizar(busqueda.trim());

  // Primero categoría + búsqueda; el nivel se aplica después para poder contar por nivel
  const base = useMemo(
    () =>
      grupos
        .map((g) => {
          const coincideRiesgo = q && normalizar(`${g.riesgo} ${g.activo}`).includes(q);
          const controles = g.controles.filter(
            (c) =>
              (!filtroCat || c.categoria === filtroCat) &&
              (!q ||
                coincideRiesgo ||
                normalizar(`${c.codigo} ${c.nombre} ${c.comoAyuda}`).includes(q))
          );
          return { ...g, controlesVis: controles };
        })
        .filter((g) => g.controlesVis.length > 0),
    [grupos, filtroCat, q]
  );

  const visibles = base.filter((g) => nivel === "todos" || g.nivel === nivel);
  const cuenta = (n) => base.filter((g) => g.nivel === n).length;

  const todosAbiertos =
    visibles.length > 0 && visibles.every((g) => abiertos.has(g.riesgo));

  const alternarTodos = () =>
    setAbiertos((previo) => {
      const nuevo = new Set(previo);
      visibles.forEach((g) => (todosAbiertos ? nuevo.delete(g.riesgo) : nuevo.add(g.riesgo)));
      return nuevo;
    });

  const hayFiltros = nivel !== "todos" || busqueda || filtroCat;
  const limpiar = () => {
    setNivel("todos");
    setBusqueda("");
    setFiltroCat(null);
  };

  return (
    <div className="iso-bloque">
      <div className="iso-subheader">
        <h3>{datos.titulo}</h3>
        <p>{datos.descripcion}</p>
      </div>

      {/* Barra de filtros */}
      <div className="iso-toolbar">
        <input
          type="search"
          className="iso-buscador"
          placeholder="Buscar riesgo, activo o control…"
          aria-label="Buscar riesgo, activo o control"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <div className="iso-chips" role="group" aria-label="Filtrar por nivel de riesgo">
          <button
            type="button"
            className={`iso-chip ${nivel === "todos" ? "activo" : ""}`}
            aria-pressed={nivel === "todos"}
            onClick={() => setNivel("todos")}
          >
            Todos <b>{base.length}</b>
          </button>
          {Object.keys(ETIQUETA_NIVEL).map((n) => (
            <button
              key={n}
              type="button"
              className={`iso-chip nivel-${n} ${nivel === n ? "activo" : ""}`}
              aria-pressed={nivel === n}
              onClick={() => setNivel(nivel === n ? "todos" : n)}
            >
              {ETIQUETA_NIVEL[n]} <b>{cuenta(n)}</b>
            </button>
          ))}
        </div>

        <div className="iso-chips" role="group" aria-label="Filtrar por categoría de control">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`iso-chip ${filtroCat === cat ? "activo quitable" : ""}`}
              aria-pressed={filtroCat === cat}
              onClick={() => setFiltroCat(filtroCat === cat ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="iso-estado">
        <span aria-live="polite">
          {plural(visibles.length, "riesgo", "riesgos")} ·{" "}
          {plural(
            visibles.reduce((suma, g) => suma + g.controlesVis.length, 0),
            "control",
            "controles"
          )}
        </span>

        <span className="iso-estado-acciones">
          {hayFiltros && (
            <button type="button" className="iso-accion" onClick={limpiar}>
              Limpiar filtros
            </button>
          )}
          {visibles.length > 0 && (
            <button type="button" className="iso-accion" onClick={alternarTodos}>
              {todosAbiertos ? "Contraer todos" : "Expandir todos"}
            </button>
          )}
        </span>
      </div>

      {/* Tarjetas */}
      {visibles.length === 0 ? (
        <p className="iso-vacio">No hay riesgos que coincidan con los filtros.</p>
      ) : (
        <div className="iso-riesgos-grid">
          {visibles.map((g, indice) => {
            const abierto = abiertos.has(g.riesgo);
            const idPanel = `iso-riesgo-${indice}`;
            const codigos = g.controlesVis.map((c) => c.codigo);

            return (
              <article
                key={g.riesgo}
                className={`iso-riesgo-card nivel-${g.nivel} ${abierto ? "expandido" : ""}`}
                style={{ "--i": Math.min(indice, 8) }}
              >
                <h4 className="iso-riesgo-titulo">
                  <button
                    type="button"
                    className="iso-riesgo-cabecera"
                    aria-expanded={abierto}
                    aria-controls={idPanel}
                    onClick={() => alternarEnSet(setAbiertos, g.riesgo)}
                  >
                    <span className={`iso-riesgo-badge ${g.nivel}`}>{g.nivelRiesgo}</span>
                    <span className="iso-riesgo-nombre">{g.riesgo}</span>
                    <span className="iso-riesgo-activo">
                      <strong>Activo:</strong> {g.activo}
                    </span>

                    <span className="iso-codigos">
                      {codigos.slice(0, 4).map((c) => (
                        <span key={c} className="iso-control-codigo">
                          {c}
                        </span>
                      ))}
                      {codigos.length > 4 && (
                        <span className="iso-codigos-mas">+{codigos.length - 4}</span>
                      )}
                    </span>

                    <span className="iso-chevron" aria-hidden="true" />
                  </button>
                </h4>

                <div className="iso-panel" id={idPanel}>
                  <div>
                    <div className="iso-panel-cuerpo">
                      {g.controlesVis.map((c) => (
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
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   3 · Estructura de la norma + ciclo PHVA enlazados
   Elegir una fase resalta los capítulos relacionados.
   ============================================================ */
function VistaNorma({ estructuraNorma, cicloPHVA }) {
  const [faseSel, setFaseSel] = useState(null);
  const [grupo, setGrupo] = useState("todos");
  const [abiertos, setAbiertos] = useState(() => new Set());

  const fase = cicloPHVA.fases.find((f) => f.nombre === faseSel) ?? null;

  const capitulosFase = useMemo(
    () => new Set(fase ? fase.capitulosRelacionados.flatMap(numerosDe) : []),
    [fase]
  );

  const grupos = useMemo(
    () => [...new Set(estructuraNorma.capitulos.map((c) => c.grupo))],
    [estructuraNorma]
  );

  const capitulos = estructuraNorma.capitulos.filter(
    (c) => grupo === "todos" || c.grupo === grupo
  );

  const relacionado = (cap) => capitulosFase.has(numerosDe(cap.numero)[0]);
  const resaltando = fase && capitulosFase.size > 0;

  const todosAbiertos =
    capitulos.length > 0 && capitulos.every((c) => abiertos.has(String(c.numero)));

  const alternarTodos = () =>
    setAbiertos((previo) => {
      const nuevo = new Set(previo);
      capitulos.forEach((c) =>
        todosAbiertos ? nuevo.delete(String(c.numero)) : nuevo.add(String(c.numero))
      );
      return nuevo;
    });

  return (
    <>
      {/* PHVA */}
      <div className="iso-bloque">
        <div className="iso-subheader">
          <h3>{cicloPHVA.titulo}</h3>
          <p>{cicloPHVA.descripcion}</p>
        </div>

        <div className="iso-phva-pasos">
          {cicloPHVA.fases.map((f, indice) => {
            const activa = f.nombre === faseSel;
            return (
              <button
                key={f.nombre}
                type="button"
                className={`iso-phva-paso ${activa ? "activa" : ""}`}
                aria-pressed={activa}
                style={{ "--iso-color": f.color, "--i": indice }}
                onClick={() => setFaseSel(activa ? null : f.nombre)}
              >
                <span className="iso-phva-icono" aria-hidden="true">
                  {f.icono}
                </span>
                <span className="iso-phva-paso-texto">
                  <small>Fase {indice + 1}</small>
                  <strong>{f.nombre}</strong>
                </span>
              </button>
            );
          })}
        </div>

        <div
          className={`iso-phva-detalle ${fase ? "con-fase" : ""}`}
          style={fase ? { "--iso-color": fase.color } : undefined}
          aria-live="polite"
        >
          {fase ? (
            <>
              <p>{fase.descripcion}</p>
              <p className="iso-phva-caps">
                <strong>Capítulos:</strong> {fase.capitulosRelacionados.join(", ")}
              </p>
              <p className="iso-phva-codexa">
                <strong>CODEXA:</strong> {fase.aplicacionCodexa}
              </p>
            </>
          ) : (
            <p className="iso-phva-pista">
              Elige una fase del ciclo para ver su descripción y resaltar abajo los
              capítulos de la norma que le corresponden.
            </p>
          )}
        </div>
      </div>

      {/* Capítulos */}
      <div className="iso-bloque">
        <div className="iso-subheader">
          <h3>{estructuraNorma.titulo}</h3>
          <p>{estructuraNorma.descripcion}</p>
        </div>

        <div className="iso-toolbar">
          <div className="iso-chips" role="group" aria-label="Filtrar capítulos por grupo">
            <button
              type="button"
              className={`iso-chip ${grupo === "todos" ? "activo" : ""}`}
              aria-pressed={grupo === "todos"}
              onClick={() => setGrupo("todos")}
            >
              Todos <b>{estructuraNorma.capitulos.length}</b>
            </button>
            {grupos.map((g) => (
              <button
                key={g}
                type="button"
                className={`iso-chip ${grupo === g ? "activo" : ""}`}
                aria-pressed={grupo === g}
                onClick={() => setGrupo(grupo === g ? "todos" : g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="iso-estado">
          <span aria-live="polite">
            {plural(capitulos.length, "capítulo", "capítulos")}
            {resaltando && ` · resaltando fase "${fase.nombre}"`}
          </span>
          <span className="iso-estado-acciones">
            <button type="button" className="iso-accion" onClick={alternarTodos}>
              {todosAbiertos ? "Contraer todos" : "Expandir todos"}
            </button>
          </span>
        </div>

        <div className="iso-capitulos-grid">
          {capitulos.map((cap, indice) => {
            const id = String(cap.numero);
            const abierto = abiertos.has(id);
            const idPanel = `iso-capitulo-${id}`;
            const estado = resaltando ? (relacionado(cap) ? "relacionado" : "atenuada") : "";

            return (
              <article
                key={id}
                className={`iso-capitulo-card ${abierto ? "expandido" : ""} ${estado}`}
                style={{ "--i": Math.min(indice, 8), "--iso-color": fase?.color }}
              >
                <h4 className="iso-capitulo-titulo">
                  <button
                    type="button"
                    className="iso-capitulo-cabecera"
                    aria-expanded={abierto}
                    aria-controls={idPanel}
                    onClick={() => alternarEnSet(setAbiertos, id)}
                  >
                    <span className="iso-capitulo-numero">Cap. {cap.numero}</span>
                    <span className="iso-capitulo-grupo">{cap.grupo}</span>
                    <span className="iso-capitulo-nombre">{cap.titulo}</span>
                    <span className="iso-chevron" aria-hidden="true" />
                  </button>
                </h4>

                <div className="iso-panel" id={idPanel}>
                  <div>
                    <div className="iso-panel-cuerpo">
                      <p className="iso-capitulo-desc">{cap.descripcion}</p>

                      <ul className="iso-capitulo-caracteristicas">
                        {cap.caracteristicas.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>

                      <p className="iso-capitulo-codexa">
                        <strong>CODEXA:</strong> {cap.aplicacionCodexa}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   4 · Integración con otras normas
   ============================================================ */
function VistaIntegracion({ datos }) {
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");

  const q = normalizar(busqueda.trim());
  const base = datos.cuadroComparativo.filter(
    (n) => !q || normalizar(`${n.norma} ${n.enfoque} ${n.aporte}`).includes(q)
  );
  const filas = base.filter(
    (n) =>
      filtro === "todas" ||
      (filtro === "si" && n.certificable) ||
      (filtro === "no" && !n.certificable)
  );

  const opciones = [
    { id: "todas", texto: "Todas", n: base.length },
    { id: "si", texto: "Certificables", n: base.filter((n) => n.certificable).length },
    { id: "no", texto: "No certificables", n: base.filter((n) => !n.certificable).length },
  ];

  return (
    <div className="iso-bloque">
      <div className="iso-subheader">
        <h3>{datos.titulo}</h3>
        <p>{datos.descripcion}</p>
      </div>

      <div className="iso-toolbar">
        <input
          type="search"
          className="iso-buscador"
          placeholder="Buscar norma, enfoque o aporte…"
          aria-label="Buscar norma, enfoque o aporte"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <div className="iso-chips" role="group" aria-label="Filtrar por certificación">
          {opciones.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`iso-chip ${filtro === o.id ? "activo" : ""}`}
              aria-pressed={filtro === o.id}
              onClick={() => setFiltro(o.id)}
            >
              {o.texto} <b>{o.n}</b>
            </button>
          ))}
        </div>
      </div>

      {filas.length === 0 ? (
        <p className="iso-vacio">No hay normas que coincidan con los filtros.</p>
      ) : (
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
              {filas.map((n) => (
                <tr key={n.norma}>
                  <td>
                    <strong>{n.norma}</strong>
                  </td>
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
      )}
    </div>
  );
}