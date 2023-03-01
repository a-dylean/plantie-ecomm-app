const express = require('express');
loginRouter = express.Router();
const AuthService = require('../../services/authService');
const AuthServiceInstance = new AuthService();

  /**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticates a user
 *     tags: [Users]
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
 *         description: Internal server error
 *       401:
 *         description: Wrong credentials
 */

loginRouter.get('/', (req, res) => {
    res.render("login");
});

loginRouter.post('/', async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const response = await AuthServiceInstance.login({ email: email, password });
        res.status(200).send(response);
    } catch (err) {
        next(err);
    }
});

module.exports = loginRouter;