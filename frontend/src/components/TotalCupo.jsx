const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  const TotalCupo = ({ total }) => {
    return (
      <div className="bg-blue-100 text-blue-800 p-4 rounded-lg mb-6 shadow-md flex justify-between">
        <p className="text-lg font-semibold">Total Cupo Solicitado:</p>
        <p className="text-xl font-bold">{formatCurrency(total)}</p>
      </div>
    );
  };
  
  export default TotalCupo;
  