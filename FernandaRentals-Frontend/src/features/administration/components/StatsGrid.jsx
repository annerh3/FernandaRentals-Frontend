import { getComparisonDetails } from "../../../shared/utils";

export const StatsGrid = ({ stats, darkMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const { comparation } = stat;
        const { message, Icon, newTLast7Days, twClasses } = getComparisonDetails(comparation);
        console.log("Icon:", Icon);

        return (
          <div
            key={index}
            className={`${
              darkMode ? "bg-siidni-darkCard" : "bg-white"
            } p-6 rounded-xl shadow-md transition-transform hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              {/* Información principal */}
              <div>
                <p className="text-sm opacity-70">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.count}</p>
              </div>
              {/* Ícono principal */}
              <div
                className={`text-2xl ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {stat.icon}
              </div>
            </div>

            {/* Detalles del cambio */}
            {message && (
              <div className="mt-4">
                {/* Mensaje introductorio */}
                <p className="text-sm text-gray-500 mb-2">En comparación a la última semana:</p>
                <div className="grid grid-cols-2 items-center text-sm text-gray-500 gap-2">
                  <div>
                    <p className="font-medium">{newTLast7Days} Nuevos</p>
                  </div>
                  <div className="flex items-center justify-end space-x-2">
                  <icon className="text-blue-600" />
                    {/* Aquí renderizas el ícono */}
                    {/* {icon}  */}
                    {/* <RiPauseCircleFill className={`${twClasses}`} /> */}
                    {Icon && <Icon className={`${twClasses}`} />}
                    <p className="font-medium">{message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};



//skeleton de los eventos para cuando están cargando
export const StatsGridSkeleton = ({ darkMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={`${
              darkMode ? "bg-siidni-darkCard" : "bg-white"
            } p-6 shadow-md transition-transform hover:scale-105 animate-pulse h-25`}
          >
            <div className="flex items-center justify-between mt-1">
              <div className="space-y-2">
                <p
                  className={`${
                    darkMode ? "bg-gray-100" : "bg-gray-600"
                  } w-20 h-2 rounded-sm`}
                ></p>
                <p
                  className={`${
                    darkMode ? "bg-gray-100" : "bg-gray-600"
                  } w-7 h-4 rounded-sm`}
                ></p>
              </div>
              <div
                className={`${
                  darkMode ? "bg-gray-300" : "bg-gray-600"
                } rounded-full w-10 h-10`}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );
};
