import * as admin from "firebase-admin"
import * as serviceAccount from "../key.json"

admin.initializeApp({
    credential: admin.credential.cert({
        type: "service_account",
        project_id: "desafio-m6-dwf",
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATEE_KEY,
        client_id: "105262542658674613639",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-oqp3g%40desafio-m6-dwf.iam.gserviceaccount.com"
    } as any),
    databaseURL: "https://desafio-m6-dwf-default-rtdb.firebaseio.com"
});

const fireStore = admin.firestore()
const rtdb = admin.database()

export { fireStore, rtdb }