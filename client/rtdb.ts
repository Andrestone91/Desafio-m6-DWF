import firebase from "firebase"

const app = firebase.initializeApp({
    apiKey: "l5Hx40OAn1Y8vtjHIMK5H5bQ8KnLjedvNn7iumaB",
    databaseURL: "https://desafio-m6-dwf-default-rtdb.firebaseio.com",
    authDomain: "desafio-m6-dwf.firebaseapp.com",
})
const rtdb = firebase.database()

export { rtdb }

