const express = require('express');
const app = express();
let cors = require('cors')

//const bodyParser = require("body-parser");

const router = require("./routes");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");




app.use(
    cors({
    // Allow requests from all domains.
      origin: "*",
    })
);

app.use('/api', router);

app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});

app.use(errorHandler);

module.exports = app;