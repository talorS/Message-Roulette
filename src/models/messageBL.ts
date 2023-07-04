import { getConnectedUsers, getRandomUsers } from "@utils/util";
import { Server } from "socket.io";

export const handleSpin = async (io: Server, num: number = 1) => {
  try {
    const users = await getConnectedUsers(io);
    if (!users.length) {
      throw new Error("No one is connected!");
    }
    const randomUsers = getRandomUsers(users, num);
    randomUsers.forEach((socketId) =>
      io.to(socketId).emit("message", "This message sent to you randomly")
    );
    return {
      status: 200,
      message: `sent a message to users: ${randomUsers.join(", ")}`,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const handleWild = (io: Server, num: number) => {
  return handleSpin(io, num);
};

export const handleBlast = (io: Server) => {
  try {
    io.sockets.emit("message", "This message sent to everyone");
    return {
      status: 200,
      message: `sent a message to all connected users`,
    };
  } catch (err) {
    return { status: 400, message: err.message };
  }
};
