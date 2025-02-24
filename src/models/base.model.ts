// src/models/base.model.ts
import {
  Model,
  DataTypes,
  Optional,
  ModelAttributes,
  InitOptions,
  ModelStatic,
} from "sequelize";
import sequelize from "../config/sequelize.config";

interface IBaseAttributes {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export interface IBaseCreationAttributes
  extends Optional<IBaseAttributes, "id"> {}

export abstract class BaseModel<
  TModelAttributes extends IBaseAttributes,
  TCreationAttributes extends Optional<TModelAttributes, "id">
> extends Model<TModelAttributes, TCreationAttributes> {
  declare id: number;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at?: Date | null;

  static initializeModel<M extends Model>(
    this: ModelStatic<M>,
    attributes: ModelAttributes,
    options?: InitOptions
  ): void {
    const baseAttributes: ModelAttributes = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    };
    if (options?.paranoid) {
      baseAttributes.deleted_at = {
        type: DataTypes.DATE,
        allowNull: true,
      };
    }

    const combinedAttributes: ModelAttributes = {
      id: baseAttributes.id,
      ...attributes,
      ...baseAttributes,
    };

    this.init(combinedAttributes, {
      sequelize,
      modelName: this.name,
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: options?.paranoid || false,
      ...options,
    });
  }
}
