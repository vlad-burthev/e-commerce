import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { configDotenv } from "dotenv";

import { sequelize } from "./db/db.js";
import { models } from "./models/models.js";
import router from "./router/router.js";
import { errorHandleMiddleware } from "./middleware/errorHandleMiddleware.js";

configDotenv();
models;

const PORT = process.env.PORT || 6000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorHandleMiddleware);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(models);

    app.listen(PORT, console.log("[server]: start on PORT " + PORT));
  } catch (error) {
    console.log(error);
  }
};

startServer();
