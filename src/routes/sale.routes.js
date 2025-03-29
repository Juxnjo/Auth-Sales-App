import { Router } from "express";
import SaleController from "../controllers/sale.controller.js";
import { verifyToken, isAdminOrAdvisor } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, SaleController.getSales);
router.post("/", verifyToken, SaleController.createSale);
router.put("/:id", verifyToken, isAdminOrAdvisor, SaleController.updateSale);
router.delete("/:id", verifyToken, isAdminOrAdvisor, SaleController.deleteSale);

export default router;
