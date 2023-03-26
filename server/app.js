import express from 'express';
import cors from 'cors';


import router from "./routes/index.js";
import AppError from "./utils/appError/index.js";
import errorHandler from "./utils/errorHandler/index.js";
const app = express();
const PORT = 9000;



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

app.listen(PORT, (error) => {       // Listen
  if(!error)
      console.log("Server is Successfully Running, and App is listening on port "+ PORT)
  else
      console.log("Error occurred, server can't start", error);
  }
);

app.use(errorHandler);

export default app;