import { BookX } from "lucide-react";

export const CancelEventButton = ({ endDate, handleCancelModalOpen }) => {
  return (
    <>
      <div className="flex justify-end mt-6">
        {new Date(endDate).getTime() >= Date.now() && ( // convierte endDate en un objeto Date valido y obtiene su tiempo en milisegundos
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
