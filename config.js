'use strict'

const dotenv = require('dotenv')
const assert = require('assert')

dotenv.config()

const { PORT, HOST, HOST_URL, DATABASE_URL } = process.env

assert(PORT, 'PORT is required')
assert(HOST, 'HOST is required')

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    databaseUrl: DATABASE_URL
}


/* const admin = require('firebase-admin')
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

module.exports = {db, rdb, auth, notify}*/