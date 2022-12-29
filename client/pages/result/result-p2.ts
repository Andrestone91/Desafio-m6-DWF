import { Router } from "@vaadin/router";
import { state } from "../../state";

const div = document.createElement("div")
const style = document.createElement("style")
export class result extends HTMLElement {
    connectedCallback() {
        this.render()
    }
    render() {
        const shadow = this.attachShadow({ mode: "open" })

        style.textContent = `
        .contenedor{
            background: var(--fondo-gris);
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            height: 100vh;
        }
        .botonEl{
            margin-top:4px;
        }
        .star{
            width:255px;
            height:260px;
        }
        `
        shadow.appendChild(style)
        const cs = state.getState();
        div.innerHTML = `
        <resultado-empate class="star">gano:${cs.myName}</resultado-empate>
        <custom-score puntosJugadorP1=${cs.historyScore.myScore} puntosJugadorP2= ${cs.historyScore.opponentScore}></custom-score>
        <custom-boton title="Play again" class="botonEl"></custom-boton>
        <custom-boton title="Salir" class="botonEl salir"></custom-boton>
        `
        div.classList.add("contenedor")

        const botonEl = div.querySelector(".botonEl");
        //    state.getState().start = false
        //    state.getState().startOpponent = false
        //  state.resetStartP2()
        botonEl?.addEventListener("click", () => {
            state.cargarRtdbPlayerOne(() => {
                state.cargarRtdbPlayerTwo()
            })
            Router.go("/instructions-2");
        })
        const salir = div.querySelector(".salir");
        salir?.addEventListener("click", () => {
            //   state.borrarScore();
            //   state.init();

            Router.go("/");
        })
        shadow.appendChild(div)
    }
}
customElements.define("result-game2", result)