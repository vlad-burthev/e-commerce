import { Router } from "express";
import { addRating } from "../controllers/ratingController.js";
import { checkAuthMiddleware } from "../middleware/checkAuthMiddleware.js";

export const ratingRouter = Router();

ratingRouter.post("/", checkAuthMiddleware, addRating);
