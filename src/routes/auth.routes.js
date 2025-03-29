import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { verifyCaptcha } from "../utils/captcha.js";

const router = Router();

router.post("/login", verifyCaptcha, AuthController.login);

export default router;
