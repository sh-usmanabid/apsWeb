'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const routes = require('./routes')
const firebase = require('./firebase')
const functions = require('./functions')
const logger = require('./logs').Logger

const app = express()

app.use(express.json())
app.use(bodyParser.json())

app.use('/api', routes.routes)

const foodBox = firebase.admin.database().ref('/S1')

foodBox.on('value', (snapshot) => {
    functions.getSystemVariables().then((response) => {
        if(response.foodSet) {
            if(parseInt(snapshot.val()) === 1) {
                functions.setTimeForFood(response.foodType).then((response) => {
                    logger.info('Graph Data For Food Added')
                })
                functions.setFoodToDefault().then((response) => {
                    logger.info('Routines Set to Default')
                })
            }
        }
    })
}, (errorObject) => {
    logger.error('The Read Failed: ' + errorObject.name)
})

const location = firebase.admin.database().ref('/GPS_DATA')

location.on('value', (snapshot) => {
    const coordinates = snapshot.val()
    functions.getSystemVariables().then((response) => {
        const distance = functions.calculateDistance(response.lat, response.lon, coordinates.lat, coordinates.lon, 'K')
        if(distance > response.radius) {
            logger.info('Patient Moving Out Of Range!')
        }
    })
}, (errorObject) => {
    logger.error('The Read Failed: ' + errorObject.name)
})

app.listen(config.port, () => console.log('App is listening on url ' + config.url))