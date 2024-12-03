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

export const EventPreviewItem = ({ darkMode, handleModalOpen, events }) => {
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
    <div className="grid grid-cols-1 gap-4 w-full p-6">
      {events?.data?.map((event) => (
        <div
          key={event.id}
          className={`${
            darkMode ? "bg-siidni-dark" : "bg-gray-200"
          } w-full max-w-[700px] h-[150px] max-h-[175px] p-4 mx-auto rounded-xl hover:border hover:border-siidni-goldLight shadow-md transition-transform hover:scale-105`}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">{event.name}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => handleModalOpen(event)}
                className="p-2 rounded-lg bg-siidni-gold flex text-white font-medium hover:bg-siidni-goldDark"
              >
                Ver Más <ChevronsUp />
              </button>
            </div>
          </div>
          <section className="flex gap-6">
            <div className="space-y-1">
              {/* Información del Cliente */}
              <InfoRow
                icon={UserRound}
                iconClass="text-purple-500"
                label={event.client.name}
              />
              {/* Información de Ubicación */}
              <InfoRow
                icon={MapPinHouse}
                iconClass="text-red-500"
                label={event.location}
              />

              {/*Información de Costo de Evento  */}
              <InfoRow
                icon={CircleDollarSign}
                iconClass="text-green-500"
                label={event.total}
              />
            </div>

            <div className="space-y-1">
              {/* Información de los productos */}
              <InfoRow
                icon={Sofa}
                iconClass="text-blue-500"
                label={`${event.eventDetails.length}${" "}
                ${event.eventDetails.length > 1 ? "Productos" : "Producto"}`}
              />
              {/* Información de la fecha de inicio */}
              <InfoRow
                icon={CalendarDays}
                iconClass="text-yellow-500"
                label={formatDate(event.startDate)}
              />
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export const EventPreviewSkeleton = ({ darkMode }) => {
  return (
    <div className="grid grid-cols-1 gap-4 w-full p-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={`${
            darkMode ? "bg-siidni-dark" : "bg-gray-400"
          } w-full max-w-[650px] h-[150px] p-4 mx-auto rounded-xl shadow-md animate-pulse`}
        >
          <div className="flex justify-between items-start mb-4">
            <div
              className={`${
                darkMode ? "bg-gray-600" : "bg-white"
              } h-5 rounded w-2/3`}
            ></div>
            <div className="flex space-x-2 items-center">
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-white"
                } h-7 w-6 rounded-md`}
              ></div>
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-white"
                } h-8 w-13 rounded-md`}
              ></div>
            </div>
          </div>
          <section className="flex gap-6">
            <div className="space-y-2">
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-white"
                } h-4 w-80 rounded`}
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
            <div className="space-y-2">
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-white"
                } h-4 rounded w-3/4`}
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
