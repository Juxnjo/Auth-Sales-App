import { Router } from "express";
import SaleController from "../controllers/sale.controller.js";
import { verifyToken, isAdminOrAdvisor } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Ventas
 *   description: Endpoints para gestionar ventas
 */

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida correctamente
 *       401:
 *         description: No autorizado (Token no válido)
 *       500:
 *         description: Error del servidor
 */
router.get("/", verifyToken, SaleController.getSales);

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Crear una nueva venta
 *     tags: [Ventas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producto:
 *                 type: string
 *                 example: "Tarjeta de Crédito"
 *               cupo_solicitado:
 *                 type: number
 *                 example: 5000000
 *               franquicia:
 *                 type: string
 *                 example: "Visa"
 *               tasa:
 *                 type: number
 *                 example: 0
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post("/", verifyToken, SaleController.createSale);

/**
 * @swagger
 * /sales/{id}:
 *   put:
 *     summary: Actualizar una venta existente
 *     tags: [Ventas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producto:
 *                 type: string
 *                 example: "Crédito de Consumo"
 *               cupo_solicitado:
 *                 type: number
 *                 example: 7000000
 *               franquicia:
 *                 type: string
 *                 example: "Mastercard"
 *               tasa:
 *                 type: number
 *                 example: 12.5
 *     responses:
 *       200:
 *         description: Venta actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", verifyToken, isAdminOrAdvisor, SaleController.updateSale);

/**
 * @swagger
 * /sales/{id}:
 *   delete:
 *     summary: Eliminar una venta
 *     tags: [Ventas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta a eliminar
 *     responses:
 *       200:
 *         description: Venta eliminada correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", verifyToken, isAdminOrAdvisor, SaleController.deleteSale);

/**
 * @swagger
 * /sales/{id}/status:
 *   put:
 *     summary: Actualizar el estado de una venta
 *     tags: [Ventas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: ["Abierto", "En Proceso", "Finalizado"]
 *                 example: "En Proceso"
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       400:
 *         description: Estado inválido
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/:id/status", verifyToken, SaleController.updateSaleStatus);

export default router;
