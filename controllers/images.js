const { uploadCloudinary } = require("../config/cloudinary");
const fs = require("fs");

exports.postImage = async (req, res, next) => {
  const uploader = async (path) => await uploadCloudinary(path, "Images");
  const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }

  res.status(200).json({
    message: "images uploaded successfully",
    data: urls,
  });
};
