const models = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

const createImage = (
  userId,
  name,
  description = "",
  url,
  cloudinaryId,
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
    cloudinaryId,
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

const getUserImages = (userId) => {
  return models.Image.findAll({
    where: {
      userId,
    },
  });
};

const getImage = (imageId) => {
  return models.Image.findOne({
    where: {
      id: imageId,
    },
  });
};

const searchImages = (token) => {
  return models.Image.findAll({
    where: {
      isPrivate: false,
      [Op.or]: [
        {
          name: {
            [Op.iLike]: token,
          },
        },
        {
          description: {
            [Op.iLike]: token,
          },
        },
      ],
    },
  });
};

const updateImage = (imageId, updateBody) => {
  return models.Image.update(updateBody, {
    where: {
      id: imageId,
    },
  });
};

const deleteImage = (imageId) => {
  return models.Image.destroy({
    where: {
      id: imageId,
    },
  });
};

module.exports = {
  createImage,
  getImages,
  getUserImages,
  updateImage,
  getImage,
  deleteImage,
  searchImages,
};
