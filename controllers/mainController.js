'use strict'

const firebase = require('../firebase')
const logger = require('../logs').Logger

const firestore = firebase.database.getFirestore()

const setFood = async (req, res, next) => {
    try {
        const doc = firestore.collection('system').doc('variables')
        await doc.update({
            foodType: req.body.foodType,
            foodSet: true
        })
        logger.info('Food Placed In Food Box')
        res.send(200)
    } catch (error) {
        logger.error(error.message)
        res.send(400)
    }
}

const setMedicine = async (req, res, next) => {
    try {
        const doc = firestore.collection('system').doc('variables')
        await doc.update({
            medSet: true
        })
        logger.info('Medicine Placed In Medicine Box')
        res.send(200)
    } catch (error) {
        logger.error(error.message)
        res.send(400)
    }
}

const setLocation = async (req, res, next) => {
    try {
        const doc = firestore.collection('system').doc('variables')
        await doc.update({
            lat: req.body.lat,
            lon: req.body.lon,
        })
        logger.info('Patient Reference Location Set')
        res.send(200)
    } catch (error) {
        logger.error(error.message)
        res.send(400)
    }
}

const setRadius = async (req, res, next) => {
    try {
        const doc = firestore.collection('system').doc('variables')
        await doc.update({
            radius: req.body.radius
        })
        logger.info('Patient Allowed Radius Set')
        res.send(200)
    } catch (error) {
        logger.error(error.message)
        res.send(400)
    }
}

module.exports = {
    setFood,
    setMedicine,
    setLocation,
    setRadius
}