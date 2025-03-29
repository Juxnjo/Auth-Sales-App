import { pool } from "../db.js";

class SaleModel {
  static async getAllSales(role, userId) {
    try {
      let query = `
        SELECT v.id, v.producto, v.cupo_solicitado, v.fecha_creacion, v.estado, u.nombre AS usuario_creacion
        FROM ventas v
        JOIN usuarios u ON v.usuario_creacion = u.id
    `;

      let values = [];

      if (role === "Asesor") {
        query += ` WHERE v.usuario_creacion = $1`;
        values.push(userId);
      }

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw new Error("Error al obtener ventas");
    }
  }

  static async createSale({
    producto,
    cupo_solicitado,
    franquicia,
    tasa,
    usuario_creacion,
  }) {
    try {
      let tasaFinal = tasa;
      if (producto === "Tarjeta de Credito") {
        tasaFinal = 0;
      } else if (
        ["Credito de Consumo", "Libranza Libre Inversión"].includes(producto) &&
        !tasa
      ) {
        throw new Error("La tasa es obligatoria para estos productos.");
      }

      const result = await pool.query(
        `INSERT INTO ventas (producto, cupo_solicitado, franquicia, tasa, usuario_creacion) 
                 VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [
          producto,
          cupo_solicitado,
          franquicia || null,
          tasaFinal,
          usuario_creacion,
        ]
      );

      return result.rows[0];
    } catch (error) {
      throw new Error("Error al crear venta");
    }
  }

  static async updateSale(
    id,
    { producto, cupo_solicitado, franquicia, tasa, usuario_actualizacion }
  ) {
    try {
      let tasaFinal = tasa;

      // Validaciones según el producto
      if (
        ["Credito de Consumo", "Libranza Libre Inversión"].includes(producto)
      ) {
        if (!tasa && tasa !== 0) {
          throw new Error("La tasa es obligatoria para este producto.");
        }
      } else if (producto === "Tarjeta de Credito") {
        tasaFinal = 0; // Se fuerza a 0 si es Tarjeta de Crédito
      }

      let franquiciaFinal =
        producto === "Tarjeta de Credito" ? franquicia : null;

      const query = `
                UPDATE ventas SET 
                    producto = $1, 
                    cupo_solicitado = $2, 
                    franquicia = $3, 
                    tasa = $4, 
                    usuario_actualizacion = $5, 
                    fecha_actualizacion = NOW()
                WHERE id = $6 RETURNING *;
            `;

      const values = [
        producto,
        cupo_solicitado,
        franquiciaFinal,
        tasaFinal,
        usuario_actualizacion,
        id,
      ];

      const result = await pool.query(query, values);

      if (result.rowCount === 0) {
        return null; // No se encontró la venta
      }

      return result.rows[0];
    } catch (error) {
      console.error("Error al actualizar venta:", error);
      throw new Error("Error al actualizar venta");
    }
  }

  static async deleteSale(id) {
    try {
      const result = await pool.query(
        "DELETE FROM ventas WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rowCount > 0;
    } catch (error) {
      throw new Error("Error al eliminar venta");
    }
  }

  static async updateSaleStatus(id, estado, usuario_actualizacion) {
    try {
      const result = await pool.query(
        `UPDATE ventas 
                 SET estado = $1, fecha_actualizacion = NOW(), usuario_actualizacion = $2
                 WHERE id = $3 
                 RETURNING *`,
        [estado, usuario_actualizacion, id]
      );

      return result.rows[0]; // Retornar la venta actualizada
    } catch (error) {
      console.error("Error al actualizar estado de la venta:", error);
      throw error;
    }
  }
}

export default SaleModel;
