
import { useMemo, useState } from "react";
import { empresa as contextoEmpresa } from "../data/empresa";
import "./styles/SeccionEmpresa.css";

const nivelesCriticidad = ["Todas", "Crítica", "Alta", "Media"];

export default function SeccionEmpresa() {
  const datos = contextoEmpresa.empresa;
  const procesos = contextoEmpresa.procesos ?? [];
  const activos = contextoEmpresa.activos ?? [];
  const resumen = contextoEmpresa.resumen_activos;

  const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos");
  const [criticidadSeleccionada, setCriticidadSeleccionada] =
    useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  const tiposActivos = useMemo(
    () => ["Todos", ...new Set(activos.map((activo) => activo.tipo))],
    [activos]
  );

  const activosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return activos.filter((activo) => {
      const coincideTipo =
        tipoSeleccionado === "Todos" ||
        activo.tipo === tipoSeleccionado;

      const coincideCriticidad =
        criticidadSeleccionada === "Todas" ||
        activo.criticidad === criticidadSeleccionada;

      const coincideBusqueda =
        !termino ||
        [
          activo.id,
          activo.nombre,
          activo.tipo,
          activo.descripcion,
          activo.propietario,
          activo.ubicacion,
        ]
          .filter(Boolean)
          .some((valor) => valor.toLowerCase().includes(termino));

      return coincideTipo && coincideCriticidad && coincideBusqueda;
    });
  }, [activos, tipoSeleccionado, criticidadSeleccionada, busqueda]);

  const claseCriticidad = (criticidad) =>
    criticidad
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

  return (
    <section id="empresa" className="seccion-empresa">
      <header className="empresa-header">
        <span className="empresa-etiqueta">
          01 · CONTEXTO ORGANIZACIONAL
        </span>

        <h2>Contexto empresarial</h2>

        <p>
          Conoce la organización, sus procesos principales y los activos
          que deben protegerse para garantizar la seguridad de la información.
        </p>
      </header>

      
      {/* Información general de la empresa */}
      <div className="empresa-perfil card">
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

        <p className="empresa-descripcion">
          {datos.descripcion_tecnologica}
        </p>

        <div className="empresa-datos-grid">
          <div className="empresa-dato">
            <span>Sector</span>
            <strong>{datos.sector}</strong>
          </div>

          <div className="empresa-dato">
            <span>Ubicación</span>
            <strong>{datos.ubicacion}</strong>
          </div>

          <div className="empresa-dato">
            <span>Sede principal</span>
            <strong>{datos.sede}</strong>
          </div>
        </div>

        <div className="empresa-mision">
          <h4>Nuestra misión</h4>
          <p>{datos.mision}</p>
        </div>
      </div>

      {/* Procesos empresariales */}
      <div className="empresa-procesos">
        <div className="empresa-procesos-encabezado">
          <div>
            <span className="empresa-etiqueta">OPERACIÓN DEL NEGOCIO</span>
            <h3>Procesos empresariales</h3>
            <p>
              Actividades esenciales para prestar servicios tecnológicos
              y mantener la operación.
            </p>
          </div>

          <span className="empresa-contador">
            {procesos.length} procesos
          </span>
        </div>

        <div className="empresa-procesos-lista">
          {procesos.map((proceso) => (
            <article className="empresa-proceso" key={proceso.id}>
              <div className="empresa-proceso-cabecera">
                <span className="empresa-proceso-id">
                  {proceso.id}
                </span>

                <span
                  className={`empresa-criticidad empresa-criticidad-${claseCriticidad(
                    proceso.criticidad
                  )}`}
                >
                  {proceso.criticidad}
                </span>
              </div>

              <h4>{proceso.nombre}</h4>
              <p>{proceso.descripcion}</p>

              <div className="empresa-proceso-meta">
                <span>{proceso.tipo}</span>
                <div>
                  <span>Responsable</span>
                  <strong>{proceso.responsable}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Resumen de activos */}
      <div className="empresa-activos">
        <div className="empresa-activos-header">
          <div>
            <span className="empresa-etiqueta">INVENTARIO TECNOLÓGICO</span>
            <h3>Activos de información y tecnología</h3>
            <p>
              Recursos que requieren controles de seguridad según su
              importancia para la organización.
            </p>
          </div>

          <span className="empresa-activos-total">
            {resumen?.total ?? activos.length} activos
          </span>
        </div>

        <div className="empresa-resumen-grid">
          <article className="card empresa-resumen-card">
            <span>Total de activos</span>
            <strong>{resumen?.total ?? activos.length}</strong>
          </article>

          <article className="card empresa-resumen-card">
            <span>Criticidad crítica</span>
            <strong>{resumen?.por_criticidad?.["Crítica"] ?? 0}</strong>
          </article>

          <article className="card empresa-resumen-card">
            <span>Criticidad alta</span>
            <strong>{resumen?.por_criticidad?.Alta ?? 0}</strong>
          </article>

          <article className="card empresa-resumen-card">
            <span>Criticidad media</span>
            <strong>{resumen?.por_criticidad?.Media ?? 0}</strong>
          </article>
        </div>

        {/* Filtros */}
        <div className="empresa-filtros">
          <div className="empresa-busqueda">
            <label htmlFor="buscar-activo">Buscar activos</label>
            <input
              id="buscar-activo"
              type="search"
              placeholder="Nombre, responsable, ubicación..."
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
            <label htmlFor="filtrar-criticidad">Criticidad</label>
            <select
              id="filtrar-criticidad"
              value={criticidadSeleccionada}
              onChange={(event) =>
                setCriticidadSeleccionada(event.target.value)
              }
            >
              {nivelesCriticidad.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="empresa-resultados">
          Mostrando {activosFiltrados.length} de {activos.length} activos
        </p>

        {/* Tarjetas de activos */}
        <div className="empresa-activos-grid">
          {activosFiltrados.map((activo) => (
            <article className="card empresa-activo" key={activo.id}>
              <div className="empresa-activo-cabecera">
                <span className="empresa-activo-id">{activo.id}</span>

                <span
                  className={`empresa-criticidad empresa-criticidad-${claseCriticidad(
                    activo.criticidad
                  )}`}
                >
                  {activo.criticidad}
                </span>
              </div>

              <h4>{activo.nombre}</h4>
              <p>{activo.descripcion}</p>

              <dl className="empresa-activo-detalles">
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
              </dl>

              <div className="empresa-activo-procesos">
                Procesos relacionados:{" "}
                {activo.procesos_relacionados.join(", ")}
              </div>
            </article>
          ))}
        </div>

        {activosFiltrados.length === 0 && (
          <div className="empresa-vacio">
            <h4>No se encontraron activos</h4>
            <p>Prueba con otro término de búsqueda o cambia los filtros.</p>
            <button
              type="button"
              onClick={() => {
                setBusqueda("");
                setTipoSeleccionado("Todos");
                setCriticidadSeleccionada("Todas");
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
