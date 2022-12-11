import { fireStore, rtdb } from "./firebase";
import * as express from "express";
import * as cors from "cors"
import { customAlphabet, nanoid } from "nanoid"

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const usersCollection = fireStore.collection("users")
const roomsCollection = fireStore.collection("rooms")

app.get("/prueba", (req, res) => {
    usersCollection.doc("QkzcFzSdZ5ymfHSLhi4A").get().then((doc) => {
        res.json(doc.data())
    })
})
app.post("/newUser", (req, res) => {
    const { nombre } = req.body
    const dato = Date();
    usersCollection.where("user", "==", nombre).get().then((searchResponse) => {
        if (searchResponse.empty) {
            usersCollection.add({
                user: nombre,
                fecha: dato
            }).then((newUserRef) => {
                res.status(201).json({
                    //devuelve el userId si es que se creó el usuario
                    id: newUserRef.id,
                    new: true
                })
                console.log("usuario creado " + "id: " + newUserRef.id);
            })
        } else {
            res.status(400).json({
                message: "usuario ya existe"
            })
            console.log("el usuario ya existe");
        }
    })
})

app.post("/auth", (req, res) => {
    const { nombre } = req.body;
    usersCollection.where("user", "==", nombre).get().then((searchResponse) => {
        if (searchResponse.empty) {
            res.status(404).json({
                message: "el usuario no existe"
            })
        } else {
            res.status(202).json({
                //devuelve el userId ya creado anteriormente
                id: searchResponse.docs[0].id
            })
        }
    })
})

app.post("/rooms", (req, res) => {
    const { userId } = req.body;
    usersCollection.doc(userId.toString()).get().then((usuario) => {
        if (usuario.exists) {
            const rtdbRef = rtdb.ref("rooms/" + nanoid(10));
            rtdbRef.set({
                currentGame: [],
                owner: userId
                //  currentGame: {
                //      jugadorUno: {
                //          choice: "",
                //          name: "",
                //          online: "",
                //          start: ""
                //      },
                //      jugadorDos: {
                //          choice: "",
                //          name: "",
                //          online: "",
                //          start: ""
                //      }
                //  }
            }).then(() => {
                const history = []
                const roomLongRef = rtdbRef.key;
                const nanoid = customAlphabet("123456789AEIOU", 5)
                const roomId = nanoid();
                roomsCollection.doc(roomId.toString()).set({
                    rtdbRoomId: roomLongRef,
                    history: {
                        jugada: {
                            choice: ""
                        }
                    }
                }).then(() => {
                    res.status(201).json({
                        message: "room creado",
                        roomId: roomId.toString()
                    })
                })
            })
        } else {
            res.status(404).json({
                message: "usuario no encontrado"
            })
        }
    })
})
app.post("/rooms/auth", (req, res) => {
    const { roomId } = req.body;
    roomsCollection.doc(roomId.toString()).get().then((doc) => {
        if (doc.exists) {
            const roomRef = rtdb.ref("rooms/" + roomId + "/currentGame")
            roomRef.update({
                contenido: "update"
            })
            res.status(200).json({
                roomId: doc.id,
                message: "sala" + " " + roomId + " " + "encontrada"
            })
        } else {
            res.status(404).json({
                message: "la sala" + " " + roomId + " " + "no existe"
            })
        }
    })
})
app.post("/rooms/:rtdbRoomId", (req, res) => {
    const rtdbRoomId = req.params.rtdbRoomId
    const roomRef = rtdb.ref("/rooms/" + rtdbRoomId + "/currentGame")
    roomRef.set(
        req.body,
        function () {
            res.json("ok")
        }
    )
})
app.get("/rooms/:roomId", (req, res) => {
    const roomId = req.params.roomId
    const userId = req.query.userId
    usersCollection.doc(userId.toString()).get().then((doc) => {
        if (doc.exists) {
            roomsCollection.doc(roomId.toString()).get().then((snap) => {
                const snapData = snap.data().rtdbRoomId
                //devuelve el room largo
                res.json({
                    rtdbRoomId: snapData
                })
            })
        } else {
            res.status(404).json({
                message: "usuario no existe"
            })
        }
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})