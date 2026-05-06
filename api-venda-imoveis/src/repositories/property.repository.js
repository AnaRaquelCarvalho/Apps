import { properties } from "../database/memory.db.js";

export const propertyRepository = {
  create(data) {
    properties.push(data);
    return data;
  },

  findAll() {
    return properties;
  },

  findById(id) {
    return properties.find(p => p.id === id);
  },

  update(id, data) {
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return null;

    properties[index] = { ...properties[index], ...data };
    return properties[index];
  },

  delete(id) {
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return false;

    properties.splice(index, 1);
    return true;
  }
};