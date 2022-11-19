import jwt from "jsonwebtoken";
const { ACCESS_TOKEN_SECRET: secretKey } = process.env;

export const authGaurd = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, secretKey, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export const authSocket = (socket, next) => {
  const { token } = socket.handshake.auth; // receive the token from client
  if (token) {
    jwt.verify(token, secretKey, (err, payload) => {
      if (err) {
        return next(new Error("Authentication error!"));
      }
      socket.decode = payload.data;
      next();
    });
  } else {
    next(new Error("Request is missing token!"));
  }
};
