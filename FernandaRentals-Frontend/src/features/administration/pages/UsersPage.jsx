import { useState } from "react";
import { FiUsers, FiUserPlus} from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import { ClientsGrid, ClientsModal, ClientTypesGrid } from "../components";
import { AdminsGrid } from "../components/users-page/AdminsGrid";

export const UsersPage = ({darkMode}) => {
  const [activeTab, setActiveTab] = useState("clients");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "edit", "delete", 
  const [selectedClient, setselectedClient] = useState(null);


  const handleModalOpen = (type, client = null) => {
    setModalType(type);
    setselectedClient(client);
    console.log(client)
    setShowModal(true);     
  };

  const handleModalClose = () => {
    setShowModal(false);
    // setFetchingProducts(true); // actualizar lista de productos
  };


  return (
    <div className={`min-h-screen ${darkMode ? "bg-siidni-dark" : "bg-gray-200"} p-4 sm:p-6 lg:p-8 `}>
      <div className="max-w-[1450px] mx-auto">
        
        <div className={`${darkMode ? "bg-siidni-darkLight" : "bg-white"} rounded-lg shadow-lg overflow-hidden ml-20 sm:ml-30 mt-13 md:ml-60`}>
          <div className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <nav className="-mb-px flex" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("clients")}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "clients"
                    ? darkMode
                      ? "border-blue-400 text-blue-400"
                      : "border-blue-500 text-blue-600"
                    : darkMode
                    ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-current={activeTab === "clients" ? "page" : undefined}
              >
                <FiUsers className="w-5 h-5 inline-block mr-2" />
                Clientes
              </button>
              <button
                onClick={() => setActiveTab("admins")}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "admins"
                    ? darkMode
                      ? "border-blue-400 text-blue-400"
                      : "border-blue-500 text-blue-600"
                    : darkMode
                    ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-current={activeTab === "admins" ? "page" : undefined}
              >
                <FiUserPlus className="w-5 h-5 inline-block mr-2" />
                Administradores
              </button>
              <button
                onClick={() => setActiveTab("types")}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "types"
                    ? darkMode
                      ? "border-blue-400 text-blue-400"
                      : "border-blue-500 text-blue-600"
                    : darkMode
                    ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-current={activeTab === "types" ? "page" : undefined}
              >
                <BsBuilding className="w-5 h-5 inline-block mr-2" />
                Tipos de Clientes
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {activeTab === "clients" && <ClientsGrid darkMode={darkMode} handleModalOpen={handleModalOpen}  />}
            {activeTab === "admins" && <AdminsGrid darkMode={darkMode}/>}
            {activeTab === "types" && <ClientTypesGrid darkMode={darkMode}/>}
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && activeTab === "clients" && (
        <ClientsModal
          darkMode={darkMode}
          modalType={modalType}
          selectedClient={selectedClient}
          setShowModal={setShowModal} 
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};

