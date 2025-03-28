import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const Sell = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    producto: "",
    cupo_solicitado: "",
    franquicia: "",
    tasa: "", // Tasa agregada al estado del formulario
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    // Validación de tasa si el producto es "Credito de Consumo" o "Libranza Libre Inversión"
    if (
      (formData.producto === "Credito de Consumo" ||
        formData.producto === "Libranza Libre Inversión") &&
      !/^\d{2}(\.\d{2})?$/.test(formData.tasa)
    ) {
      setErrorMessage("La tasa debe ser en formato XX.XX (2 números y 2 decimales)");
      return;
    }

    // Si el producto es "Tarjeta de Crédito", asignamos un valor predeterminado para tasa
    const newSaleData = { ...formData };
    if (newSaleData.producto === "Tarjeta de Crédito") {
      newSaleData.tasa = 0; // Usamos 0 como valor predeterminado
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`${API_URL}/sales`, newSaleData, { headers });
      navigate("/sales"); // Redirige a la lista de ventas
    } catch (error) {
      console.error(
        "Error al crear venta",
        error.response?.data || error.message
      );
      setErrorMessage("Hubo un error al crear la venta. Intenta nuevamente.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📌 Crear Venta</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {/* Lista desplegable para Producto */}
          <div>
            <label className="block text-sm font-semibold">Producto</label>
            <select
              name="producto"
              value={formData.producto}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Selecciona un Producto</option>
              <option value="Credito de Consumo">Credito de Consumo</option>
              <option value="Libranza Libre Inversión">Libranza Libre Inversión</option>
              <option value="Tarjeta de Credito">Tarjeta de Crédito</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold">Cupo Solicitado</label>
            <input
              type="number"
              name="cupo_solicitado"
              value={formData.cupo_solicitado}
              onChange={handleChange}
              placeholder="Cupo Solicitado"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Mostrar campo franquicia solo si el producto es "Tarjeta de Crédito" */}
          {formData.producto === "Tarjeta de Credito" && (
            <div>
              <label className="block text-sm font-semibold">Franquicia</label>
              <select
                name="franquicia"
                value={formData.franquicia}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Selecciona una franquicia</option>
                <option value="VISA">VISA</option>
                <option value="MASTERCARD">MASTERCARD</option>
                <option value="AMEX">AMEX</option>
              </select>
            </div>
          )}

          {/* Mostrar el campo tasa solo si el producto es Crédito de Consumo o Libranza Libre Inversión */}
          {(formData.producto === "Credito de Consumo" ||
            formData.producto === "Libranza Libre Inversión") && (
            <div>
              <label className="block text-sm font-semibold">Tasa</label>
              <input
                type="text"
                name="tasa"
                value={formData.tasa}
                onChange={handleChange}
                placeholder="Tasa (Ej: 10.58)"
                className="w-full p-2 border rounded"
                pattern="^\d{2}(\.\d{2})?$"
                required
              />
            </div>
          )}

          {errorMessage && (
            <div className="text-red-600 text-sm">{errorMessage}</div>
          )}

          <button
            onClick={handleCreate}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Crear Venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sell;
