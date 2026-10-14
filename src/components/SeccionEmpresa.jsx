import { useMemo, useRef, useState } from "react";
import { empresa as contextoEmpresa } from "../data/empresa";
import "./styles/SeccionEmpresa.css";

const ORDEN_NIVELES = ["Crítica", "Alta", "Media", "Baja"];

// Convierte "Crítica" -> "critica" para usarlo como clase CSS
const aClase = (valor) =>
  valor
    ? valor
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
    : "sin-dato";

// Búsqueda sin distinguir mayúsculas ni tildes
const normalizar = (texto) =>
  String(texto ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// Agrega o quita un id de un Set guardado en el estado
const alternarEnSet = (setter, id) =>
  setter((previo) => {
    const nuevo = new Set(previo);
    if (nuevo.has(id)) {
      nuevo.delete(id);
    } else {
      nuevo.add(id);
    }
    return nuevo;
  });

export default function SeccionEmpresa() {
  const datos = contextoEmpresa.empresa;
  const procesos = contextoEmpresa.procesos ?? [];
  const activos = contextoEmpresa.activos ?? [];
  const resumen = contextoEmpresa.resumen_activos;

  const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos");
  const [importanciaSeleccionada, setImportanciaSeleccionada] =
    useState("Todas");
  const [procesoSeleccionado, setProcesoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  // Tarjetas abiertas (se pueden abrir varias a la vez)
  const [procesosAbiertos, setProcesosAbiertos] = useState(() => new Set());
  const [activosAbiertos, setActivosAbiertos] = useState(() => new Set());

  const seccionActivosRef = useRef(null);

  // Nombre de cada proceso por id
  const procesosPorId = useMemo(
    () => Object.fromEntries(procesos.map((p) => [p.id, p.nombre])),
    [procesos]
  );

  // Cantidad de activos relacionados con cada proceso
  const activosPorProceso = useMemo(() => {
    const conteo = {};
    activos.forEach((activo) =>
      (activo.procesos_relacionados ?? []).forEach((id) => {
        conteo[id] = (conteo[id] ?? 0) + 1;
      })
    );
    return conteo;
  }, [activos]);

  const tiposActivos = useMemo(
    () => ["Todos", ...new Set(activos.map((a) => a.tipo))],
    [activos]
  );

  // Niveles tomados de los datos, no fijos
  const nivelesImportancia = useMemo(() => {
    const presentes = new Set(activos.map((a) => a.importancia));
    return ["Todas", ...ORDEN_NIVELES.filter((n) => presentes.has(n))];
  }, [activos]);

  const activosConRiesgoCritico = useMemo(
    () => activos.filter((a) => a.nivel_riesgo_guia === "Crítico").length,
    [activos]
  );

  const activosFiltrados = useMemo(() => {
    const termino = normalizar(busqueda.trim());

    return activos.filter((activo) => {
      const coincideTipo =
        tipoSeleccionado === "Todos" || activo.tipo === tipoSeleccionado;

      const coincideImportancia =
        importanciaSeleccionada === "Todas" ||
        activo.importancia === importanciaSeleccionada;

      const coincideProceso =
        !procesoSeleccionado ||
        activo.procesos_relacionados?.includes(procesoSeleccionado);

      const coincideBusqueda =
        !termino ||
        [
          activo.id,
          activo.nombre,
          activo.tipo,
          activo.descripcion,
          activo.propietario,
          activo.ubicacion,
          activo.riesgo_asociado,
          activo.que_podria_ocurrir,
        ].some((valor) => normalizar(valor).includes(termino));

      return (
        coincideTipo &&
        coincideImportancia &&
        coincideProceso &&
        coincideBusqueda
      );
    });
  }, [
    activos,
    tipoSeleccionado,
    importanciaSeleccionada,
    procesoSeleccionado,
    busqueda,
  ]);

  const hayFiltrosActivos =
    tipoSeleccionado !== "Todos" ||
    importanciaSeleccionada !== "Todas" ||
    procesoSeleccionado !== null ||
    busqueda.trim() !== "";

  const limpiarFiltros = () => {
    setBusqueda("");
    setTipoSeleccionado("Todos");
    setImportanciaSeleccionada("Todas");
    setProcesoSeleccionado(null);
  };

  // "Ver activos relacionados": filtra por el proceso y baja al inventario
  const alternarFiltroProceso = (id) => {
    const siguiente = procesoSeleccionado === id ? null : id;
    setProcesoSeleccionado(siguiente);

    if (siguiente) {
      seccionActivosRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="empresa" className="seccion-empresa">
      <header className="empresa-header">
        <span className="empresa-etiqueta">01 · CONTEXTO ORGANIZACIONAL</span>
        <h2>Contexto empresarial</h2>
        <p>
          Conoce la organización, sus procesos principales y los activos que
          deben protegerse para garantizar la seguridad de la información.
        </p>
      </header>

      {/* ========== PERFIL ORGANIZACIONAL (2 columnas) ========== */}
      <div className="empresa-perfil card" style={{ "--i": 1 }}>
        {/* Columna izquierda: información de la empresa */}
        <div className="empresa-perfil-info">
          <div className="empresa-perfil-principal">
            <div className="empresa-identidad">
              <span className="empresa-etiqueta">PERFIL ORGANIZACIONAL</span>
              <h3 className="empresa-nombre">{datos.nombre}</h3>
              <p>{datos.actividad}</p>
            </div>

            <span className="empresa-personal">
              <strong>{datos.numero_empleados}</strong>
              <span>empleados</span>
            </span>
          </div>

          <p className="empresa-descripcion">{datos.tipo_empresa}</p>

          <div className="empresa-datos-grid">
            <div className="empresa-dato">
              <span>Tamaño</span>
              <strong>{datos.tamano}</strong>
            </div>

            <div className="empresa-dato">
              <span>Cooperativas activas</span>
              <strong>{datos.alcance?.cooperativas_activas}</strong>
            </div>

            <div className="empresa-dato">
              <span>Ubicación</span>
              <strong>{datos.ubicacion}</strong>
            </div>

            <div className="empresa-dato">
              <span>Socios finales (aprox.)</span>
              <strong>
                {datos.alcance?.socios_finales_aprox?.toLocaleString("es-EC")}
              </strong>
            </div>
          </div>

          {datos.motivacion_sgsi && (
            <div className="empresa-mision">
              <h4>Motivación del SGSI</h4>
              <p>{datos.motivacion_sgsi}</p>
            </div>
          )}
        </div>

        {/* Columna derecha: áreas, servicios y marco normativo */}
        <aside className="empresa-perfil-lateral">
          {datos.areas?.length > 0 && (
            <section className="empresa-areas">
              <h4>Áreas</h4>
              <ul className="empresa-areas-lista">
                {datos.areas.map((area) => {
                  const porcentaje = datos.numero_empleados
                    ? Math.round(
                        (area.colaboradores / datos.numero_empleados) * 100
                      )
                    : 0;

                  return (
                    <li key={area.area}>
                      <div className="empresa-area-fila">
                        <span>{area.area}</span>
                        <strong>{area.colaboradores}</strong>
                      </div>
                      <span
                        className="empresa-area-barra"
                        style={{ "--pct": `${porcentaje}%` }}
                        aria-hidden="true"
                      >
                        <span />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {datos.servicios?.length > 0 && (
            <section className="empresa-servicios">
              <h4>Servicios</h4>
              <ul className="empresa-lista">
                {datos.servicios.map((servicio) => (
                  <li key={servicio}>{servicio}</li>
                ))}
              </ul>
            </section>
          )}

          {datos.marco_normativo && (
            <section className="empresa-normativa">
              <h4>Marco normativo</h4>

              {datos.marco_normativo.obligatorio?.length > 0 && (
                <>
                  <span className="empresa-normativa-tipo empresa-normativa-obligatorio">
                    Obligatorio
                  </span>
                  <ul className="empresa-lista">
                    {datos.marco_normativo.obligatorio.map((norma) => (
                      <li key={norma}>{norma}</li>
                    ))}
                  </ul>
                </>
              )}

              {datos.marco_normativo.voluntario?.length > 0 && (
                <>
                  <span className="empresa-normativa-tipo">Voluntario</span>
                  <ul className="empresa-lista">
                    {datos.marco_normativo.voluntario.map((norma) => (
                      <li key={norma}>{norma}</li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}
        </aside>
      </div>
      {datos.informacion_que_gestiona?.length > 0 && (
        <div className="empresa-informacion card" style={{ "--i": 2 }}>
          <div className="empresa-informacion-header">
            <span className="empresa-etiqueta">DATOS Y DOCUMENTOS</span>
            <h3>Información que gestiona CODEXA</h3>
            <p>
              Activos intangibles que circulan por los procesos de la empresa y que
              requieren clasificación según su sensibilidad.
            </p>
          </div>

          <ul className="empresa-informacion-lista">
            {datos.informacion_que_gestiona.map((item, i) => (
              <li key={item} style={{ "--i": i }}>
                <span className="empresa-informacion-icono" aria-hidden="true">
                  {["🧑‍💼", "💰", "🧩", "📄", "📁"][i] ?? "•"}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ========== PROCESOS EMPRESARIALES (3 columnas, expandibles) ========== */}
      <div className="empresa-procesos">
        <div className="empresa-procesos-encabezado">
          <div>
            <span className="empresa-etiqueta">OPERACIÓN DEL NEGOCIO</span>
            <h3>Procesos empresariales</h3>
            <p>
              Actividades esenciales para prestar servicios tecnológicos y
              mantener la operación. Haz clic en un proceso para ver su
              detalle.
            </p>
          </div>

          <span className="empresa-contador">{procesos.length} procesos</span>
        </div>

        <div className="empresa-tarjetas-grid">
          {procesos.map((proceso, indice) => {
            const abierto = procesosAbiertos.has(proceso.id);
            const filtrando = procesoSeleccionado === proceso.id;
            const cantidad = activosPorProceso[proceso.id] ?? 0;
            const idPanel = `panel-${proceso.id}`;

            return (
              <article
                key={proceso.id}
                className={`empresa-tarjeta empresa-proceso ${
                  abierto ? "expandido" : ""
                } ${filtrando ? "seleccionado" : ""}`}
                style={{ "--i": indice }}
              >
                <h4 className="empresa-tarjeta-titulo">
                  <button
                    type="button"
                    className="empresa-tarjeta-cabecera"
                    aria-expanded={abierto}
                    aria-controls={idPanel}
                    onClick={() =>
                      alternarEnSet(setProcesosAbiertos, proceso.id)
                    }
                  >
                    <span className="empresa-tarjeta-fila">
                      <span className="empresa-proceso-id">{proceso.id}</span>
                      <span
                        className={`empresa-criticidad empresa-criticidad-${aClase(
                          proceso.criticidad
                        )}`}
                      >
                        {proceso.criticidad}
                      </span>
                    </span>

                    <span className="empresa-tarjeta-nombre">
                      {proceso.nombre}
                    </span>

                    <span
                      className="empresa-tarjeta-chevron"
                      aria-hidden="true"
                    />
                  </button>
                </h4>

                <div className="empresa-tarjeta-panel" id={idPanel}>
                  <div>
                    <div className="empresa-tarjeta-cuerpo">
                      <p>{proceso.descripcion}</p>

                      <dl className="empresa-detalles">
                        <div>
                          <dt>Tipo</dt>
                          <dd>{proceso.tipo}</dd>
                        </div>

                        <div>
                          <dt>Responsable</dt>
                          <dd>{proceso.responsable}</dd>
                        </div>

                        <div>
                          <dt>Interrupción máxima</dt>
                          <dd>
                            {proceso.tiempo_max_interrupcion_horas != null
                              ? `${proceso.tiempo_max_interrupcion_horas} h`
                              : "No definida"}
                          </dd>
                        </div>
                      </dl>

                      <button
                        type="button"
                        className={`empresa-accion ${
                          filtrando ? "activa" : ""
                        }`}
                        disabled={cantidad === 0}
                        onClick={() => alternarFiltroProceso(proceso.id)}
                      >
                        {filtrando
                          ? "Quitar filtro de activos"
                          : `Ver activos relacionados (${cantidad})`}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ========== INVENTARIO TECNOLÓGICO ========== */}
      <div className="empresa-activos" ref={seccionActivosRef}>
        <div className="empresa-activos-header">
          <div>
            <span className="empresa-etiqueta">INVENTARIO TECNOLÓGICO</span>
            <h3>Activos de información y tecnología</h3>
            <p>
              Recursos que requieren controles de seguridad según su
              importancia para la organización. Haz clic en un activo para ver
              su detalle y riesgo.
            </p>
          </div>

          <span className="empresa-activos-total">
            {resumen?.total ?? activos.length} activos
          </span>
        </div>

        {/* Resumen: las tarjetas de importancia funcionan como filtro */}
        <div className="empresa-resumen-grid">
          <article className="card empresa-resumen-card" style={{ "--i": 0 }}>
            <span>Total de activos</span>
            <strong>{resumen?.total ?? activos.length}</strong>
          </article>

          {Object.entries(resumen?.por_importancia ?? {}).map(
            ([nivel, cantidad], indice) => (
              <button
                type="button"
                key={nivel}
                className="card empresa-resumen-card es-filtro"
                style={{ "--i": indice + 1 }}
                aria-pressed={importanciaSeleccionada === nivel}
                onClick={() =>
                  setImportanciaSeleccionada(
                    importanciaSeleccionada === nivel ? "Todas" : nivel
                  )
                }
              >
                <span>Importancia {nivel.toLowerCase()}</span>
                <strong>{cantidad}</strong>
              </button>
            )
          )}

          <article className="card empresa-resumen-card" style={{ "--i": 3 }}>
            <span>Con riesgo crítico</span>
            <strong>{activosConRiesgoCritico}</strong>
          </article>
        </div>

        {/* Filtros */}
        <div className="empresa-filtros">
          <div className="empresa-busqueda">
            <label htmlFor="buscar-activo">Buscar activos</label>
            <input
              id="buscar-activo"
              type="search"
              placeholder="Nombre, responsable, ubicación, riesgo..."
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
            />
          </div>

          <div className="empresa-filtro">
            <label htmlFor="filtrar-tipo">Tipo de activo</label>
            <select
              id="filtrar-tipo"
              value={tipoSeleccionado}
              onChange={(event) => setTipoSeleccionado(event.target.value)}
            >
              {tiposActivos.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <div className="empresa-filtro">
            <label htmlFor="filtrar-importancia">Importancia</label>
            <select
              id="filtrar-importancia"
              value={importanciaSeleccionada}
              onChange={(event) =>
                setImportanciaSeleccionada(event.target.value)
              }
            >
              {nivelesImportancia.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chips de filtros activos */}
        {hayFiltrosActivos && (
          <div className="empresa-chips" aria-label="Filtros activos">
            {procesoSeleccionado && (
              <button
                type="button"
                className="empresa-chip"
                onClick={() => setProcesoSeleccionado(null)}
              >
                Proceso: {procesoSeleccionado}{" "}
                {procesosPorId[procesoSeleccionado] ?? ""}
              </button>
            )}

            {importanciaSeleccionada !== "Todas" && (
              <button
                type="button"
                className="empresa-chip"
                onClick={() => setImportanciaSeleccionada("Todas")}
              >
                Importancia: {importanciaSeleccionada}
              </button>
            )}

            {tipoSeleccionado !== "Todos" && (
              <button
                type="button"
                className="empresa-chip"
                onClick={() => setTipoSeleccionado("Todos")}
              >
                Tipo: {tipoSeleccionado}
              </button>
            )}

            {busqueda.trim() !== "" && (
              <button
                type="button"
                className="empresa-chip"
                onClick={() => setBusqueda("")}
              >
                Búsqueda: “{busqueda.trim()}”
              </button>
            )}
          </div>
        )}

        <p className="empresa-resultados" aria-live="polite">
          Mostrando {activosFiltrados.length} de {activos.length} activos
        </p>

        {/* Tarjetas de activos (3 columnas, expandibles) */}
        <div className="empresa-tarjetas-grid">
          {activosFiltrados.map((activo, indice) => {
            const abierto = activosAbiertos.has(activo.id);
            const idPanel = `panel-${activo.id}`;

            return (
              <article
                key={activo.id}
                className={`empresa-tarjeta empresa-activo ${
                  abierto ? "expandido" : ""
                }`}
                style={{ "--i": indice }}
              >
                <h4 className="empresa-tarjeta-titulo">
                  <button
                    type="button"
                    className="empresa-tarjeta-cabecera"
                    aria-expanded={abierto}
                    aria-controls={idPanel}
                    onClick={() =>
                      alternarEnSet(setActivosAbiertos, activo.id)
                    }
                  >
                    <span className="empresa-tarjeta-fila">
                      <span className="empresa-activo-id">{activo.id}</span>
                      <span
                        className={`empresa-criticidad empresa-criticidad-${aClase(
                          activo.importancia
                        )}`}
                      >
                        {activo.importancia}
                      </span>
                    </span>

                    <span className="empresa-tarjeta-nombre">
                      {activo.nombre}
                    </span>

                    <span
                      className="empresa-tarjeta-chevron"
                      aria-hidden="true"
                    />
                  </button>
                </h4>

                <div className="empresa-tarjeta-panel" id={idPanel}>
                  <div>
                    <div className="empresa-tarjeta-cuerpo">
                      <p>{activo.descripcion}</p>

                      <dl className="empresa-detalles">
                        <div>
                          <dt>Tipo</dt>
                          <dd>{activo.tipo}</dd>
                        </div>

                        <div>
                          <dt>Ubicación</dt>
                          <dd>{activo.ubicacion}</dd>
                        </div>

                        <div>
                          <dt>Propietario</dt>
                          <dd>{activo.propietario}</dd>
                        </div>

                        <div>
                          <dt>Origen</dt>
                          <dd>{activo.origen}</dd>
                        </div>
                      </dl>

                      {/* Riesgo asociado (A-06 y A-07 no lo tienen) */}
                      <div
                        className={`empresa-activo-riesgo empresa-riesgo-${aClase(
                          activo.nivel_riesgo_guia
                        )}`}
                      >
                        {activo.riesgo_asociado ? (
                          <>
                            <strong>
                              Riesgo {activo.riesgo_asociado} ·{" "}
                              {activo.nivel_riesgo_guia}
                            </strong>
                            <p>{activo.que_podria_ocurrir}</p>
                          </>
                        ) : (
                          <strong>Sin riesgo asignado en la Guía S4</strong>
                        )}
                      </div>

                      {/* Procesos relacionados: clic = filtrar por ese proceso */}
                      <div className="empresa-activo-procesos">
                        <span>Procesos relacionados</span>
                        <div>
                          {(activo.procesos_relacionados ?? []).map((id) => (
                            <button
                              type="button"
                              key={id}
                              title={`Filtrar por ${procesosPorId[id] ?? id}`}
                              onClick={() => setProcesoSeleccionado(id)}
                            >
                              {id} {procesosPorId[id] ?? ""}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {activosFiltrados.length === 0 && (
          <div className="empresa-vacio">
            <h4>No se encontraron activos</h4>
            <p>Prueba con otro término de búsqueda o cambia los filtros.</p>
            <button type="button" onClick={limpiarFiltros}>
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}