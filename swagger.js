/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: Object
 *          properties:
 *              displayName:
 *                  type: string
 *                  description: Full Name
 *              email:
 *                  type: email
 *                  description: Email Address
 *              password:
 *                  type: password
 *                  description: Password
 *          example:
 *              displayName: name
 *              email: user@email.com
 *              password: password
 */

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
 *                          $ref: '#/components/schemas/User'
 *          '401':
 *              description: User Not Logged In
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
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
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          '200':
 *              description: User Registered
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          '400':
 *              description: Registration Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
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
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          '200':
 *              description: User Logged In
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          '404':
 *              description: User Not Found
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
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
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          '200':
 *              description: User Updated
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          '401':
 *              description: User Not Logged In
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */