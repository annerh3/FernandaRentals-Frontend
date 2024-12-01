import { CalendarDays, ChevronsUp, CircleDollarSign, MapPinHouse, Sofa, UserRound } from "lucide-react";
import { formatDate } from "../../../../shared/utils";
import { DataNotFound } from "../DataNotFound";

export const EventPreviewItem = ({ darkMode, handleModalOpen, events}) => {
    return (
        <>
        {
            events?.data?.length ? (
                <div className="grid grid-cols-1 gap-4 w-full p-4">
                {
                events?.data?.map((event) => (
                    <div key={event.id} className={`${darkMode ? "bg-siidni-dark" : "bg-gray-200"} w-full max-w-[500px] h-[150px] p-4 mx-auto rounded-xl hover:border hover:border-siidni-goldLight shadow-md transition-transform hover:scale-105`}>
                    <div className="flex justify-between items-start ">
                      <h3 className="text-lg font-bold">{event.name}</h3>
                      <div className="flex space-x-2">                
                      
                        <button onClick={() => handleModalOpen(event)} className="p-2 rounded-lg bg-siidni-gold flex text-white font-medium hover:bg-siidni-goldDark">
                        Ver Más<ChevronsUp   /> 
                        </button>
                      </div>
                    </div>
                    <section className="flex gap-6">
      
                    <div className="space-y-1">
                      <p className="text-sm opacity-70 flex gap-2"> <span className="text-purple-500"><UserRound  size={17} /> </span>{event.client.name}</p>   
                      <p className="text-sm opacity-70 flex gap-2"> <span className="text-red-500"><MapPinHouse size={17} /> </span>{event.location}</p>     
                      <p className="text-sm opacity-70 flex gap-2"> <span className="text-green-500"><CircleDollarSign  size={17} /> </span>{event.eventCost}</p>   
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm opacity-70 flex gap-2"> <span className="text-blue-500"><Sofa  size={17} /> </span>{event.eventDetails.length} {event.eventDetails.length > 1 ?"Productos" : "Producto"} </p>   
                      <p className="text-sm opacity-70 flex gap-2"> <span className="text-yellow-500"><CalendarDays  size={17} /> </span>{formatDate(event.startDate)}</p>   
                    </div>
                    </section>
                  </div>              
            
            ))}
              </div>
            ):(
                <DataNotFound
            message={"No se encontraron los Eventos"}
            darkMode={darkMode}
          />
            )
        }       
        </>
        );
  }


  export const EventPreviewSkeleton = ({ darkMode }) => {
    return (
      <div className="grid grid-cols-1 gap-4 w-full p-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`${
              darkMode ? "bg-siidni-dark" : "bg-white"
            } w-full max-w-[500px] h-[150px] p-4 mx-auto rounded-xl shadow-md animate-pulse`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="h-5 bg-gray-300 rounded w-2/3"></div>
              <div className="flex space-x-2 items-center">
                <div className="h-7 w-6 bg-gray-300 rounded-md"></div>
                <div className="h-8 w-13 bg-gray-300 rounded-md"></div>
              </div>
            </div>
            <section className="flex gap-6">
              <div className="space-y-2">
                <div className="h-4 w-80 bg-gray-300 rounded "></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </section>
          </div>
        ))}
      </div>
    );
  };
