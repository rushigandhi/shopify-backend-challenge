"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      id: DataTypes.UUIDV4,
      user_id: DataTypes.UUIDV4,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      is_private: DataTypes.BOOLEAN,
    },
    {}
  );
  Image.associate = function (models) {
    // associations can be defined here
  };
  return Image;
};
