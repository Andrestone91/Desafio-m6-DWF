import { state } from "../../state"
const div = document.createElement("div")
const styleEl = document.createElement("style")
export class CodeShare extends HTMLElement {
    connectedCallback() {
        state.suscribe(() => {
            state.verificaReady()
        })
        this.render()
        const ready = div.querySelector<HTMLElement>(".ready-boton")
        const hiddenEl = div.querySelector(".hidden")
        ready.addEventListener("click", () => {
            state.setOnline(true)
            state.ready(() => {
                state.cargarRtdbPlayerTwo(() => {
                    state.setStatus()
                    hiddenEl.classList.add("ocultar")
                })
            })
        })
    }
    render() {
        const csss = state.getState()
        const valor = csss.rtdbData
        const shadow = this.attachShadow({ mode: "open" })
        styleEl.textContent = `
        .contenedor{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            height: 90vh;
            padding: 65px 0 0 0;
        }
        .ocultar{
            display:none
        }
        .hidden{
            text-align:center
        }
        .codigo{
            font-family:"system-ui";
            font-size: 45px;;
        }
        `
        shadow.appendChild(styleEl)
        const cs = state.getState()

        div.innerHTML = `
                <h1>comparte el codigo:</h1>
                <h1 class="codigo">${cs.roomId}</h1>
                <h1>con tu contrincante</h1>
                <div class="hidden">
                <h1>presiona listo y espera a que tu contrincante entre a la sala</h1>
                <custom-boton class="ready-boton" title="Listo"></custom-boton>
                </div>
                `
        div.classList.add("contenedor");

        shadow.appendChild(div)
    }
}
customElements.define("code-share", CodeShare)