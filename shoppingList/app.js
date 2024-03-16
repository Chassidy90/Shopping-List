require("dotenv").config();
require("express-async-errors");






// const xss = require("xss-clean");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const itemRouter = require("./routes/itemsRoutes.js");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// app.use(xss);

app.use("/api/v1/items", itemRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};



start();
