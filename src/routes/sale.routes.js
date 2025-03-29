import { Router } from "express";
import { getSales, createSale, updateSale, deleteSale } from "../controllers/sale.controller.js";
import { verifyToken, isAdmin, isAdminOrAdvisor } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, getSales);
router.post("/", verifyToken, createSale);
router.put("/:id", verifyToken, isAdminOrAdvisor, updateSale);
router.delete("/:id", verifyToken, isAdminOrAdvisor, deleteSale);

export default router;
