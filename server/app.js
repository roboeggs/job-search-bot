import express from 'express';
import cors from 'cors';

//const bodyParser = require("body-parser");

import router from "./routes/index.js";
import AppError from "./utils/appError/index.js";
import errorHandler from "./utils/errorHandler/index.js";
const app = express();



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

export default app;