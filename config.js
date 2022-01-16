const admin = require('firebase-admin')
const database = require('firebase-admin/firestore')

const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://aps-web-4c55e-default-rtdb.firebaseio.com"
})

const db = database.getFirestore()
const rdb = admin.database()
const auth = admin.auth()
const notify = admin.messaging()

module.exports = {db, rdb, auth, notify}