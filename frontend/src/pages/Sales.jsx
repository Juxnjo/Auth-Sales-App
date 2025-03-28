import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sales = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Ventas Radicadas</h1>
      {user?.role === "Administrador" ? (
        <p>Mostrando ventas de todos los usuarios</p>
      ) : (
        <p>Mostrando solo tus ventas</p>
      )}
    </div>
  );
};

export default Sales;
