require("dotenv").config();
require("express-async-errors");

const xss = require("xss-clean");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const Router = require('./routes/items.routes')

app.use(express.json())
app.use(xss)

app.use('/items',items)

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

