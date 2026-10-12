
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

import { riesgos, calcularNivel } from "../data/riesgos";
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

function obtenerColor(variable) {
  if (typeof window === "undefined") return "#888888";

  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim() || "#888888"
  );
}

export default function SeccionRiesgos() {
  const [fNivel, setFNivel] = useState("");
  const [fActivo, setFActivo] = useState("");
  const [buscar, setBuscar] = useState("");

  const activos = useMemo(
    () => [...new Set(riesgos.map((r) => r.activo))],
    []
  );

  const filtrados = useMemo(() => {
    const texto = buscar.trim().toLowerCase();

    return riesgos.filter(
      (r) =>
        (!fNivel || calcularNivel(r.prob, r.imp) === fNivel) &&
        (!fActivo || r.activo === fActivo) &&
        (!texto ||
          r.amenaza.toLowerCase().includes(texto) ||
          r.activo.toLowerCase().includes(texto) ||
          r.vuln.toLowerCase().includes(texto))
    );
  }, [fNivel, fActivo, buscar]);

  const conteo = (nivel, lista = riesgos) =>
    lista.filter(
      (r) => calcularNivel(r.prob, r.imp) === nivel
    ).length;

  const coloresNivel = {
    Bajo: obtenerColor("--risk-low"),
    Medio: obtenerColor("--risk-medium"),
    Alto: obtenerColor("--risk-high"),
    "Crítico": obtenerColor("--risk-critical"),
  };

  const nivelesData = useMemo(
    () => ({
      labels: niveles,
      datasets: [
        {
          label: "Cantidad de riesgos",
          data: niveles.map((n) => conteo(n, filtrados)),
          backgroundColor: niveles.map((n) => coloresNivel[n]),
          borderRadius: 7,
          borderSkipped: false,
          maxBarThickness: 52,
        },
      ],
    }),
    [filtrados]
  );

  const activosData = useMemo(
    () => ({
      labels: activos,
      datasets: [
        {
          label: "Riesgos por activo",
          data: activos.map(
            (activo) =>
              filtrados.filter((r) => r.activo === activo).length
          ),
          backgroundColor: [
            obtenerColor("--accent"),
            obtenerColor("--risk-low"),
            obtenerColor("--risk-medium"),
            obtenerColor("--risk-high"),
            obtenerColor("--risk-critical"),
          ],
          borderColor: obtenerColor("--bg"),
          borderWidth: 3,
          hoverOffset: 7,
        },
      ],
    }),
    [activos, filtrados]
  );

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
        ticks: {
          precision: 0,
          color: obtenerColor("--text"),
        },
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
          04 · EVALUACIÓN Y TRATAMIENTO
        </span>

        <h2>Gestión de Riesgos</h2>

        <p>
          Identificación, análisis y evaluación de amenazas que pueden
          afectar los activos de información de la organización.
          Consulta los riesgos y examina su nivel de exposición.
        </p>
      </header>

      <div className="riesgos-kpi-grid">
        <article className="riesgo-kpi">
          <span className="riesgo-kpi-titulo">Total de riesgos</span>
          <strong className="riesgo-kpi-numero">
            {riesgos.length}
          </strong>
          <span className="riesgo-kpi-detalle">
            Riesgos identificados
          </span>
        </article>

        <article className="riesgo-kpi">
          <span className="riesgo-kpi-titulo">Riesgos críticos</span>
          <strong className="riesgo-kpi-numero nivel-critico">
            {conteo("Crítico")}
          </strong>
          <span className="riesgo-kpi-detalle">
            Atención prioritaria
          </span>
        </article>

        <article className="riesgo-kpi">
          <span className="riesgo-kpi-titulo">Riesgos altos</span>
          <strong className="riesgo-kpi-numero nivel-alto">
            {conteo("Alto")}
          </strong>
          <span className="riesgo-kpi-detalle">
            Requieren tratamiento
          </span>
        </article>

        <article className="riesgo-kpi">
          <span className="riesgo-kpi-titulo">Riesgos medios</span>
          <strong className="riesgo-kpi-numero nivel-medio">
            {conteo("Medio")}
          </strong>
          <span className="riesgo-kpi-detalle">
            Requieren seguimiento
          </span>
        </article>
      </div>

      <div className="riesgos-bloque">
        <div className="riesgos-subheader">
          <h3>Consultar riesgos</h3>
          <p>
            Filtra los registros por nivel, activo o palabras clave.
          </p>
        </div>

        <div className="riesgos-filtros">
          <label>
            <span>Nivel de riesgo</span>
            <select
              value={fNivel}
              onChange={(e) => setFNivel(e.target.value)}
            >
              <option value="">Todos los niveles</option>
              {[...niveles].reverse().map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Activo tecnológico</span>
            <select
              value={fActivo}
              onChange={(e) => setFActivo(e.target.value)}
            >
              <option value="">Todos los activos</option>
              {activos.map((activo) => (
                <option key={activo} value={activo}>
                  {activo}
                </option>
              ))}
            </select>
          </label>

          <label className="riesgos-busqueda">
            <span>Buscar</span>
            <input
              type="search"
              placeholder="Amenaza, activo o vulnerabilidad..."
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="riesgos-limpiar"
            onClick={() => {
              setFNivel("");
              setFActivo("");
              setBuscar("");
            }}
          >
            Limpiar filtros
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
                <th>ID</th>
                <th>Activo</th>
                <th>Amenaza</th>
                <th>Vulnerabilidad</th>
                <th>Prob.</th>
                <th>Impacto</th>
                <th>Nivel</th>
              </tr>
            </thead>

            <tbody>
              {filtrados.map((riesgo) => {
                const nivel = calcularNivel(
                  riesgo.prob,
                  riesgo.imp
                );

                const claseNivel = {
                  Bajo: "bajo",
                  Medio: "medio",
                  Alto: "alto",
                  "Crítico": "critico",
                }[nivel];

                return (
                  <tr key={riesgo.id}>
                    <td className="riesgo-id">{riesgo.id}</td>
                    <td>{riesgo.activo}</td>
                    <td>{riesgo.amenaza}</td>
                    <td>{riesgo.vuln}</td>
                    <td>{riesgo.prob}</td>
                    <td>{riesgo.imp}</td>
                    <td>
                      <span
                        className={`riesgo-badge riesgo-${claseNivel}`}
                      >
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

      <div className="riesgos-bloque">
        <div className="riesgos-subheader">
          <h3>Matriz de riesgos</h3>
          <p>
            Distribución de riesgos según la probabilidad y el impacto,
            en una escala del 1 al 5.
          </p>
        </div>

        <MatrizRiesgos />
      </div>

      <div className="riesgos-bloque">
        <div className="riesgos-subheader">
          <h3>Resumen estadístico</h3>
          <p>
            Los gráficos se actualizan según los filtros aplicados.
          </p>
        </div>

        <div className="riesgos-graficos">
          <article className="riesgo-grafico-card">
            <h4>Riesgos por nivel</h4>
            <div className="riesgo-grafico">
              <Bar data={nivelesData} options={opcionesBarras} />
            </div>
          </article>

          <article className="riesgo-grafico-card">
            <h4>Riesgos por activo</h4>
            <div className="riesgo-grafico riesgo-grafico-dona">
              <Doughnut data={activosData} options={opcionesDona} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function MatrizRiesgos() {
  const filas = [5, 4, 3, 2, 1];
  const columnas = [1, 2, 3, 4, 5];

  const clasePorNivel = {
    Bajo: "matriz-bajo",
    Medio: "matriz-medio",
    Alto: "matriz-alto",
    "Crítico": "matriz-critico",
  };

  return (
    <div className="riesgos-matriz-contenedor">
      <div className="riesgos-matriz">
        <div className="matriz-celda matriz-encabezado" />

        {columnas.map((impacto) => (
          <div
            key={`col-${impacto}`}
            className="matriz-celda matriz-encabezado"
          >
            I={impacto}
          </div>
        ))}

        {filas.map((probabilidad) => (
          <Fragment key={`fila-${probabilidad}`}>
            <div className="matriz-celda matriz-encabezado">
              P={probabilidad}
            </div>

            {columnas.map((impacto) => {
              const nivel = calcularNivel(probabilidad, impacto);

              const cantidad = riesgos.filter(
                (r) =>
                  r.prob === probabilidad &&
                  r.imp === impacto
              ).length;

              return (
                <div
                  key={`${probabilidad}-${impacto}`}
                  className={`matriz-celda ${clasePorNivel[nivel]}`}
                  title={`Probabilidad: ${probabilidad}, impacto: ${impacto}, nivel: ${nivel}, riesgos: ${cantidad}`}
                >
                  {cantidad > 0 ? cantidad : "—"}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>

      <div className="matriz-leyenda">
        {niveles.map((nivel) => (
          <div key={nivel} className="matriz-leyenda-item">
            <span className={`matriz-punto matriz-punto-${{
              Bajo: "bajo",
              Medio: "medio",
              Alto: "alto",
              "Crítico": "critico",
            }[nivel]}`} />
            <span>{nivel}</span>
          </div>
        ))}
      </div>

      <p className="matriz-nota">
        P = probabilidad · I = impacto. Cada celda indica cuántos
        riesgos coinciden con esa combinación.
      </p>
    </div>
  );
}
