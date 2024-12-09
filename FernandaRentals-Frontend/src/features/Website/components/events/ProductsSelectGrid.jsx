import { useEffect, useState } from "react";
import { Pagination } from "../../../../shared/components";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useEventsData } from "../../store/useEventsData";

export const ProductsSelectGrid = ({
  items,
  updateItemQuantity,
  removeItem,
}) => {


const { setEventProducts } = useEventsData();
  const PRODUCTS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const {
    eventData,
    getEventData
  } = useEventsData();


  // Calcula el número total de páginas
  const totalPages = Math.ceil(items.length / PRODUCTS_PER_PAGE);


  // Cambia la página actual
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  // Maneja el clic en la página anterior
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Maneja el clic en la página siguiente
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Calcula los productos a mostrar en la página actual
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, items.length);
  const currentProducts = items.slice(startIndex, endIndex);

  useEffect(() => {
    setEventProducts(items)
    console.log("desde ProductsSelectedGrid, eventData:   ",eventData);
    console.log("desde ProductsSelectedGrid, getEventData():   ",getEventData());
    
  }, [items])
  
  

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Costo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cantidad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentProducts.length ? (
            currentProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap font-bold text-lg text-gray-800">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                
                    <div className="flex space-x-2 ">
                      {/* Boton Menos */}
                      <button
                        className=""
                        onClick={() =>
                          updateItemQuantity(
                            product.id,
                            (product.quantity ?? 0) - 1
                          )
                        }
                      >
                        <FaMinus className="bg-gray-200 p-1 text-xl text-gray-400 hover:bg-yellow-400 rounded-sm" />
                      </button>
                      {/* Cantidad */}
                    <div className="text-gray-500 text-lg">
                      {product.quantity}
                    </div>
                      {/* Boton Mas */}
                        <button
                          onClick={() =>
                            updateItemQuantity(
                              product.id,
                              (product.quantity ?? 0) + 1
                            )
                          }
                        >
                          <FaPlus className="bg-gray-200 p-1 text-xl text-gray-400 hover:bg-green-300 rounded-sm" />
                        </button>
                      </div>
                  
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => removeItem(product.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
              >
                No hay productos seleccionados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="mt-4">
        <Pagination
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          hasPreviousPage={currentPage > 1}
          handleCurrentPage={handleCurrentPage}
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          hasNextPage={currentPage < totalPages}
        />
      </div>
    </div>
  );
};
