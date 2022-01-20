const express = require('express')
const { createUser } = require('../controllers/userController')
const { setFood, setMedicine, setLocation, setRadius } = require('../controllers/mainController')

const router = express.Router()

router.post('/create-user', createUser)
router.post('/set-food', setFood)
router.post('/set-medicine', setMedicine)
router.post('/set-location', setLocation)
router.post('/set-radius', setRadius)

module.exports = {
    routes: router
}
