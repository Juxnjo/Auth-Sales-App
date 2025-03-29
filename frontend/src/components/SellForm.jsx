import React from "react";

const SellForm = ({
  formData,
  handleChange,
  handleCreate,
  errorMessage,
}) => {
  return (
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
  );
};

export default SellForm;
