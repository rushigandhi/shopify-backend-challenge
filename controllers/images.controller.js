const { cloudinaryUpload, cloudinaryDelete } = require("../config/cloudinary");
const { isOwner } = require("../utils/checkOwner");
const {
  createImage,
  getImages,
  getUserImages,
  updateImage,
  getImage,
  deleteImage,
  searchImages,
} = require("../db/image.db");
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

// Search Images
exports.searchImages = async (req, res, next) => {
  const tokens = req.query.tokens.split(",");
  const results = await Promise.all(
    tokens.map(async (token) => {
      try {
        const searchResults = await searchImages("%" + token + "%");
        return { ...searchResults };
      } catch (err) {
        res.sendStatus(500).json({
          error: "Could not retrieve search results",
          name,
        });
      }
    })
  );
  res.status(200).json({
    message: "Retrieved search results successfully",
    results,
  });
};

// Get one image
exports.getImageDetails = async (req, res, next) => {
  const { imageId } = req.params;
  const userId = req.user.dataValues.id;
  const isImageOwner = await isOwner(userId, imageId);
  if (!isImageOwner) {
    res.status(403).json({ error: "You do not own this image" });
  }
  const result = await getImage(imageId);
  if (result) {
    res.status(200).json({
      message: "Retrieved image successfully",
      image: result,
    });
  } else {
    res.status(500).json({ error: "Could not patch image" });
  }
};

// Patch user images
exports.patchImage = async (req, res, next) => {
  const { imageId } = req.params;
  const userId = req.user.dataValues.id;
  const isImageOwner = await isOwner(userId, imageId);
  if (!isImageOwner) {
    res.status(403).json({ error: "You do not own this image" });
  }
  const result = await updateImage(imageId, req.body);
  if (result) {
    res.status(200).json({
      message: "Patched image successfully",
    });
  } else {
    res.status(500).json({ error: "Could not patch image" });
  }
};

// Allows for bulk/singular image uploads
exports.postImages = async (req, res, next) => {
  const { images } = JSON.parse(req.body.data);
  const userId = req.user.dataValues.id;
  const files = req.files;
  const uploadedImagesData = await Promise.all(
    files.map(async (file, index) => {
      const { path } = file;
      if (images && images.length >= 1 && images[index]) {
        const {
          name,
          description,
          isPrivate,
          quantity,
          price,
          discountPercentage,
        } = images[index];
        const result = await cloudinaryUpload(path, "Images");
        try {
          const newImage = await createImage(
            userId,
            name,
            description,
            result.url,
            result.cloudinaryId,
            isPrivate,
            quantity,
            price,
            discountPercentage
          );
          return { name, id: newImage.id, url: result.url };
        } catch (err) {
          res.sendStatus(500).json({
            error: "Could not save this image's data to the database",
            name,
          });
        }
        fs.unlinkSync(path);
      }
    })
  );
  res.status(200).json({
    message: "Images uploaded successfully",
    data: uploadedImagesData,
  });
};

// Allows for bulk/singular image deletes
exports.deleteImages = async (req, res, next) => {
  const { imageIds } = req.body;
  const userId = req.user.dataValues.id;
  imageIds.forEach(async (id) => {
    const isImageOwner = await isOwner(userId, id);
    if (!isImageOwner) {
      res.status(403).json({ error: "You do not own this image" });
    }
    try {
      const image = await getImage(id);
      const deleteCloudinaryResult = await cloudinaryDelete(image.cloudinaryId);
      try {
        const deleteFromDatabase = await deleteImage(id);
      } catch (err) {
        res.status(500).json({
          message: "Could not delete images",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Could not delete images",
      });
    }
  });
  res.status(200).json({
    message: "Deleted all images",
  });
};
