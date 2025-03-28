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
    <div className="p-4 border mb-4">
      <h2 className="text-xl font-bold mb-2">{editingUser ? "Editar Usuario" : "Crear Usuario"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="border p-2 mr-2"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo"
          required
          className="border p-2 mr-2"
        />
        {!editingUser && (
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
            className="border p-2 mr-2"
          />
        )}
        <select name="rol_id" value={formData.rol_id} onChange={handleChange} className="border p-2 mr-2">
          <option value={1}>Administrador</option>
          <option value={2}>Asesor</option>
        </select>
        <button type="submit" className="bg-green-500 text-white p-2">
          {editingUser ? "Guardar" : "Agregar"}
        </button>
        {editingUser && (
          <button onClick={cancelEdit} className="bg-gray-500 text-white p-2 ml-2">
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default UserForm;
