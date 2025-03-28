import { Router } from "express";
import { getSales, createSale, updateSale, deleteSale } from "../controllers/sale.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, getSales);
router.post("/", verifyToken, createSale);
router.put("/:id", verifyToken, isAdmin, updateSale);
router.delete("/:id", verifyToken, isAdmin, deleteSale);

export default router;
