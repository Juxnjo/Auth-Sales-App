import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Sales from "../pages/Sales";
import Sell from "../pages/Sell";
import PrivateRoute from "./PrivateRoute";
import Navbar from "../components/Navbar";


const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas con Navbar */}
          <Route
            element={
              <>
                <Navbar /> {/* Se muestra en todas las rutas protegidas */}
                <PrivateRoute />
              </>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/sales" element={<Sales />} />
          </Route>

          {/* Redirección por defecto */}
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
