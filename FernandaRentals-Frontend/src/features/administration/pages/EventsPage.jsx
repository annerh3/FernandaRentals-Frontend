import { FiEdit, FiTrash2 } from "react-icons/fi";

export const EventsPage = ({ darkMode }) => {
  const handleModalOpen = (action) => {
    console.log(`Abrir modal para: ${action}`);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-siidni-dark" : "bg-gray-200"} p-4 sm:p-6 lg:p-8`}>
      <div className="grid grid-cols-6 grid-rows-5 gap-3 ml-20 sm:ml-30 md:ml-60 flex-1 p-8">
        <div
          className={`${
            darkMode ? "bg-siidni-darkCard" : "bg-gray-200"
          } h-[500px] col-span-3 row-span-5 rounded-md overflow-y-auto overflow-x-hidden flex flex-col items-center`}
        >
          <div className="grid grid-cols-1 gap-4 w-full p-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`${
                  darkMode ? "bg-siidni-dark" : "bg-white"
                } w-full max-w-[250px] h-[150px] p-4 mx-auto hover:rounded-xl hover:border hover:border-siidni-goldLight shadow-md transition-transform hover:scale-105`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold">Evento {index + 1}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleModalOpen("edit")}
                      className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleModalOpen("delete")}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <p className="text-sm opacity-70">Esta es la descripción del evento {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-6 row-span-3 col-start-4 rounded-md bg-green-400">2</div>
        <div className="col-span-6 row-span-2 col-start-4 rounded-md row-start-4 bg-purple-400">3</div>
      </div>
    </div>
  );
};
