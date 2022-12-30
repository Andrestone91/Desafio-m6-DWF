import { Router } from "@vaadin/router"
import { state } from "../../state";

const div = document.createElement("div")
const style = document.createElement("style");

export class Welcome extends HTMLElement {
    connectedCallback() {
        this.render()

        function botonAction() {
            const botonEl = div.querySelector(".botonEl") as any;
            const botonIngresarEl = div.querySelector(".ingresar") as any;

            botonEl?.addEventListener("click", (e) => {
                Router.go("/nuevo-juego");
            })
            botonIngresarEl?.addEventListener("click", (e) => {

                Router.go("/ingresar-sala");
            })

        }
        botonAction();
    }

    render() {
        const shadow = this.attachShadow({ mode: 'open' });

        style.textContent = `
        .hands{
            display:flex;
            width: 80%;
            justify-content: space-evenly;
            position: relative;
            top: 10px;
        }
        .contenedor{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 90vh;
            padding: 65px 0 0 0;
        }
        `
        shadow.appendChild(style);
        div.innerHTML = `
      
<custom-presentacion></custom-presentacion>
<custom-boton class="botonEl" id="nuevo-juego" title="Nuevo Juego"></custom-boton>
<custom-boton class="botonEl ingresar" boton="sala" id="sala-existente" title="Ingresar a una sala"></custom-boton>
<div class="hands">
    <hand-piedra></hand-piedra>
    <hand-papel></hand-papel>
    <hand-tijera></hand-tijera>
</div>
`
        div.classList.add("contenedor");

        shadow.appendChild(div)

    }
}
customElements.define("welcome-page", Welcome)