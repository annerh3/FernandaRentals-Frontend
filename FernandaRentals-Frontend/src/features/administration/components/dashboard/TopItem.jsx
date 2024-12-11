import { LuChevronsDown } from "react-icons/lu";
import { RiArrowUpDoubleFill } from "react-icons/ri";

export const TopItem = ({ product, count, monto, is_up, darkMode }) => {
  return (
    <li
      className={`flex justify-between items-center p-2 border-b rounded-md last:border-b-0 ${
        darkMode
          ? "border-gray-700 bg-siidni-dark text-gray-300"
          : "border-gray-300 bg-white text-gray-700"
      }`}
    >
      {/* Nombre del producto */}
      <div className="flex-1">
        <p className="text-sm font-medium">{product}</p>
      </div>

      {/* Detalles de ventas */}
      <div className="flex items-center space-x-4">
        {/* Cantidad vendida */}
        <div className="flex items-center space-x-1">
          <span
            className={`text-sm font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {count}
          </span>
          {is_up ? (
            <RiArrowUpDoubleFill
              className={darkMode ? "text-green-400" : "text-green-600"}
            />
          ) : (
            <LuChevronsDown
              className={darkMode ? "text-red-400" : "text-red-600"}
            />
          )}
        </div>

        {/* Monto de ganancia */}
        <div>
          <span
            className={`text-sm font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            ${monto.toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  );
};
