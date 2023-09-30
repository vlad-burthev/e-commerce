import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

export const generateJwt = (id, email, role) => {
  const token = jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });

  return token;
};
