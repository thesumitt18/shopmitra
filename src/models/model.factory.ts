import { ModelAttributes, InitOptions, Optional } from "sequelize";
import { BaseModel } from "./base.model";
import sequelize from "../config/sequelize.config";

// Type for the dynamic model attributes that extends IBaseAttributes
interface IDynamicModelAttributes {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  [key: string]: any;
}

// Type for creation attributes
type DynamicCreationAttributes = Optional<IDynamicModelAttributes, "id">;

// Type for factory options
type ModelFactoryOptions = Omit<InitOptions, "sequelize" | "modelName"> & {
  paranoid?: boolean;
};

export function createModel(
  modelName: string,
  attributes: ModelAttributes,
  options: ModelFactoryOptions = {}
) {
  // Create a new class that extends BaseModel with proper typing
  class DynamicModel extends BaseModel<
    IDynamicModelAttributes,
    DynamicCreationAttributes
  > {
    [key: string]: any;
  }

  // Initialize the model using the base class method
  DynamicModel.initializeModel(attributes, {
    sequelize, // Add the sequelize instance
    modelName,
    ...options,
  });

  return DynamicModel;
}
