import { Router } from "@vaadin/router"
import { state } from "../../state";


export class Waiting extends HTMLElement {
    connectedCallback() {

        this.render()
    }
    render() {
        const div = document.createElement("div")
        const style = document.createElement("style")
        const cs = state.getState()
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
        <h1>Esperando a que <b>${cs.myName}</b> presione ¡jugar!...</h1>

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
customElements.define("waiting-player2", Waiting)