import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

export const decodeTokenHandler = (token) => {
  return jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
};
