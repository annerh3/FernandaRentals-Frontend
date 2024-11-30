import { Ban, BookX, CalendarDays, ChevronsRight, ChevronsUp, CircleDollarSign, MapPinHouse, Sofa, UserRound } from "lucide-react";
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
          } h-[600px] col-span-3 row-span-5 rounded-md overflow-y-auto overflow-x-hidden flex flex-col items-center`}
        >
          <EventPreviewItem darkMode={darkMode} handleModalOpen={handleModalOpen}  />
        </div>
        <div className="col-span-6 row-span-3 col-start-4 rounded-md bg-green-400">2</div>
        <div className="col-span-6 row-span-2 col-start-4 rounded-md row-start-4 bg-purple-400">3</div>
      </div>
    </div>
  );
};


    function EventPreviewItem({ darkMode, handleModalOpen}) {
      return (<div className="grid grid-cols-1 gap-4 w-full p-4">
            {[...Array(8)].map((_, index) => 
            <div key={index} className={`${darkMode ? "bg-siidni-dark" : "bg-white"} w-full max-w-[500px] h-[150px] p-4 mx-auto hover:rounded-xl hover:border hover:border-siidni-goldLight shadow-md transition-transform hover:scale-105`}>
                <div className="flex justify-between items-start ">
                  <h3 className="text-lg font-bold">Evento {index + 1}</h3>
                  <div className="flex space-x-2">                
                  <button onClick={() => handleModalOpen("delete")} className="p-2 rounded-lg text-gray-700  hover:text-red-200">
                      <BookX />
                    </button>
                    <button onClick={() => handleModalOpen("see-more")} className="p-2 rounded-lg bg-siidni-gold flex text-white font-medium hover:bg-siidni-goldDark">
                    Ver Más<ChevronsUp   /> 
                    </button>
                  </div>
                </div>
                <section className="flex gap-6">

                <div className="space-y-1">
                  <p className="text-sm opacity-70 flex gap-2"> <span className="text-purple-500"><UserRound  size={17} /> </span>Danilo</p>   
                  <p className="text-sm opacity-70 flex gap-2"> <span className="text-red-500"><MapPinHouse size={17} /> </span>Lugar </p>     
                  <p className="text-sm opacity-70 flex gap-2"> <span className="text-green-500"><CircleDollarSign   size={17} /> </span>{index + 5} </p>   
                </div>
                <div className="space-y-1">
                  <p className="text-sm opacity-70 flex gap-2"> <span className="text-blue-500"><Sofa  size={17} /> </span>{index + 5} productos </p>   
                  <p className="text-sm opacity-70 flex gap-2"> <span className="text-yellow-500"><CalendarDays  size={17} /> </span>1{index + 1} de diciembre 2024 </p>   
                </div>
                </section>
              </div>)}
          </div>);
    }
  