import { useState } from "react";
import { FiEdit, FiTrash2, FiUsers } from "react-icons/fi";
import { ClientsModal } from "./ClientsModal";



export const ClientsGrid = ({darkMode, handleModalOpen}) =>{
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(""); // "edit", "delete"
    const [selectedClient, setselectedClient] = useState(null);

    

      
    

    const clients = [
        {
          id: 1,
          name: "John Smith",
          email: "john@example.com",
          clientType: "Enterprise",
          eventCount: 45
        },
        {
          id: 2,
          name: "Sarah Johnson",
          email: "sarah@example.com",
          clientType: "Small Business",
          eventCount: 23
        },
        {
          id: 3,
          name: "Michael Brown",
          email: "michael@example.com",
          clientType: "Corporate",
          eventCount: 67
        }
      ];
    return(
        <div className="space-y-6">
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <div key={client.id} className={`p-6 ${darkMode ? "bg-siidni-darkCard  text-white" : "bg-slate-100"} rounded-lg transition-transform hover:scale-105`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${darkMode ? "bg-blue-900" : "bg-blue-100"} rounded-full flex items-center justify-center`}>
                  <FiUsers className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{client.name}</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{client.email}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                onClick={() => handleModalOpen("create",client)}
                className={`p-2 ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"} transition-colors duration-200`}>
                  <FiEdit className="w-5 h-5" />
                </button>
                <button 
                onClick={() => handleModalOpen("delete",client)}
                className={`p-2 ${darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-800"} transition-colors duration-200`}>
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Client Type:</span>
                <span className={`px-3 py-1 text-sm font-medium ${darkMode ? "text-blue-400 bg-blue-900" : "text-blue-600 bg-blue-100"} rounded-full`}>
                  {client.clientType}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Total Events:</span>
                <span className={`px-3 py-1 text-sm font-medium ${darkMode ? "text-green-400 bg-green-900" : "text-green-600 bg-green-100"} rounded-full`}>
                  {client.eventCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
       
    </div>
    );
}