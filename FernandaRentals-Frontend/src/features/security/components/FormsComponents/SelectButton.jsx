import { useEffect, useState } from "react";
import { useClientType } from "../../../administration/hooks/useClientType";

export const SelectButton = ({ onSelect }) => {
  const { categoryClients, loadClientTypes, isLoading } = useClientType()
  const [fetchingClients, setFetchingClients] = useState(true);
  const [openSort, setOpenSort] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null)


  useEffect(() => {
    if (fetchingClients) {
      loadClientTypes();
      setFetchingClients(false);
    }
  }, [fetchingClients]);

  // Indicador de carga mientras los datos se obtienen
  if (isLoading || fetchingClients) {
    return <div>Cargando tipos de clientes...</div>;
  }
  console.log(categoryClients);
  
  // Maneja la selección de una opción
  const handleOptionClick = (client) => {
    setSelectedClient(client); // Actualiza el cliente seleccionado
    setOpenSort(false); // Cierra el desplegable
    if (onSelect) onSelect(client.id); // Envía el ID al componente padre si es necesario
  };
 
  return (
    <div className="relative mt-5 w-full">
      {/* Botón principal */}
      <button
        onClick={() => setOpenSort((prev) => !prev)}
        className="flex items-center w-full py-2 px-3 text-sm font-semibold text-black bg-white rounded-lg shadow appearance-none border focus:outline-none focus:shadow-outline"
      >
        <span>{selectedClient ? selectedClient.name : "Seleccionar tipo de cliente"}</span>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${
            openSort ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Lista desplegable */}
      {openSort && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-md shadow-lg">
          <div className="px-2 pt-2 pb-2">
            <div className="flex flex-col">
            {/* products.data.items.map */}
              {categoryClients?.data?.map((client) => (
                <button
                  key={client.id}
                  onClick={() => handleOptionClick(client)}
                  className="flex flex-row items-start p-2 rounded-lg hover:bg-gray-200"
                >
                  <p className="font-semibold">{client.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
