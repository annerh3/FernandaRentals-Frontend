import { useState } from "react";
import { CancelEventModal } from "./CancelEventModal";
import { TableInformationEvent } from "./TableInformationEvent";
import { TableProductsEventDetails } from "./TableProductsEventDetails";
import { CancelEventButton } from "./CancelEventButton";

export const SeeMoreModal = ({
  darkMode,
  selectedItem,
  setShowModal,
  setFetching,
}) => {
  // para cancelar el evento
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelModalOpen = () => {
    setShowCancelModal(true);
  };

  if (!selectedItem) return null;

  const {
    name,
    client,
    startDate,
    endDate,
    location,
    eventCost,
    discount,
    total,
    eventDetails,
  } = selectedItem;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div
        // ref={modalRef}
        className={`${
          darkMode ? "bg-siidni-darkCard text-white" : "bg-white text-black"
        } p-8 rounded-xl w-full max-w-4xl max-h-[90vh]  overflow-y-auto`}
      >
        <div className="flex justify-between ">
          <h2 className="text-2xl font-bold mb-6 ">
            {name || selectedItem.name}{" "}
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className={`px-4 py-2 h-10 rounded-lg bg-siidni-goldLight text-white hover:bg-siidni-goldDark`}
          >
            Cerrar
          </button>
        </div>

        {/* Información general */}
        <TableInformationEvent
          eventCost={eventCost}
          total={total}
          client={client}
          discount={discount}
          location={location}
          startDate={startDate}
          endDate={endDate}
        />

        {/* Detalle de productos */}
        <h3 className="text-xl font-bold mb-4">Productos Asociados</h3>

        {/* Muestra la información del evento en cuestión Información Básica  de los Productos*/}
        <TableProductsEventDetails
          eventDetails={eventDetails}
          darkMode={darkMode}
        />

        {/* Botón para cerrar */}
        {/* <CancelEventModal handleCancelModalOpen={handleCancelModalOpen} endDate={endDate} /> */}
        <CancelEventButton
          handleCancelModalOpen={handleCancelModalOpen}
          endDate={endDate}
        />
      </div>
      {showCancelModal && (
        <CancelEventModal
          darkMode={darkMode}
          selectedItem={selectedItem}
          setShowCancelModal={setShowCancelModal}
          setShowModal={setShowModal}
          setFetching={setFetching}
        />
      )}
    </div>
  );
};
