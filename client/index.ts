import "./components/botonEl"
import "./components/presentacionTitle"
import "./components/hand-papel"
import "./components/hand-piedra"
import "./components/hand-tijera"
import "./components/score"
import "./components/resultado"


import "./pages/welcome"
import "./pages/nuevo-juego"
import "./pages/juego-creado"
import "./pages/code-share"
import "./pages/test-connect"
import "./pages/full-room"
import "./pages/reglas"
import "./pages/reglas-p2"
import "./pages/waiting-player"
import "./pages/waiting-p2"
import "./pages/play"
import "./pages/play-p2"
import "./pages/show-hands/index"
import "./pages/show-hands/show-p2"
import "./pages/result/index"
import "./pages/result/result-p2"

import "../server/router"
import { state } from "./state"
function main() {
    state.initLocalStorage()
    // state.scorePrueba()
    state.init()
}
main()