const express = require('express')

const { current, register, login, update } = require('../controllers/userController')
const { setFood, setMedicine, setLocation, setRadius } = require('../controllers/mainController')
const { getFoodData, getMedicineData, getLocation } = require('../controllers/chartController')

const router = express.Router()

router.get('/current-user', current)
router.post('/register-user', register)
router.post('/login-user', login)
router.post('/update-user', update)

router.post('/set-food', setFood)
router.post('/set-medicine', setMedicine)
router.post('/set-location', setLocation)
router.post('/set-radius', setRadius)

router.get('/get-food', getFoodData)
router.get('/get-med', getMedicineData)
router.get('/get-location', getLocation)

module.exports = {
    routes: router
}
