import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UserForm = ({ onSubmit, editingUser, cancelEdit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (editingUser) {
      setValue("nombre", editingUser.nombre);
      setValue("email", editingUser.email);
      setValue("rol_id", editingUser.rol === "Administrador" ? 1 : 2);
    } else {
      reset(); // Limpiar el formulario cuando no se edita
    }
  }, [editingUser, setValue, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset(); // Limpiar formulario después de enviar
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {editingUser ? "✏️ Editar Usuario" : "➕ Crear Usuario"}
      </h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Nombre */}
        <div>
          <label className="block text-gray-700 font-semibold">Nombre</label>
          <input
            {...register("nombre", { required: "El nombre es obligatorio" })}
            placeholder="Nombre"
            className="w-full border p-2 rounded-lg"
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
        </div>

        {/* Correo Electrónico */}
        <div>
          <label className="block text-gray-700 font-semibold">Correo Electrónico</label>
          <input
            type="email"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Formato de correo inválido",
              },
            })}
            placeholder="Correo"
            className="w-full border p-2 rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Contraseña (Solo para creación) */}
        {!editingUser && (
          <div>
            <label className="block text-gray-700 font-semibold">Contraseña</label>
            <input
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 4, message: "Debe tener al menos 4 caracteres" },
              })}
              placeholder="Contraseña"
              className="w-full border p-2 rounded-lg"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
        )}

        {/* Rol */}
        <div>
          <label className="block text-gray-700 font-semibold">Rol</label>
          <select
            {...register("rol_id", { required: "El rol es obligatorio" })}
            className="w-full border p-2 rounded-lg"
          >
            <option value={1}>Administrador</option>
            <option value={2}>Asesor</option>
          </select>
          {errors.rol_id && <p className="text-red-500 text-sm">{errors.rol_id.message}</p>}
        </div>

        {/* Botones */}
        <div className="col-span-1 md:col-span-2 flex justify-end space-x-2">
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            {editingUser ? "💾 Guardar" : "➕ Agregar"}
          </button>
          {editingUser && (
            <button onClick={cancelEdit} className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
              ❌ Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
