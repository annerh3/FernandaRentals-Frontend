import {
  CalendarDays,
  CalendarX2,
  ChevronsUp,
  CircleDollarSign,
  MapPinHouse,
  Sofa,
  UserRound,
  Workflow,
} from "lucide-react";
import { formatDate } from "../../../../shared/utils";
import { DataNotFound } from "../DataNotFound";
import { InfoRow } from "./InfoRow";

export const EventPreviewItem = ({ darkMode, handleModalOpen, events, onViewNotes }) => {
  if (events === undefined || events.status !== true) {
    return (
      <DataNotFound
        message="Hubo un problema al cargar los eventos. Por favor, verifica tu conexión."
        darkMode={darkMode}
        Icon={Workflow}
      />
    );
  }

  if (events.data.length === 0) {
    return (
      <DataNotFound
        message="No hay eventos."
        darkMode={darkMode}
        Icon={CalendarX2}
      />
    );
  }

  // Si hay eventos, se muestran normalmente
  return (
    <div className="grid grid-cols-1 gap-4 w-full p-4 sm:p-6 ">
      {events?.data?.map((event) => (
        <div
          key={event.id}
          className={`${
            darkMode ? "bg-siidni-dark" : "bg-gray-100"
          } w-full max-w-full sm:max-w-[500px] h-auto p-4 mx-auto rounded-xl hover:border hover:border-siidni-goldLight shadow-md transition-transform hover:scale-105`}
        >
          <div className="flex justify-between items-start align-middle">
            <h3 className="text-lg font-bold truncate max-w-[70%] md:max-w-[80%]">
              {event.name}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => handleModalOpen(event)}
                className="p-2 rounded-lg bg-siidni-gold flex items-center text-white font-medium hover:bg-siidni-goldDark"
              >
                Ver Más <ChevronsUp className="ml-1" />
              </button>
            </div>
          </div>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <InfoRow
                icon={UserRound}
                iconClass="text-purple-500"
                label={event.client.name}
              />
              <InfoRow
                icon={MapPinHouse}
                iconClass="text-red-500"
                label={event.location}
              />
              <InfoRow
                icon={CircleDollarSign}
                iconClass="text-green-500"
                label={event.total}
              />
            </div>

            <div className="space-y-2">
              <InfoRow
                icon={Sofa}
                iconClass="text-blue-500"
                label={`${event.eventDetails.length} ${event.eventDetails.length > 1 ? "Productos" : "Producto"}`}
              />
              <InfoRow
                icon={CalendarDays}
                iconClass="text-yellow-500"
                label={formatDate(event.startDate)}
              />
            </div>
          </section>
          <button
          onClick={() => onViewNotes(event)}  
          className={`my-3 transition-transform transform hover:translate-y-1 text-sm ${(event.eventNotes.length > 0) ? "bg-orange-400 hover:bg-orange-500" : "bg-blue-500 hover:bg-blue-600"} text-white py-1 px-3 rounded`}
        >
          {(event.eventNotes.length > 0) ? "Ver Notas" : "Añadir Notas"}
        </button>
        </div>
      ))}
    </div>
  );
};

export const EventPreviewSkeleton = ({ darkMode }) => {
  return (
    <div className="grid grid-cols-1 gap-4 w-full p-4 sm:p-6">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`${
            darkMode ? "bg-siidni-dark" : "bg-gray-300"
          } w-full max-w-full sm:max-w-[500px] h-[150px] p-4 mx-auto rounded-xl shadow-md animate-pulse`}
        >
          <div className="flex justify-between items-start mb-4">
            <div
              className={`${
                darkMode ? "bg-gray-600" : "bg-white"
              } h-5 rounded w-2/3`}
            ></div>
            {/* Botones */}
            <div className="flex space-x-2 items-center">
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-white"
                } h-7 w-6 rounded-md`}
              ></div>
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-white"
                } h-7 w-6 rounded-md`}
              ></div>
            </div>

          </div>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-white"
                } h-4 w-40 rounded`}
              ></div>
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-white"
                } h-4 rounded w-2/3`}
              ></div>
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-white"
                } h-4 rounded w-1/2`}
              ></div>
            </div>
            <div className="ml-6 space-y-2">
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-white"
                } h-4 rounded w-4/5`}
              ></div>
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-white"
                } h-4 rounded w-2/3`}
              ></div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

