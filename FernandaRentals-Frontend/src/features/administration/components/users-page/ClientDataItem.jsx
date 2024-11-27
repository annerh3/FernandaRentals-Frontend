import { FiEdit, FiUsers } from "react-icons/fi";
import { DataNotFound } from "../DataNotFound";

export const ClientDataItem = ({ clients, darkMode, handleModalOpen }) => {
  return (
    <div className="grid gap-7 md:grid-cols-1 lg:grid-cols-2">
      {clients?.data?.length ? (
        clients.data.map((client) => (
          <div
            key={client.clientId}
            className={`p-6 ${
              darkMode ? "bg-siidni-darkCard  text-white" : "bg-slate-100"
            } rounded-lg transition-transform hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 ${
                    darkMode ? "bg-blue-900" : "bg-blue-100"
                  } rounded-full flex items-center justify-center`}
                >
                  <FiUsers
                    className={`w-6 h-6 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`text-lg font-semibold  ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {client.clientName}
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {client.clientEmail}
                  </p>
                </div>
              </div>
              <div className="space-y-1 justify-self-end pl-2">
                <button
                  onClick={() => handleModalOpen("edit", client)}
                  className={`p-2 ${
                    darkMode
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-800"
                  } transition-colors duration-200`}
                >
                  <FiEdit className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {/* Tipo de Cliente */}
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Tipo de Cliente:
                </span>
                <span
                  className={`px-3 py-1 text-sm font-medium ${
                    darkMode
                      ? "text-yellow-300 bg-yellow-800"
                      : "text-yellow-900 bg-yellow-200"
                  } rounded-full flex justify-end text-right`}
                >
                  {client.clientTypeName}
                </span>
              </div>

              {/* Eventos Pasados */}
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Eventos Pasados:
                </span>
                <span
                  className={`px-3 py-1 text-sm font-medium ${
                    client.totalPastEvents === 0
                      ? darkMode
                        ? "bg-gray-500 text-gray-200"
                        : "bg-gray-300 text-black"
                      : darkMode
                      ? "bg-teal-700 text-teal-200"
                      : "bg-teal-300 text-teal-900"
                  } rounded-full`}
                >
                  {client.totalPastEvents}
                </span>
              </div>

              {/* Eventos Futuros */}
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Eventos Futuros:
                </span>
                <span
                  className={`px-3 py-1 text-sm font-medium ${
                    client.totalUpcomingEvents === 0
                      ? darkMode
                        ? "bg-gray-500 text-gray-200"
                        : "bg-gray-300 text-black"
                      : darkMode
                      ? "bg-purple-800 text-purple-300"
                      : "bg-purple-200 text-purple-800"
                  } rounded-full`}
                >
                  {client.totalUpcomingEvents}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <DataNotFound
          message={"No se encontraron a los clientes"}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};



export const ClientDataItemSkeleton = ({ darkMode }) => {
  const skeletonItems = Array(4).fill(0); 

  return (
    <div className="grid gap-7 md:grid-cols-1 lg:grid-cols-2">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className={`p-6 ${
            darkMode ? "bg-siidni-darkCard" : "bg-slate-100"
          } rounded-lg animate-pulse`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 ${
                  darkMode ? "bg-blue-900" : "bg-blue-100"
                } rounded-full flex items-center justify-center`}
              >
                <FiUsers
                  className={`w-6 h-6 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
              </div>
              <div>
                <div
                  className={`h-4 w-32 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } rounded`}
                ></div>
                <div
                  className={`h-3 w-24 mt-2 ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  } rounded`}
                ></div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div
                className={`h-4 w-20 ${
                  darkMode ? "bg-gray-600" : "bg-gray-300"
                } rounded`}
              ></div>
              <div
                className={`h-6 w-16 ${
                  darkMode ? "bg-yellow-700" : "bg-yellow-200"
                } rounded-full`}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <div
                className={`h-4 w-20 ${
                  darkMode ? "bg-gray-600" : "bg-gray-300"
                } rounded`}
              ></div>
              <div
                className={`h-6 w-12 ${
                  darkMode ? "bg-teal-700" : "bg-teal-300"
                } rounded-full`}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <div
                className={`h-4 w-20 ${
                  darkMode ? "bg-gray-600" : "bg-gray-300"
                } rounded`}
              ></div>
              <div
                className={`h-6 w-12 ${
                  darkMode ? "bg-purple-800" : "bg-purple-200"
                } rounded-full`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

