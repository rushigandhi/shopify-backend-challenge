var express = require("express");
var router = express.Router();
const multerUpload = require("../middleware/multer");
const images = require("../controllers/images.controller");
var passport = require("passport");
require("../middleware/passport");

router.get("/", images.getAllImages);
router.get(
  "/private",
  passport.authenticate("jwt", { session: false }),
  images.getUserImages
);
router.patch(
  "/:imageId",
  passport.authenticate("jwt", { session: false }),
  images.patchImage
);
router.post("/", multerUpload.array("image"), images.postImages);

module.exports = router;
