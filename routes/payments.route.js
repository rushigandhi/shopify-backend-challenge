var express = require("express");
var router = express.Router();
const payments = require("../controllers/payments.controller");
var passport = require("passport");
require("../middleware/passport");

/* Auth Endpoints. */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  payments.purchase
);

module.exports = router;
