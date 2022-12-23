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
            padding: 0 0 0 0;
        }
        .container-score{
            display: flex;
            justify-content:space-around;
            width:100%;
        }
        `
        shadow.appendChild(style)
        div.innerHTML = `
        <div class="container-score">
        <div>
          <h1>${cs.myName}:${cs.historyScore.myScore}</h1>
          <h1>${cs.opponentName}:${cs.historyScore.opponentScore}</h1>
         </div>
         <div>
           <h1>Sala</h1>
           <h1>${cs.roomId}</h1>
         </div>
       </div>
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