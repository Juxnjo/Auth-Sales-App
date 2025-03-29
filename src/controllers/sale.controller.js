import { pool } from "../db.js";

export const getSales = async (req, res) => {
  try {
    const { role, id } = req.user;

    let query = `
      SELECT v.id, v.producto, v.cupo_solicitado, v.fecha_creacion, u.nombre AS usuario_creacion
      FROM ventas v
      JOIN usuarios u ON v.usuario_creacion = u.id
    `;
    let values = [];

    if (role === "Asesor") {
      query += ` WHERE v.usuario_creacion = $1`;
      values.push(id);
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ message: "Error al obtener ventas" });
  }
};

export const createSale = async (req, res) => {
  try {
    const { producto, cupo_solicitado, franquicia, tasa } = req.body;
    const { id: usuario_creacion } = req.user; 

    if (!producto || !cupo_solicitado) {
      return res
        .status(400)
        .json({ message: "Producto y cupo solicitado son obligatorios." });
    }

    if (producto === "Tarjeta de Credito" && !franquicia) {
      return res.status(400).json({
        message: "La franquicia es obligatoria para tarjeta de crédito.",
      });
    }

    let tasaFinal = tasa;
    if (
      producto === "Credito de Consumo" ||
      producto === "Libranza Libre Inversión"
    ) {
      if (!tasa) {
        return res
          .status(400)
          .json({ message: "La tasa es obligatoria para estos productos." });
      }
    } else if (producto === "Tarjeta de Credito") {
      
      tasaFinal = 0; 
    }

  
    const result = await pool.query(
      `
        INSERT INTO ventas (producto, cupo_solicitado, franquicia, tasa, usuario_creacion) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *
      `,
      [
        producto,
        cupo_solicitado,
        franquicia || null,
        tasaFinal,
        usuario_creacion, 
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear venta:", error);
    res.status(500).json({ message: "Error al crear venta" });
  }
};

export const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      producto,
      cupo_solicitado,
      franquicia,
      tasa,
      usuario_actualizacion,
    } = req.body;

    let tasaFinal = tasa;
    if (
      producto === "Credito de Consumo" ||
      producto === "Libranza Libre Inversión"
    ) {
      if (!tasa) {
        return res
          .status(400)
          .json({ message: "La tasa es obligatoria para estos productos." });
      }
    } else if (producto === "Tarjeta de Credito") {
      tasaFinal = 0;
    }

    // Asegúrate de que franquicia sea null cuando no sea necesario
    let franquiciaFinal = franquicia;
    if (producto !== "Tarjeta de Credito") {
      franquiciaFinal = null;
    }

    const result = await pool.query(
      `
        UPDATE ventas SET producto = $1, cupo_solicitado = $2, franquicia = $3, tasa = $4, 
                          usuario_actualizacion = $5, fecha_actualizacion = NOW()
        WHERE id = $6 RETURNING *
      `,
      [
        producto,
        cupo_solicitado,
        franquiciaFinal,
        tasaFinal,
        usuario_actualizacion,
        id,
      ]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Venta no encontrada" });

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar venta:", error);
    res.status(500).json({ message: "Error al actualizar venta" });
  }
};


export const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM ventas WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Venta no encontrada" });

    res.json({ message: "Venta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar venta:", error);
    res.status(500).json({ message: "Error al eliminar venta" });
  }
};
