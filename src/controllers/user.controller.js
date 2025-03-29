import UserModel from "../models/user.model.js";

class UserController {
    async getUsers(req, res) {
        try {
            const users = await UserModel.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserModel.getUserById(id);

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const { nombre, email, password, rol_id } = req.body;

            if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                return res.status(400).json({ message: "Formato de correo inválido" });
            }

            const newUser = await UserModel.createUser({ nombre, email, password, rol_id });
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { nombre, email, password, rol_id } = req.body;

            const updatedUser = await UserModel.updateUser(id, { nombre, email, password, rol_id });

            if (!updatedUser) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            res.json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
    
            // Verificar si el usuario tiene ventas
            const tieneVentas = await UserModel.hasSales(id);
            if (tieneVentas) {
                return res.status(400).json({ message: "No se puede eliminar el usuario porque tiene ventas registradas." });
            }
    
            const success = await UserModel.deleteUser(id);
            if (!success) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
    
            res.json({ message: "Usuario eliminado correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
    
}

export default new UserController();
