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
            state.setNombre(nombre)
            state.createUser(() => {
                state.signUp(() => {
                    state.askNewRoom(() => {
                        state.accesToRoom(() => {
                            state.setStatus(() => {
                                setTimeout(() => {
                                    Router.go("/code")
                                }, 3000);
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
        <h1>nuevo juego</h1>
        <form class="form">
        <label>tu nombre</label>
        <input name="nombre"type="text" />
        </form>
        <h2 class="hidden">cargando...</h2>
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