import * as admin from "firebase-admin"
import * as serviceAccount from "../key.json"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    databaseURL: "https://desafio-m6-dwf-default-rtdb.firebaseio.com"
});

const fireStore = admin.firestore()
const rtdb = admin.database()

export { fireStore, rtdb }