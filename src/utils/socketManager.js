import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { authSocket } from "../middleware/authentication";
import { env } from "process";

export const setupSocket = async (server) => {
  const pubClient = createClient({ url: env.URL });
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
  const io = new Server(server, {
    adapter: createAdapter(pubClient, subClient),
    cors: {
      origin: env.CLIENT_URL,
      credentials: true,
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling", "flashsocket"],
  });

  //midlleware;
  io.use((socket, next) => {
    authSocket(socket, next);
  });

  //event listener
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};
