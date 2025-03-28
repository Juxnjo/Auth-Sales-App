import { useState, useEffect } from "react";

const UserForm = ({ onSubmit, editingUser, cancelEdit }) => {
  const initialState = { nombre: "", email: "", password: "", rol_id: 2 };
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        nombre: editingUser.nombre,
        email: editingUser.email,
        rol_id: editingUser.rol === "Administrador" ? 1 : 2,
      });
    } else {
      setFormData(initialState); // Limpiar formulario si no hay usuario en edición
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialState); // Limpiar formulario después de enviar
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {editingUser ? "✏️ Editar Usuario" : "➕ Crear Usuario"}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-gray-700 font-semibold">Nombre</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Correo Electrónico</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo"
            required
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {!editingUser && (
          <div>
            <label className="block text-gray-700 font-semibold">Contraseña</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
              className="w-full border p-2 rounded-lg"
            />
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-semibold">Rol</label>
          <select
            name="rol_id"
            value={formData.rol_id}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          >
            <option value={1}>Administrador</option>
            <option value={2}>Asesor</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            {editingUser ? "💾 Guardar" : "➕ Agregar"}
          </button>
          {editingUser && (
            <button
              onClick={cancelEdit}
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              ❌ Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
