"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: DataTypes.UUIDV4,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      isPrivate: DataTypes.BOOLEAN,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      discountPercentage: DataTypes.FLOAT,
      cloudinaryId: DataTypes.STRING,
    },
    {}
  );
  Image.associate = function (models) {
    // associations can be defined here
  };
  return Image;
};
