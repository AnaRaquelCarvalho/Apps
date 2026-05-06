import { Router } from "express";
import { propertyController } from "../controllers/property.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { propertySchema } from "../schemas/property.schema.js";

const router = Router();

router.post("/", validate(propertySchema), propertyController.create);
router.get("/", propertyController.getAll);
router.get("/:id", propertyController.getById);
router.put("/:id", validate(propertySchema), propertyController.update);
router.delete("/:id", propertyController.delete);

export default router;