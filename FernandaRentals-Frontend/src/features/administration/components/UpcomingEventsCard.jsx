import { Link } from "react-router-dom";
import { formatDate } from "../../../shared/utils";
import { DataNotFound } from "./DataNotFound";
import { CalendarX2, Workflow } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { InfoRow } from "./events-page/InfoRow";
import { CiCalendarDate } from "react-icons/ci";
import { BsCalendar2DateFill } from "react-icons/bs";


// Relacionando a la carga de los eventos del dashboard
export const UpcomingEventsCard = ({ darkMode, dashboard }) => {
  if (dashboard === undefined || dashboard.status !== true) {
    return (
      <DataNotFound
        message="Hubo un problema al cargar los eventos. Por favor, verifica tu conexión."
        darkMode={darkMode}
        Icon={Workflow}
      />
    );
  }

  if (dashboard.data.totalUpcomingEvents === 0) {
    return (
      <DataNotFound
        message="No hay eventos en estas semana."
        darkMode={darkMode}
        Icon={CalendarX2}
      />
    );
  }

  return (
    <>
      <div className="flex justify-between items-center ">
        <h2 className="text-xl font-bold mb-4">
          Eventos en las próximas dos semanas
        </h2>

        {/* Botón que redirige a la pagina de Eventos */}

        <Link
          to="/administration/manage-events"
          className={`${
            darkMode
              ? "bg-siidni-dark text-white hover:shadow-white"
              : "bg-gray-100 text-black hover:shadow-black"
          } p-2 rounded-lg shadow-sm transition-transform hover:scale-105 mb-3`}
        >
          Ver todo
        </Link>
        {/* Foin del Botón  */}

      </div>
      {/* Muestra los eventos si es que los hay */}
      <div className="space-y-4 overflow-y-auto h-96">
        {dashboard?.data?.upcomingEvents.length > 0 ? (
          dashboard?.data?.upcomingEvents.map((event) => (
            <div
              key={event.id}
              className={`${
                darkMode ? "bg-[#171717]" : "bg-gray-100"
              } p-4 rounded-lg shadow-md `}
            >
              {/* Muestra el usuario y contacto , solo tenemos correos */}
              {/* <InfoRow  label={event.name} className="font-semibold" /> */}
              <h3 className={`${
                darkMode ? " text-siidni-goldLight" : "text-blue-900"
              } rounded-lg font-semibold `}>{event.name}  </h3>

              <InfoRow  icon={FaUser} iconClass="text-blue-500" label={`${event.clientName} : ${event.clientEmail}`} />
              
              {/* Ubicación e los Eventos */}
              <InfoRow  icon={FaLocationDot} iconClass="text-red-500" label={event.location} />

              {/* Fecha del evento */}
              <InfoRow  icon={BsCalendar2DateFill} iconClass="text-green-500" label={formatDate(event.startDate)} />
              
            </div>
          ))
        ) : (
          // Muestra el mensaje si no es de esta manera
          <p>No hay Eventos Próximos.</p>
        )}
      </div>
    </>
  );
};

// Skeleton de los eventos en la carga
export const UpcomingEventsCardSkeleton = ({ darkMode }) => {
  return (
    <>
      <div className="flex justify-between items-center animate-pulse ">
        <h2
          className={`${
            darkMode ? "bg-gray-100" : "bg-gray-300"
          } w-36 h-6 rounded-sm mb-3`}
        ></h2>
        <p
          className={`${
            darkMode ? "bg-gray-100" : "bg-gray-600 "
          } p-2 rounded-md w-20 h-10 shadow-sm transition-transform hover:scale-105 mb-3`}
        ></p>
      </div>
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gray-200 rounded-lg"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>
    </>
  );
};
