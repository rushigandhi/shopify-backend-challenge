var express = require("express");
var router = express.Router();
const users = require("../controllers/users.controller");

/* Auth Endpoints. */
router.get("/register", user.register);
router.get("/login", user.login);

module.exports = router;
