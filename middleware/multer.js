const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const supportedFormats = ["image/jpeg", "image/png"];
  if (supportedFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb({ message: "Please use a valid file type!" }, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
