import AuthModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await AuthModel.findUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Credenciales incorrectas" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Credenciales incorrectas" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            res.json({ token, role: user.role });
        } catch (error) {
            console.error("Error en login:", error);
            res.status(500).json({ message: "Error en el servidor" });
        }
    }
}

export default new AuthController();
