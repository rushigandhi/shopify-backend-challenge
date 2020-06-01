const models = require("../models");

const getUser = (email) => {
  return models.User.findOne({
    where: {
      email,
    },
    attributes: ["id", "email", "firstName", "lastName"],
  });
};

const getUserPrivateHash = (email) => {
  return models.User.findOne({
    where: {
      email,
    },
  });
};
const createUser = (firstName, lastName, email, passwordHash) => {
  return models.User.create({
    firstName,
    lastName,
    email,
    passwordHash,
  });
};
module.exports = {
  getUser,
  createUser,
  getUserPrivateHash,
};
