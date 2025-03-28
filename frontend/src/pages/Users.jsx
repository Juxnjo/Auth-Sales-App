import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Users = () => {
  const { user } = useContext(AuthContext);

  if (user?.role !== "Administrador") {
    return <h2>No tienes permisos para ver esta página</h2>;
  }

  return <h1>Gestión de Usuarios</h1>;
};

export default Users;
