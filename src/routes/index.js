import { Router } from "express";
import userRoute from "./user.route.js";
import productRoute from "./product.route.js";
import carritoRoute from "./carrito.route.js";
import ordenRoute from "./orden.route.js";
import accessRoute from "./access.route.js";
import registerRoute from "./register.route.js";

const router = Router();

router.use("/user",userRoute);
router.use("/product",productRoute);
router.use("/carrito",carritoRoute);
router.use("/orden", ordenRoute);
router.use("/login",accessRoute);
router.use("/register",registerRoute);


export default router;
