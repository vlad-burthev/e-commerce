import { Router } from "express";
import { userRouter } from "./userRouter.js";

const router = Router();

router.use("/user", userRouter);
// router.use("/cart",);
// router.use("/order",);
// router.use("/device",);
// router.use("/rating",);
// router.use("/brand",);
// router.use("/type",);

export default router;
