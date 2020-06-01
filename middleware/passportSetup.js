const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require("bcrypt");
const { getUser } = require("../db/user.db");

const secretKey = procress.env.SECRET;

passport.use(
  new LocalStrategy(
    {
      usernameField: email,
      passwordField: password,
    },
    async (email, password, done) => {
      try {
        const user = await getUser(email);
        const passwordsMatch = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (passwordsMatch) {
          return done(null, user);
        } else {
          return done("Incorrect email or password provided");
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: (req) => req.cookies.jwt,
      secretOrKey: secretKey,
    },
    (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done("Provided JWT has expired");
      }

      return done(null, jwtPayload);
    }
  )
);
