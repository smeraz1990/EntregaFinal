import { Router } from "express";
import accessController from "../controllers/access.controller.js";

const router = Router();

router
  .route("/")
  .get(accessController.getRegister)

export default router;
