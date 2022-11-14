import { Router } from "express";
import ordenController from "../controllers/orden.controller.js"
import jwt from "../utils/jwt.js";

const router = Router();

router.route('/')
.post(ordenController.createOrden)

router.route('/:idusuario').get(ordenController.datosOrden)

export default router;
