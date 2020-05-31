var express = require("express");
var router = express.Router();
const images = require("../controllers/images");

router.post("/images", images.postImage);

module.exports = router;
