import jwt from "jsonwebtoken";
import { env } from "process";

export const getToken = (username) => {
  try {
    const accessToken = jwt.sign({ username }, env.ACCESS_TOKEN_SECRET, {
      expiresIn: env.EXPIRY,
    });
    return { status: 200, messeage: accessToken };
  } catch (err) {
    return { status: 400, messeage: err };
  }
};
