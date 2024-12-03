import { BookX } from "lucide-react";

export const  CancelEventButton = ({handleCancelModalOpen, startDate }) => {
  const now = Date.now(); // Obtiene la fecha y hora actual en milisegundos

  return (
    <>
      <div className="flex justify-end mt-6">
        {
          now < new Date(startDate).getTime() && ( // si la fecha actual esta antes o igual a la de fin
            <button
              onClick={handleCancelModalOpen}
              className="p-2 rounded-lg flex gap-2 text-gray-700 hover:text-red-500 top-4 right-4"
            >
              <BookX /> Cancelar Evento
            </button>
          )}
      </div>
    </>
  );
};
