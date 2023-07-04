import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { authSocket } from "@middleware/authentication";
import { env } from "process";
import { NextFunction } from "express";
import { ISocket } from "@types";

export const setupSocket = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true,
      methods: ["GET", "POST"],
    },
  });
  //middleware;
  io.use((socket: ISocket, next: NextFunction) => {
    authSocket(socket, next);
  });
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
  io.adapter(createAdapter(pubClient, subClient));
  return io;
};
