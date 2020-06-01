const { getImage } = require("../db/image.db");

const isOwner = async (userId, imageId) => {
  const image = await getImage(imageId);
  return image.userId == userId;
};

module.exports = {
  isOwner,
};
