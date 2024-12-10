import { useEventEditStore } from "../../store";

export const EventErrorModal = ({
  isOpen,
  onClose,
  errorMessage,
  refundDetails,
}) => {
  const { eventDataToEdit } = useEventEditStore();
  const isEditMode = eventDataToEdit.id && eventDataToEdit.id.trim() !== '';
  
  if (!isOpen) return null;
  // Formatear el mensaje del backend
  const formatBackendMessage = (message) => {
    if (!message) return [];

    const backendMessage = message.replace("Mensaje del backend: ", "").trim();
    return backendMessage.split("El producto").filter((line) => line.trim() !== "");
  };

  const backendErrors = refundDetails[3] ? formatBackendMessage(refundDetails[3]) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          { isEditMode ? "Error al editar el evento" : "Error al crear el evento"}
        </h2>
        <p className="text-gray-700 mb-2">{errorMessage}</p>

        {refundDetails?.length > 0 ? (
          <>
            <p className="text-gray-700 mb-6 font-bold">
              {!isEditMode && "Se ha realizado un reembolso completo."}
            </p>
            <p className="text-gray-700">Detalles del reembolso:</p>
            <ul className="text-sm text-gray-600 list-disc list-inside mb-6 mt-1">
              {refundDetails.map((detail, index) =>
                index !== 3 ? <li key={index}>{detail}</li> : null
              )}
            </ul>

            <p className="text-gray-700">Posibles errores:</p>
            <ul className="text-sm text-gray-600 list-disc list-inside mb-6 mt-1">
              {backendErrors.length > 0 ? (
                backendErrors.map((error, index) => (
                  <li key={index}>{error.trim()}</li>
                ))
              ) : (
                <li>No se proporcionaron errores específicos.</li>
              )}
            </ul>
          </>
        ) : (
          <p className="text-gray-700">No hay detalles de reembolso disponibles.</p>
        )}

        <button
          onClick={onClose}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};
