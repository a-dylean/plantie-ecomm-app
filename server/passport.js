const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const AuthService = require('./services/authService');
const AuthServiceInstance = new AuthService();

const bcrypt = require("bcrypt");
const pool = require('./db/database');
const checkIfUserExists = require('./utils/helpers');

passport.use(new localStrategy(
    async (email, password, done) => {
        try {
          const user = await AuthServiceInstance.login({ email: email, password });
          return done(null, user);
        } catch (err) {
            return done(err)
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
