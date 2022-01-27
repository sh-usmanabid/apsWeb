'use strict'

const firebase = require('../firebase')

const firestore = firebase.database.getFirestore()

const getFoodData = async (req, res) => {

    await firestore.collection('foodData').get().then((snapshot) => {
        res.send(snapshot.docs.map(doc => doc.data()))
    })

}

const getMedicineData = async (req, res) => {

    await firestore.collection('medData').get().then((snapshot) => {
        res.send(snapshot.docs.map(doc => doc.data()))
    })

}

module.exports = {
    getFoodData,
    getMedicineData
}