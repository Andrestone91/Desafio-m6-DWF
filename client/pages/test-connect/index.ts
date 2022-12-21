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
            state.readyOpponent(() => {
                state.cargarRtdbPlayerOne(() => {
                    state.setStatus()
                    msj.style.display = "inherit"
                    ready.style.backgroundColor = "springgreen"
                    ready.style.color = "black"
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
        .msj{
        display:none
        }
        `
        shadow.appendChild(style)

        div.innerHTML = `
                <button class="ready-boton">ENTRAR SALA</button> 
                <h1 class="msj">esperando a que tu oponente presione ready</h1>  
                `
        div.classList.add("contenedor");



        shadow.appendChild(div)
    }
}
customElements.define("test-connect", testConnect)