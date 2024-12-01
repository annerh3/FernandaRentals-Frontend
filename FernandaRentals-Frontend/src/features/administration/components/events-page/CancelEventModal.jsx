
export const CancelEventModal = ({ darkMode, selectedItem, setShowCancelModal, setShowModal }) => {

  const handleCancelEvent = () => {
    console.log("EventId:  ",selectedItem.id);
    setShowModal(false)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className={`${
          darkMode ? "bg-siidni-darkCard text-white" : "bg-white text-black"
        } p-8 rounded-xl w-1/2 max-w-4xl`}
      >

       
        <h1 className="mb-6 font-bold">Cancelar el evento {selectedItem.name}</h1>
<p>Estás a punto de cancelar un evento del cliente {selectedItem.client.name}.</p>
<p className="mt-3 text-red-600 font-semibold">Esta acción no tiene vueltra atras. ¿Estas seguro de hacer esto? </p>
 

        {/* Botón para cerrar */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={handleCancelEvent}
            className={`px-4 py-2 rounded-lg ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
            } hover:bg-gray-300`}
          >
            Cancelar Evento
          </button>
          <button
            onClick={() => setShowCancelModal(false)}
            className={`px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 `}
          >
            Cerrar
          </button>
        </div>
      </div>
    
    </div>
  );
};
