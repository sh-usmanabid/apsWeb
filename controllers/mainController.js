'use strict'

const firebase = require('../firebase')

const firestore = firebase.database.getFirestore()

const setFood = async (req, res, next) => {
    try {
        const doc = firestore.collection('system').doc('variables')
        await doc.update({
            foodType: req.body.foodType,
            foodSet: true
        })
        res.send('Food Set Successfully!')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const setLocation = async (req, res, next) => {
    try {
        const doc = firestore.collection('system').doc('variables')
        await doc.update({
            lat: req.body.lat,
            lon: req.body.lon,
        })
        res.send('Location Set Successfully!')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const setRadius = async (req, res, next) => {
    try {
        const doc = firestore.collection('system').doc('variables')
        await doc.update({
            radius: req.body.radius
        })
        res.send('Radius Set Successfully!')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    setFood,
    setLocation,
    setRadius
}