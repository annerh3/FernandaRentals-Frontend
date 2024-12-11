import { UsersRound } from "lucide-react";
import { FiCalendar, FiPackage } from "react-icons/fi";
import {
  EventCalendar,
  StatsGrid,
  StatsGridSkeleton,
  UpcomingEventsCard,
  UpcomingEventsCardSkeleton,
} from "../components";
import { useDashBoard } from "../hooks/useDashBoard";
import { useEffect, useState } from "react";
import { selectValues } from "../../../shared/constants/variousConstants";
import { useEvents } from "../../Website/hooks/data";
import { CurrentDate } from "../../../shared/components/Utils";
import { SeeMoreModal } from "../components/events-page/SeeMoreModal";
// import Calendar from "react-calendar";

export const DashBoardPage = ({ darkMode }) => {
  
  //   const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setselectedItem] = useState(null);

  const [fetching, setFetching] = useState(true);

  const handleModalOpen = (data) => {
    setselectedItem(data);
    setShowModal(true);
  };

  //para cargar el dashboard la información del Grid

  const { dashboard, isLoading, loadDashBoardData } = useDashBoard();

  // para estar cargando los eventos
  // se separo la carga de eventos para no tener que recargar completamente todo el dashboard
  // esto por que se hace un llamado a la API de los 3 tipos de eventos
  const { events, loadEvents } = useEvents();

  // iconos que se repiten para los eventos
  const statsIcons = {
    totalProducts: <FiPackage className="text-siidni-gold" />,
    totalUpcomingEvents: <FiCalendar className="text-blue-400" />,
    totalClients: <UsersRound className="text-purple-500" />,
  };

  useEffect(() => {
    if (fetching) {
      loadDashBoardData();
      loadEvents(selectValues.ALL);
      setFetching(false);
    }
  }, [fetching]);

  // estadísticas o diccionario del Dashboard
  const stats = [
    {
      title: "Productos Totales",
      count: dashboard?.data?.totalProducts || "0",
      icon: statsIcons.totalProducts,
    },
    {
      title: "Próximos Eventos",
      count: dashboard?.data?.totalUpcomingEvents || "0",
      icon: statsIcons.totalUpcomingEvents,
    },
    {
      title: "Clientes",
      count: dashboard?.data?.totalClients || "0",
      icon: statsIcons.totalClients,
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-siidni-dark text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex">
        {/* Main Content */}
        <main className="ml-20 sm:ml-30 md:ml-60 flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="flex justify-start items-center mb-8">
            <h1 className="text-2xl font-bold">DashBoard</h1>
            {/* Muestra la Fecha Actual */}
            <CurrentDate darkMode={darkMode}/>
          </div>

          {/* Stats Grid */}
          {/* Squeleton que muestra mientras cargan los datos */}
          {isLoading ? (
            <StatsGridSkeleton darkMode={darkMode} />
          ) : (
            <StatsGrid stats={stats} darkMode={darkMode} />
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Upcoming Events */}
            <div
              className={`${
                darkMode ? "bg-siidni-darkCard" : "bg-white"
              } p-6 rounded-xl shadow-md`}
            >
              {/* Las cards de Eventos el skeleton si esta cargando o la información ya cargada */}
              {isLoading ? (
                <UpcomingEventsCardSkeleton darkMode={darkMode} />
              ) : (
                <UpcomingEventsCard darkMode={darkMode} dashboard={dashboard} />
              )}
            </div>

            {/* Calendar */}
            <div
              className={`${
                darkMode ? "bg-siidni-darkCard" : "bg-white"
              } p-6 rounded-xl shadow-md`}
            >
              {fetching ? (
                <p className="text-center text-gray-500">
                  Cargando calendario...
                </p>
              ) : (
                <EventCalendar darkMode={darkMode} events={events} handleModalOpen={handleModalOpen}/>
              )}
            </div>
          </div>
        </main>
      </div>
      {showModal && (
        <SeeMoreModal
          darkMode={darkMode}
          selectedItem={selectedItem}
          setShowModal={setShowModal}
          setFetching={setFetching}
        />
      )}
    </div>
  );
};
