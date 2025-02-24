import sequelize from "../config/sequelize.config";
import { syncModels } from "./model-sync.service";
export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
    await syncModels();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
