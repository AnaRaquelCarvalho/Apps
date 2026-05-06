import { propertyService } from "../services/property.service.js";

export const propertyController = {
  create(req, res, next) {
    try {
      const property = propertyService.create(req.body);
      res.status(201).json(property);
    } catch (err) {
      next(err);
    }
  },

  getAll(req, res) {
    res.json(propertyService.getAll());
  },

  // 🔥 GET BY ID COMPLETO
  getById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "ID é obrigatório"
        });
      }

      const property = propertyService.getById(id);

      res.json(property);
    } catch (err) {
      next(err);
    }
  },

  update(req, res, next) {
    try {
      const property = propertyService.update(req.params.id, req.body);
      res.json(property);
    } catch (err) {
      next(err);
    }
  },

  delete(req, res, next) {
    try {
      propertyService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};