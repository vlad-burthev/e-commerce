import { Router } from "express";
import {
  addDeviceToCart,
  deleteDeviceFromCart,
  getUserCart,
} from "../controllers/cartController.js";
import { checkAuthMiddleware } from "../middleware/checkAuthMiddleware.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const cartRouter = Router();

cartRouter.post("/:id", checkAuthMiddleware, addDeviceToCart);
cartRouter.post("/delete/:id", checkAuthMiddleware, deleteDeviceFromCart);
cartRouter.get("/", checkAuthMiddleware, getUserCart);
