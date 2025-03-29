import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchSales } from "../services/salesService";
import SalesByAdvisorChart from "../components/SalesByAdvisorChart";
import CupoByProductChart from "../components/CupoByProductChart";
import SalesByDateChart from "../components/SalesByDateChart";


const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (token) {
      fetchSales(token).then(setSales).catch(console.error);
    }
  }, [token]);

  // Agrupar ventas por asesor
  const salesByAdvisor = sales.reduce((acc, sale) => {
    acc[sale.usuario_creacion] = (acc[sale.usuario_creacion] || 0) + 1;
    return acc;
  }, {});

  // Agrupar cupo por producto
  const cupoByProduct = sales.reduce((acc, sale) => {
    acc[sale.producto] = (acc[sale.producto] || 0) + parseFloat(sale.cupo_solicitado);
    return acc;
  }, {});

  // Agrupar ventas por fecha
  const salesByDate = sales.reduce((acc, sale) => {
    const date = new Date(sale.fecha_creacion).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Convertir datos para los gráficos
  const salesByAdvisorData = Object.keys(salesByAdvisor).map((key) => ({
    name: key,
    ventas: salesByAdvisor[key],
  }));

  const cupoByProductData = Object.keys(cupoByProduct).map((key, index) => ({
    name: key,
    value: cupoByProduct[key],
  }));

  const salesByDateData = Object.keys(salesByDate).map((key) => ({
    date: key,
    ventas: salesByDate[key],
  }));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Estadísticas de Ventas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <SalesByAdvisorChart data={salesByAdvisorData} />
        <CupoByProductChart data={cupoByProductData} />
        <SalesByDateChart data={salesByDateData} />
      </div>
    </div>
  );
};

export default Dashboard;
