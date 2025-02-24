// src/models/user.model.ts
import { DataTypes } from "sequelize";
import { createModel } from "./model.factory";

// Define the attributes for the User model
const userAttributes = {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organisation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
};

// Enable soft delete and other options, including an index on the email field
const userOptions = {
  paranoid: true, // Enable soft delete
  indexes: [
    {
      unique: true,
      fields: ["email"], // Create a unique index on the email field
    },
  ],
};

// Create the User model using the factory function
const UserModel = createModel("User", userAttributes, userOptions);

export default UserModel;
