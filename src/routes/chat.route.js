import { Router } from "express";
import chatController from "../controllers/chat.controller.js";
import checkAuthentication from '../components/CheckAuth.js'

const router = Router();

router.route("/")
.get(checkAuthentication,chatController.getChat);

export default router;
