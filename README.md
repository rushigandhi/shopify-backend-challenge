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
5. `npm start` to start the server

## Testing

I have created a test folder inside the repository with some sample tests that mimics the folder structure of the codebase.

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

The goal is to build an Image Repository API that enables
