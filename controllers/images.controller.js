const { uploadCloudinary } = require("../config/cloudinary");
const { createImage } = require("../db/images.db");
const fs = require("fs");

exports.postImages = async (req, res, next) => {
  const uploader = async (path) => await uploadCloudinary(path, "Images");
  const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    const newImage = await createImage(
      "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
      "Rushi Gandhi",
      "DP",
      newPath.url
    );
    fs.unlinkSync(path);
  }

  res.status(200).json({
    message: "images uploaded successfully",
    data: urls,
  });
};
