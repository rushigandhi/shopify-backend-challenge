var expect = require("chai").expect;
var sinon = require("sinon");
var imagesDbService = require("../../../db/image.db");
var imagesController = require("../../../controllers/images.controller");
var mocks = require("node-mocks-http");
const response = mocks.createResponse();

describe("Images Controller", function () {
  const stubSearchResult = {
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
  const stub = sinon
    .stub(imagesDbService, "searchImages")
    .returns(stubSearchResult);

  it("searchImages", async function () {
    return new Promise(async (resolve) => {
      await imagesController.searchImages(
        { query: { tokens: "restaurant" } },
        response
      );
      expect(JSON.stringify(JSON.parse(response._getData()))).to.equal(
        JSON.stringify(stubSearchResult)
      );
      resolve();
    });
  });
});
