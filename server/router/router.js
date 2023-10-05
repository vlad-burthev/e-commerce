import { Router } from "express";
import { userRouter } from "./userRouter.js";
import { typeRouter } from "./typeRouter.js";
import { brandRouter } from "./brandRouter.js";
import { cartRouter } from "./cartRouter.js";
import { deviceRouter } from "./deviceRouter.js";
import { ratingRouter } from "./ratingRouter.js";

const router = Router();

router.use("/user", userRouter);
router.use("/cart", cartRouter);
// router.use("/order",);
router.use("/device", deviceRouter);
router.use("/rating", ratingRouter);
router.use("/brand", brandRouter);
router.use("/type", typeRouter);

export default router;
