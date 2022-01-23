'use strict'

const firebase = require('../firebase')

const auth = firebase.app.auth()

const current = async (req, res, next) => {
    const user = await auth.currentUser
    if(user) {
        res.status(200).send(auth.currentUser)
    } else {
        res.status(401).send('No User Logged In')
    }
}

const register = async (req, res, next) => {
    await auth.createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then((userCredential) => {
            let user = userCredential.user
            res.status(200).send(user)
        }).catch((error) => {
            let errorMessage = error.message
            res.status(400).send(errorMessage)
        })
}

const login = async (req, res, next) => {
    await auth.signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((userCredential) => {
            let user = userCredential.user
            res.status(200).send(user)
        }).catch((error) => {
            let errorMessage = error.message
            res.status(404).send(errorMessage)
        })
}

const update = async (req, res, next) => {
    try {
        const user = await auth.currentUser
        user.updateProfile(req.body).then(() => res.status(200).send(auth.currentUser))
    } catch (error) {
        res.status(401).send('No User Logged In')
    }
}

module.exports = {
    current,
    register,
    login,
    update
}