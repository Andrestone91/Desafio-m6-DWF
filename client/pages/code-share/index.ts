import { state } from "../../state"
const div = document.createElement("div")
const style = document.createElement("style")
export class CodeShare extends HTMLElement {
    connectedCallback() {
        state.suscribe(() => {

            //    const cs = state.getState()
            //    const valor = cs.rtdbData
            this.render()
        })
        this.render()
    }


    render() {
        const csss = state.getState()
        const valor = csss.rtdbData
        console.log(valor);

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
        `
        shadow.appendChild(style)
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
        <h1>con tu contrincante</h1>
    `
        div.classList.add("contenedor");
        shadow.appendChild(div)
    }
}
customElements.define("code-share", CodeShare)