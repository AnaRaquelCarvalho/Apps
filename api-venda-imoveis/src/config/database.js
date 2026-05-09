// ==========================================
// src/config/database.js
// ==========================================

import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",

  storage: "./imoveis.db",

  logging: false,
});

export const connectDatabase =
  async () => {
    try {
      await sequelize.authenticate();

      console.log(
        "✅ Banco SQLite conectado."
      );
    } catch (error) {
      console.error(
        "❌ Erro ao conectar banco:",
        error
      );
    }
  };

export default sequelize;