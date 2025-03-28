const UserList = ({ users, onEdit, onDelete }) => {
    return (
      <>
        {users.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id} className="border p-2 flex justify-between">
                {user.nombre} - {user.email} - Rol: {user.rol}
                <div>
                  <button onClick={() => onEdit(user)} className="bg-blue-500 text-white p-1 mr-2">
                    Editar
                  </button>
                  <button onClick={() => onDelete(user.id)} className="bg-red-500 text-white p-1">
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };
  
  export default UserList;
  