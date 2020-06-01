var express = require("express");
var router = express.Router();
const multerUpload = require("../middleware/multer");
const images = require("../controllers/images.controller");

router.get("/", images.getAllImages);
router.get("/:userId", images.getUserImages);
router.post("/", multerUpload.array("image"), images.postImages);

module.exports = router;
