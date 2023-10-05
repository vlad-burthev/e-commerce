import { Router } from "express";
import {
  addDevice,
  deleteDevice,
  getAllDevices,
  getOneDevice,
} from "../controllers/deviceController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const deviceRouter = Router();

deviceRouter.post("/", checkRoleMiddleware("ADMIN"), addDevice);
deviceRouter.post("/:slug", checkRoleMiddleware("ADMIN"), deleteDevice);
deviceRouter.get("/:slug", getOneDevice);
deviceRouter.get("/", getAllDevices);
