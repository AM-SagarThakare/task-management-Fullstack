const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require("dotenv/config")

const routes = require('

// middlewares
app.use(bodyParser.json())
app.use(cors())

// routes
app.use('/', routes )   //  routes