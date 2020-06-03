# Shopify Internship Backend Challenge

Hey! This is the project I created for the Shopify Backend internship.

## Project Setup

This project was built using Node.js.
Please visit [Node.js](https://nodejs.org/en/) to download it.

To get started, you need to get the following:

- A [Cloudinary](https://cloudinary.com) account
- A [PostgreSQL](https://www.postgresql.org/) database setup, either local or hosted
- A [Stripe](https://dashboard.stripe.com/register) account

In order to run the codebase, please perform the following steps:

1. `git clone https://github.com/rushigandhi/shopify-backend-challenge.git` to clone the repository
2. `cd shopify-backend-challenge` to enter the directory

3. Once you've setup the repository, please create a `.env` file in the root directory.
   Inside the `.env` file, please insert the following and save:

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_HOST=
JWT_SECRET_KEY=
JWT_EXPIRY_TIME_MS=
STRIPE_SECRET_KEY=
```

4. `npm install` to install all dependencies
5. `sequelize-cli db:migrate` to run the database migrations
6. `npm start` to start the server

## Testing

I have created a test folder inside the repository that mimics the folder structure of the codebase.

```
└───tests
│   │
│   └───integration
│   |    │   getImages.test.js
│   |    │   ...
|   |
│   └───unit
│       │
        └───routers
        |
        └───controllers
        |
        └───db
        |
        └───utils
```

To run the tests, make sure you're in the root directory and run `npm test`. I am currently working on adding all the tests to ensure 100% code coverage.

## Project Outline

The goal is to build an Image Repository API that enables users to:

- Users can upload one or multiple images
- Private or public image (permissions)
- Secure uploading and stored images to a reliable service ([Cloudinary](https://cloudinary.com))
- Users can edit images
- Users can delete one or multiple images
- Ensuring a secure deletion of images
- Access control to make sure that users can only edit/delete their own images
- Search images from text using their name and description properties
- Users can manage inventory (using Edit)
- Users can set price and discounts (using Edit)
- Users can pay other users and buy their images (this feature is experimental)

## Endpoints

- `POST /images/` for uploading images to your user
- `GET /images/` for getting all public images
- `GET /images/private` protected route for getting all your images
- `GET /images/search?tokens=token1,token2` for searching images with tokens
- `POST /users/register` for registering a user with an email and password
- `POST /users/login` to log in a user with an email and password, returns a JWT
- `DELETE /images/` protected route deleting your images
- `PATCH /images/:imageId` protected route updating an image you own
- `POST /payments` protected route purchasing images from other users

## Next Steps and Improvements

- Complete all the unit tests and integration test to ensure 100% code coverage
- Completely integrate Stripe to create a Stripe `customer` on register and allow for customer to customer payouts
- Containerize this server with Docker and host to allow for a reliable CI/CD pipeline
- Create a complete document with that outlines all the features, endpoints, requests/responses from those endpoints
