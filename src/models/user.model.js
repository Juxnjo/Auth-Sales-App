import { pool } from "../db.js";
import bcrypt from "bcryptjs";

class UserModel {
    static async getAllUsers() {
        try {
            const result = await pool.query(`
                SELECT u.id, u.nombre, u.email, r.nombre AS rol, u.fecha_creacion, u.fecha_actualizacion
                FROM usuarios u
                JOIN roles r ON u.rol_id = r.id
            `);
            return result.rows;
        } catch (error) {
            throw new Error("Error al obtener los usuarios");
        }
    }

    static async getUserById(id) {
        try {
            const result = await pool.query(`
                SELECT u.id, u.nombre, u.email, r.nombre AS rol, u.fecha_creacion, u.fecha_actualizacion
                FROM usuarios u
                JOIN roles r ON u.rol_id = r.id
                WHERE u.id = $1
            `, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error("Error al obtener el usuario");
        }
    }

    static async createUser({ nombre, email, password, rol_id }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await pool.query(`
                INSERT INTO usuarios (nombre, email, password, rol_id) 
                VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol_id, fecha_creacion, fecha_actualizacion
            `, [nombre, email, hashedPassword, rol_id]);
            return result.rows[0];
        } catch (error) {
            if (error.code === "23505") {
                throw new Error("El correo ya está registrado");
            }
            throw new Error("Error al crear usuario");
        }
    }

    static async updateUser(id, { nombre, email, password, rol_id }) {
        try {
            let query;
            let values;

            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                query = `UPDATE usuarios SET nombre = $1, email = $2, password = $3, rol_id = $4, fecha_actualizacion = NOW() WHERE id = $5 RETURNING *`;
                values = [nombre, email, hashedPassword, rol_id, id];
            } else {
                query = `UPDATE usuarios SET nombre = $1, email = $2, rol_id = $3, fecha_actualizacion = NOW() WHERE id = $4 RETURNING *`;
                values = [nombre, email, rol_id, id];
            }

            const result = await pool.query(query, values);
            return result.rowCount > 0 ? result.rows[0] : null;
        } catch (error) {
            throw new Error("Error al actualizar usuario");
        }
    }

    static async deleteUser(id) {
        try {
            const result = await pool.query("DELETE FROM usuarios WHERE id = $1 RETURNING id", [id]);
            return result.rowCount > 0;
        } catch (error) {
            throw new Error("Error al eliminar usuario");
        }
    }

    static async hasSales(userId) {
        const query = `SELECT COUNT(*) AS total FROM ventas WHERE usuario_creacion = $1`;
        const { rows } = await pool.query(query, [userId]);
        return rows[0].total > 0; // Retorna true si tiene ventas, false si no
      }
    
}


export default UserModel;
