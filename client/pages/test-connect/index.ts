import { state } from "../../state"
const div = document.createElement("div")
const style = document.createElement("style")
export class testConnect extends HTMLElement {
    connectedCallback() {
        state.suscribe(() => {
            state.readyCheckAndPlay()
        })
        this.render()
        const ready = div.querySelector(".ready-boton")
        ready.addEventListener("click", () => {
            state.readyOpponent(() => {
                state.cargarRtdbPlayerOne(() => {

                    state.setStatus()


                })
            })
        })
    }
    render() {
        const shadow = this.attachShadow({ mode: "open" })
        style.textContent = `
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
        shadow.appendChild(style)

        div.innerHTML = `
                <button class="ready-boton">READY</button>   
                `
        div.classList.add("contenedor");



        shadow.appendChild(div)
    }
}
customElements.define("test-connect", testConnect)