const express = require('express');
loginRouter = express.Router();
const AuthService = require('../../services/authService');
const AuthServiceInstance = new AuthService();

loginRouter.get('/', (req, res) => {
    res.render("login");
});

loginRouter.post('/', async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const response = await AuthServiceInstance.login({ email: email, password });
        res.status(200).send(response);
    } catch (err) {
        res.status(500).json({ message: "ERROR"})
    }
});

module.exports = loginRouter;