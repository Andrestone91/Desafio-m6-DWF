import { state } from "../../state";

export class Score extends HTMLElement {
    connectedCallback() {
        this.render()
    }
    render() {
        const shadow = this.attachShadow({ mode: "open" })
        const div = document.createElement("div")
        const style = document.createElement("style")
        const cs = state.getState();
        const puntosJugadorP1 = this.getAttribute("puntosJugadorP1");
        const puntosJugadorP2 = this.getAttribute("puntosJugadorP2");
        style.textContent = `
        .score{
            font-family: 'Odibee Sans';
            width:235px;
            height: 175px;
            display:flex;
            flex-direction: column;
            justify-content: center;
            border: 10px solid #000000;
            border-radius: 10px;
            background: #FFFFFF;
            margin:0 0 10px 0;
        }
        .score__title{
            font-size:55px;
            line-height: 61px;
            letter-spacing: 0.05em;
            text-align: center;
            margin: 0
        }
        .you,.computer{
            text-align:end;
            font-size:45px;
            margin: 0 5px 3px 0;
        }
        `
        shadow.appendChild(style)
        div.innerHTML = `
        <div class="score">
        <h1 class="score__title">Score</h1>
        <p class="you">${cs.myName}: ${puntosJugadorP1}</p>
        <p class="computer">${cs.opponentName}: ${puntosJugadorP2}</p>
        </div
        `
        shadow.appendChild(div)
    }
}
customElements.define("custom-score", Score)