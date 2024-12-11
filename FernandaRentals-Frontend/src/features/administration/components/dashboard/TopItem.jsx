import { LuChevronsDown } from "react-icons/lu";
import { RiArrowUpDoubleFill } from "react-icons/ri";

export const TopItem = ({ product, count, monto, is_up }) => {
  return (
    <li className="flex justify-between items-center py-2 border-b border-gray-300 last:border-b-0">
      {/* Nombre del producto */}
      <div className="flex-1">
        <p className="text-sm font-medium">{product}</p>
      </div>

      {/* Detalles de ventas */}
      <div className="flex items-center space-x-4">
        {/* Cantidad vendida */}
        <div className="flex items-center space-x-1">
          <span className="text-sm font-semibold">{count}</span>
          {is_up ? (
            <RiArrowUpDoubleFill className="text-green-600" />
          ) : (
            <LuChevronsDown className="text-red-600" />
          )}
        </div>

        {/* Monto de ganancia */}
        <div>
          <span className="text-sm font-semibold text-gray-700">
            ${monto.toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  );
};
