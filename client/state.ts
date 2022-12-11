import { rtdb } from "./rtdb"
import map from "lodash/map"

const API_BASE_URL = "http://localhost:3000"

const state = {
    data: {
        usuario: "",
        online: false,
        userId: "",
        rtdbData: {},
        roomId: "",
        rtdbRoomId: ""
    },
    listeners: [],

    init() {
        const cs = this.getState()
        const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId)
        roomRef.on("value", (snapshot) => {
            const data = snapshot.val()
            console.log(data);
            const list = map(data.clave)
            cs.rtdbData = list
            this.setState(cs)
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
        cs.usuario = nombre;
        this.setState(cs)
    },

    createUser(callback?) {
        const cs = this.getState()
        fetch(API_BASE_URL + "/newUser", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ nombre: cs.usuario })
        }).then((data) => {
            return data.json()
        }).then((res) => {
            cs.userId = res.id
            this.setState(cs)
            callback()
        })
    },
    signUp(callback?) {
        const cs = this.getState();
        if (cs.usuario) {
            fetch(API_BASE_URL + "/auth", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ nombre: cs.usuario })
            }).then((data) => {
                return data.json();
            }).then((res) => {
                cs.userId = res.id
                this.setState(cs)
                callback()
            })
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
        const userId = cs.userId
        fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId
        ).then((res) => {
            return res.json();
        }).then((data) => {
            cs.rtdbRoomId = data.rtdbRoomId;
            this.setState(cs)
            this.init()
            if (callback) {
                callback()
            }
        })
    },
    setStatus(callback?) {
        const cs = this.getState();
        const rtdbID = cs.rtdbRoomId
        const userID = cs.userId
        fetch(API_BASE_URL + "/rooms/" + rtdbID, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userID: {
                    online: true
                },
                jugadorDos: {
                    online: true
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
    suscribe(callback: (any) => any) {
        this.listeners.push(callback)
    },
}
export { state }