const express = require('express')
const bodyParser = require('body-parser')
const firebase = require('./config')

const port = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

async function getRoutine() {
    let data = null
    const snapshot = await firebase.db.collection('foodRoutine').get()
    snapshot.forEach((doc) => {
        data = doc.data()
    })
    return data
}

async function setRoutine() {
    const docRef = firebase.db.collection('foodRoutine').doc('q22bRQfdAIiwRpEZ3lCV')
    await docRef.update({
        foodType: null,
        isSet: false
    })
}

async function setGraph(foodType) {
    const docRef = firebase.db.collection('foodGraph').doc()
    await docRef.set({
        foodType: foodType,
        dateTime: new Date()
    })
}

app.post('/create',async (req, res) => {
    const docRef = firebase.db.collection('users').doc()
    await docRef.set(req.body)
    res.send({ msg: 'Record Added!' })
})

const ref = firebase.rdb.ref('/S1')

ref.on('value', (snapshot) => {
    const foodBox = snapshot.val()
    getRoutine().then((response) => {
        if(response.isSet) {
            if(foodBox == 0) {
                setGraph(response.foodType).then((response) => {
                    console.log('Graph Data Added!')
                })
                setRoutine().then((response) => {
                    console.log('Routines Set to Default!')
                })
            }
        }
    })
}, (errorObject) => {
    console.log('The read failed: ' + errorObject.name)
})

app.post('/user', async (req, res) => {
    await firebase.auth.createUser(req.body)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })

    res.send({ msg: 'User Added' })
})

app.post('/notification', async (req, res) => {
    await firebase.notify.sendToDevice({}, {}, {})
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})