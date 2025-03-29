import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchSales } from "../services/salesService";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
    color: COLORS[index % COLORS.length],
  }));

  const salesByDateData = Object.keys(salesByDate).map((key) => ({
    date: key,
    ventas: salesByDate[key],
  }));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Estadísticas de Ventas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ventas por asesor */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Ventas por Asesor</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByAdvisorData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ventas" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cupo por producto */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Cupo Total por Producto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cupoByProductData}
                cx="50%"
                cy="50%"
                label
                outerRadius={100}
                dataKey="value"
              >
                {cupoByProductData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Ventas por fecha */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-2">
          <h3 className="text-lg font-semibold mb-2">Ventas por Fecha</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByDateData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ventas" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
