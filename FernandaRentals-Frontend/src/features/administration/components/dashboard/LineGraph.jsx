import Chart from "react-apexcharts"; // For ApexCharts
import { formatCurrency, formatDate_MM_YY } from "../../../../shared/utils";

export const LineGraph = ({ darkMode, data }) => {
  const fillOp = {
    type: "gradient",
    gradient: {
      opacityFrom: 0.65,
      opacityTo: 0,
    },
  };

  const options = {
    chart: {
      type: "area",
      height: "100%",
      width: "100%",
      fontFamily: "Inter, sans-serif",
      toolbar: { show: true },
    },
    xaxis: {
      categories: data?.grossProfitByMonth.map((item) =>
        formatDate_MM_YY(item.month)
      ),
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
        show: true,
      },
      axisBorder: { show: false },
      axisTicks: { show: true },
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value}`,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: darkMode
            ? "text-xs font-normal fill-white"
            : "text-xs font-normal fill-gray-800 ",
        },
      },
    },
    // Cuando se pasa el mouse sobre 
    tooltip: { enabled: true, theme: darkMode ? "dark" : "light" },
    // los puntos en el gráfico
    markers: {
      size: 5,
      colors: darkMode ? ["#FF5733"] : ["#005f73"], 
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 7 },
    },
    fill: fillOp,
    stroke: { width: 2 },
    grid: {
      show: true,
      borderColor: darkMode ? "#374151" : "#E5E7EB", // Color de la cuadrícula
    },
    legend: {
      show: true,
      labels: {
        colors: darkMode ? "#D1D5DB" : "#4B5563", // Color dinámico de las etiquetas de la leyenda
      },
    },
  };

  const series = [
    {
      name: "Bruto",
      data: data?.grossProfitByMonth.map((item) => item.profit),
      color: darkMode ? "#34D399" : "#1cda2a",
    },
    {
      name: "Neto",
      data: data?.netProfitByMonth.map((item) => item.profit),
      color: darkMode ? "#60A5FA" : "#1c30da",
      fill: fillOp,
    },
  ];

  return (
    // <div
    //   className={`max-w-full mt-2 rounded-lg shadow p-4 ${
    //     darkMode ? " text-white" : "bg-white text-gray-900"
    //   }`}
    // >
    <>
      <div className="text-2xl font-bold pb-2">
        $ {formatCurrency(data?.grossProfit)}
      </div>
      <p className="text-sm font-normal">Ventas de los últimos 4 meses</p>
      <div className="mt-4">
        <Chart options={options} series={series} type="area" height={300} />
      </div>
    </>
    // </div>
  );
};
