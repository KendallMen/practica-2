const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
display: block;
container-type: inline-size;
width: 100%;
}
.tarjeta {
background-color: var(--card-bg, #ffffff);
border: 1px solid var(--border-color, #e2e8f0);
border-radius: 8px;
padding: 18px;
transition: transform 0.2s, border-color 0.2s;
display: flex;
flex-direction: column;
gap: 8px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.tarjeta:hover {
border-color: var(--primary-color, #3b82f6);
transform: translateY(-2px);
}
.estado {
display: inline-block;
align-self: flex-start;
padding: 4px 8px;
border-radius: 4px;
font-size: 0.75rem;
font-weight: bold;
text-transform: uppercase;
}
.pendiente {
background-color: #fee2e2;
color: #ef4444;
}
.completada {
background-color: #dcfce7;
color: #22c55e;
}
h3 {
margin: 0;
color: var(--text-dark, #1e293b);
font-size: 1.15rem;
}
p {
margin: 0;
color: var(--text-muted, #64748b);
font-size: 0.9rem;
line-height: 1.4;
}
.meta {
font-size: 0.8rem;
color: var(--text-muted, #64748b);
border-top: 1px solid var(--border-color, #e2e8f0);
padding-top: 8px;
margin-top: 4px;
}
/* ------------------------------------------------------------- */
/* CONTAINER QUERY: Adaptar la tarjeta si contenedor > 400px */
/* Hace el componente modular e independiente del viewport */
@container (min-width: 400px) {
.tarjeta {
flex-direction: row;
align-items: center;
justify-content: space-between;
gap: 20px;
}
.cuerpo-tarjeta {
flex: 2;
}
.info-derecha {
flex: 1;
display: flex;
flex-direction: column;
align-items: flex-end;
text-align: right;
gap: 6px;
}
.meta {
border-top: none;
padding-top: 0;
margin-top: 0;
}
}
</style>
<div class="tarjeta">
<div class="cuerpo-tarjeta">
<span class="estado" id="insigniaEstado">Pendiente</span>
<h3><slot name="titulo">Sin título</slot></h3>
<p><slot name="descripcion">Sin descripción</slot></p>
</div>
<div class="info-derecha">
<div class="meta">
Entrega: <span id="fechaEntrega">-</span>
</div>
</div>
</div>
`;
export class TarjetaAsignacion extends HTMLElement {
    constructor() {
        super();
        // 1. Shadow Root abierto para encapsular marcado y estilos
        this.attachShadow({ mode: "open" });
        // 2. Clonar y adjuntar el nodo al Shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
        this.actualizarAtributos();
    }
    actualizarAtributos() {
        // BUG INTENCIONAL PARA EL TALLER DE DEPURACIÓN (Paso 4):
        // Intentaremos leer data-fecha-entrega pero en JS
        // procesaremos un atributo no coincidente
        const fecha = this.dataset.fechaentrega || 'Sin fecha';
        const completada = this.dataset.completada === "true";
        const insignia = this.shadowRoot.getElementById("insigniaEstado");
        const campoFecha = this.shadowRoot.getElementById("fechaEntrega");
        campoFecha.textContent = fecha;
        if (completada) {
            insignia.textContent = "Completada";
            insignia.className = "estado completada";
        } else {
            insignia.textContent = "Pendiente";
            insignia.className = "estado pendiente";
        }
    }
}
customElements.define("tarjeta-asignacion", TarjetaAsignacion);
