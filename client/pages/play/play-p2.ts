import { Router } from "@vaadin/router";
import { state } from "../../state";

const div = document.createElement("div")
const style = document.createElement("style")
export class Play extends HTMLElement {
  connectedCallback() {
    this.render()
  }
  render() {
    const shadow = this.attachShadow({ mode: "open" })

    const computerMove = () => {
      const randomMove = Math.floor(Math.random() * (3))
      const playList = ["piedra", "papel", "tijera"]
      const randomPlay = playList[randomMove];
      return randomPlay;
    }

    let contador = 3
    const intervalo: any = setInterval(() => {
      contador--;
      const contadorEl = div.querySelector(".contador") as any
      contadorEl.textContent = String(contador)
      if (contador == 0 && state.getState().moveOpponent == "") {
        clearInterval(intervalo)

        setTimeout(() => {
          state.playerTwoMove(computerMove())
          const cs = state.getState()
          if (cs.moveOpponent == "piedra") {
            classDinamic(piedra)
          } if (cs.moveOpponent == "papel") {
            classDinamic(papel)
          } if (cs.moveOpponent == "tijera") {
            classDinamic(tijera)
          }
          state.cargarRtdbPlayerOne()
        }, 200);
      } else if (contador == 0 && state.getState().moveOpponent !== "") {
        clearInterval(intervalo)
      }
    }, 1000)

    style.textContent = `
        .hands{
          display:flex;
          width: 100%;
          justify-content: space-evenly;
          translate: 0px 5px;
      }
      @media(min-width:960px){
        .hands{
          width: 70%;
        }
      }

      .hand-piedra:hover,
      .hand-papel:hover,
      .hand-tijera:hover{
        transform: translateY(-5px);
      }
      .hand-select{
        transform: translateY(-25px);
        transition: all 0.5s;
      }
      .deselected{
        opacity: 0.5;
        transform: translateY(5px);
        transition: all 0.5s;
      }
      .contenedor{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          height: 100vh;
      }
      .contador{
        font-size: 80px;
        border-radius: 35px;
        border: solid 15px crimson;
        padding: 20px 50px;
        font-family: fantasy; 
        margin: 85px 0 0 0;
      }
        `
    shadow.appendChild(style)

    const imagenpiedra = require("/client/assets/play-piedra.svg");
    const imagenPapel = require("/client/assets/play-papel.svg");
    const imagentijera = require("/client/assets/play-tijera.svg");

    div.innerHTML = `
        <div class="contador">${contador}</div> 
          <div class="hands">
            <img  class="hand-piedra"src=${imagenpiedra} alt="">
            <img  class="hand-papel"src=${imagenPapel} alt="">
            <img  class="hand-tijera"src=${imagentijera} alt="">
           </div>     
        `
    div.classList.add("contenedor")

    const piedra = div.querySelector(".hand-piedra");
    const papel = div.querySelector(".hand-papel");
    const tijera = div.querySelector(".hand-tijera");

    const hands: any = div.querySelector(".hands")?.children;

    for (const h of hands) {

      h.addEventListener("click", () => {
        const clase = h.getAttribute("class");

        if (clase == "hand-piedra") {
          state.playerTwoMove("piedra");
          classDinamic(piedra);

        } else if (clase == "hand-papel") {
          state.playerTwoMove("papel");
          classDinamic(papel);

        } else if (clase == "hand-tijera") {
          state.playerTwoMove("tijera");
          classDinamic(tijera);
        }
      })
    };

    function classDinamic(params) {
      for (const h of hands) {
        h.classList.add("deselected");
      }
      if (params == piedra) {
        params?.classList.add("hand-select");
        params?.classList.remove("deselected");
        params?.classList.remove("hand-piedra");
        papel?.classList.remove("hand-papel");
        tijera?.classList.remove("hand-tijera");

      } if (params == papel) {
        params?.classList.add("hand-select");
        params?.classList.remove("deselected");
        params?.classList.remove("hand-papel");
        piedra?.classList.remove("hand-piedra");
        tijera?.classList.remove("hand-tijera");

      } if (params == tijera) {
        params?.classList.add("hand-select");
        params?.classList.remove("deselected");
        params?.classList.remove("hand-tijera");
        papel?.classList.remove("hand-papel");
        piedra?.classList.remove("hand-piedra");
      }

      const showHands = setInterval(() => {
        if (contador == 0) {
          clearInterval(showHands)

          setTimeout(() => {
            Router.go("/show-hands-2")
          }, 1500)
        }
      }, 1000)
    }
    shadow.appendChild(div)
  }
}
customElements.define("play-game2", Play)