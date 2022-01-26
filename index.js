'use strict'

const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const config = require('./config')
const routes = require('./routes')
const firebase = require('./firebase')
const functions = require('./functions')
const logger = require('./logs').Logger
const fs = require('fs')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'APS',
            version: '1.0.0',
            description: 'Alzheimer Patient Support'
        },
        servers: [
            {
                url: config.url
            }
        ]
    },
    apis: ['./swagger.js']
}

const specs = swaggerJsDoc(options)

const app = express()

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use(express.json())
app.use(bodyParser.json())

app.use('/api', routes.routes)
app.use('/assets', express.static('assets'))
app.use('/logs', express.static('logs'))

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

app.get('/', (req, res) => {
    fs.readFile('./logs/info.txt', 'utf8' , (error, data) => {
        const logs = data.trim().split('\n')
        res.render('index', { logs: logs })
    })
})

app.get('/food', (req, res) => {
    res.render('food')
})

app.get('/test', (req, res) => {
    res.sendFile('./views/test.html', { root: __dirname })
})

app.get('/medicine', (req, res) => {
    res.sendFile('./views/medicine.html', { root: __dirname })
})

app.get('/location', (req, res) => {
    res.sendFile('./views/location.html', { root: __dirname })
})

const foodBox = firebase.admin.database().ref('/S1')

foodBox.on('value', (snapshot) => {
    logger.info('Food Box Value Changed To ' + JSON.stringify(snapshot.val()))
    functions.getSystemVariables().then((response) => {
        if(response.foodSet) {
            if(parseInt(snapshot.val()) === 1) {
                logger.info('Food Taken')
                functions.setTimeForFood(response.foodType).then((response) => {
                    logger.info('Graph Data For Food Added')
                })
                functions.setFoodToDefault().then((response) => {
                    logger.info('Food Data Set to Default')
                })
            }
        }
    })
}, (errorObject) => {
    logger.error('The Read Failed: ' + errorObject.name)
})

const medBox = firebase.admin.database().ref('/S2')

medBox.on('value', (snapshot) => {
    logger.info('Medicine Box Value Changed To ' + JSON.stringify(snapshot.val()))
    functions.getSystemVariables().then((response) => {
        if(response.medSet) {
            if(parseInt(snapshot.val()) === 1) {
                logger.info('Medicine Taken')
                functions.setTimeForMedicine(response.foodType).then((response) => {
                    logger.info('Graph Data For Medicine Added')
                })
                functions.setMedicineToDefault().then((response) => {
                    logger.info('Medicine Data Set to Default')
                })
            }
        }
    })
}, (errorObject) => {
    logger.error('The Read Failed: ' + errorObject.name)
})

const location = firebase.admin.database().ref('/GPS_DATA')

location.on('value', (snapshot) => {
    logger.info('Patient Location Changed To ' + JSON.stringify(snapshot.val()))
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