const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">👥 Listado de Usuarios</h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No hay usuarios registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Correo Electrónico</th>
                <th className="p-3 text-left">Rol</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="p-3">{user.nombre}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 font-semibold text-indigo-600">{user.rol}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
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
      )}
    </div>
  );
};

export default UserList;
