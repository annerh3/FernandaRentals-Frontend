import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

export const ClientTypesGrid = ({ darkMode, handleModalOpen }) => {

  const clientTypes = [
    {
      id: 1,
      name: "Enterprise",
      description: "Large scale business clients",
    },
    {
      id: 2,
      name: "Small Business",
      description: "Small to medium business clients",
    },
  ];

  return (
    <div>
      <div className="flex justify-start items-center ">
        <button
          onClick={() => handleModalOpen("create")}
          className={`mr-8 flex items-center space-x-2 px-4 py-2 rounded-lg ${
            darkMode ? "bg-blue-600" : "bg-blue-500"
          } text-white transition-transform hover:scale-105`}
        >
          <FiPlus />
          <span>Crear Tipo de Cliente</span>
        </button>
      </div>

      <div className={`p-6`}>
        <div className={`space-y-4`}>
          {clientTypes.map((clientType) => (
            <div
              key={clientType.id}
              className={`flex items-center justify-between p-4 border rounded-lg ${
                darkMode
                  ? "border-gray-700 bg-siidni-darkCard"
                  : "border-gray-300 bg-gray-100"
              }`}
            >
              <div>
                <h4
                  className={`text-md font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {clientType.name}
                </h4>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {clientType.description}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleModalOpen("edit",clientType)}
                  className={`p-2 ${
                    darkMode
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  <FiEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleModalOpen("delete",clientType)}
                  className={`p-2 ${
                    darkMode
                      ? "text-red-400 hover:text-red-300"
                      : "text-red-600 hover:text-red-800"
                  }`}
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ); 
};
