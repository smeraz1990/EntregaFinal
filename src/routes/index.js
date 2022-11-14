import { Router } from "express";
import userRoute from "./user.route.js";
import productRoute from "./product.route.js";
import carritoRoute from "./carrito.route.js";
import ordenRoute from "./orden.route.js";
import accessRoute from "./access.route.js";
import registerRoute from "./register.route.js";
import chatRoute from "./chat.route.js";
import checkAuthentication from '../components/CheckAuth.js'

const router = Router();

router.use("/user",userRoute);
router.use("/product",checkAuthentication,productRoute);
router.use("/carrito",checkAuthentication,carritoRoute);
router.use("/orden", checkAuthentication,ordenRoute);
router.use("/login",accessRoute);
router.use("/register",registerRoute);
router.use("/chat",chatRoute);


export default router;
