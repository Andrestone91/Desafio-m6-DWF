import { rtdb } from "./rtdb"
import map from "lodash/map"
import { Router } from "@vaadin/router"

const API_BASE_URL = "http://localhost:3000"

const state = {
    data: {
        myName: "",
        opponentName: "",
        online: false,
        onlineOpponent: false,
        ready: false,
        readyOpponent: false,
        userId: "",
        userIdOpponent: "",
        roomId: "",
        rtdbRoomId: "",
        rtdbData: {},
        historyScore: {
            myScore: 0,
            opponentScore: 0
        }
    },
    listeners: [],

    init() {
        const cs = this.getState()
        const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/currentGame")
        roomRef.on("value", (snapshot) => {
            const data = snapshot.val()
            console.log(data);
            cs.rtdbData = data
            //    const myName = data.playerOne.name
            //    const userId = data.playerOne.userId
            //    const opponentName = data.playerTwo.name
            //    const userIdOpponent = data.playerTwo.userId
            //    const ready = data.playerOne.ready
            //    const readyOpponent = data.playerTwo.ready
            //    this.setState({
            //        ...cs,
            //        myName,
            //        userId,
            //        opponentName,
            //        userIdOpponent,
            //        ready,
            //        readyOpponent,
            //    })
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
        //   localStorage.setItem("data", JSON.stringify(newState))
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
                    choice: "",
                    name: cs.myName,
                    online: cs.online,
                    ready: cs.ready,
                    start: ""
                },
                playerTwo: {
                    userId: cs.userIdOpponent,
                    choice: "",
                    name: cs.opponentName,
                    online: cs.onlineOpponent,
                    ready: cs.readyOpponent,
                    start: ""
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
    cargarRtdbPlayerOne(callback?) {
        const cs = this.getState()
        const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/currentGame")
        roomRef.on("value", (snapshot) => {
            const data = snapshot.val()
            const myName = data.playerOne.name
            const userId = data.playerOne.userId
            const ready = data.playerOne.ready
            this.setState({
                ...cs,
                myName,
                userId,
                ready
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
            this.setState({
                ...cs,
                opponentName,
                userIdOpponent,
                readyOpponent
            })
        })
        if (callback) {
            callback()
        }
    },
    readyCheckAndPlay(callback?) {
        const cs = this.getState()
        if (cs.ready && cs.readyOpponent == true) {
            console.log("estan listos");
            Router.go("/instructions")
        } if (callback) {
            callback()
        }
    },
    testSala(callback?) {
        const cs = this.getState()
        const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/currentGame")
        roomRef.on("value", (snapshot) => {
            const data = snapshot.val()


            if (data.playerTwo.name == cs.opponentName) {
                Router.go("/instructions")
            }
            if (data.playerTwo.name !== cs.opponentName && data.playerTwo.ready == true) {

                console.log("sala llena");
            }

        })
        if (callback) {
            callback()
        }
    },
    // testconnection() {
    //     const cs = this.getState()
    //     const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/currentGame")
    //     roomRef.set({
    //         playerOne: {
    //             ready: true
    //         }
    //     })
    // },
    suscribe(callback: (any) => any) {
        this.listeners.push(callback)
    },

}
export { state }