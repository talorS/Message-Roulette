import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import router from "./src/routes/router";
import { createServer } from "http";
import { setupSocket } from "./src/utils/socketManager";

//config
dotenv.config();
const { PORT } = process.env || 3000;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(cors());

// setup route path
app.use("/api", router);

// create server and listen for requests
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`===== Server is running on port ${PORT} =====`);
});
setupSocket(server)
  .then((socket) => {
    app.set("io", socket);
  })
  .catch((err) => console.error(err.message));