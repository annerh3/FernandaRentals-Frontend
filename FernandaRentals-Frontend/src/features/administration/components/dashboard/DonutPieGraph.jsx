import Chart from "react-apexcharts";
import { formatCurrency } from "../../../../shared/utils";

export const DonutPieGraph = ({ data, darkMode }) => {
  // Para que no haya errores si los datos vienen vacíos
  const productsRevenueDistribution = data?.productsRevenueDistribution || [];

  // Mapeo de los nombres de ProductValidationSchema, estos serán las leyendas
  const labels = productsRevenueDistribution.map(
    (item) => item.product || "Producto"
  );
  
  // Valores del gráfico
  const series = productsRevenueDistribution.map((item) => item.revenue || 0);

  // Si no hay datos muestra el mensaje
  if (series.length === 0) {
    return (
      <div
        className={`donut-chart-container ${darkMode ? "text-white" : "text-black"}`}
      >
        <div className="text-2xl font-bold pb-2">Distribución de Ingresos</div>
        <p>No hay datos disponibles</p>
      </div>
    );
  }

  // Asegúrate de que data?.grossProfit esté definido antes de formatearlo
  const grossProfit = data?.grossProfit || 0;

  // ---------------------------- PARA LA DONA GRÁFICA
  const options = {
    chart: {
      type: "donut",
      height: "100%",
      width: "100%",
      fontFamily: "Inter, sans-serif",
      toolbar: { show: false },
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    colors: ["#FF6347", "#FFD700", "#4CAF50", "#2196F3", "#9C27B0", "#00CED1"],
    legend: {
      position: "bottom",
      horizontalAlign: "center", 
      labels: {
        colors: darkMode ? "#ffffff" : "#000000",
        useSeriesColors: false,
      },
    },
   
    yaxis: {
      labels: {
        style: {
          colors: darkMode ? "#ffffff" : "#000000",
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => {
                return `$${grossProfit ? formatCurrency(grossProfit) : '0'}`;
              },
            },
          },
        },
      },
    },
  };

  return (
    <div
      className={`donut-chart-container ${
        darkMode ? "bg-siidni-darkCard text-white" : "bg-white text-black"
      } rounded-xl p-4`}
    >
      <div className="text-2xl font-bold pb-2">Distribución de Ingresos</div>
      <Chart 
        options={options} 
        series={series} 
        type="donut" 
        height={350} 
      />
    </div>
  );
};