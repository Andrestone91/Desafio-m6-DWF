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

        ready.addEventListener("click", () => {
            state.setOnline(true)
            state.ready(() => {
                state.cargarRtdbPlayerTwo(() => {
                    state.setStatus()
                    ready.style.backgroundColor = "springgreen"
                    ready.style.color = "black"
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
            justify-content: space-between;
            align-items: center;
            height: 90vh;
            padding: 65px 0 0 0;
        }
        .ready-boton{
            color:red;
        }
        `
        shadow.appendChild(styleEl)
        const cs = state.getState()
        //  var room = ""
        //  setTimeout(() => {
        //
        //      if (cs.userId !== "") {
        //          room = cs.userId
        //          console.log(room);
        //      } else if (cs.userId == "") {
        //          console.log("nada");
        //      }
        //
        //  }, 1000);

        div.innerHTML = `
                <h1>comparte el codigo:</h1>
                <h1>${cs.roomId}</h1>
                <div>${JSON.stringify(valor)}</div>
                <h1>presiona ready y espera a que tu contrincante entre a la sala</h1>
                <button class="ready-boton">READY</button>
                <h1>con tu contrincante</h1>
                `
        div.classList.add("contenedor");

        shadow.appendChild(div)
    }
}
customElements.define("code-share", CodeShare)