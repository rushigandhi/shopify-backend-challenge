// import all the dependencies
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
dotenv.config();

// router imports
var indexRouter = require("./routes/index");
var imagesRouter = require("./routes/images.route");
var usersRouter = require("./routes/users.route");
var paymentsRouter = require("./routes/payments.route");
require("./middleware/passport");

// start express
var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// use routers
app.use("/", indexRouter);
app.use("/images", imagesRouter);
app.use("/users", usersRouter);
app.use("/payments", paymentsRouter);

module.exports = app;
