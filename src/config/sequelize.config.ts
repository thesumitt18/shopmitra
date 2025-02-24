import { Dialect, Sequelize } from "sequelize";
import dbConfig from "./database.config";
const env = process.env.NODE_ENV || "development";
const config = dbConfig[env as keyof typeof dbConfig];
if (!config) {
  throw new Error(`No database configuration found for environment: ${env}`);
}
if (
  typeof config.database !== "string" ||
  typeof config.username !== "string" ||
  typeof config.password !== "string" ||
  typeof config.host !== "string" ||
  typeof config.dialect !== "string" ||
  typeof config.dialectOptions !== "object"
) {
  throw new Error(`Invalid database configuration for environment: ${env}`);
}
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect as Dialect,
    ...(config.dialectOptions && { dialectOptions: config.dialectOptions }),
  }
);
export default sequelize;
