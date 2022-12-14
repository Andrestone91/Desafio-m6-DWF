import { fireStore, rtdb } from "./firebase";
import * as express from "express";
import * as cors from "cors"
import { customAlphabet, nanoid } from "nanoid"

import * as dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


const usersCollection = fireStore.collection("users")
const roomsCollection = fireStore.collection("rooms")

app.get("/env", (req, res) => {
    res.json({
        environment: process.env.NODE_ENV,
        equipo: process.env.EQUIPO
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

            }).then(() => {
                const history = []
                const roomLongRef = rtdbRef.key;
                const nanoid = customAlphabet("123456789AEURWT", 5)
                const roomId = nanoid();
                roomsCollection.doc(roomId.toString()).set({
                    rtdbRoomId: roomLongRef,
                    history: []
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
app.post("/rooms/history/:roomId", (req, res) => {
    const roomId = req.params.roomId
    const history = req.body.history
    const score = req.body.score
    roomsCollection.doc(roomId.toString()).get().then((dato) => {
        if (dato.exists) {
            const roomREf = roomsCollection.doc(roomId.toString())
            roomREf.update({
                history,
                score
            })
            res.json({ message: "score update" })
        }
    })
})
app.post("/rooms/auth", (req, res) => {
    const { roomId } = req.body;
    roomsCollection.doc(roomId.toString()).get().then((doc) => {
        if (doc.exists) {
            const roomRef = rtdb.ref("rooms/" + roomId + "/currentGame")
            roomRef.update({

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
app.use(express.static("dist"));
app.get("*", (req, res) => {
    res.sendFile(__dirname, "../dist/index.html")
})
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})