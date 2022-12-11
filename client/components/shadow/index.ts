const div = document.createElement("div")
const style = document.createElement("style")
export class Nuevo extends HTMLElement {
    connectedCallback() {
        this.render()
    }
    render() {
        const shadow = this.attachShadow({ mode: "open" })
        style.textContent = `
        
        `
        shadow.appendChild(style)
        div.innerHTML = `
        
        `
        shadow.appendChild(div)
    }
}
customElements.define("nuevo-custom", Nuevo)