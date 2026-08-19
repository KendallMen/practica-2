export class PanelEstudiante extends HTMLElement {
  constructor() {
    super();
    // No usamos Shadow DOM para permitir recibir los estilos
    // CSS de la rejilla global de forma directa (Light DOM).
    this.innerHTML = `
<div class="grid-asignaciones" id="gridAsignaciones">
<!-- Tarjetas inyectadas por JavaScript -->
</div>
`;
  }
  connectedCallback() {
    this.cargarAsignaciones();
  }
  // GET asíncrono al backend de Spring Boot
  async cargarAsignaciones() {
    const grid = this.querySelector("#gridAsignaciones");
    grid.innerHTML = '<p class="cargando">Cargando tareas...</p>';
    try {
      const respuesta = await fetch("/api/asignaciones");
      if (!respuesta.ok) throw new Error("Error al conectar con la API.");
      const datos = await respuesta.json();
      grid.innerHTML = "";
      if (datos.length === 0) {
        grid.innerHTML = '<p class="vacio">No hay tareas.</p>';
        return;
      }
      // Recorrer e inyectar dinámicamente cada Web Component
      datos.forEach((asig) => {
        const tarjeta = document.createElement("tarjeta-asignacion");
        // Pasar atributos de datos al componente
        tarjeta.setAttribute("data-fechaEntrega", asig.fechaEntrega);
        tarjeta.dataset.completada = asig.completada;
        tarjeta.innerHTML = `
<span slot="titulo">${asig.titulo}</span>
<span slot="descripcion">${asig.descripcion}</span>
`;
        grid.appendChild(tarjeta);
      });
    } catch (error) {
      console.error("Error cargando datos:", error);
      grid.innerHTML = `
<p class="error-panel">
Error: No se pudo conectar a Spring Boot.
</p>
`;
    }
  }
}
customElements.define("panel-estudiante", PanelEstudiante);
