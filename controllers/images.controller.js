const { uploadCloudinary } = require("../config/cloudinary");
const { createImage } = require("../db/images.db");
const fs = require("fs");

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
        } catch (e) {
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
