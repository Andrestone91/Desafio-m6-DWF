import { state } from "../../state";

export class Rules extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" })
    connectedCallback() {
        this.render()
    }
    render() {
        const cs = state.getState()

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
            padding: 0 0 0 0;
        }
        .container-score{
            display: flex;
            justify-content:space-around;
            width:100%;
        }
        `
        this.shadow.appendChild(style)
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

