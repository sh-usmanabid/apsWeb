const admin = require('firebase-admin')
const database = require('firebase-admin/firestore')
const config = require('./config')

const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.databaseUrl
})

module.exports = {
    admin,
    database
}