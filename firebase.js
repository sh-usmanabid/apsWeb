const admin = require('firebase-admin')
const app = require('firebase/compat/app')
const database = require('firebase-admin/firestore')
const config = require('./config')
require('firebase/compat/auth')

const serviceAccount = require('./serviceAccountKey.json')

app.initializeApp(config.config)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.databaseUrl
})

module.exports = {
    admin,
    database,
    app
}