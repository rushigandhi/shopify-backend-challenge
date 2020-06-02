var express = require("express");
var router = express.Router();
const multerUpload = require("../middleware/multer");
const images = require("../controllers/images.controller");
var passport = require("passport");
require("../middleware/passport");

router.get("/", images.getAllImages);
router.get("/search", images.searchImages);
router.get(
  "/private",
  passport.authenticate("jwt", { session: false }),
  images.getUserImages
);
router.get(
  "/:imageId",
  passport.authenticate("jwt", { session: false }),
  images.getImageDetails
);
router.patch(
  "/:imageId",
  passport.authenticate("jwt", { session: false }),
  images.patchImage
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  multerUpload.array("image"),
  images.postImages
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  images.deleteImages
);

module.exports = router;
