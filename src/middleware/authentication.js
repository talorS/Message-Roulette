import jwt from "jsonwebtoken";
import { env } from "process";

export const authGaurd = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = payload.username;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export const authSocket = (socket, next) => {
  const { token } = socket.handshake.auth; // receive the token from client
  if (token) {
    jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return next(new Error("Authentication error!"));
      }
      socket.user = payload.username;
      next();
    });
  } else {
    next(new Error("Request is missing token!"));
  }
};
