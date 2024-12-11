import Chart from 'react-apexcharts';  // For ApexCharts
import { formatCurrency, formatDate_MM_YY } from '../../../../shared/utils';


export const LineGraph = ({darkMode , data}) => {

    console.log(data);
    
    // const data = {
    //     totalIncome_name: "Total Ingresado",
    //     eventsHeld_name: "Eventos Realizados",
    //     discountGiven_name: "Descuentos Otorgados",
    //     dataGraf: [
    //       { month: "Febrero", totalIncome: 1150, eventsHeld: 6, discountsGiven: -150 },
    //       { month: "Marzo", totalIncome: 1350, eventsHeld: 4, discountsGiven: -90 },
    //       { month: "Abril", totalIncome: 1250, eventsHeld: 5, discountsGiven: -120 },
    //       { month: "Mayo", totalIncome: 8400, eventsHeld: 8, discountsGiven: -200 },
    //       { month: "Junio", totalIncome: 1600, eventsHeld: 7, discountsGiven: -180 },
    //       { month: "Julio", totalIncome: 1500, eventsHeld: 6, discountsGiven: -130 },
    //     ],
    //   };
    
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
          categories: data?.grossProfitByMonth.map((item) => formatDate_MM_YY( item.month)),
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
              cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
            },
          },
        },
        tooltip: { enabled: true },
        markers: {
          size: 5,
          colors: ["#FF0000"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: { size: 7 },
        },
        fill: fillOp,
        stroke: { width: 2 },
        grid: { show: true },
        legend: { show: true },
      };
    
      const series = [
        {
          name: "Bruto",
          data: data?.grossProfitByMonth.map((item) => item.profit),
          color: "#1cda2a",
        },
        {
          name: "Neto",
          data: data?.netProfitByMonth.map((item) => item.profit),
          color: "#1c30da",
          fill: fillOp,
        },
      ];
    
      return (
        <div
          className={`max-w-full mt-2 rounded-lg shadow p-4 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <div className="text-2xl font-bold pb-2">$  { formatCurrency(data?.grossProfit)}</div>
          <p className="text-sm font-normal">Ventas del mes</p>
          <div className="mt-4">
            <Chart options={options} series={series} type="area" height={300} />
          </div>
        </div>
      );
    };