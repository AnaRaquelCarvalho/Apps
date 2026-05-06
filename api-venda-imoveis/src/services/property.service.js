import { v4 as uuidv4 } from "uuid";
import { propertyRepository } from "../repositories/property.repository.js";
import { AppError } from "../utils/errors.js";

export const propertyService = {
  create(data) {
    return propertyRepository.create({
      id: uuidv4(),
      ...data
    });
  },

  getAll() {
    return propertyRepository.findAll();
  },

  // 🔥 REGRA DE NEGÓCIO DO GET BY ID
  getById(id) {
    const property = propertyRepository.findById(id);

    if (!property) {
      throw new AppError("Imóvel não encontrado", 404);
    }

    return property;
  },

  update(id, data) {
    const updated = propertyRepository.update(id, data);
    if (!updated) {
      throw new AppError("Imóvel não encontrado", 404);
    }
    return updated;
  },

  delete(id) {
    const success = propertyRepository.delete(id);
    if (!success) {
      throw new AppError("Imóvel não encontrado", 404);
    }
  }
};