import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Función para crear una venta
export const createSale = async (token, formData) => {
  // Validación de tasa si el producto es "Credito de Consumo" o "Libranza Libre Inversión"
  if (
    (formData.producto === "Credito de Consumo" ||
      formData.producto === "Libranza Libre Inversión") &&
    !/^\d{2}(\.\d{2})?$/.test(formData.tasa)
  ) {
    throw new Error("La tasa debe ser en formato XX.XX (2 números y 2 decimales)");
  }

  // Si el producto es "Tarjeta de Crédito", asignamos un valor predeterminado para tasa
  const newSaleData = { ...formData };
  if (newSaleData.producto === "Tarjeta de Crédito") {
    newSaleData.tasa = 0; // Usamos 0 como valor predeterminado
  }

  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.post(`${API_URL}/sales`, newSaleData, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al crear la venta");
  }
};
