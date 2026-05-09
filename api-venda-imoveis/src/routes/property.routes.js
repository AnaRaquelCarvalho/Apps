// ==========================================
// src/routes/property.routes.js
// ==========================================

import { Router } from "express";

const router = Router();

/**
 * 🔹 Página inicial
 */
router.get("/", (req, res) => {
  res.redirect("/imoveis");
});

/**
 * 🔹 Atalho listar
 */
router.get("/listar", (req, res) => {
  res.redirect("/imoveis");
});

/**
 * 🔹 Health
 */
router.get("/status", (req, res) => {
  res.redirect("/health");
});

export default router;