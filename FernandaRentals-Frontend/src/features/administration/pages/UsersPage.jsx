import { useState } from "react";
import { AdminModal, ClientsModal, ClientTypeModal, UsersNavBar } from "../components";

export const UsersPage = ({darkMode}) => {
  const [activeTab, setActiveTab] = useState("clients");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "edit", "delete", 
  const [selectedItem, setselectedItem] = useState(null);
  // const [fetching, setFetching] = useState(true);

  const modalComponents = {
    clients: ClientsModal,
    types: ClientTypeModal,
     admins: AdminModal,
  };
  const ModalComponent = modalComponents[activeTab];

  const handleModalOpen = (type, data = null) => {
    setModalType(type);
    setselectedItem(data);
    console.log(data)
    setShowModal(true);     
  };

  const handleModalClose = () => {
    setShowModal(false);
    //  setFetching(true); 
  };


  return (
    <div className={`min-h-screen ${darkMode ? "bg-siidni-dark" : "bg-gray-200"} p-4 sm:p-6 lg:p-8 `}>
      <div className="max-w-[1450px] mx-auto">      
        <UsersNavBar   darkMode={darkMode} setActiveTab={setActiveTab} activeTab={activeTab}  handleModalOpen={handleModalOpen}  />
      </div>
     
      {/* Modals */}
      {showModal && ModalComponent && (
        <ModalComponent
          darkMode={darkMode}
          modalType={modalType}
          selectedItem={selectedItem}
          setShowModal={setShowModal}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};