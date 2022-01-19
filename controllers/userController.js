'use strict'

const firebase = require('../firebase')

const auth = firebase.admin.auth()

const createUser = async (req, res, next) => {
    try {
        const data = req.body
        const user = await auth.createUser(data)
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    createUser
}