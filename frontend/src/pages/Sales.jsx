import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchSales, deleteSale, updateSale } from "../services/salesService";

const Sales = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [totalCupo, setTotalCupo] = useState(0);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    producto: "",
    cupo_solicitado: "",
    franquicia: "",
    tasa: "",
  });

  useEffect(() => {
    if (!token) {
      console.error("No hay token disponible");
      navigate("/login");
      return;
    }
    fetchSalesData();
  }, [token, navigate]);

  const fetchSalesData = async () => {
    try {
      const salesData = await fetchSales(token);
      setSales(salesData);

      const total = salesData.reduce(
        (sum, sale) => sum + parseFloat(sale.cupo_solicitado),
        0
      );
      setTotalCupo(total);
    } catch (error) {
      console.error("Error al obtener ventas", error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta venta?")) return;
    try {
      await deleteSale(id, token);
      fetchSalesData();
    } catch (error) {
      console.error("Error al eliminar venta", error.message);
    }
  };

  const handleView = (sale) => {
    setSelectedSale(sale);
    setIsEditing(false);
  };

  const handleEdit = (sale) => {
    setSelectedSale(sale);
    setIsEditing(true);
    setFormData({
      producto: sale.producto,
      cupo_solicitado: sale.cupo_solicitado,
      franquicia: sale.franquicia || "",
      tasa: sale.tasa || "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (
      (formData.producto === "Credito de Consumo" ||
        formData.producto === "Libranza Libre Inversión") &&
      !/^\d{2}(\.\d{2})?$/.test(formData.tasa)
    ) {
      alert("La tasa debe ser en formato XX.XX (2 números y 2 decimales)");
      return;
    }

    const updatedData = { ...formData };
    if (updatedData.producto === "Tarjeta de Crédito") {
      updatedData.tasa = 0; // Usamos 0 como valor predeterminado
    }

    try {
      await updateSale(selectedSale.id, updatedData, token);
      fetchSalesData();
      setSelectedSale(null);
    } catch (error) {
      console.error("Error al actualizar venta", error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📌 Listado de Ventas</h2>

      <div className="bg-blue-100 text-blue-800 p-4 rounded-lg mb-6 shadow-md flex justify-between">
        <p className="text-lg font-semibold">Total Cupo Solicitado:</p>
        <p className="text-xl font-bold">${totalCupo.toLocaleString()}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Producto</th>
              <th className="p-3 text-left">Cupo Solicitado</th>
              <th className="p-3 text-left">Fecha de Creación</th>
              <th className="p-3 text-left">Usuario</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr
                key={sale.id}
                className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="p-3">{sale.producto}</td>
                <td className="p-3 font-semibold text-green-600">
                  ${sale.cupo_solicitado.toLocaleString()}
                </td>
                <td className="p-3">
                  {new Date(sale.fecha_creacion).toLocaleDateString()}
                </td>
                <td className="p-3">{sale.usuario_creacion}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleView(sale)}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    👁️
                  </button>
                  <button
                    onClick={() => handleEdit(sale)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(sale.id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSale && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-xl font-bold">
              {isEditing ? "Editar Venta" : "Detalles de la Venta"}
            </h3>

            {isEditing ? (
              <>
                {/* Producto */}
                <input
                  type="text"
                  name="producto"
                  value={formData.producto}
                  onChange={handleChange}
                  placeholder="Producto"
                  className="w-full p-2 my-2 border rounded"
                />

                {/* Cupo Solicitado */}
                <input
                  type="number"
                  name="cupo_solicitado"
                  value={formData.cupo_solicitado}
                  onChange={handleChange}
                  placeholder="Cupo Solicitado"
                  className="w-full p-2 my-2 border rounded"
                />

                {/* Mostrar campo franquicia solo si el producto es "Tarjeta de Crédito" */}
                {formData.producto === "Tarjeta de Credito" && (
                  <select
                    name="franquicia"
                    value={formData.franquicia}
                    onChange={handleChange}
                    className="w-full p-2 my-2 border rounded"
                  >
                    <option value="">Selecciona una franquicia</option>
                    <option value="VISA">VISA</option>
                    <option value="MASTERCARD">MASTERCARD</option>
                    <option value="AMEX">AMEX</option>
                  </select>
                )}

                {/* Mostrar campo tasa solo si el producto es Crédito de Consumo o Libranza Libre Inversión */}
                {(formData.producto === "Credito de Consumo" ||
                  formData.producto === "Libranza Libre Inversión") && (
                  <input
                    type="text"
                    name="tasa"
                    value={formData.tasa}
                    onChange={handleChange}
                    placeholder="Tasa (Ej: 10.58)"
                    className="w-full p-2 my-2 border rounded"
                    pattern="^\d{2}(\.\d{2})?$"
                    required
                  />
                )}

                <button
                  onClick={handleUpdate}
                  className="mt-4 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>
              </>
            ) : (
              <>
                <p>
                  <strong>Producto:</strong> {selectedSale.producto}
                </p>
                <p>
                  <strong>Cupo Solicitado:</strong> ${" "}
                  {selectedSale.cupo_solicitado.toLocaleString()}
                </p>
                <p>
                  <strong>Fecha de Creación:</strong>{" "}
                  {new Date(selectedSale.fecha_creacion).toLocaleDateString()}
                </p>
                <p>
                  <strong>Usuario:</strong> {selectedSale.usuario_creacion}
                </p>
              </>
            )}

            <button
              onClick={() => setSelectedSale(null)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
