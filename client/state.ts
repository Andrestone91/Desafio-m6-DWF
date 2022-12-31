import { rtdb } from "./rtdb"
import { Router } from "@vaadin/router"

type Jugada = "piedra" | "papel" | "tijera";
type Resultado = "ganaste" | "perdiste" | "empate"

const API_BASE_URL = "http://localhost:3000"

const state = {
    data: {
        myName: "",
        opponentName: "",
        online: false,
        onlineOpponent: false,
        ready: false,
        readyOpponent: false,
        start: false,
        startOpponent: false,
        userId: "",
        userIdOpponent: "",
        roomId: "",
        rtdbRoomId: "",
        rtdbData: {},
        playerMove: "",
        moveOpponent: "",
        result: {
            player: "",
            playerOpponent: ""
        },

        historyScore: {
            myScore: 0,
            opponentScore: 0
        }
    },
    listeners: [],

    initLocalStorage() {
        const lastLocalStorage = localStorage.getItem("data")
        if (!lastLocalStorage) {
            return;
        } else {
            state.setState(JSON.parse(lastLocalStorage))
        }
    },

    init() {
        const cs = this.getState()
        const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/currentGame")
        roomRef.on("value", (snapshot) => {
            const data = snapshot.val()
            console.log(data);
        })

    },
    getState() {
        return this.data
    },

    setState(newState) {
        this.data = newState

        for (const cb of this.listeners) {
            cb()
        }
        // localStorage.setItem("data", JSON.stringify(newState))
        console.log("he cambiado", this.data);
    },

    setNombre(nombre: string) {
        const cs = this.getState();
        cs.myName = nombre;
        this.setState(cs)
    },
    setNombreOponente(nombreOponente: string) {
        const cs = this.getState();
        cs.opponentName = nombreOponente;
        this.setState(cs)
    },
    createUser(callback?) {
        const cs = this.getState()
        fetch(API_BASE_URL + "/newUser", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ nombre: cs.myName })
        }).then((data) => {
            return data.json()
        }).then((res) => {
            cs.userId = res.id
            this.setState(cs)
            callback()
        })
    },
    createUserOponente(callback?) {
        const cs = this.getState()
        fetch(API_BASE_URL + "/newUser", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ nombre: cs.opponentName })
        }).then((data) => {
            return data.json()
        }).then((res) => {
            cs.userIdOpponent = res.id
            this.setState(cs)
            callback()
        })
    },
    signUp(callback?) {
        const cs = this.getState();
        if (cs.myName) {
            fetch(API_BASE_URL + "/auth", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ nombre: cs.myName })
            }).then((data) => {
                return data.json();
            }).then((res) => {
                cs.userId = res.id
                this.setState(cs)
                callback()
            })
        }
    },
    signUpOponente(callback?) {
        const cs = this.getState();
        if (cs.opponentName) {
            fetch(API_BASE_URL + "/auth", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ nombre: cs.opponentName })
            }).then((data) => {
                return data.json();
            }).then((res) => {
                cs.userIdOpponent = res.id
                this.setState(cs)
                callback()
            })
        }
    },
    ready(callback?) {
        const cs = this.getState();
        cs.ready = true
        this.setState(cs)
        if (callback) {
            callback()
        }
    },
    readyOpponent(callback?) {
        const cs = this.getState();
        cs.readyOpponent = true
        this.setState(cs)
        if (callback) {
            callback()
        }
    },
    setOnline(status: boolean) {
        const cs = this.getState();
        cs.online = status
        this.setState(cs)
    },
    setOnlineOpponent(status: boolean) {
        const cs = this.getState();
        cs.onlineOpponent = status
        this.setState(cs)
    },

    play(callback?) {
        const cs = this.getState();
        cs.start = true
        if (callback) {
            callback()
        }
    },
    playOpponent(callback?) {
        const cs = this.getState();
        cs.startOpponent = true
        if (callback) {
            callback()
        }
    },
    playerMove(playerMove: string) {
        const cs = this.getState()
        cs.playerMove = playerMove
        this.cargarRtdbPlayerTwo(() => {
            this.setStatus()
        })
    },
    playerTwoMove(moveOpponent: string) {
        const cs = this.getState()
        cs.moveOpponent = moveOpponent
        this.cargarRtdbPlayerOne(() => {
            this.setStatus()
        })
    },
    askNewRoom(callback?) {
        const cs = this.getState();
        if (cs.userId) {
            fetch(API_BASE_URL + "/rooms", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ userId: cs.userId })
            }).then((res) => {
                return res.json()
            }).then((data) => {
                cs.roomId = data.roomId
                console.log(data);

                this.setState(cs)
                if (callback) {
                    callback()
                }
            })
        }
    },
    joinRoom(callback?, room?) {
        const cs = this.getState();
        return fetch(API_BASE_URL + "/rooms/auth", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ roomId: room })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            if (!data.roomId) {
                alert(`sala ${room} no encontrada`)
            } else {
                cs.roomId = data.roomId
                this.setState(cs)
            } if (callback) {
                callback()
            }

        })
    },
    accesToRoom(callback?) {
        const cs = this.getState();
        const roomId = cs.roomId
        const userId = cs.userId || cs.userIdOpponent
        fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId
        ).then((res) => {
            return res.json();
        }).then((data) => {
            cs.rtdbRoomId = data.rtdbRoomId;
            this.setState(cs)

            if (callback) {
                callback()
            }
        })
    },
    setStatus(callback?) {
        const cs = this.getState();
        const rtdbID = cs.rtdbRoomId
        fetch(API_BASE_URL + "/rooms/" + rtdbID, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                playerOne: {
                    userId: cs.userId,
                    choice: cs.playerMove,
                    name: cs.myName,
                    online: cs.online,
                    ready: cs.ready,
                    score: cs.historyScore.myScore,
                    start: cs.start
                },
                playerTwo: {
                    userId: cs.userIdOpponent,
                    choice: cs.moveOpponent,
                    name: cs.opponentName,
                    online: cs.onlineOpponent,
                    ready: cs.readyOpponent,
                    score: cs.historyScore.opponentScore,
                    start: cs.startOpponent
                }
            })
        }).then((res) => {
            return res.json()
        }).then(() => {
            if (callback) {

                callback()
            }
        })
    },
    resetStart() {
        const cs = this.getState();
        const rtdbID = cs.rtdbRoomId
        fetch(API_BASE_URL + "/rooms/" + rtdbID, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                playerOne: {
                    userId: cs.userId,
                    choice: "",
                    name: cs.myName,
                    online: cs.online,
                    ready: cs.ready,
                    score: cs.historyScore.myScore,
                    start: false
                },
                playerTwo: {
                    userId: cs.userIdOpponent,
                    choice: "",
                    name: cs.opponentName,
                    online: cs.onlineOpponent,
                    ready: cs.readyOpponent,
                    score: cs.historyScore.opponentScore,
                    start: false
                }
            })
        })
    },

    cargarRtdbPlayerOne(callback?) {
        const cs = this.getState()
        const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/currentGame")
        roomRef.on("value", (snapshot) => {
            const data = snapshot.val()
            const myName = data.playerOne.name
            const userId = data.playerOne.userId
            const ready = data.playerOne.ready
            const start = data.playerOne.start
            const online = data.playerOne.online
            const playerMove = data.playerOne.choice
            const score = data.playerOne.score
            const scoreP2 = data.playerTwo.score
            this.setState({
                ...cs,
                myName,
                userId,
                ready,
                start,
                online,
                playerMove,
                historyScore: { myScore: score, opponentScore: scoreP2 }
            })
        })
        if (callback) {
            callback()
        }
    },
    cargarRtdbPlayerTwo(callback?) {
        const cs = this.getState()
        const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/currentGame")
        roomRef.on("value", (snapshot) => {
            const data = snapshot.val()
            const opponentName = data.playerTwo.name
            const userIdOpponent = data.playerTwo.userId
            const readyOpponent = data.playerTwo.ready
            const startOpponent = data.playerTwo.start
            const onlineOpponent = data.playerOne.online
            const moveOpponent = data.playerTwo.choice
            const scoreP2 = data.playerTwo.score
            const score = data.playerOne.score
            this.setState({
                ...cs,
                opponentName,
                userIdOpponent,
                readyOpponent,
                startOpponent,
                onlineOpponent,
                moveOpponent,
                historyScore: { myScore: score, opponentScore: scoreP2 }
            })
        })
        if (callback) {
            callback()
        }
    },

    verificaReady() {
        const cs = this.getState()
        if (location.pathname == "/code") {
            if (cs.ready == true && cs.readyOpponent == true) {
                Router.go("/instructions")
            }
        }
    },
    verificaReadyOpponent() {
        const cs = this.getState()
        if (location.pathname == "/ready") {
            if (cs.ready == true && cs.readyOpponent == true) {
                Router.go("/instructions-2")
            }
        }
    },

    statusPlayGame() {
        const cs = this.getState();
        if (cs.start == true && cs.startOpponent == false) {
            Router.go("/waiting")
            console.log("p1 start");
        } else if (cs.start == true && cs.startOpponent == true) {
            Router.go("/play")
        }
    },
    statusPlayGameOpponent() {
        const cs = this.getState();
        if (cs.start == false && cs.startOpponent == true) {
            Router.go("/waiting-2")
            console.log("p2 start");
        } else if (cs.start == true && cs.startOpponent == true) {
            Router.go("/play-2")
        }
    },

    enterRoom() {
        const cs = this.getState()
        const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/currentGame")
        roomRef.on("value", (snapshot) => {
            const data = snapshot.val()
            if (data.playerTwo.name !== cs.opponentName) {
                if (location.pathname == "/ingresar-sala")
                    Router.go("/full-room")
            } if (data.playerTwo.name == "" || data.playerTwo.name == cs.opponentName) {
                if (location.pathname == "/ingresar-sala") {
                    Router.go("/ready")
                }
            }
        })
    },
    whoWins(playerP1: Jugada, playerP2: Jugada) {
        const cs = this.getState();

        const piedra: boolean = playerP1 == "piedra" && playerP2 == "tijera";
        const papel: boolean = playerP1 == "papel" && playerP2 == "piedra";
        const tijera: boolean = playerP1 == "tijera" && playerP2 == "papel";
        const playerOneWins = [piedra, papel, tijera].includes(true);

        const piedraEmpate: boolean = playerP1 == "piedra" && playerP2 == "piedra";
        const papelEmpate: boolean = playerP1 == "papel" && playerP2 == "papel";
        const tijeraEmpate: boolean = playerP1 == "tijera" && playerP2 == "tijera";
        const empate = [piedraEmpate, papelEmpate, tijeraEmpate].includes(true);

        if (empate) {
            console.log("empate");
            cs.result = { player: "empate", playerOpponent: "empate" }
        }
        if (playerOneWins) {
            console.log("gana: " + cs.myName);
            cs.result = { player: "ganaste", playerOpponent: "perdiste" }

        } if (!empate && !playerOneWins) {
            console.log("gana:" + cs.opponentName);
            cs.result = { player: "perdiste", playerOpponent: "ganaste" }
        }
    },
    pushToHistory(resultadoP1: Resultado, resultadoP2: Resultado) {
        const cs = this.getState();
        const playerOne = cs.historyScore.myScore;
        const playerTwo = cs.historyScore.opponentScore;

        if (resultadoP1 == "ganaste" && resultadoP2 == "perdiste") {
            this.setState({
                ...cs,
                historyScore: {
                    myScore: playerOne + 1,
                    opponentScore: playerTwo,
                },
            })
        } else if (resultadoP1 == "perdiste" && resultadoP2 == "ganaste") {
            this.setState({
                ...cs,
                historyScore: {
                    myScore: playerOne,
                    opponentScore: playerTwo + 1,
                },
            })
        }
        this.saveScore();
    },
    saveScore() {
        const cs = this.getState()
        const array = {
            PlayerOne: cs.playerMove,
            PlayerTwo: cs.moveOpponent
        }

        localStorage.setItem("scoreData", JSON.stringify(cs.historyScore));
        fetch(API_BASE_URL + "/rooms/history/" + cs.roomId, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ score: cs.historyScore, history: array })
        })
    },
    borrarScore() {
        const sd = { myScore: 0, opponentScore: 0 };
        localStorage.setItem("scoreData", JSON.stringify(sd));
    },

    suscribe(callback: (any) => any) {
        this.listeners.push(callback)
    },

}
export { state }