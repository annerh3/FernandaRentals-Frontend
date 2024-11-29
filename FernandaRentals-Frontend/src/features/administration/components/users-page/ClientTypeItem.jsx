import { BookUser } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import { RiDiscountPercentLine } from "react-icons/ri";
import { DataNotFound } from "../DataNotFound";

export const ClientTypeItem = ({clientTypes, darkMode, handleModalOpen, icon}) => {
    return (
    <>
        {
          clientTypes?.data?.length ? (
          <div className={`grid gap-7 md:grid-cols-1 lg:grid-cols-2`}>
          {
            clientTypes.data.map((clientType) => (
              <div key={clientType.id} className={`flex items-center justify-between p-6 border rounded-lg ${darkMode ? "border-gray-700 bg-siidni-darkCard" : "border-gray-300 bg-gray-100"} transition-transform hover:scale-105`}>
                   <div >
                     <h4 className={`mt-2 text-xl font-bold flex gap-2 items-center align-middle ${darkMode ? "text-white" : "text-gray-900"}`}>
                       <BookUser size={18} className="text-siidni-goldDark" />
                       {clientType.name}
                     {clientType.discount !== 0 && (
                       <p className={`text-sm flex ml-2 gap-1 items-center ${darkMode ? "text-gray-300" : "text-gray-900"} `}>
                       <RiDiscountPercentLine className="text-green-500"/>
                       {Math.round(clientType.discount * 100)}%
                     </p>
                     ) 
                     }
                     </h4>
                     <p className={`mt-2 text-sm flex gap-2 items-center ${darkMode ? "text-gray-500" : "text-gray-900"} ` }>
                       {clientType.description}
                     </p>
                   </div>
                   <div className="flex space-x-2">
                     <button onClick={() => handleModalOpen("edit", clientType)} className={`p-2 ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"}`}>
                       <FiEdit className="w-5 h-5" />
                     </button>
                     
                   </div>
                 </div>
               ))
          }
         
          </div>
        ):(
          <DataNotFound
          message={"No se encontraron a los tipos clientes"}
          darkMode={darkMode}
          Icon={icon}
        />
        )
        }
    </>);
  }


  export const ClientTypeSkeleton = ({ darkMode }) => {
    return (
      <div className="p-6">
        <div className="grid gap-7 md:grid-cols-1 lg:grid-cols-2">
          {/* Skeleton para un item */}
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 border rounded-lg animate-pulse h-32 ${
                darkMode ? "border-gray-700 bg-siidni-darkCard" : "border-gray-300 bg-gray-100"
              }`}
            >
              <div className="flex-1 space-y-3">
                {/* Tpo de cliente */}
                <div className="flex">
                <div
                  className={`h-5 rounded mr-2 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } w-5`}
                ></div>
                <div
                  className={`h-5 rounded ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } w-3/5`}
                ></div>
                <div
                  className={`h-5 ml-5 rounded ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } w-9`}
                ></div>
                </div>
                {/* Descripción */}
                <div
                  className={`h-4 rounded ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  } w-4/5`}
                ></div>
              </div>
              {/* Botón de edición */}
              <div
                className={`w-10 h-10 rounded-full ${
                  darkMode ? "bg-gray-600" : "bg-gray-300"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  