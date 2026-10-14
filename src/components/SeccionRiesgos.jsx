import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { riesgos } from "../data/riesgos";
import "./styles/SeccionRiesgos.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

// ============================================================
// Configuración de niveles y ejes
// ============================================================
const niveles = ["Bajo", "Moderado", "Alto", "Crítico"];
const probabilidades = ["Baja", "Media", "Alta"];
const impactos = ["Medio", "Alto"];

const clasePorNivel = {
  Bajo: "bajo",
  Moderado: "medio",
  Alto: "alto",
  Crítico: "critico",
};

const clasePorNivelMatriz = {
  Bajo: "matriz-bajo",
  Moderado: "matriz-medio",
  Alto: "matriz-alto",
  Crítico: "matriz-critico",
};

const ordenNivel = { Bajo: 1, Moderado: 2, Alto: 3, Crítico: 4 };

function obtenerColor(variable, respaldo = "#888888") {
  if (typeof window === "undefined") return respaldo;
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim() || respaldo
  );
}

function conAlfa(color, alfa) {
  const coincidencia = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color);
  if (!coincidencia) return color;
  let hex = coincidencia[1];
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const canal = Math.round(alfa * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${hex}${canal}`;
}

const cantidadTexto = (n) => `${n} riesgo${n === 1 ? "" : "s"}`;

// ============================================================
// Componente principal
// ============================================================
export default function SeccionRiesgos() {
  const [fNivel, setFNivel] = useState("");
  const [fProbabilidad, setFProbabilidad] = useState("");
  const [fImpacto, setFImpacto] = useState("");
  const [fCategoria, setFCategoria] = useState("");
  const [buscar, setBuscar] = useState("");

  const consultaRef = useRef(null);
  const [, forzarTema] = useState(0);

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-color-scheme: dark)");
    const alCambiar = () => forzarTema((n) => n + 1);
    consulta.addEventListener("change", alCambiar);
    return () => consulta.removeEventListener("change", alCambiar);
  }, []);

  const alternar = (setter, valor) =>
    setter((actual) => (actual === valor ? "" : valor));

  const limpiarFiltros = () => {
    setFNivel("");
    setFProbabilidad("");
    setFImpacto("");
    setFCategoria("");
    setBuscar("");
  };

  // ============================================================
  // Filtrado con campos legacy (compatibles con el JSON)
  // ============================================================
  const listas = useMemo(() => {
    const texto = buscar.trim().toLowerCase();

    const aplicar = (omitir = []) =>
      riesgos.filter((riesgo) => {
        if (
          !omitir.includes("nivel") &&
          fNivel &&
          riesgo["Nivel de Riesgo"] !== fNivel
        )
          return false;

        if (
          !omitir.includes("probabilidad") &&
          fProbabilidad &&
          riesgo["Probabilidad"] !== fProbabilidad
        )
          return false;

        if (
          !omitir.includes("impacto") &&
          fImpacto &&
          riesgo["Impacto"] !== fImpacto
        )
          return false;

        if (
          !omitir.includes("categoria") &&
          fCategoria &&
          riesgo.categoria !== fCategoria
        )
          return false;

        if (!texto) return true;

        return [
          riesgo["N°"],
          riesgo["Riesgo"],
          riesgo["Descripción del riesgo"],
          riesgo["Consecuencia"],
          riesgo["Probabilidad"],
          riesgo["Impacto"],
          riesgo["Nivel de Riesgo"],
          riesgo.activoNombre,
          riesgo.categoria,
        ].some((valor) => String(valor ?? "").toLowerCase().includes(texto));
      });

    return {
      filtrados: aplicar(),
      paraNivel: aplicar(["nivel"]),
      paraProbabilidad: aplicar(["probabilidad"]),
      paraMatriz: aplicar(["probabilidad", "impacto"]),
    };
  }, [fNivel, fProbabilidad, fImpacto, fCategoria, buscar]);

  const { filtrados } = listas;

  const conteo = (nivel, lista = riesgos) =>
    lista.filter((r) => r["Nivel de Riesgo"] === nivel).length;

  const conteoProbabilidad = (probabilidad, lista = riesgos) =>
    lista.filter((r) => r["Probabilidad"] === probabilidad).length;

  const filtrosActivos = [
    fNivel && { clave: "nivel", texto: `Nivel: ${fNivel}`, quitar: () => setFNivel("") },
    fProbabilidad && {
      clave: "probabilidad",
      texto: `Probabilidad: ${fProbabilidad}`,
      quitar: () => setFProbabilidad(""),
    },
    fImpacto && { clave: "impacto", texto: `Impacto: ${fImpacto}`, quitar: () => setFImpacto("") },
    fCategoria && {
      clave: "categoria",
      texto: `Categoría: ${fCategoria}`,
      quitar: () => setFCategoria(""),
    },
    buscar.trim() && {
      clave: "buscar",
      texto: `Búsqueda: “${buscar.trim()}”`,
      quitar: () => setBuscar(""),
    },
  ].filter(Boolean);

  const verTabla = () =>
    consultaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // ============================================================
  // Gráficos
  // ============================================================
  const coloresNivel = {
    Bajo: obtenerColor("--risk-low"),
    Moderado: obtenerColor("--risk-medium"),
    Alto: obtenerColor("--risk-high"),
    Crítico: obtenerColor("--risk-critical"),
  };

  const coloresProbabilidad = {
    Baja: obtenerColor("--risk-low"),
    Media: obtenerColor("--risk-medium"),
    Alta: obtenerColor("--risk-high"),
  };

  const colorAcento = obtenerColor("--accent");

  const nivelesData = {
    labels: niveles,
    datasets: [
      {
        label: "Cantidad de riesgos",
        data: niveles.map((nivel) => conteo(nivel, listas.paraNivel)),
        backgroundColor: niveles.map((nivel) =>
          fNivel && nivel !== fNivel
            ? conAlfa(coloresNivel[nivel], 0.3)
            : coloresNivel[nivel]
        ),
        borderColor: niveles.map((nivel) =>
          nivel === fNivel ? colorAcento : "transparent"
        ),
        borderWidth: 2,
        borderRadius: 7,
        borderSkipped: false,
        maxBarThickness: 52,
      },
    ],
  };

  const probabilidadesData = {
    labels: probabilidades,
    datasets: [
      {
        label: "Riesgos por probabilidad",
        data: probabilidades.map((p) =>
          conteoProbabilidad(p, listas.paraProbabilidad)
        ),
        backgroundColor: probabilidades.map((p) =>
          fProbabilidad && p !== fProbabilidad
            ? conAlfa(coloresProbabilidad[p], 0.3)
            : coloresProbabilidad[p]
        ),
        borderColor: obtenerColor("--bg"),
        borderWidth: 3,
        hoverOffset: 7,
        offset: probabilidades.map((p) => (p === fProbabilidad ? 12 : 0)),
      },
    ],
  };

  const alPasarCursor = (evento, elementos) => {
    const lienzo = evento.native?.target;
    if (lienzo) lienzo.style.cursor = elementos.length ? "pointer" : "default";
  };

  const opcionesBarras = {
    responsive: true,
    maintainAspectRatio: false,
    onHover: alPasarCursor,
    onClick: (_, elementos) => {
      if (elementos.length) alternar(setFNivel, niveles[elementos[0].index]);
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${cantidadTexto(ctx.parsed.y)}`,
          footer: () => "Clic para filtrar",
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: obtenerColor("--text") },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { precision: 0, color: obtenerColor("--text") },
        grid: { color: obtenerColor("--border") },
        border: { display: false },
      },
    },
  };

  const opcionesDona = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    onHover: alPasarCursor,
    onClick: (_, elementos) => {
      if (elementos.length)
        alternar(setFProbabilidad, probabilidades[elementos[0].index]);
    },
    plugins: {
      legend: {
        position: "bottom",
        onClick: (_, item) =>
          alternar(setFProbabilidad, probabilidades[item.index]),
        labels: {
          color: obtenerColor("--text"),
          padding: 18,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${cantidadTexto(ctx.parsed)}`,
          footer: () => "Clic para filtrar",
        },
      },
    },
  };

  // ============================================================
  // KPIs
  // ============================================================
  const kpis = [
    {
      nivel: null,
      clase: "kpi-total",
      titulo: "Total de riesgos",
      valor: riesgos.length,
      detalle: "Riesgos identificados",
    },
    {
      nivel: "Crítico",
      clase: "kpi-critico",
      titulo: "Críticos",
      valor: conteo("Crítico"),
      detalle: "Atención prioritaria",
    },
    {
      nivel: "Alto",
      clase: "kpi-alto",
      titulo: "Altos",
      valor: conteo("Alto"),
      detalle: "Requieren tratamiento",
    },
    {
      nivel: "Moderado",
      clase: "kpi-medio",
      titulo: "Moderados",
      valor: conteo("Moderado"),
      detalle: "Requieren seguimiento",
    },
  ];

  // ============================================================
  // Categorías únicas para el filtro
  // ============================================================
  const categorias = useMemo(
    () => [...new Set(riesgos.map((r) => r.categoria).filter(Boolean))],
    []
  );

  // ============================================================
  // Render
  // ============================================================
  return (
    <section id="riesgos" className="seccion-riesgos">
      <header className="riesgos-header">
        <span className="riesgos-etiqueta">04 · Evaluación y tratamiento</span>
        <h2>Gestión de Riesgos</h2>
        <p>
          Identificación, análisis y evaluación de amenazas que pueden
          afectar los activos de información de la organización. Explora la
          matriz y los gráficos para examinar su nivel de exposición.
        </p>
      </header>

      {/* KPIs */}
      <div className="riesgos-kpi-grid">
        {kpis.map((kpi) => {
          const esFiltro = kpi.nivel !== null;
          const seleccionado = esFiltro && fNivel === kpi.nivel;
          return (
            <button
              type="button"
              key={kpi.clase}
              className={`riesgo-kpi ${kpi.clase} es-filtro`}
              aria-pressed={esFiltro ? seleccionado : undefined}
              title={
                esFiltro
                  ? `Filtrar por nivel ${kpi.nivel}`
                  : "Quitar todos los filtros"
              }
              onClick={() =>
                esFiltro ? alternar(setFNivel, kpi.nivel) : limpiarFiltros()
              }
            >
              <span className="kpi-top">
                <span className="riesgo-kpi-titulo">{kpi.titulo}</span>
                <span className="kpi-punto" aria-hidden="true" />
              </span>
              <strong className="riesgo-kpi-numero">{kpi.valor}</strong>
              <span className="riesgo-kpi-detalle">{kpi.detalle}</span>
            </button>
          );
        })}
      </div>

      {/* Panorama */}
      <div className="riesgos-bloque">
        <div className="riesgos-subheader">
          <h3>Panorama de riesgos</h3>
          <p>
            Haz clic en una celda de la matriz, una barra o un segmento del
            gráfico para filtrar los riesgos de la tabla. Vuelve a hacer
            clic para quitar la selección.
          </p>
        </div>

        {filtrosActivos.length > 0 && (
          <div className="riesgos-panorama-barra">
            <div className="riesgos-chips" aria-label="Filtros activos">
              {filtrosActivos.map((filtro) => (
                <button
                  type="button"
                  key={filtro.clave}
                  className="riesgos-chip"
                  onClick={filtro.quitar}
                >
                  {filtro.texto}
                </button>
              ))}
            </div>

            <button type="button" className="riesgos-accion" onClick={verTabla}>
              Ver {filtrados.length} en la tabla
            </button>
          </div>
        )}

        <div className="riesgos-panorama">
          <MatrizRiesgos
            lista={listas.paraMatriz}
            fProbabilidad={fProbabilidad}
            fImpacto={fImpacto}
            onFila={(probabilidad) => alternar(setFProbabilidad, probabilidad)}
            onColumna={(impacto) => alternar(setFImpacto, impacto)}
            onCelda={(probabilidad, impacto) => {
              const seleccionada =
                fProbabilidad === probabilidad && fImpacto === impacto;
              setFProbabilidad(seleccionada ? "" : probabilidad);
              setFImpacto(seleccionada ? "" : impacto);
            }}
          />

          <article className="riesgo-grafico-card">
            <h4>Riesgos por nivel</h4>
            <div className="riesgo-grafico">
              <Bar
                data={nivelesData}
                options={opcionesBarras}
                role="img"
                aria-label="Gráfico de barras de riesgos por nivel."
              />
            </div>
          </article>

          <article className="riesgo-grafico-card">
            <h4>Riesgos por probabilidad</h4>
            <div className="riesgo-grafico riesgo-grafico-dona">
              <Doughnut
                data={probabilidadesData}
                options={opcionesDona}
                role="img"
                aria-label="Gráfico de dona de riesgos por probabilidad."
              />
            </div>
          </article>
        </div>
      </div>

      {/* Consulta */}
      <div className="riesgos-bloque" ref={consultaRef}>
        <div className="riesgos-subheader">
          <h3>Consultar riesgos</h3>
          <p>
            Filtra los registros por nivel, probabilidad, impacto, categoría
            o palabras clave.
          </p>
        </div>

        <div className="riesgos-filtros">
          <label>
            <span>Nivel</span>
            <select value={fNivel} onChange={(e) => setFNivel(e.target.value)}>
              <option value="">Todos</option>
              {[...niveles].reverse().map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Probabilidad</span>
            <select
              value={fProbabilidad}
              onChange={(e) => setFProbabilidad(e.target.value)}
            >
              <option value="">Todas</option>
              {probabilidades.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Impacto</span>
            <select
              value={fImpacto}
              onChange={(e) => setFImpacto(e.target.value)}
            >
              <option value="">Todos</option>
              {impactos.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Categoría</span>
            <select
              value={fCategoria}
              onChange={(e) => setFCategoria(e.target.value)}
            >
              <option value="">Todas</option>
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="riesgos-busqueda">
            <span>Buscar</span>
            <input
              type="search"
              placeholder="Riesgo, activo, categoría…"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="riesgos-limpiar"
            onClick={limpiarFiltros}
          >
            Limpiar
          </button>
        </div>

        <div className="riesgos-tabla-info" aria-live="polite">
          <span>
            Mostrando <strong>{filtrados.length}</strong> de{" "}
            <strong>{riesgos.length}</strong> riesgos
          </span>
        </div>

        <div className="riesgos-tabla-contenedor">
          <table className="riesgos-tabla">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Riesgo</th>
                <th scope="col">Activo afectado</th>
                <th scope="col">Descripción</th>
                <th scope="col">Probabilidad</th>
                <th scope="col">Impacto</th>
                <th scope="col">Nivel</th>
                <th scope="col">Categoría</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((riesgo) => {
                const nivel = riesgo["Nivel de Riesgo"];
                const claseNivel = clasePorNivel[nivel] ?? "medio";

                return (
                  <tr key={riesgo.id ?? riesgo["N°"]}>
                    <td className="riesgo-id">#{riesgo["N°"]}</td>
                    <td className="riesgo-nombre">{riesgo["Riesgo"]}</td>
                    <td>{riesgo.activoNombre ?? "—"}</td>
                    <td>{riesgo["Descripción del riesgo"]}</td>
                    <td>
                      <span
                        className={`riesgo-chip chip-prob-${riesgo[
                          "Probabilidad"
                        ].toLowerCase()}`}
                      >
                        {riesgo["Probabilidad"]}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`riesgo-chip chip-imp-${riesgo[
                          "Impacto"
                        ].toLowerCase()}`}
                      >
                        {riesgo["Impacto"]}
                      </span>
                    </td>
                    <td>
                      <span className={`riesgo-badge riesgo-${claseNivel}`}>
                        {nivel}
                      </span>
                    </td>
                    <td>
                      {riesgo.categoria && (
                        <span className={`riesgo-categoria cat-${riesgo.categoria.toLowerCase()}`}>
                          {riesgo.categoria}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={8} className="riesgos-vacio">
                    No se encontraron riesgos con esos criterios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Matriz de riesgos
// ============================================================
function MatrizRiesgos({
  lista,
  fProbabilidad,
  fImpacto,
  onFila,
  onColumna,
  onCelda,
}) {
  const hayCeldaActiva = Boolean(fProbabilidad || fImpacto);

  return (
    <div className="riesgos-matriz-contenedor">
      <div className="riesgos-matriz">
        <div className="matriz-celda matriz-esquina">
          <span className="matriz-eje-y">Probabilidad</span>
          <span className="matriz-eje-x">Impacto</span>
        </div>

        {impactos.map((impacto) => (
          <button
            type="button"
            key={`impacto-${impacto}`}
            className="matriz-celda matriz-encabezado"
            aria-pressed={fImpacto === impacto}
            title={`Filtrar por impacto ${impacto}`}
            onClick={() => onColumna(impacto)}
          >
            {impacto}
          </button>
        ))}

        {probabilidades.map((probabilidad) => (
          <Fragment key={probabilidad}>
            <button
              type="button"
              className="matriz-celda matriz-encabezado matriz-encabezado-fila"
              aria-pressed={fProbabilidad === probabilidad}
              title={`Filtrar por probabilidad ${probabilidad}`}
              onClick={() => onFila(probabilidad)}
            >
              {probabilidad}
            </button>

            {impactos.map((impacto) => {
              const riesgosCelda = lista.filter(
                (riesgo) =>
                  riesgo["Probabilidad"] === probabilidad &&
                  riesgo["Impacto"] === impacto
              );

              const nivelesPresentes = [
                ...new Set(riesgosCelda.map((r) => r["Nivel de Riesgo"])),
              ].sort((a, b) => ordenNivel[b] - ordenNivel[a]);

              const nivelPrincipal = nivelesPresentes[0] ?? null;
              const claseNivel = nivelPrincipal
                ? clasePorNivelMatriz[nivelPrincipal]
                : "matriz-vacia";

              const seleccionada =
                fProbabilidad === probabilidad && fImpacto === impacto;

              const atenuada =
                hayCeldaActiva &&
                ((fProbabilidad && fProbabilidad !== probabilidad) ||
                  (fImpacto && fImpacto !== impacto));

              return (
                <button
                  type="button"
                  key={`${probabilidad}-${impacto}`}
                  className={`matriz-celda matriz-dato ${claseNivel} ${
                    atenuada ? "matriz-atenuada" : ""
                  }`}
                  disabled={riesgosCelda.length === 0}
                  aria-pressed={seleccionada}
                  aria-label={`Probabilidad ${probabilidad}, impacto ${impacto}: ${cantidadTexto(
                    riesgosCelda.length
                  )}`}
                  onClick={() => onCelda(probabilidad, impacto)}
                >
                  <strong className="matriz-numero">
                    {riesgosCelda.length || "—"}
                  </strong>

                  {nivelesPresentes.length > 0 && (
                    <span className="matriz-etiqueta">
                      {nivelesPresentes.join(" / ")}
                    </span>
                  )}

                  {riesgosCelda.length > 0 && (
                    <span className="matriz-detalle" role="tooltip">
                      <strong>
                        {cantidadTexto(riesgosCelda.length)} · clic para
                        filtrar
                      </strong>
                      {riesgosCelda.slice(0, 4).map((riesgo) => (
                        <span
                          key={riesgo.id ?? riesgo["N°"]}
                          className="matriz-detalle-item"
                        >
                          #{riesgo["N°"]} {riesgo["Riesgo"]}
                        </span>
                      ))}
                      {riesgosCelda.length > 4 && (
                        <span className="matriz-detalle-item">
                          y {riesgosCelda.length - 4} más…
                        </span>
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </Fragment>
        ))}
      </div>

      <div className="matriz-leyenda">
        {niveles.map((nivel) => (
          <div key={nivel} className="matriz-leyenda-item">
            <span className={`matriz-punto matriz-punto-${clasePorNivel[nivel]}`} />
            <span>{nivel}</span>
          </div>
        ))}
      </div>

      <p className="matriz-nota">
        Cada celda muestra la cantidad de riesgos con esa probabilidad e
        impacto; si hay distintos niveles, se muestran todos. Los conteos
        respetan el nivel, la categoría y la búsqueda aplicados.
      </p>
    </div>
  );
}