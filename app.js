const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
const port = process.env.PORT || 3010;

// Middlewares
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Import Routes
const usersController = require("./controllers/UsersController");
app.use("/users", usersController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome the nodejs-boilerplate");
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("[DB]: connected");
});

console.log(`[App]: is listening on the port: ${port}`);
app.listen(port);
