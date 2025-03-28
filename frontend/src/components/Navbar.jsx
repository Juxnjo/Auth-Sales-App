import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">{user ? `Rol: ${user.role}` : "Cargando..."}</h1>
      <div className="flex gap-4">
        {user?.role === "Administrador" && <Link to="/users">Usuarios</Link>}
        <Link to="/sell">Radicar Venta</Link>
        <Link to="/sales">Radicar Venta</Link>
        <button onClick={logout} className="bg-red-400 px-3 py-1 rounded">
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
