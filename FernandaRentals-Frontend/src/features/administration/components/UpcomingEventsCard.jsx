import { Link } from "react-router-dom";
import { formatDate } from "../../../shared/utils";
import { DataNotFound } from "./DataNotFound";
import { CalendarX2, Workflow } from "lucide-react";

export const UpcomingEventsCard = ({darkMode, dashboard}) => {
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

    return (<>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold mb-4">Eventos en las proximas dos semanas</h2>
                  <Link to="/administration/manage-events" className={`${darkMode ? "bg-siidni-dark text-white hover:shadow-white" : "bg-gray-100 text-black hover:shadow-black"} p-2 rounded-lg shadow-sm transition-transform hover:scale-105 mb-3`}>
                    Ver todo
                  </Link>
                </div>
                <div className="space-y-4">
                  {dashboard?.data?.upcomingEvents.length > 0 
                  ? dashboard?.data?.upcomingEvents.map(event => 
                  <div key={event.id} className={`${darkMode ? "bg-[#171717]" : "bg-gray-100"} p-4 rounded-lg shadow-md `}>
                        <h3 className="font-semibold">{event.name}</h3>
                        <p className="text-sm opacity-70">
                          {formatDate(event.startDate)}
                        </p>
                      </div>) : <p>Estas libre.</p>}
                </div>
              </>);
  }


export const UpcomingEventsCardSkeleton = ({darkMode})=> {
    return (
    <>
                <div className="flex justify-between items-center animate-pulse ">
                  <h2 className={`${darkMode ? "bg-gray-100" : "bg-gray-300"} w-36 h-6 rounded-sm mb-3`}></h2>
                  <p className={`${darkMode ? "bg-gray-100" : "bg-gray-600 "} p-2 rounded-md w-20 h-10 shadow-sm transition-transform hover:scale-105 mb-3`}></p>
                </div>
                <div className="animate-pulse space-y-4">
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                </div>
              </>);
  }