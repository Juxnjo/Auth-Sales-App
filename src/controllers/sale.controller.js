import SaleModel from "../models/sale.model.js";

class SaleController {
    async getSales(req, res) {
        try {
            const { role, id } = req.user;
            const sales = await SaleModel.getAllSales(role, id);
            res.json(sales);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    async createSale(req, res) {
        try {
            const { producto, cupo_solicitado, franquicia, tasa } = req.body;
            const { id: usuario_creacion } = req.user;

            if (!producto || !cupo_solicitado) {
                return res.status(400).json({ message: "Producto y cupo solicitado son obligatorios." });
            }

            if (producto === "Tarjeta de Credito" && !franquicia) {
                return res.status(400).json({ message: "La franquicia es obligatoria para tarjeta de crédito." });
            }

            const newSale = await SaleModel.createSale({ producto, cupo_solicitado, franquicia, tasa, usuario_creacion });
            res.status(201).json(newSale);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateSale(req, res) {
        try {
            const { id } = req.params;
            const { producto, cupo_solicitado, franquicia, tasa } = req.body;
            const { id: usuario_actualizacion } = req.user;

            const updatedSale = await SaleModel.updateSale(id, { producto, cupo_solicitado, franquicia, tasa, usuario_actualizacion });

            if (!updatedSale) {
                return res.status(404).json({ message: "Venta no encontrada" });
            }

            res.json(updatedSale);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    async deleteSale(req, res) {
        try {
            const { id } = req.params;
            const success = await SaleModel.deleteSale(id);

            if (!success) {
                return res.status(404).json({ message: "Venta no encontrada" });
            }

            res.json({ message: "Venta eliminada correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
}

export default new SaleController();
