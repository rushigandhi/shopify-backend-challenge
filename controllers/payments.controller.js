const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createImage, getImage } = require("../db/image.db");

exports.purchase = async (req, res, next) => {
  const { imageId, quantity } = req.body;
  const image = await getImage(imageId);

  if (quantity > image.quantity || image.userId == req.user.dataValues.id) {
    res.status(400).json({ error: "Invalid quantity or user" });
  }
  stripe.charges.create(
    {
      amount: 100,
      currency: "cad",
      source: "tok_visa",
      description: "Any description about the payment",
    },
    async (err, charge) => {
      if (err) {
        res.status(500).json({ error: "Payment did not process" });
      } else {
        const newImage = await createImage(
          req.user.dataValues.id,
          image.name,
          image.description,
          image.url,
          image.cloudinaryId,
          image.isPrivate,
          quantity,
          image.price,
          image.discountPercentage
        );
        res.status(200).json({
          message: "Purchases images successfully",
        });
      }
    }
  );
};
