import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { verifyCaptcha } from "../utils/captcha.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para autenticación de usuarios
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión en la aplicación
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@admin.com"
 *               password:
 *                 type: string
 *                 example: "admin"
 *               captchaToken:
 *                 type: string
 *                 example: "captcha-response-token"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve el token JWT
 *       400:
 *         description: Error en la solicitud (datos inválidos)
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", verifyCaptcha, AuthController.login);

export default router;
