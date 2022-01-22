const express = require('express')
const { createUser } = require('../controllers/userController')
const { setFood, setMedicine, setLocation, setRadius } = require('../controllers/mainController')

const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: Object
 *          required:
 *              - displayName
 *              - email
 *              - password
 *          properties:
 *              displayName:
 *                  type: string
 *                  description: Display Name
 *              email:
 *                  type: email
 *                  description: Email Address
 *              password:
 *                  type: password
 *                  description: Password
 *          example:
 *              displayName: Jon Doe
 *              email: user@email.com
 *              password: password
 */

/**
 * @swagger
 * /api/create-user:
 *  post:
 *      summary: Creates a new user.
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          '200':
 *              description: User Created
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
router.post('/create-user', createUser)

router.post('/set-food', setFood)
router.post('/set-medicine', setMedicine)
router.post('/set-location', setLocation)
router.post('/set-radius', setRadius)

module.exports = {
    routes: router
}
