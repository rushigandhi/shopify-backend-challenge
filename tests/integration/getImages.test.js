var expect = require("chai").expect;
var request = require("request");

describe("GET images", function () {
  it("GET searched public images", function (done) {
    request("http://localhost:3000/images/search?tokens=restaurant", function (
      error,
      response,
      body
    ) {
      const restaurantSearchedImages = {
        message: "Retrieved search results successfully",
        results: [
          {
            "0": {
              id: "b9b80ecc-1959-4cfa-8afa-786b498b1aab",
              userId: "44146e7f-de6a-4313-97b0-64c7aeab30c3",
              name: "Prof",
              description:
                "Beautiful dim yellow lights and polished countertops of a fine dining restaurant.",
              url:
                "http://res.cloudinary.com/dl8cf9yct/image/upload/v1591158725/Images/x7co8yvs9rflly64qmhu.jpg",
              isPrivate: false,
              quantity: 15,
              price: 10.99,
              discountPercentage: 25,
              cloudinaryId: "Images/x7co8yvs9rflly64qmhu",
              createdAt: "2020-06-03T04:32:03.637Z",
              updatedAt: "2020-06-03T04:49:38.257Z",
            },
          },
        ],
      };
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal(JSON.stringify(restaurantSearchedImages));
      done();
    });
  });
});
