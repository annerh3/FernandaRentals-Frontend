import { useEffect } from "react";
import { MonthInput, MonthPicker } from "react-lite-month-picker";
import { GrafSection } from "./events-page";

export const FinancialReport = ({
  data,
  message,
  status,
  darkMode,
  selectedMonthData,
  setIsPickerOpen,
  isPickerOpen,
  setSelectedMonthData,
  financeIsLoading,
}) => {
  useEffect(() => {
    console.log("esto llega al financiaReport: ",data); 
    console.log(status);
    
  }, [data])
  
  return (
    <div
      className={`min-h-[400px] mx-auto mt-8 p-2 shadow-lg rounded-lg border ${
        darkMode
          ? "bg-siidni-darkCard border-gray-700 text-gray-200"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      <section className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        {/* Título del Reporte */}
        <h1 className="text-lg sm:text-xl font-semibold mb-2 md:mb-0">
          Reporte Financiero
        </h1>

        {/* Selector de Mes */}
        <div className="w-full md:w-auto">
          <MonthInput
            selected={selectedMonthData}
            setShowMonthPicker={setIsPickerOpen}
            showMonthPicker={isPickerOpen}
            lang="es"
            size="small"
            bgColor={darkMode ? "#444" : "#fff"}
            textColor={darkMode ? "#fff" : "#333"}
            bgColorHover={darkMode ? "#444" : "#f4f4f4"}
          />
          {isPickerOpen && (
            <MonthPicker
              size="small"
              lang="es"
              setIsOpen={setIsPickerOpen}
              selected={selectedMonthData}
              onChange={setSelectedMonthData}
              bgColorPicker={darkMode ? "#333" : "#fff"}
              textColor={darkMode ? "#fff" : "#333"}
              bgColorMonthActive={darkMode ? "#ea995e" : "#4ea3983e"}
              bgColorMonthHover={darkMode ? "#444" : "#f4f4f4"}
              borderRadiusMonth="7px"
            />
          )}
        </div>
      </section>

      {financeIsLoading ? (
        <h2>Cargando . . . </h2>
      ) : status != 404 ? (
        <>
          <p
            className={`text-sm mb-6 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {message}
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Ingresos Totales:</span>
              <span className="font-bold">${data?.totalRevenue?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Descuentos Totales:</span>
              <span className="font-bold">
                ${data?.totalDiscounts?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Cantidad de Eventos:</span>
              <span className="font-bold">{data?.eventCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Ingresos Promedio:</span>
              <span className="font-bold">
                ${data?.averageRevenue?.toFixed(2)}
              </span>
            </div>
          </div>
        </>
      ) : (
        <p
          className={`text-sm mb-6 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {message || "No hubieron eventos en este mes."}
        </p>
      )}

      <GrafSection darkMode={darkMode}/>
    </div>
  );
};
