import { Router } from "@vaadin/router";
import { state } from "../../state";

const div = document.createElement("div");
const style = document.createElement("style");

export class Creado extends HTMLElement {
    connectedCallback() {
        this.render()
        const hidden = div.querySelector(".hidden")
        const form = div.querySelector(".form");


        form?.addEventListener("submit", (e) => {
            e.preventDefault();
            if (hidden) {
                hidden.classList.remove("hidden")
            } else {
                console.log("falso");
            }
            const target = e.target as any;
            const nombre = target.nombre.value
            const code = target.code.value;
            state.setNombreOponente(nombre)
            state.createUserOponente(() => {
                state.signUpOponente(() => {
                    state.joinRoom(() => {
                        state.accesToRoom(() => {
                            state.init()
                            setTimeout(() => {
                                state.enterRoom()
                            }, 2000)
                        })
                    }, code)
                })
            })
        })

    }
    render() {
        const shadow = this.attachShadow({ mode: "open" })
        style.textContent = `
        .hands{
            display:flex;
            width: 80%;
            justify-content: space-evenly;
            position: relative;
            top: 10px;
        }
        .contenedor{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 90vh;
            padding: 65px 0 0 0;
        }
        .hidden{
            display:none;
        }
        `

        shadow.appendChild(style)
        div.innerHTML = `
        <custom-presentacion></custom-presentacion>
        <h1>ingresar sala</h1>
        <form class="form">
        <label>tu nombre</label>
        <input name="nombre" type="text" />
        <label>sala</label>
        <input name="code" type="text" />
        <button class="boton">ingresar sala</button>
        </form>
        <h2 class="hidden">
        <iframe
        src="https://giphy.com/embed/sSgvbe1m3n93G"
        width="50"
        height="50"
        frameborder="0"
        class="giphy-embed"
        allowfullscreen
      ></iframe></h2>
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
customElements.define("juego-creado", Creado)