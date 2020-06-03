const { getImage } = require("../db/image.db");

// Helper util function that returns whether the User owns the image
const isOwner = async (userId, imageId) => {
  const image = await getImage(imageId);
  return image.userId == userId;
};

module.exports = {
  isOwner,
};
