import { Router } from "express";
import accessController from "../controllers/access.controller.js";
import passport from 'passport';

const router = Router();

router
  .route("/")
  .post(passport.authenticate("login", { failureRedirect: '/login', failureMessage:{message:"error al loguear"} }),accessController.postLogin)
  .get(accessController.getLogin)

export default router;
