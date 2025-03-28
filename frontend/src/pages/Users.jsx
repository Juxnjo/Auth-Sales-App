import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

const Users = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "Administrador") {
      navigate("/dashboard");
    } else {
      fetchUsers();
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
      } else {
        await createUser(formData);
      }
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
     <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">👥 Gestión de Usuarios</h1>

      {/* Formulario para agregar o editar usuarios */}
      <UserForm onSubmit={handleSubmit} editingUser={editingUser} cancelEdit={() => setEditingUser(null)} />

      {/* Lista de usuarios */}
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Users;
