const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require('./database');
const checkIfUserExists = require('./helpers');

passport.use(new localStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
        try {
            pool.query(checkIfUserExists(email)).then((response) => {
                if (response.rowCount === 0) {
                    return done(null, false, {message: "User not found!"});
                }
            })
            const findPassword = `SELECT password FROM users WHERE email = '${email}';`
            pool.query(findPassword).then((response) => {
                const passwordMatches = bcrypt.compare(password, response);
                if (!passwordMatches) {
                return done(null,false, {message: "Wrong password!"});
            }
            return done(null, user);
            })
        } catch (err) {
            return done(err) //app error
        }
    }
));

passport.serializeUser((user, done) => {
    console.log("in serialize. user: ", user);
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    console.log("in deserialize. user: ", user);
    done(null, user);
  });