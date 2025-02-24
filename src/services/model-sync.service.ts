import sequelize from "../config/sequelize.config";
import path from "path";
import fs from "fs";

// Object to hold all loaded models
const models: { [key: string]: any } = {};

// Function to dynamically import and register all models
const loadModels = () => {
  const modelsDir = path.join(__dirname, "../models");

  fs.readdirSync(modelsDir).forEach((file) => {
    if (
      file.endsWith("model.ts") ||
      (file.endsWith("model.js") && file !== "base.model.ts")
    ) {
      const modelPath = path.join(modelsDir, file);
      const model = require(modelPath).default;

      if (model && model.name) {
        models[model.name] = model;
      }
    }
  });
};

// Sync models with the database
export const syncModels = async () => {
  try {
    // Load models dynamically
    loadModels();

    // Sync all models at once
    await sequelize.sync({ alter: true });

    console.log("All models synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing models:", error);
    throw error;
  }
};

// Export models for use in other parts of the application
export default models;
