import { Property } from "../models/index.js";

/**

* 🔹 Criar imóvel
  */
  export const createProperty = async (
  req,
  res,
  next
  ) => {
  try {
  const property =
  await Property.create(req.body);

  res.status(201).json(property);
  } catch (error) {
  next(error);
  }
  };

/**

* 🔹 Listar imóveis
  */
  export const getAllProperties =
  async (req, res, next) => {
  try {
  const properties =
  await Property.findAll();

  res.status(200).json(properties);
  } catch (error) {
  next(error);
  }
  };

/**

* 🔹 Buscar imóvel por ID
  */
  export const getPropertyById =
  async (req, res, next) => {
  try {
  const property =
  await Property.findByPk(
  req.params.id
  );

  if (!property) {
  return res.status(404).json({
  error:
  "Imóvel não encontrado",
  });
  }

  res.status(200).json(property);
  } catch (error) {
  next(error);
  }
  };

/**

* 🔹 Atualizar imóvel
  */
  export const updateProperty =
  async (req, res, next) => {
  try {
  const property =
  await Property.findByPk(
  req.params.id
  );

  if (!property) {
  return res.status(404).json({
  error:
  "Imóvel não encontrado",
  });
  }

  await property.update(req.body);

  res.status(200).json(property);
  } catch (error) {
  next(error);
  }
  };

/**

* 🔹 Deletar imóvel
  */
  export const deleteProperty =
  async (req, res, next) => {
  try {
  const property =
  await Property.findByPk(
  req.params.id
  );

  if (!property) {
  return res.status(404).json({
  error:
  "Imóvel não encontrado",
  });
  }

  await property.destroy();

  res.status(204).send();
  } catch (error) {
  next(error);
  }
  };
