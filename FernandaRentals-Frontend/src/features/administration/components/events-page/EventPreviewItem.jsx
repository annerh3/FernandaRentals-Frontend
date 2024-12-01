import { CalendarDays, CalendarX2, ChevronsUp, CircleDollarSign, MapPinHouse, Sofa, UserRound, Workflow } from "lucide-react";
import { formatDate } from "../../../../shared/utils";
import { DataNotFound } from "../DataNotFound";

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
    <div className="grid grid-cols-1 gap-4 w-5/6 p-4">
      {events?.data?.map((event) => (
        <div
          key={event.id}
          className={`${
            darkMode ? "bg-siidni-dark" : "bg-gray-200"
          } w-full max-w-[500px] h-[150px] p-4 mx-auto rounded-xl hover:border hover:border-siidni-goldLight shadow-md transition-transform hover:scale-105`}
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
              <p className="text-sm opacity-70 flex gap-2">
                <span className="text-purple-500">
                  <UserRound size={17} />
                </span>
                {event.client.name}
              </p>
              <p className="text-sm opacity-70 flex gap-2">
                <span className="text-red-500">
                  <MapPinHouse size={17} />
                </span>
                {event.location}
              </p>
              <p className="text-sm opacity-70 flex gap-2">
                <span className="text-green-500">
                  <CircleDollarSign size={17} />
                </span>
                {event.eventCost}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm opacity-70 flex gap-2">
                <span className="text-blue-500">
                  <Sofa size={17} />
                </span>
                {event.eventDetails.length}{" "}
                {event.eventDetails.length > 1 ? "Productos" : "Producto"}
              </p>
              <p className="text-sm opacity-70 flex gap-2">
                <span className="text-yellow-500">
                  <CalendarDays size={17} />
                </span>
                {formatDate(event.startDate)}
              </p>
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
          } w-full max-w-[500px] h-[150px] p-4 mx-auto rounded-xl shadow-md animate-pulse`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`${darkMode ? "bg-gray-600" : "bg-white"} h-5 rounded w-2/3`}></div>
            <div className="flex space-x-2 items-center">
              <div className={`${darkMode ? "bg-gray-700" : "bg-white"} h-7 w-6 rounded-md`}></div>
              <div className={`${darkMode ? "bg-gray-700" : "bg-white"} h-8 w-13 rounded-md`}></div>
            </div>
          </div>
          <section className="flex gap-6">
            <div className="space-y-2">
              <div className={`${darkMode ? "bg-gray-700" : "bg-white"} h-4 w-80 rounded`}></div>
              <div className={`${darkMode ? "bg-gray-700" : "bg-white"} h-4 rounded w-2/3`}></div>
              <div className={`${darkMode ? "bg-gray-700" : "bg-white"} h-4 rounded w-1/2`}></div>
            </div>
            <div className="space-y-2">
              <div className={`${darkMode ? "bg-gray-700" : "bg-white"} h-4 rounded w-3/4`}></div>
              <div className={`${darkMode ? "bg-gray-700" : "bg-white"} h-4 rounded w-2/3`}></div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

