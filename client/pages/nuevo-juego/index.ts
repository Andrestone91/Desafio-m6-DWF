import { state } from "../../state";
import { Router } from "@vaadin/router";

const div = document.createElement("div");
const style = document.createElement("style");

export class Nuevo extends HTMLElement {
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
            const nombre = target.nombre.value;
            if (nombre == "") {
                return hidden.classList.add("hidden"), window.alert("por favor ingresa tu nombre")
            }
            state.setNombre(nombre)
            state.createUser(() => {
                state.signUp(() => {
                    state.askNewRoom(() => {
                        state.accesToRoom(() => {
                            state.setStatus(() => {
                                state.init()
                                setTimeout(() => {
                                    Router.go("/code")
                                }, 2000);
                            })
                        })
                    })
                })
            })
        })
    }
    render() {
        const shadow = this.attachShadow({ mode: "open" })
        style.textContent = `
        .form{
            display:flex;
            flex-direction:column;
        }
        .input{
            height:50px;
            padding: 0px 5px;
            font-size: 20px;
            margin-bottom:10px;
        }
        .label{
            font-size: 20px;
        }
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
        .boton-color{
            background: #006CFC;
            color: #D8FCFC;
            border: 10px solid #001997;
            border-radius: 10px;
            width: 322px;
            height: 87px;
            font-size: 45px;
            font-family: 'Odibee Sans';
        }
        `
        shadow.appendChild(style)
        div.innerHTML = `
        <custom-presentacion></custom-presentacion>
        <form class="form">
        <label class="label">tu nombre</label>
        <input class="input"name="nombre"type="text" />
        <button class="boton-color">Empezar</button>
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
customElements.define("nuevo-juego", Nuevo)