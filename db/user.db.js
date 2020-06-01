const models = require("../models");

const getUser = (email) => {
  return models.User.findOne({
    where: {
      email,
    },
  });
};

module.exports = {
  createImage,
  getImages,
  getUserImages,
};
