import { Router } from "express";

import {
  addType,
  deleteType,
  getTypes,
} from "../controllers/typeController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const typeRouter = Router();

typeRouter.post("/", checkRoleMiddleware("ADMIN"), addType);
typeRouter.get("/", getTypes);
typeRouter.post("/:id", checkRoleMiddleware("ADMIN"), deleteType);
