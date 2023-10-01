import { Router } from "express";

import {} from "../controllers/typeController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import {
  addBrand,
  deleteBrand,
  getBrands,
} from "../controllers/brandController.js";

export const brandRouter = Router();

brandRouter.post("/", checkRoleMiddleware("ADMIN"), addBrand);
brandRouter.get("/", getBrands);
brandRouter.post("/:id", checkRoleMiddleware("ADMIN"), deleteBrand);
