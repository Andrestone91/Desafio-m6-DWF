export class Resultado extends HTMLElement {
    connectedCallback() {
        this.render()
    }
    render() {
        const shadow = this.attachShadow({ mode: "open" })
        const div = document.createElement("div")
        const style = document.createElement("style")
        const imagenSrc = require("/client/assets/resultado-perdiste.svg");
        style.textContent = `
        .estrella{
            width:255px;
            heigth:260px;
        }
        `
        shadow.appendChild(style)
        div.innerHTML = `
        <div class="imagen">
        </div>
        `
        const contenedor = div.querySelector(".imagen") as any;
        contenedor.innerHTML = `
    <img class="estrella" src=${imagenSrc}>
    `
        shadow.appendChild(div)
    }
}
customElements.define("resultado-perder", Resultado)