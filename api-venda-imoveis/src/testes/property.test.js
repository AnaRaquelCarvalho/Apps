// ==========================================
// tests/property.test.js
// ==========================================

import request from "supertest";

import app, {
  Property,
  sequelize,
  server,
} from "../app.js";

let propertyId;

describe("🏠 API de Imóveis", () => {

  /**
   * 🔹 Preparar banco antes dos testes
   */
  beforeAll(async () => {

    /**
     * 🔹 Criar tabelas
     */
    await sequelize.sync({ force: true });

    /**
     * 🔹 Inserir imóvel inicial
     */
    const property =
      await Property.create({
        title: "Casa Teste",
        description: "Descrição teste",
        price: 500000,
        type: "Casa",
        address: "Rua Teste",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
      });

    propertyId = property.id;

  });

  /**
   * 🔹 Fechar conexões após testes
   */
  afterAll(async () => {

    /**
     * 🔹 Fechar conexão SQLite
     */
    await sequelize.close();

    /**
     * 🔹 Fechar servidor SOMENTE se existir
     */
    if (server) {
      server.close();
    }

  });

  // ==========================================
  // HEALTH CHECK
  // ==========================================

  describe("GET /health", () => {

    it("deve retornar API funcionando", async () => {

      const response = await request(app)
        .get("/health");

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty(
        "status",
        "OK"
      );
    });
  });

  // ==========================================
  // LISTAR IMÓVEIS
  // ==========================================

  describe("GET /imoveis", () => {

    it("deve listar imóveis", async () => {

      const response = await request(app)
        .get("/imoveis");

      expect(response.status).toBe(200);

      expect(Array.isArray(response.body))
        .toBe(true);

      expect(response.body.length)
        .toBeGreaterThan(0);
    });
  });

  // ==========================================
  // BUSCAR POR ID
  // ==========================================

  describe("GET /imoveis/:id", () => {

    it("deve buscar imóvel existente", async () => {

      const response = await request(app)
        .get(`/imoveis/${propertyId}`);

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty(
        "title"
      );
    });

    it("deve retornar 404 para imóvel inexistente", async () => {

      const response = await request(app)
        .get("/imoveis/999");

      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty(
        "message",
        "Imóvel não encontrado"
      );
    });
  });

  // ==========================================
  // CRIAR IMÓVEL
  // ==========================================

  describe("POST /imoveis", () => {

    it("deve criar um novo imóvel", async () => {

      const novoImovel = {
        title: "Casa Teste",
        description: "Casa automatizada",
        price: 500000,
        type: "Casa",
        address: "Rua Teste",
        bedrooms: 2,
        bathrooms: 1,
        area: 90,
      };

      const response = await request(app)
        .post("/imoveis")
        .send(novoImovel);

      expect(response.status).toBe(201);

      expect(response.body).toHaveProperty(
        "id"
      );

      expect(response.body.title)
        .toBe("Casa Teste");
    });

    it("deve falhar ao criar imóvel inválido", async () => {

      const response = await request(app)
        .post("/imoveis")
        .send({});

      expect(response.status).toBe(500);
    });
  });

  // ==========================================
  // ATUALIZAR IMÓVEL
  // ==========================================

  describe("PUT /imoveis/:id", () => {

    it("deve atualizar imóvel", async () => {

      const response = await request(app)
        .put(`/imoveis/${propertyId}`)
        .send({
          title: "Casa Atualizada",
        });

      expect(response.status).toBe(200);

      expect(response.body.title)
        .toBe("Casa Atualizada");
    });

    it("deve retornar 404 ao atualizar imóvel inexistente", async () => {

      const response = await request(app)
        .put("/imoveis/999")
        .send({
          title: "Teste",
        });

      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty(
        "message",
        "Imóvel não encontrado"
      );
    });
  });

  // ==========================================
  // DELETAR IMÓVEL
  // ==========================================

  describe("DELETE /imoveis/:id", () => {

    it("deve deletar imóvel", async () => {

      const response = await request(app)
        .delete(`/imoveis/${propertyId}`);

      expect(response.status).toBe(204);
    });

    it("deve retornar 404 ao deletar imóvel inexistente", async () => {

      const response = await request(app)
        .delete("/imoveis/999");

      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty(
        "message",
        "Imóvel não encontrado"
      );
    });
  });

  // ==========================================
  // ROTA NÃO ENCONTRADA
  // ==========================================

  describe("404", () => {

    it("deve retornar rota não encontrada", async () => {

      const response = await request(app)
        .get("/rota-inexistente");

      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty(
        "error",
        "Rota não encontrada"
      );
    });
  });

});