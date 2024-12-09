import { formatDate } from "../../../shared/utils";
import { useEventEditStore } from "../store";
import { useProductsValidation } from "../store/useProductsValidation";


export const ValidateProductsModal = () => {
  const showModal = useProductsValidation((state) => state.showModal);
  const setShowModal = useProductsValidation((state) => state.setShowModal);
  const data = useProductsValidation((state) => state.data);
  
  const setSuccess = useProductsValidation((state) => state.setSuccess);



  if (data.status && showModal) {
    setTimeout(() => {
      setShowModal(false);
    }, 2000); // Cierra el modal despues de 2 segundos
    setSuccess(true);
    return ( // retornar vista para exito: todos los productos si estan disponibles
      <section className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white text-black p-8 rounded-xl w-1/2 max-w-4xl mx-auto shadow-lg">
          {/* Título para éxito */}
          <h1 className="mb-6 text-green-600 text-2xl font-bold">
            Excelente! {data.message}
          </h1>
        </div>
      </section>
    );
  }

  // Agrupar productos por ID y fechas de no disponibilidad
  const groupedProducts = data.data.reduce((acc, item) => {
    const productId = item.product.id;
    if (!acc[productId]) {
      acc[productId] = {
        product: item.product,
        unavailableDates: new Set() // Usamos un Set para evitar fechas duplicadas
      };
    }
    acc[productId].unavailableDates.add(item.unavailableDate);
    return acc;
  }, {});


  const renderUnavailableProducts = () => (
    <div className="overflow-auto max-h-96">
      <p className="mt-3 text-red-600 font-semibold text-lg">
        {data.message}
      </p>
      <ul className="mt-4 space-y-4">
        {Object.values(groupedProducts).map((item, index) => (
          <li key={index} className="flex flex-col border-b pb-4">
            <div className="flex items-center">
              <img
                src={item.product.urlImage}
                alt={item.product.name}
                className="w-24 h-24 object-cover mr-4 shadow-sm shadow-black rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">{item.product.description}</p>
                <p className="mt-2 text-gray-700">Stock: {item.product.stock}</p>
                {/* Mostrar las fechas de no disponibilidad sin repeticiones */}
                <div className="mt-2 text-red-600 font-semibold">
                  No disponible en: 
                </div>
                <span>
                  {Array.from(item.unavailableDates).map((date, i) => (
                    <span key={i} className="block">{formatDate(date)}</span>
                  ))}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white text-black p-8 rounded-xl w-1/2 max-w-4xl mx-auto shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">
          {data.status ? "Todos los productos están disponibles" : "Algunos productos no están disponibles"}
        </h1>
        {renderUnavailableProducts()}
        {/* Botones */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded-lg bg-siidni-gold text-white font-semibold hover:bg-siidni-goldDark transition duration-200"
          >
            Ok
          </button>
        </div>
      </div>
    </section>
  );
};
