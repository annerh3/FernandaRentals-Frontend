export const TableProductsEventDetails = ({ eventDetails, darkMode }) => {
  return (
    <div className="overflow-auto rounded-lg shadow-md">
      <table
        className={`w-full text-sm text-left ${
          darkMode ? "text-white bg-siidni-darkCard" : "text-gray-700 bg-white"
        } border-collapse`}
      >
        {/* Encabezado de la tabla */}
        <thead>
          {/* Fila */}
          <tr
          // Manejar el DarkMode poniendo en dorado si esta en Dark
            className={`${
              darkMode
                ? "bg-siidni-darkLight text-siidni-goldLight"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            <th className="px-6 py-3 text-sm font-medium border-b">Producto</th>
            <th className="px-6 py-3 text-sm font-medium border-b">Cantidad</th>
            <th className="px-6 py-3 text-sm font-medium border-b">
              Precio Unitario
            </th>
            <th className="px-6 py-3 text-sm font-medium border-b">Total</th>
          </tr>
        </thead>
        {/* Cuerpo de la tabla */}
        <tbody>
          {eventDetails.map((detail, index) => (
            // Fila del cuerpo de la tabla
            <tr
              key={detail.id}
              // Para manejar que cada fila intermedia sea de un color mas oscuro o claro 
              className={`${
                index % 2 === 0
                  ? darkMode
                    ? "bg-siidni-darkCard"
                    : "bg-white"
                  : darkMode
                  ? "bg-siidni-darkLight"
                  : "bg-gray-50"
              } hover:shadow-lg hover:scale-[1.01] transition duration-150`}
            >
              {/* Columna dela Imagen */}
              <td className="px-6 py-4 border-b">
                <div className="flex items-center space-x-4">
                  <img
                    src={detail.product.urlImage}
                    alt={detail.product.name}
                    className="w-12 h-12 object-cover rounded-md border border-gray-300"
                  />
                  <span className="font-medium">{detail.product.name}</span>
                </div>
              </td>
              {/* Columna de la cantidad */}
              <td className="px-6 py-4 border-b text-center">
                {detail.quantity}
              </td>

              {/* Columna de precio Unitario */}
              <td className="px-6 py-4 border-b text-center">
                ${detail.unitPrice.toFixed(2)}
              </td>
              {/* Columna del Costo de la Fila de Producto */}
              <td className="px-6 py-4 border-b text-center font-bold text-green-500">
                ${detail.totalPrice.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
