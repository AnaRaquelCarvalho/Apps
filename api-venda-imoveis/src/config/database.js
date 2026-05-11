// ==========================================
// src/config/database.js
// ==========================================

import { Sequelize } from "sequelize";

/**
 * 🔹 Verifica se está em ambiente de teste
 */
const isTest =
  process.env.NODE_ENV === "test";

/**
 * 🔹 Configuração SQLite
 */
const sequelize = new Sequelize({
  dialect: "sqlite",

  storage: isTest
    ? "./imoveis.test.db"
    : "./imoveis.db",

  logging: false,
});

/**
 * 🔹 Conectar banco
 */
export const connectDatabase =
  async () => {
    try {
      await sequelize.authenticate();

      console.log(
        `✅ Banco conectado: ${
          isTest
            ? "imoveis.test.db"
            : "imoveis.db"
        }`
      );
    } catch (error) {
      console.error(
        "❌ Erro ao conectar banco:",
        error
      );
    }
  };

export default sequelize;