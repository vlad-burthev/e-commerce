import { Router } from "express";

import {
  check,
  getAllUsers,
  login,
  sigin,
} from "../controllers/userController.js";
import { checkAuthMiddleware } from "../middleware/checkAuthMiddleware.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/sigin", sigin);
userRouter.get("/auth", checkAuthMiddleware, check);
userRouter.get("/all", checkRoleMiddleware("ADMIN"), getAllUsers);
