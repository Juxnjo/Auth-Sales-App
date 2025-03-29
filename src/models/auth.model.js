import { pool } from "../db.js";

class AuthModel {
    static async findUserByEmail(email) {
        try {
            const query = `
                SELECT u.id, u.email, u.password, r.nombre as role 
                FROM usuarios u
                JOIN roles r ON u.rol_id = r.id
                WHERE u.email = $1
            `;
            const { rows } = await pool.query(query, [email]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error("Error al buscar usuario");
        }
    }
}

export default AuthModel;
