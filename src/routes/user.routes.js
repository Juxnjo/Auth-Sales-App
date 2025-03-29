import { Router } from "express";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.get("/", verifyToken, isAdmin, UserController.getUsers);
router.get("/:id", verifyToken, isAdmin, UserController.getUserById);
router.post("/", verifyToken, isAdmin, UserController.createUser);
router.put("/:id", verifyToken, isAdmin, UserController.updateUser);
router.delete("/:id", verifyToken, isAdmin, UserController.deleteUser);

export default router;
