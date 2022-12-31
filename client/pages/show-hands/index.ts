import { Router } from "@vaadin/router";
import { state } from "../../state";

export class show extends HTMLElement {
    connectedCallback() {
        this.render()
    }
    render() {
        const shadow = this.attachShadow({ mode: "open" })
        const div = document.createElement("div")
        const style = document.createElement("style")

        const imagenpiedra = require("/client/assets/play-piedra.svg");
        const imagenPapel = require("/client/assets/play-papel.svg");
        const imagentijera = require("/client/assets/play-tijera.svg");

        function showPlay() {
            const cs = state.getState();

            if (cs.playerMove == "piedra") {
                papel?.classList.add("hand-disabled");
                tijera?.classList.add("hand-disabled");
            }
            if (cs.playerMove == "papel") {
                piedra?.classList.add("hand-disabled");
                tijera?.classList.add("hand-disabled");
            }
            if (cs.playerMove == "tijera") {
                papel?.classList.add("hand-disabled");
                piedra?.classList.add("hand-disabled");
            }
            if (cs.moveOpponent == "piedra") {
                handP2Papel?.classList.add("hand-disabled")
                handP2Tijera?.classList.add("hand-disabled")
            }
            if (cs.moveOpponent == "papel") {
                handP2Piedra?.classList.add("hand-disabled")
                handP2Tijera?.classList.add("hand-disabled")
            }
            if (cs.moveOpponent == "tijera") {
                handP2Papel?.classList.add("hand-disabled")
                handP2Piedra?.classList.add("hand-disabled")
            }

        }
        function whoWinsGame() {
            const jugadaP1 = state.getState().playerMove;
            const jugadaP2 = state.getState().moveOpponent;

            state.whoWins(jugadaP1, jugadaP2)
        }
        function points() {
            const cs = state.getState();
            if (cs.result.player == "ganaste" && cs.result.playerOpponent == "perdiste") {
                state.pushToHistory("ganaste", "perdiste")
                setTimeout(() => {
                    state.resetStart()
                    Router.go("/result-ganar")
                }, 2500)
            }
            if (cs.result.player == "perdiste" && cs.result.playerOpponent == "ganaste") {
                state.pushToHistory("perdiste", "ganaste")
                setTimeout(() => {
                    state.resetStart()
                    Router.go("/result-perder")
                }, 2500)
            }
            if (cs.result.player == "empate" && cs.result.playerOpponent == "empate") {
                state.pushToHistory("empate", "empate")
                setTimeout(() => {
                    state.resetStart()
                    Router.go("/result-empate")
                }, 2500)
            }
        }

        style.textContent = `
        .hands,
        .hands-p2{
            display:flex;
            width: 100%;
            justify-content: space-evenly;
            translate: 0px 5px;
        }
        @media(min-width:960px){
          .hands,
          .hands-p2{
            width: 70%;
          }
        }
        .hand-disabled{
          display:none;
        }
        .hand-piedra-p2,
        .hand-papel-p2,
        .hand-tijera-p2{
          transform: rotate(180deg);
        }
        .contenedor{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 100vh;  
        }
        `
        shadow.appendChild(style)
        div.innerHTML = `
        <div class="hands-p2">
        <h1>${state.getState().opponentName}</h1>
         <img  class="hand-piedra-p2" src=${imagenpiedra} alt="">
          <img  class="hand-papel-p2" src=${imagenPapel} alt="">
         <img  class="hand-tijera-p2" src=${imagentijera} alt="">
        </div>
        <div class="hands">
        <h1>${state.getState().myName}</h1>
        <img  class="hand-piedra"src=${imagenpiedra} alt="">
        <img  class="hand-papel"src=${imagenPapel} alt="">
        <img  class="hand-tijera"src=${imagentijera} alt="">
       </div>
        
        `
        div.classList.add("contenedor")

        const piedra = div.querySelector(".hand-piedra");
        const papel = div.querySelector(".hand-papel");
        const tijera = div.querySelector(".hand-tijera");

        const handP2Piedra = div.querySelector(".hand-piedra-p2");
        const handP2Papel = div.querySelector(".hand-papel-p2");
        const handP2Tijera = div.querySelector(".hand-tijera-p2");
        showPlay()
        whoWinsGame()
        points()


        shadow.appendChild(div)
    }
}
customElements.define("show-hands", show)