const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv/config");

const routes = require("./Routes");

// middlewares
app.use(bodyParser.json());
app.use(cors());

app.use("/upload", express.static("upload"));

// routes
app.use("/", routes); //  routes

module.exports = app;
