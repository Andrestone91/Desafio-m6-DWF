import { Router } from "@vaadin/router"
import { state } from "../../state";


export class FullRoom extends HTMLElement {
    connectedCallback() {

        this.render()
    }
    render() {
        const div = document.createElement("div")
        const style = document.createElement("style")
        const imagenUps = require("/client/assets/sala-llena.svg");
        const shadow = this.attachShadow({ mode: "open" })
        style.textContent = `
        .hands{
            display:flex;
            width: 80%;
            justify-content: space-evenly;
            position: relative;
            top: 10px;
        }
        @media(min-width:960px){
            .hands{
                width: 50%;
            }
        }
        .contenedor{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 100vh;
            padding: 85px 0 0 0;
        }
        
        `
        shadow.appendChild(style)
        div.innerHTML = `
        <img src=${imagenUps} alt="">
        <custom-boton class="botonEl" title="volver"></custom-boton>
        <div class="hands">
            <hand-piedra></hand-piedra>
            <hand-papel></hand-papel>
            <hand-tijera></hand-tijera>
            </div>
            `
        div.classList.add("contenedor");

        function botonAction() {
            const botonEl = div.querySelector(".botonEl");
            botonEl?.addEventListener("click", () => {
                Router.go("/")
            })
        }
        botonAction()
        shadow.appendChild(div)
    }
}
customElements.define("full-room", FullRoom)