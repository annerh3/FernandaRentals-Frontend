import Chart from "react-apexcharts";

export const GrafSection = ({darkMode}) => {

    const data = {
        totalIncome_name: "Total Ingresado",
        eventsHeld_name: "Eventos Realizados",
        discountGiven_name: "Descuentos Otorgados",
        dataGraf: [
            {
                month: "Febrero",
                totalIncome: 1150, // Total ingresos
                eventsHeld: 6,     // Eventos realizados
                discountsGiven: -150, // Descuentos otorgados
            },
            {
                month: "Marzo",
                totalIncome: 1350,
                eventsHeld: 4,
                discountsGiven: -90,
            },
            {
                month: "Abril",
                totalIncome: 1250,
                eventsHeld: 5,
                discountsGiven: -120,
            },
            {
                month: "Mayo",
                totalIncome: 8400,
                eventsHeld: 8,
                discountsGiven: -200,
            },
            {
                month: "Junio",
                totalIncome: 1600,
                eventsHeld: 7,
                discountsGiven: -180,
            },
            {
                month: "Julio",
                totalIncome: 1500,
                eventsHeld: 6,
                discountsGiven: -130,
            },
        ],
    };
    
    const fillOp = 
    {
        // type: Define cómo se rellena el área bajo la línea. "gradient" aplica un degradado.
        type: "gradient",
        gradient: {
          opacityFrom: 0.65,
          opacityTo: 0,
        },
    };

  const options = {
    chart: {
      type: "area", //type: Define el tipo de gráfico
      //En este caso, "area" genera un gráfico de áreas. Otros tipos incluyen "line", "bar", "pie", etc.
      height: "100%", // 100 del alto del contenedor
      width: "100%", // 100 del ancho del contenedor
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: true,
      }, //Controla la visibilidad de la barra de herramientas
      //Si show: true, permite realizar interacciones como exportar o acercar/alejar el gráfico.
    },

    xaxis: {
      //categories: Son las etiquetas que aparecen en el eje X (la parte de abajo del gráfico). En este caso, representa fechas.
      // la parte de abajo del gráfico
      categories: data.dataGraf.map((item) => item.month),
      //   labels: Define el estilo de las etiquetas del eje X.
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
        show: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: true,
      },
    },

    yaxis: {
        //min: -300, // Ajusta el mínimo del eje Y
        //max: 2000, // Ajusta el máximo del eje Y
        labels: {
          formatter: (value) => `$${value}`,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
        },
      },
    // enabled: Habilita o deshabilita la funcionalidad de tooltip,
    //que muestra información adicional cuando pasas el cursor sobre un punto del gráfico.
    // tooltip: {
    //   enabled: true,
    // },
    tooltip: {
      enabled: true, // Desactiva los tooltip
    },
    markers: {
      size: 5, // Tamaño del punto
      colors: ["#FF0000"], // Color del punto
      strokeColors: "#fff", // Borde del punto
      strokeWidth: 2,
      hover: {
        size: 7, // Tamaño del punto al pasar el cursor
      },
    },
    fill:fillOp,
    // Controla el grosor de las líneas del gráfico.
    stroke: {
      width: 2,
    },
    // Determina si se muestra la cuadrícula detrás del gráfico.
    grid: {
      show: true,
    },
    // Controla si se muestra la leyenda del gráfico. La leyenda explica qué representa cada serie de datos.
    legend: {
      show: true,
    },
  };

  const series = [
    {
        name: data.totalIncome_name,
        data: data.dataGraf.map((item) => item.totalIncome),
        color: "#1cda2a",
      },
      {
        name: data.eventsHeld_name,
        data: data.dataGraf.map((item) => item.eventsHeld),
        color: "#1c30da",
        fill:fillOp
      },
      {
        name: data.discountGiven_name,
        data: data.dataGraf.map((item) => item.discountsGiven),
        color: "#da1313",
        fill: {
            type: "gradient",
            gradient: {
              //inverseColors: true, // Gradiente inverso solo para descuentos
              opacityFrom: -0.65,
              opacityTo: 0,
            },
          },
      },
  ];

  return (
    <div
      className={`max-w-full mt-2 rounded-lg shadow p-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="text-2xl font-bold pb-2">$12,423</div>
      <p className="text-sm font-normal">
        Ventas del mes
      </p>
      <div className="mt-4">
        <Chart options={options} series={series} type="area" height={300} />
      </div>
    </div>
  );
};