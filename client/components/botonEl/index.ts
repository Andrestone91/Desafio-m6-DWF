customElements.define(
    'custom-boton',
    class extends HTMLElement {
        shadow = this.attachShadow({ mode: 'open' });
        constructor() {
            super();
            this.render();
        }
        render() {
            const style = document.createElement("style");
            style.textContent = `
        .botonEl{
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
            this.shadow.appendChild(style);
            const div = document.createElement("div");
            const title = div.getAttribute("title");
            div.innerHTML = `
        <button class="botonEl">${this.title}</button>
        `
            this.shadow.appendChild(div);
        }
    });


