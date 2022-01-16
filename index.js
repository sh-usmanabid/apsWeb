const express = require('express')
const bodyParser = require('body-parser')
const firebase = require('./config')

const port = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

async function getData() {
    let data = null
    const snapshot = await firebase.db.collection('system').get()
    snapshot.forEach((doc) => {
        data = doc.data()
    })
    return data
}

async function setRoutine() {
    const docRef = firebase.db.collection('system').doc('constants')
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

function calDistance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        const radLat1 = Math.PI * lat1/180;
        const radLat2 = Math.PI * lat2/180;
        const theta = lon1-lon2;
        const radTheta = Math.PI * theta/180;
        let dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") { dist = dist * 1.609344 }
        if (unit === "N") { dist = dist * 0.8684 }
        return dist;
    }
}

app.post('/create',async (req, res) => {
    const docRef = firebase.db.collection('users').doc()
    await docRef.set(req.body)
    res.send({ msg: 'Record Added!' })
})

const ref = firebase.rdb.ref('/S1')

ref.on('value', (snapshot) => {
    const foodBox = snapshot.val()
    getData().then((response) => {
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

const location = firebase.rdb.ref('/GPS_DATA')

location.on('value', (snapshot) => {
    const coordinates = snapshot.val()
    getData().then((response) => {
        const dist = calDistance(response.lat, response.lng, coordinates.lat, coordinates.lon, 'K')
        if(dist > response.distance) {
            console.log('Patient out of ' + response.distance + ' Km Range!')
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