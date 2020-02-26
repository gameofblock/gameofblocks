import passport from "koa-passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";

import { findById, findByUsername } from "../db/user";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async (username, password, done) => {
      try {
        const user = await findByUsername(username);
        if (!user) {
          done("Unknown user");
        } else {
          bcrypt.compare(password, user.password, (err, passwordCorrect) => {
            if (err) {
              done(err);
            } else if (!passwordCorrect) {
              done("Invalid password");
            } else {
              done(null, user);
            }
          });
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

export default passport;
