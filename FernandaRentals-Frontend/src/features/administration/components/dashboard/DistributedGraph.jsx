
import Chart from 'react-apexcharts';

export const DistributedGraph = ({data , darkMode}) => {
   // Para evitar errores si viene vacío
   const productsRevenueDistribution = data?.productsRevenueDistribution || [];

   // Mapeo de los nombres de los productos, estos serán las leyendas
   const labels = productsRevenueDistribution.map((item) => item.product || 'Producto');
   
   // Valores del gráfico, o 0 si no se encuentra un valor de ingreso
   const series = [{
     data: productsRevenueDistribution.map((item) => item.revenue || 0)
   }];
 
   // Si no hay datos, muestra el mensaje
   if (series[0].data.length === 0) {
     return (
       <div className={`bar-chart-container ${darkMode ? 'text-white' : 'text-black'}`}>
         <div className="text-2xl font-bold pb-2">Distribución de Ingresos</div>
         <p>No hay datos disponibles</p>
       </div>
     );
   }
 
   // Opciones para el gráfico de barras distribuidas
   const options = {
     chart: {
       type: 'bar',
       height: '100%',
       width: '100%',
       fontFamily: "Inter, sans-serif",
       toolbar: { show: false },
     },
     plotOptions: {
       bar: {
         distributed: true, // Clave para distribuir los colores
         horizontal: false, // Barras verticales
       }
     },
     dataLabels: {
       enabled: false, // Desactivar etiquetas de datos
     },
     xaxis: {
       categories: labels,
       labels: {
         style: {
           colors: darkMode ? '#ffffff' : '#000000',
         }
       }
     },
     yaxis: {
       labels: {
         formatter: (value) => `$${value.toLocaleString()}`,
         style: {
           colors: darkMode ? '#ffffff' : '#000000',
         }
       }
     },
     tooltip: {
       y: {
         formatter: (value) => `$${value.toLocaleString()}`, // Formateo del valor de tooltip con comas
       },
     },
     colors: ['#FF6347', '#FFD700', '#4CAF50', '#2196F3', '#9C27B0'], // Colores para cada barra
     legend: {
       show: false, // Ocultar leyenda ya que los nombres están en el eje X
     },
     grid: {
       show: true,
       borderColor: darkMode ? '#333333' : '#e0e0e0',
       strokeDashArray: 0,
       position: 'back',
       xaxis: {
         lines: {
           show: false
         }
       },   
       yaxis: {
         lines: {
           show: true
         }
       }
     },
     responsive: [
       {
         breakpoint: 480,
         options: {
           chart: {
             width: '100%'
           },
           plotOptions: {
             bar: {
               horizontal: false
             }
           }
         }
       }
     ]
   };
 
   return (
     <div className={`bar-chart-container ${darkMode ? 'bg-siidni-darkCard text-white' : 'bg-white text-black'} rounded-xl p-4`}>
       <div className="text-2xl font-bold pb-2">Distribución de Ingresos</div>
       <Chart 
         options={options} 
         series={series} 
         type="bar" 
         height={350} 
       />
     </div>
   );
 };

