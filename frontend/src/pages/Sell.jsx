import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createSale } from "../services/sellService";
import SellForm from "../components/SellForm"; // Importa el nuevo componente

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
    setErrorMessage(""); // Limpiar errores previos

    try {
      await createSale(token, formData); // Usamos el servicio
      navigate("/sales"); // Redirige a la lista de ventas
    } catch (error) {
      console.error("Error al crear venta:", error.message);
      setErrorMessage(error.message || "Hubo un error al crear la venta. Intenta nuevamente.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📌 Crear Venta</h2>

      <SellForm
        formData={formData}
        handleChange={handleChange}
        handleCreate={handleCreate}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Sell;
