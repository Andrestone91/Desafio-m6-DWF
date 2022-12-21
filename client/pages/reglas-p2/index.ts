import { Router } from "@vaadin/router"
import { state } from "../../state";


export class Rules extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" })
    connectedCallback() {
        state.suscribe(() => {

            if (state.getState().start == true && state.getState().startOpponent == true) {
                Router.go("/play")
            }
        })
        this.render()
    }
    render() {
        const div = document.createElement("div")
        const style = document.createElement("style")
        const imagenReglas = require("/client/assets/reglas.svg");

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
        this.shadow.appendChild(style)
        div.innerHTML = `
        <img src=${imagenReglas} alt="">
        <custom-boton class="botonEl" title="¡Jugar!"></custom-boton>
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
                state.playOpponent(() => {
                    state.cargarRtdbPlayerOne(() => {
                        state.setStatus(() => {
                            state.statusPlayGameOpponent()
                        })
                    })
                })
            })
        }
        botonAction();
        this.shadow.appendChild(div)
    }
}
customElements.define("reglas-intru2", Rules)

