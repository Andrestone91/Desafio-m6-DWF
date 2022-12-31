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
            }
            const target = e.target as any;
            const nombre = target.nombre.value
            const code = target.code.value;
            if (nombre == "") {
                return hidden.classList.add("hidden"), window.alert("por favor ingresa tu nombre")
            }
            if (code == "") {
                return hidden.classList.add("hidden"), window.alert("por favor ingresa el codigo de la sala")
            }
            state.setNombreOponente(nombre)
            state.createUserOponente(() => {
                state.signUpOponente(() => {
                    state.joinRoom(() => {
                        hidden.classList.add("hidden")
                        state.accesToRoom(() => {
                            hidden.classList.remove("hidden")
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
        .hands{
            display:flex;
            width: 80%;
            justify-content: space-evenly;
            position: relative;
            top: 10px;
        }
        .label{
            font-size: 20px;
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
        <input class="input" name="nombre" type="text" />
        <label class="label">sala</label>
        <input class="input" placeholder="A1B1C"name="code" type="text" />
        <button class="boton-color">ingresar sala</button>
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