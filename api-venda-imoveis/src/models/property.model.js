// ==========================================
// src/models/property.model.js
// ==========================================

import { DataTypes } from "sequelize";

import sequelize from "../config/database.js";

const Property = sequelize.define(
  "Property",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    area: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "imoveis",

    /**
     * 🔹 IMPORTANTE
     * Desativa createdAt e updatedAt
     * porque sua tabela SQLite não possui
     * essas colunas.
     */
    timestamps: false,
  }
);

export default Property;