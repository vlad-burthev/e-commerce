import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize";

configDotenv();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_OWNER,
  process.env.DB_PASS,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);
