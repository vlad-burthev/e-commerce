import { Router } from "express";
import { addDevice } from "../controllers/deviceController.js";

export const deviceRouter = Router();

deviceRouter.post("/", addDevice);
