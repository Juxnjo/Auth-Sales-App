import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SalesByDateChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md col-span-2">
      <h3 className="text-lg font-semibold mb-2">Ventas por Fecha</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ventas" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesByDateChart;
