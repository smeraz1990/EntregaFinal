import { Router } from "express";
import userRoute from "./user.route.js";
import productRoute from "./product.route.js";
import carritoRoute from "./carrito.route.js";
import ordenRoute from "./orden.route.js";

const router = Router();

router.use("/user", userRoute);
router.use("/product", productRoute);
router.use("/carrito", carritoRoute);
router.use("/orden", ordenRoute);

export default router;
