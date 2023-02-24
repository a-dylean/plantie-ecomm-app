const express = require("express");
const pool = require("../../db/database");
usersRouter = express.Router();

usersRouter.get('/register', (req, res) => {
    res.send("users info");
});



module.exports = usersRouter;