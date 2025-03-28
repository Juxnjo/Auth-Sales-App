import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold">
        {user ? `🔹 Rol: ${user.role}` : "Cargando..."}
      </h1>

      <div className="flex gap-6 text-lg">
        {user?.role === "Administrador" && (
          <Link to="/users" className="hover:text-gray-300 transition">Usuarios</Link>
        )}
        <Link to="/sell" className="hover:text-gray-300 transition">Radicar Venta</Link>
        <Link to="/sales" className="hover:text-gray-300 transition">Ventas</Link>
        <button 
          onClick={logout} 
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
