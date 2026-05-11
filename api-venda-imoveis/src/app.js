import express from "express";
import { Sequelize, DataTypes } from "sequelize";
import propertyRoutes from "./routes/property.routes.js";

const app = express();
const port = 3000;

/**
 * 🔹 Middleware
 */
app.use(express.json());

/**
 * 🔹 Ambiente
 */
const isTest =
  process.env.NODE_ENV === "test";

/**
 * 🔹 Configuração Sequelize + SQLite
 */
const sequelize = new Sequelize({
  dialect: "sqlite",

  storage: isTest
    ? "./imoveis.test.db"
    : "./imoveis.db",

  logging: false,
});

/**
 * 🔹 Model de Imóveis
 */
const Property = sequelize.define(
  "Property",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
     * 🔹 Evita erro createdAt/updatedAt
     */
    timestamps: false,
  }
);

/**
 * 🔹 Inserir imóveis automáticos
 */
const seedDatabase = async () => {

  const total =
    await Property.count();

  if (total === 0) {

    await Property.bulkCreate([
      {
        title: "Casa Moderna",
        description:
          "Casa com piscina e área gourmet",
        price: 850000,
        type: "Casa",
        address: "Rua A, 123",
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
      },

      {
        title: "Apartamento Luxo",
        description:
          "Apartamento com vista para o mar",
        price: 650000,
        type: "Apartamento",
        address: "Av Central, 500",
        bedrooms: 2,
        bathrooms: 2,
        area: 120,
      },

      {
        title: "Cobertura Premium",
        description:
          "Cobertura duplex com piscina",
        price: 1200000,
        type: "Cobertura",
        address: "Rua das Flores, 900",
        bedrooms: 4,
        bathrooms: 4,
        area: 320,
      },
    ]);

    console.log(
      "✅ Imóveis iniciais criados."
    );
  }
};

/**
 * 🔹 Rota principal
 */
app.get("/", (req, res) => {
  res.redirect("/imoveis");
});

/**
 * 🔹 Atalho amigável
 */
app.get("/listar", (req, res) => {
  res.redirect("/imoveis");
});

/**
 * 🔹 Atalho Health
 */
app.get("/status", (req, res) => {
  res.redirect("/health");
});

/**
 * 🔹 Criar imóvel
 */
app.post("/imoveis", async (req, res) => {

  try {

    const property =
      await Property.create(req.body);

    res.status(201).json(property);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});

/**
 * 🔹 Listar imóveis
 */
app.get("/imoveis", async (req, res) => {

  try {

    const properties =
      await Property.findAll();

    res.status(200).json(properties);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});

/**
 * 🔹 Buscar imóvel por ID
 */
app.get("/imoveis/:id", async (req, res) => {

  try {

    const property =
      await Property.findByPk(
        req.params.id
      );

    if (!property) {

      return res.status(404).json({
        message:
          "Imóvel não encontrado",
      });
    }

    res.status(200).json(property);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});

/**
 * 🔹 Atualizar imóvel
 */
app.put("/imoveis/:id", async (req, res) => {

  try {

    const property =
      await Property.findByPk(
        req.params.id
      );

    if (!property) {

      return res.status(404).json({
        message:
          "Imóvel não encontrado",
      });
    }

    await property.update(req.body);

    res.status(200).json(property);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});

/**
 * 🔹 Deletar imóvel
 */
app.delete(
  "/imoveis/:id",
  async (req, res) => {

    try {

      const property =
        await Property.findByPk(
          req.params.id
        );

      if (!property) {

        return res.status(404).json({
          message:
            "Imóvel não encontrado",
        });
      }

      await property.destroy();

      res.status(204).send();

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

/**
 * 🔹 Health Check
 */
app.get("/health", (req, res) => {

  res.status(200).json({
    status: "OK",
    message:
      "API funcionando 🚀",
  });
});

/**
 * 🔹 Rotas adicionais
 */
app.use("/", propertyRoutes);

app.use(
  "/api/properties",
  propertyRoutes
);

/**
 * 🔹 404
 */
app.use((req, res) => {

  res.status(404).json({
    error: "Rota não encontrada",
  });
});

/**
 * 🔹 Middleware global de erro
 */
app.use((err, req, res, next) => {

  const status =
    err.statusCode || 500;

  res.status(status).json({
    error:
      err.message ||
      "Erro interno",
  });
});

/**
 * 🔹 Variável do servidor
 */
let server;

/**
 * 🔹 Inicialização única do servidor
 */
const startServer = async () => {

  try {

    /**
     * 🔹 Conectar banco
     */
    await sequelize.authenticate();

    console.log(
      "✅ Conectado ao SQLite."
    );

    /**
     * 🔹 Criar tabelas automaticamente
     */
    await sequelize.sync();

    console.log(
      "✅ Tabelas sincronizadas."
    );

    /**
     * 🔹 Inserir imóveis iniciais
     */
    if (!isTest) {
      await seedDatabase();
    }

    /**
     * 🔹 Inicializar servidor
     */
    server = app.listen(port, () => {

      console.log(
        `🚀 API rodando em http://localhost:${port}`
      );
    });

  } catch (error) {

    console.error(
      "❌ Erro ao iniciar servidor:",
      error
    );
  }
};

/**
 * 🔹 NÃO iniciar servidor durante testes
 */
if (!isTest) {
  startServer();
}

/**
 * 🔹 EXPORTS
 */
export {
  Property,
  server,
  sequelize,
  startServer,
};

export default app;