import { User } from "@prisma/client";
import passport from "passport";
import passportLocal from "passport-local";
import { AuthService } from "../features/auth/services";
const AuthServiceInstance = new AuthService();

const LocalStrategy = passportLocal.Strategy;

// is is still usefull ? 
passport.use(
  new LocalStrategy(
    async (email: User["email"], password: User["password"], done) => {
      try {
        const user = await AuthServiceInstance.login({email, password});
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// passport.serializeUser(function(user, done) { done(null, user) });
// passport.deserializeUser(function(user: Express.User, done) { done(null, user) });