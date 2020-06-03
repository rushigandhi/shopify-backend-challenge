var expect = require("chai").expect;
var request = require("request");

describe("GET images", function () {
  it("GET all public images", function (done) {
    request("http://localhost:3000/images", function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      const result = JSON.parse('{
        "message": "Retrieved all public images successfully",
        "images": [
            {
                "id": "b08f9fa6-c171-4c93-be7b-78cd54a08ef1",
                "userId": "44146e7f-de6a-4313-97b0-64c7aeab30c3",
                "name": "Brownies",
                "description": "Chocolate brownies with chocolate chips and topped with coconut whipped cream.",
                "url": "http://res.cloudinary.com/dl8cf9yct/image/upload/v1591158725/Images/z9vskuw0pxdrmqwwbitl.jpg",
                "isPrivate": false,
                "quantity": 10,
                "price": 9.99,
                "discountPercentage": 5,
                "cloudinaryId": "Images/z9vskuw0pxdrmqwwbitl",
                "createdAt": "2020-06-03T04:32:03.548Z",
                "updatedAt": "2020-06-03T04:32:03.548Z"
            },
            {
                "id": "eef3e9a2-9292-4b79-af05-17e06f2f4a26",
                "userId": "94665943-3351-4f28-94ad-82d77661c4ed",
                "name": "Soccer ball",
                "description": "Classic black and white pentagon soccer ball.",
                "url": "http://res.cloudinary.com/dl8cf9yct/image/upload/v1591159539/Images/eilb2zax9e4kmqrqyvbx.jpg",
                "isPrivate": false,
                "quantity": 15,
                "price": 11.99,
                "discountPercentage": 5,
                "cloudinaryId": "Images/eilb2zax9e4kmqrqyvbx",
                "createdAt": "2020-06-03T04:45:36.927Z",
                "updatedAt": "2020-06-03T04:45:36.927Z"
            },
            {
                "id": "1a8cf477-80f3-4c08-ac01-d5fbdf820b42",
                "userId": "94665943-3351-4f28-94ad-82d77661c4ed",
                "name": "Basketball",
                "description": "Reddish-orange professional indoor game basketball.",
                "url": "http://res.cloudinary.com/dl8cf9yct/image/upload/v1591159539/Images/xgbwq1b3hfp4g7ha3c8y.jpg",
                "isPrivate": false,
                "quantity": 30,
                "price": 5.99,
                "discountPercentage": 0,
                "cloudinaryId": "Images/xgbwq1b3hfp4g7ha3c8y",
                "createdAt": "2020-06-03T04:45:37.099Z",
                "updatedAt": "2020-06-03T04:45:37.099Z"
            },
            {
                "id": "b9b80ecc-1959-4cfa-8afa-786b498b1aab",
                "userId": "44146e7f-de6a-4313-97b0-64c7aeab30c3",
                "name": "Prof",
                "description": "Beautiful dim yellow lights and polished countertops of a fine dining restaurant.",
                "url": "http://res.cloudinary.com/dl8cf9yct/image/upload/v1591158725/Images/x7co8yvs9rflly64qmhu.jpg",
                "isPrivate": false,
                "quantity": 15,
                "price": 10.99,
                "discountPercentage": 25,
                "cloudinaryId": "Images/x7co8yvs9rflly64qmhu",
                "createdAt": "2020-06-03T04:32:03.637Z",
                "updatedAt": "2020-06-03T04:49:38.257Z"
            }
        ]
    }')
      console.log(body);
      expect(body).to.equal();
    });
  });
});
