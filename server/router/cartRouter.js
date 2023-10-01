import { Router } from "express";
import { addDeviceToCart } from "../controllers/cartController.js";
import { checkAuthMiddleware } from "../middleware/checkAuthMiddleware.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const cartRouter = Router();

cartRouter.post("/:id", checkRoleMiddleware("ADMIN"), addDeviceToCart);
