const express = require('express');
registerRouter = express.Router();
const { generateHash } = require('../../utils/helpers');
const AuthService = require('../../services/authService');
const AuthServiceInstance = new AuthService();

registerRouter.get('/', (req, res) => {
    res.render("register");
});

registerRouter.post('/', async (req, res, next) => {
    const { name, surname, email, phone, address, password } = req.body;
    const hashedPassword = await generateHash(password);
    try {
        const response = await AuthServiceInstance.register({ name, surname, email, phone, address, password: hashedPassword });
        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "ERROR"})
    }
});

module.exports = registerRouter;