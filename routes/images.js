var express = require("express");
var router = express.Router();
const images = require("../controllers/images");

router.get("/images/", images.getAllImages);
router.post("/images", user.signup);

module.exports = router;
