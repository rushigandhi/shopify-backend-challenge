const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.purchase = async (req, res, next) => {
  stripe.charges.create(
    {
      amount: 100,
      currency: "cad",
      source: "tok_visa",
      description: "Any description about the payment",
      metadata: {
        key: "hi",
      },
    },
    (err, charge) => {
      if (err) {
        console.log(err);
      } else {
        console.log(charge);
      }
    }
  );
};
