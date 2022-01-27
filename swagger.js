/**
 * @swagger
 * /api/current-user:
 *  get:
 *      summary: Get current user.
 *      tags: [User]
 *      responses:
 *          '200':
 *              description: User Found
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: User Not Logged In
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @swagger
 * /api/register-user:
 *  post:
 *      summary: Register a new user.
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          '200':
 *              description: User Registered
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Registration Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @swagger
 * /api/login-user:
 *  post:
 *      summary: Login a user.
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          '200':
 *              description: User Logged In
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '404':
 *              description: User Not Found
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @swagger
 * /api/update-user:
 *  post:
 *      summary: Update current user.
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          displayName:
 *                              type: string
 *      responses:
 *          '200':
 *              description: User Updated
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: User Not Logged In
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @swagger
 * /api/set-food:
 *  post:
 *      summary: Set Food.
 *      tags: [System]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          foodType:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Food Placed In Food Box
 */

/**
 * @swagger
 * /api/set-medicine:
 *  post:
 *      summary: Set Medicine.
 *      tags: [System]
 *      responses:
 *          '200':
 *              description: Medicine Placed In Medicine Box
 */

/**
 * @swagger
 * /api/set-location:
 *  post:
 *      summary: Set Location.
 *      tags: [System]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          lat:
 *                              type: string
 *                          lon:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Patient Reference Location Set
 */

/**
 * @swagger
 * /api/set-radius:
 *  post:
 *      summary: Set Radius.
 *      tags: [System]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          radius:
 *                              type: number
 *      responses:
 *          '200':
 *              description: Patient Allowed Radius Set
 */

/**
 * @swagger
 * /api/get-food:
 *  get:
 *      summary: Get food data.
 *      tags: [Graph]
 *      responses:
 *          '200':
 *              description: All Food Data
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @swagger
 * /api/get-med:
 *  get:
 *      summary: Get medicine data.
 *      tags: [Graph]
 *      responses:
 *          '200':
 *              description: All Medicine Data
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */