const express = require('express');
loginRouter = express.Router();
const AuthService = require('../services');
const AuthServiceInstance = new AuthService();
  /**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticates a user
 *     description: Authenticates a user in the system.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: 
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *                 email: "test@test.com"
 *                 password: "securepassword"
 *     responses:
 *       200:
 *         description: Successful user authentication. The response will contain the User object that was authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 *       401:
 *         description: Wrong credentials.
 */

loginRouter.get('/', (req, res) => {
    res.render("login");
});

loginRouter.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const response = await AuthServiceInstance.login(data);
        res.status(200).send(response);
    } catch (err) {
        next(err);
    }
});

module.exports = loginRouter;