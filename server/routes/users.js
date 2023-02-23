const express = require("express");
const pool = require("../database");
const passport = require("passport");
const bcrypt = require("bcrypt");
usersRouter = express.Router();
const checkIfUserExists = require("../helpers");
require('../passport'); 
usersRouter.get('/register', (req, res) => {
    res.render("register");
});


usersRouter.post('/register', async (req, res) => {
    const { name, surname, email, phone, address, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    pool.query(checkIfUserExists(email)).then((response) => {
        console.log(response)
        if (response.rowCount >= 1) {
            res.send("User with such email already exists!")
           // res.redirect("login")
        } else {
           const insertSTMT = `INSERT INTO users (name, surname, email, phone, address, password) VALUES ('${name}' , '${surname}', '${email}', '${phone}', '${address}', '${hashedPassword}');`
    
            pool.query(insertSTMT).then((response) => {
                console.log("Data saved")
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })

            res.send("You have successfully registered!"); 
                }
            })
});

usersRouter.get('/login', (req, res) => {
    res.render("login");
});

usersRouter.post(
    '/login',
    passport.authenticate("local", { failureRedirect: "/users/login"}),
    (req, res) => {
        //res.redirect("../");
        res.send("Welcome!")
    }
);


module.exports = usersRouter;