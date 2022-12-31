import { Router } from "@vaadin/router";
import { state } from "../../../state";

export class result extends HTMLElement {
    connectedCallback() {
        this.render()
    }
    render() {
        const shadow = this.attachShadow({ mode: "open" })
        const div = document.createElement("div")
        const style = document.createElement("style")
        style.textContent = `
        .contenedor{
            background: var(--fondo-rojo);
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
        <resultado-perder class="star">Resultado</resultado-perder>
        <custom-score puntosJugadorP1=${cs.historyScore.myScore} puntosJugadorP2= ${cs.historyScore.opponentScore}></custom-score>
        <custom-boton title="Play again" class="botonEl"></custom-boton>
        <custom-boton title="Salir" class="botonEl salir"></custom-boton>
        `
        div.classList.add("contenedor")

        const botonEl = div.querySelector(".botonEl");

        botonEl?.addEventListener("click", () => {
            state.cargarRtdbPlayerOne(() => {
                state.cargarRtdbPlayerTwo()
            })
            Router.go("/instructions-2");
        })
        const salir = div.querySelector(".salir");
        salir?.addEventListener("click", () => {
            state.borrarScore()
            state.setState({
                myName: "",
                opponentName: "",
                online: false,
                onlineOpponent: false,
                ready: false,
                readyOpponent: false,
                start: false,
                startOpponent: false,
                userId: "",
                userIdOpponent: "",
                roomId: "",
                rtdbRoomId: "",
                rtdbData: {},
                playerMove: "",
                moveOpponent: "",
                result: {
                    player: "",
                    playerOpponent: ""
                },

                historyScore: {
                    myScore: 0,
                    opponentScore: 0
                }
            })
            Router.go("/");
        })
        shadow.appendChild(div)
    }
}
customElements.define("result-perder2", result)