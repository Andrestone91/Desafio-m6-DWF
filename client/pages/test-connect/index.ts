import { state } from "../../state"
const div = document.createElement("div")
const style = document.createElement("style")
export class testConnect extends HTMLElement {
    connectedCallback() {
        state.suscribe(() => {
            state.verificaReadyOpponent()
        })
        this.render()
        const ready = div.querySelector<HTMLElement>(".ready-boton")
        const msj = div.querySelector<HTMLElement>(".msj")

        ready.addEventListener("click", () => {
            state.setOnlineOpponent(true)
            state.readyOpponent(() => {
                state.cargarRtdbPlayerOne(() => {
                    state.setStatus()
                    msj.style.display = "inherit"
                    ready.classList.add("hidden")

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
            justify-content: space-evenly;
            align-items: center;
            height: 90vh;
            padding: 65px 0 0 0;
        }
       
        .hidden{
          display:none;
        }
        .msj{
        display:none
        }
        `
        shadow.appendChild(style)

        div.innerHTML = `
                <custom-boton class="ready-boton" title="Ingresar sala"></custom-boton> 
                <h1 class="msj">esperando a que tu oponente presione listo</h1>  
                `
        div.classList.add("contenedor");

        shadow.appendChild(div)
    }
}
customElements.define("test-connect", testConnect)