const express = require("express");
registerRouter = express.Router();
const { generateHash } = require("../../../utils/helpers");
const AuthService = require("../services");
const AuthServiceInstance = new AuthService();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registers a new user
 *     description: Creates a new user in the system.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *                 name: Bob
 *                 surname: Jackson
 *                 email: test@test.com
 *                 password: securepassword
 *                 phone: +33 00 00 0000
 *                 address: test
 *
 *     responses:
 *       200:
 *         description: Successful user registration. The response will contain the User object that was registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 *       409:
 *         description: User with such email already exists.
 */

registerRouter.get("/", (req, res) => {
  res.render("register");
});

registerRouter.post("/", async (req, res, next) => {
  const { name, surname, email, phone, address, password } = req.body;
  const hashedPassword = await generateHash(password);
  try {
    const response = await AuthServiceInstance.register({
      name,
      surname,
      email,
      phone,
      address,
      password: hashedPassword,
    });
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = registerRouter;
