import { Router } from "express";
import accessController from "../controllers/access.controller.js";
import passport from 'passport';

const router = Router();

router
  .route("/")
  .get(accessController.getLogin)
  .post(passport.authenticate("login", { failureRedirect: '/login', failureMessage: true }),accessController.postLogin)

export default router;
