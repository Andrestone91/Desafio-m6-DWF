import * as dotenv from "dotenv"
dotenv.config()
import "./components/botonEl"
import "./components/presentacionTitle"
import "./components/hand-papel"
import "./components/hand-piedra"
import "./components/hand-tijera"
import "./components/score"
import "./components/resultado/resultado-ganar"
import "./components/resultado/resultado-perder"
import "./components/resultado/resultado-empate"

import "./pages/welcome"
import "./pages/nuevo-juego"
import "./pages/juego-creado"
import "./pages/code-share"
import "./pages/test-connect"
import "./pages/full-room"
import "./pages/reglas/index"
import "./pages/reglas/reglas-p2"
import "./pages/waiting-player/index"
import "./pages/waiting-player/waiting-p2"
import "./pages/play/index"
import "./pages/play/play-p2"
import "./pages/show-hands/index"
import "./pages/show-hands/show-p2"
import "./pages/result/ganaste/index"
import "./pages/result/ganaste/result-p2"
import "./pages/result/perdiste/index"
import "./pages/result/perdiste/result-p2"
import "./pages/result/empate/index"
import "./pages/result/empate/result-p2"

import "../server/router"
