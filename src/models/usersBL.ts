import jwt from "jsonwebtoken";
import { env } from "process";

export const getToken = (username: string) => {
  try {
    const accessToken = jwt.sign({ username }, env.ACCESS_TOKEN_SECRET, {
      expiresIn: env.EXPIRY,
    });
    return { status: 200, message: `Bearer ${accessToken}` };
  } catch (err) {
    return { status: 400, message: err };
  }
};
