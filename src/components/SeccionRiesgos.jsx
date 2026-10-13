import { Fragment, useMemo, useState } from "react";
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

const niveles = ["Bajo", "Medio", "Alto", "Crítico"];
const probabilidades = ["Baja", "Media", "Alta"];
const impactos = ["Medio", "Alto"];

const clasePorNivel = {
  Bajo: "bajo",
  Medio: "medio",
  Alto: "alto",
  Crítico: "critico",
};

const ordenNivel = { "Bajo": 1, "Medio": 2, "Alto": 3, "Crítico": 4 };

function obtenerColor(variable, respaldo = "#888888") {
  if (typeof window === "undefined") return respaldo;

  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim() || respaldo
  );
}

export default function SeccionRiesgos() {
  const [fNivel, setFNivel] = useState("");
  const [fProbabilidad, setFProbabilidad] = useState("");
  const [fImpacto, setFImpacto] = useState("");
  const [buscar, setBuscar] = useState("");

  const filtrados = useMemo(() => {
    const texto = buscar.trim().toLowerCase();

    return riesgos.filter((riesgo) => {
      const coincideNivel = !fNivel || riesgo["Nivel de Riesgo"] === fNivel;
      const coincideProbabilidad =
        !fProbabilidad || riesgo["Probabilidad"] === fProbabilidad;
      const coincideImpacto =
        !fImpacto || riesgo["Impacto"] === fImpacto;

      const coincideBusqueda =
        !texto ||
        [
          riesgo["N°"],
          riesgo["Riesgo"],
          riesgo["Descripción del riesgo"],
          riesgo["Consecuencia"],
          riesgo["Probabilidad"],
          riesgo["Impacto"],
          riesgo["Nivel de Riesgo"],
        ].some((valor) =>
          String(valor ?? "").toLowerCase().includes(texto)
        );

      return (
        coincideNivel &&
        coincideProbabilidad &&
        coincideImpacto &&
        coincideBusqueda
      );
    });
  }, [fNivel, fProbabilidad, fImpacto, buscar]);

  const conteo = (nivel, lista = riesgos) =>
    lista.filter((riesgo) => riesgo["Nivel de Riesgo"] === nivel).length;

  const conteoProbabilidad = (probabilidad, lista = riesgos) =>
    lista.filter((riesgo) => riesgo["Probabilidad"] === probabilidad).length;

  const coloresNivel = {
    Bajo: obtenerColor("--risk-low"),
    Medio: obtenerColor("--risk-medium"),
    Alto: obtenerColor("--risk-high"),
    Crítico: obtenerColor("--risk-critical"),
  };

  const coloresProbabilidad = [
    obtenerColor("--risk-low"),
    obtenerColor("--risk-medium"),
    obtenerColor("--risk-high"),
  ];

  const nivelesData = {
    labels: niveles,
    datasets: [
      {
        label: "Cantidad de riesgos",
        data: niveles.map((nivel) => conteo(nivel, filtrados)),
        backgroundColor: niveles.map((nivel) => coloresNivel[nivel]),
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
        data: probabilidades.map((probabilidad) =>
          conteoProbabilidad(probabilidad, filtrados)
        ),
        backgroundColor: coloresProbabilidad,
        borderColor: obtenerColor("--bg"),
        borderWidth: 3,
        hoverOffset: 7,
      },
    ],
  };

  const opcionesBarras = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
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
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: obtenerColor("--text"),
          padding: 18,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  return (
    <section id="riesgos" className="seccion-riesgos">
      <header className="riesgos-header">
        <span className="riesgos-etiqueta">
          04 · Evaluación y tratamiento
        </span>
        <h2>Gestión de Riesgos</h2>
        <p>
          Identificación, análisis y evaluación de amenazas que pueden
          afectar los activos de información de la organización.
          Consulta los riesgos y examina su nivel de exposición.
        </p>
      </header>

      {/* KPIs */}
      <div className="riesgos-kpi-grid">
        <article className="riesgo-kpi kpi-total">
          <div className="kpi-top">
            <span className="riesgo-kpi-titulo">Total de riesgos</span>
            <span className="kpi-punto" aria-hidden="true" />
          </div>
          <strong className="riesgo-kpi-numero">{riesgos.length}</strong>
          <span className="riesgo-kpi-detalle">Riesgos identificados</span>
        </article>

        <article className="riesgo-kpi kpi-critico">
          <div className="kpi-top">
            <span className="riesgo-kpi-titulo">Críticos</span>
            <span className="kpi-punto" aria-hidden="true" />
          </div>
          <strong className="riesgo-kpi-numero">{conteo("Crítico")}</strong>
          <span className="riesgo-kpi-detalle">Atención prioritaria</span>
        </article>

        <article className="riesgo-kpi kpi-alto">
          <div className="kpi-top">
            <span className="riesgo-kpi-titulo">Altos</span>
            <span className="kpi-punto" aria-hidden="true" />
          </div>
          <strong className="riesgo-kpi-numero">{conteo("Alto")}</strong>
          <span className="riesgo-kpi-detalle">Requieren tratamiento</span>
        </article>

        <article className="riesgo-kpi kpi-medio">
          <div className="kpi-top">
            <span className="riesgo-kpi-titulo">Medios</span>
            <span className="kpi-punto" aria-hidden="true" />
          </div>
          <strong className="riesgo-kpi-numero">{conteo("Medio")}</strong>
          <span className="riesgo-kpi-detalle">Requieren seguimiento</span>
        </article>
      </div>

      {/* Consulta */}
      <div className="riesgos-bloque">
        <div className="riesgos-subheader">
          <h3>Consultar riesgos</h3>
          <p>
            Filtra los registros por nivel, probabilidad, impacto o
            palabras clave.
          </p>
        </div>

        <div className="riesgos-filtros">
          <label>
            <span>Nivel</span>
            <select
              value={fNivel}
              onChange={(e) => setFNivel(e.target.value)}
            >
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
              {probabilidades.map((probabilidad) => (
                <option key={probabilidad} value={probabilidad}>
                  {probabilidad}
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
              {impactos.map((impacto) => (
                <option key={impacto} value={impacto}>
                  {impacto}
                </option>
              ))}
            </select>
          </label>

          <label className="riesgos-busqueda">
            <span>Buscar</span>
            <input
              type="search"
              placeholder="Riesgo, descripción o consecuencia…"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="riesgos-limpiar"
            onClick={() => {
              setFNivel("");
              setFProbabilidad("");
              setFImpacto("");
              setBuscar("");
            }}
          >
            Limpiar
          </button>
        </div>

        <div className="riesgos-tabla-info">
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
                <th scope="col">Descripción</th>
                <th scope="col">Consecuencia</th>
                <th scope="col">Probabilidad</th>
                <th scope="col">Impacto</th>
                <th scope="col">Nivel</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((riesgo) => {
                const nivel = riesgo["Nivel de Riesgo"];
                const claseNivel = clasePorNivel[nivel] ?? "medio";

                return (
                  <tr key={riesgo["N°"]}>
                    <td className="riesgo-id">#{riesgo["N°"]}</td>
                    <td className="riesgo-nombre">{riesgo["Riesgo"]}</td>
                    <td>{riesgo["Descripción del riesgo"]}</td>
                    <td>{riesgo["Consecuencia"]}</td>
                    <td>
                      <span className={`riesgo-chip chip-prob-${riesgo["Probabilidad"].toLowerCase()}`}>
                        {riesgo["Probabilidad"]}
                      </span>
                    </td>
                    <td>
                      <span className={`riesgo-chip chip-imp-${riesgo["Impacto"].toLowerCase()}`}>
                        {riesgo["Impacto"]}
                      </span>
                    </td>
                    <td>
                      <span className={`riesgo-badge riesgo-${claseNivel}`}>
                        {nivel}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={7} className="riesgos-vacio">
                    No se encontraron riesgos con esos criterios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Matriz */}
      <div className="riesgos-bloque">
        <div className="riesgos-subheader">
          <h3>Matriz de riesgos</h3>
          <p>
            Distribución de los riesgos según las categorías de
            probabilidad e impacto registradas.
          </p>
        </div>

        <MatrizRiesgos />
      </div>

      {/* Gráficos */}
      <div className="riesgos-bloque">
        <div className="riesgos-subheader">
          <h3>Resumen estadístico</h3>
          <p>Los gráficos se actualizan según los filtros aplicados.</p>
        </div>

        <div className="riesgos-graficos">
          <article className="riesgo-grafico-card">
            <h4>Riesgos por nivel</h4>
            <div className="riesgo-grafico">
              <Bar data={nivelesData} options={opcionesBarras} />
            </div>
          </article>

          <article className="riesgo-grafico-card">
            <h4>Riesgos por probabilidad</h4>
            <div className="riesgo-grafico riesgo-grafico-dona">
              <Doughnut data={probabilidadesData} options={opcionesDona} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function MatrizRiesgos() {
  const clasePorNivelMatriz = {
    Bajo: "matriz-bajo",
    Medio: "matriz-medio",
    Alto: "matriz-alto",
    Crítico: "matriz-critico",
  };

  return (
    <div className="riesgos-matriz-contenedor">
      <div className="riesgos-matriz">
        <div className="matriz-celda matriz-esquina">
          <span className="matriz-eje-y">Probabilidad</span>
          <span className="matriz-eje-x">Impacto</span>
        </div>

        {impactos.map((impacto) => (
          <div
            key={`impacto-${impacto}`}
            className="matriz-celda matriz-encabezado"
          >
            {impacto}
          </div>
        ))}

        {probabilidades.map((probabilidad) => (
          <Fragment key={probabilidad}>
            <div className="matriz-celda matriz-encabezado matriz-encabezado-fila">
              {probabilidad}
            </div>

            {impactos.map((impacto) => {
              const riesgosCelda = riesgos.filter(
                (riesgo) =>
                  riesgo["Probabilidad"] === probabilidad &&
                  riesgo["Impacto"] === impacto
              );

              const nivelesPresentes = [
                ...new Set(
                  riesgosCelda.map((r) => r["Nivel de Riesgo"])
                ),
              ].sort((a, b) => ordenNivel[b] - ordenNivel[a]);

              const nivelPrincipal = nivelesPresentes[0] ?? null;
              const claseNivel = nivelPrincipal
                ? clasePorNivelMatriz[nivelPrincipal]
                : "matriz-vacia";

              return (
                <div
                  key={`${probabilidad}-${impacto}`}
                  className={`matriz-celda matriz-dato ${claseNivel}`}
                  title={
                    `Probabilidad: ${probabilidad}; ` +
                    `impacto: ${impacto}; ` +
                    `riesgos: ${riesgosCelda.length}; ` +
                    `niveles: ${nivelesPresentes.join(", ") || "Sin registros"}`
                  }
                >
                  <strong className="matriz-numero">
                    {riesgosCelda.length || "—"}
                  </strong>
                  {nivelesPresentes.length > 0 && (
                    <span className="matriz-etiqueta">
                      {nivelesPresentes.join(" / ")}
                    </span>
                  )}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>

      <div className="matriz-leyenda">
        {niveles.map((nivel) => (
          <div key={nivel} className="matriz-leyenda-item">
            <span
              className={`matriz-punto matriz-punto-${clasePorNivel[nivel]}`}
            />
            <span>{nivel}</span>
          </div>
        ))}
      </div>

      <p className="matriz-nota">
        Cada celda muestra la cantidad de riesgos que coinciden con la
        probabilidad y el impacto indicados. Si una combinación contiene
        distintos niveles, se muestran todos.
      </p>
    </div>
  );
}