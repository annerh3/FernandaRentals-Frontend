import { FiEdit } from "react-icons/fi";
import { DataNotFound } from "../DataNotFound";
import { useAuthStore } from "../../../security/store/useAuthStore";

export const AdminUserItem = ({ admins, darkMode, Icon, handleModalOpen }) => {
  const user = useAuthStore((state) => state.user);
  console.log(user);
  
  return (
    <>
      {admins?.data?.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {admins.data.map((admin) => (
            <div
              key={admin.id}
              className={`p-4 ${
                darkMode ? "bg-siidni-dark" : "bg-gray-200"
              } rounded-lg shadow`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 ${
                      darkMode
                        ? "bg-purple-800 text-purple-300"
                        : "bg-purple-300 text-purple-800"
                    } rounded-full flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6`} />
                  </div>
                </div>
                <div>
                  {/* Texto y Botón */}
                  <div className="flex justify-between">
                    {/* Nombre y Email */}
                    <div>
                      <h3
                        className={`text-lg font-medium ${
                          darkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {admin.userName}
                        {admin.userEmail == user.email ? "   (Tú)" : ""}
                      </h3>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {admin.userEmail}
                      </p>
                    </div>
                    {/* Edit Boton */}
                    <div className="space-y-1 justify-self-end ml-15 md:ml-1  sm:ml-56 pl-2">
                      <button
                        onClick={() => handleModalOpen("edit", admin)}
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

                  <span
                    className={`inline-block mt-1 px-2 py-1 text-xs font-semibold ${
                      darkMode
                        ? "bg-blue-900 text-blue-200"
                        : "bg-blue-200 text-blue-900"
                    } rounded-full`}
                  >
                    {admin.userRole}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DataNotFound
          message={"No se encontraron a los usuarios"}
          darkMode={darkMode}
          Icon={Icon}
        />
      )}
    </>
  );
};

export const AdminUserItemSkeleton = ({ darkMode, Icon }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={`p-4 ${
              darkMode ? "bg-siidni-dark" : "bg-gray-200"
            } rounded-lg shadow`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div
                  className={`w-10 h-10 ${
                    darkMode
                      ? "bg-purple-800 text-purple-300"
                      : "bg-purple-300 text-purple-800"
                  } rounded-full flex items-center justify-center animate-pulse`}
                >
                  <Icon className={`w-6 h-6`} />
                </div>
              </div>
              <div className="flex-1">
                <div
                  className={`h-4 bg-gray-300 ${
                    darkMode ? "bg-gray-600" : "bg-gray-400"
                  } rounded w-3/4 animate-pulse`}
                ></div>
                <div
                  className={`h-3 bg-gray-300 ${
                    darkMode ? "bg-gray-600" : "bg-gray-400"
                  } rounded mt-2 w-1/2 animate-pulse`}
                ></div>
                <div
                  className={`h-4 bg-gray-300 ${
                    darkMode ? "bg-gray-600" : "bg-gray-400"
                  } rounded mt-2 w-1/3 animate-pulse`}
                ></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
