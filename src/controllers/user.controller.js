import { pool } from "../db.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT u.id, u.nombre, u.email, u.password, r.nombre AS rol, u.fecha_creacion, u.fecha_actualizacion
            FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
        `);
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

export const createUser = async (req, res) => {
    try {
        const { nombre, email, password, rol_id } = req.body;

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return res.status(400).json({ message: "Formato de correo inválido" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(`
            INSERT INTO usuarios (nombre, email, password, rol_id) 
            VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, password, rol_id, fecha_creacion, fecha_actualizacion
        `, [nombre, email, hashedPassword, rol_id]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error al crear usuario" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password, rol_id } = req.body;

        let hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        const query = hashedPassword
            ? `UPDATE usuarios SET nombre = $1, email = $2, password = $3, rol_id = $4, fecha_actualizacion = NOW() WHERE id = $5 RETURNING id, nombre, email, password, rol_id, fecha_creacion, fecha_actualizacion`
            : `UPDATE usuarios SET nombre = $1, email = $2, rol_id = $3, fecha_actualizacion = NOW() WHERE id = $4 RETURNING id, nombre, email, password, rol_id, fecha_creacion, fecha_actualizacion`;

        const values = hashedPassword ? [nombre, email, hashedPassword, rol_id, id] : [nombre, email, rol_id, id];

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: "Error al actualizar usuario" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM usuarios WHERE id = $1 RETURNING id", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
};
