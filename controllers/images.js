const { uploadCloudinary } = require("../config/cloudinary");
const fs = require("fs");
const models = require("../models/");

exports.postImage = async (req, res, next) => {
  const uploader = async (path) => await uploadCloudinary(path, "Images");
  const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    const newImage = await models.Image.create({
      userId: "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
      name: "Rushi Gandhi",
      description: "Profile Picture",
      url: newPath.url,
      isPrivate: true,
      quantity: 5,
      price: 21.99,
      discountPercentage: 0,
    });

    fs.unlinkSync(path);
  }

  res.status(200).json({
    message: "images uploaded successfully",
    data: urls,
  });
};
