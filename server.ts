import 'module-alias/register';
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import router from "@routes/router";
import { createServer } from "http";
import { setupSocket } from "@utils/socketManager";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import mongoSanitize from 'express-mongo-sanitize';

//config
dotenv.config();
const PORT = +process.env.PORT || 8080;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(cors());
app.use(mongoSanitize());

// setup route path
app.use("/api", router);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  })
);

// create server and listen for requests
const server = createServer(app);
setupSocket(server)
  .then((socket) => {
    app.set("io", socket);
    server.listen(PORT, () => {
      console.log(`===== Server is running on port ${PORT} =====`);
    });
  })
  .catch((err) => console.error(err.message));
