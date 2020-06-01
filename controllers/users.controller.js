const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUser, createUser } = require("../db/user.db");
const {
  validateEmail,
  validatePassword,
} = require("../utils/registerValidation");

// Register User
exports.register = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).json({
      error: "Please use valid email and password inputs",
    });
  }
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const existingUser = await getUser(email);

    if (existingUser) {
      return res.status(400).json({
        error: "This email already exists",
      });
    }

    const newUser = await createUser(firstName, lastName, email, passwordHash);

    res.status(200).send({
      message: "User created successfully",
      user: {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (err) {
    return res.status(400).json({
      error: "Unable to register user",
    });
  }
};

// Log in User
exports.login = async (req, res, next) => {
  // Login authenticate with Local Strategy, will return a jwt
  passport.authenticate("local", { session: false }, (err, user) => {
    if (!user || err) {
      res.status(400).json({ error: err });
    }
    const jwtPayload = {
      username: user.email,
      expires: Date.now() + parseInt(process.env.JWT_EXPIRY_TIME_MS),
    };
    req.login(jwtPayload, { session: false }, (err) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      const jwtToken = jwt.sign(jwtPayload, process.env.SECRET_KEY);
      res.status(200).send({ message: "Log in successful", token: jwtToken });
    });
  })(req, res);
};
