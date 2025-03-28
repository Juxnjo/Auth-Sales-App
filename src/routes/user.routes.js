import { Router } from "express";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/", verifyToken, isAdmin, getUsers);
router.post("/", verifyToken, isAdmin, createUser);
router.put("/:id", verifyToken, isAdmin, updateUser);
router.delete("/:id", verifyToken, isAdmin, deleteUser);

export default router;
