const models = require("../models");

const createImage = (
  userId,
  name,
  description = "",
  url,
  isPrivate = true,
  quantity = 0,
  price = 0,
  discountPercentage = 0
) => {
  return models.Image.create({
    userId,
    name,
    description,
    url,
    isPrivate,
    quantity,
    price,
    discountPercentage,
  });
};

const getImages = () => {
  return models.Image.findAll({
    where: {
      isPrivate: false,
    },
  });
};

module.exports = {
  createImage,
  getImages,
};
