import express from "express";
import propertyRoutes from "./routes/property.routes.js";

const app = express();

/**
 * 🔹 Configuração básica
 */
app.use(express.json());

/**
 * 🔹 Rota de status (boa prática)
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API funcionando 🚀"
  });
});

/**
 * 🔹 Rotas principais
 * ✔ API direto na raiz
 * ✔ Alias profissional
 */
app.use("/", propertyRoutes);
app.use("/api/properties", propertyRoutes);

/**
 * 🔹 404 - rota não encontrada
 */
app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada"
  });
});

/**
 * 🔹 Middleware global de erro
 */
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;

  res.status(status).json({
    error: err.message || "Erro interno"
  });
});

/**
 * 🔹 Inicialização do servidor
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});