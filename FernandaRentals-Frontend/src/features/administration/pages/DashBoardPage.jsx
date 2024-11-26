import { UsersRound } from "lucide-react";
import { FiCalendar, FiPackage } from "react-icons/fi";
import {
  StatsGrid,
  StatsGridSkeleton,
  UpcomingEventsCard,
  UpcomingEventsCardSkeleton,
} from "../components";
import { useDashBoard } from "../hooks/useDashBoard";
import { useEffect, useState } from "react";
// import Calendar from "react-calendar";

export const DashBoardPage = ({ darkMode }) => {
  //   const [date, setDate] = useState(new Date());
  const [fetching, setFetching] = useState(true);
  const { dashboard, isLoading, loadDashBoardData } = useDashBoard();
  const statsIcons = {
    totalProducts: <FiPackage className="text-siidni-gold" />,
    totalUpcomingEvents: <FiCalendar className="text-blue-400" />,
    totalClients: <UsersRound className="text-purple-500" />,
  };

  useEffect(() => {
    if (fetching) {
      loadDashBoardData();
      setFetching(false);
    }
  }, [fetching]);

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
        <main className="ml-20 sm:ml-30 md:ml-60 flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Overview</h1>
          </div>

          {/* Stats Grid */}
          {isLoading ? (
            <StatsGridSkeleton darkMode={darkMode} />
          ) : (
            <StatsGrid stats={stats} darkMode={darkMode} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Events */}
            <div
              className={`${
                darkMode ? "bg-siidni-darkCard" : "bg-white"
              } p-6 rounded-xl shadow-md`}
            >
              {isLoading ? (
                <UpcomingEventsCardSkeleton   darkMode={darkMode}  />
              ) : (
                <UpcomingEventsCard darkMode={darkMode} dashboard={dashboard} />
                
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};


  