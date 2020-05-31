var express = require("express");
var router = express.Router();
const upload = require("../middleware/multer");
const images = require("../controllers/images");

router.post("/", upload.array("image"), images.postImage);

module.exports = router;
