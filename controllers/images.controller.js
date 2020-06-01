const { uploadCloudinary } = require("../config/cloudinary");
const { createImage, getImages, getUserImages } = require("../db/image.db");
const fs = require("fs");

// Get all public images
exports.getAllImages = async (req, res, next) => {
  const images = await getImages();
  if (images) {
    res.status(200).json({
      message: "Retrieved all public images successfully",
      images,
    });
  } else {
    res.status(500).json({ error: "Could not retrieve all images" });
  }
};

// Get all user images
exports.getUserImages = async (req, res, next) => {
  const userId = req.user.dataValues.id;
  const images = await getUserImages(userId);
  if (images) {
    res.status(200).json({
      message: "Retrieved all user images successfully",
      images,
    });
  } else {
    res.status(500).json({ error: "Could not retrieve user images" });
  }
};

// Allows for bulk/singular image uploads
exports.postImages = async (req, res, next) => {
  const { images } = JSON.parse(req.body.data);
  const files = req.files;
  const uploadedImagesData = await Promise.all(
    files.map(async (file, index) => {
      const { path } = file;
      if (images && images.length >= 1 && images[index]) {
        const {
          userId,
          name,
          description,
          isPrivate,
          quantity,
          price,
          discountPercentage,
        } = images[index];
        const result = await uploadCloudinary(path, "Images");
        try {
          const newImage = await createImage(
            userId,
            name,
            description,
            result.url,
            isPrivate,
            quantity,
            price,
            discountPercentage
          );
        } catch (err) {
          res.sendStatus(500).json({
            error: "Could not save this image's data to the database",
            name,
          });
        }
        fs.unlinkSync(path);
        return { name, url: result.url };
      }
    })
  );
  res.status(200).json({
    message: "Images uploaded successfully",
    data: uploadedImagesData,
  });
};
