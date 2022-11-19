import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { authSocket } from "../middleware/authentication";

const { HOST: host, PUB_PORT: port, CLIENT_URL: origin } = process.env;

export const setupSocket = async (server) => {
  const io = new Server(server, {
    cors: {
      origin,
      methods: ["GET", "POST"],
    },
  });

  //midlleware;
  io.use((socket, next) => {
    authSocket(socket, next);
  });

  const pubClient = createClient({ host, port });
  const subClient = pubClient.duplicate();
  pubClient.on("ready", () => {
    console.log("Publisher connected to redis and ready to use");
  });
  subClient.on("ready", () => {
    console.log("Subscriber connected to redis and ready to use");
  });
  pubClient.on("error", (err) => console.log("Publisher Client Error", err));
  subClient.on("error", (err) => console.log("Subscriber Client Error", err));

  await Promise.all([pubClient.connect(), subClient.connect()]);
  io.adapter(createAdapter(pubClient, subClient));
  io.listen(server);
  //event listener
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
  return io;
};
