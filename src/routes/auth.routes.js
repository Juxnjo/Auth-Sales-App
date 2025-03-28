import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { verifyCaptcha } from "../utils/captcha.js";

const router = Router();

router.post("/login", verifyCaptcha, login);

export default router;
