import { Router } from "express";
import accessController from "../controllers/access.controller.js";
import upload from '../components/MulterConfig.js';
import passport from 'passport';

const router = Router();

router
  .route("/")
  .post(upload.subirAvatar().single('avatar'),passport.authenticate("register", { failureRedirect: "/register",failureMessage:{message:"error al registrar"} }),accessController.postLogin)
  .get(accessController.getRegister)

export default router;
