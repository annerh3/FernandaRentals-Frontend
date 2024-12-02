import { BookX, CalendarDays, CircleDollarSign, MapPinHouse, UserRound } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../../../../shared/utils";
import { CancelEventModal } from "./CancelEventModal";

export const SeeMoreModal = ({ darkMode, selectedItem, setShowModal, setFetching }) => {

  // para cancelar el evento
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelModalOpen = () => {
    setShowCancelModal(true);     
  };


  if (!selectedItem) return null; 

  const { name, client, startDate, endDate, location, eventCost, discount, total, eventDetails } = selectedItem;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div
        // ref={modalRef}
        className={`${
          darkMode ? "bg-siidni-darkCard text-white" : "bg-white text-black"
        } p-8 rounded-xl w-full max-w-4xl`}
      >

        <div className="flex justify-between ">
        <h2 className="text-2xl font-bold mb-6 ">{name || selectedItem.name} </h2>
        <button
            onClick={() => setShowModal(false)}
            className={`px-4 py-2 h-10 rounded-lg bg-siidni-goldLight text-white hover:bg-siidni-goldDark`}
          >
            Cerrar
          </button>
        </div>

        {/* Información general */}
        <div className="mb-6 space-y-2">
          <p className="flex gap-2">
            <strong className="flex gap-2 items-center"><UserRound  size={17} className="text-purple-500"/></strong> {client.name} ({client.clientType})
          </p>
          <p className="flex gap-2">
            <strong className="flex gap-2 items-center"><CalendarDays  size={17} className="text-yellow-500" /> </strong> {formatDate(startDate)} -{" "}
            {formatDate(endDate)}
          </p>
          {/* <p className="flex gap-2">
            <strong className="flex gap-2 items-center"><CalendarDays  size={17} className="text-yellow-500" /> </strong> {startDate} -{" "}
            {endDate}
          </p> */}
          <p className="flex gap-2">
            <strong className="flex gap-2 items-center"><MapPinHouse size={17} className="text-red-500" /> </strong> {location}</p>
          <p>
           Costo del Evento: ${eventCost} <br />
            Descuento: ${discount} <br />
            <p className="flex gap-2">

            <strong className="flex gap-2 items-center"><CircleDollarSign  size={17} className="text-green-500"  /> </strong> ${total}
            </p>
          </p>
        </div>

        {/* Detalle de productos */}
        <h3 className="text-xl font-bold mb-4">Productos Asociados</h3>
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Producto</th>
              <th className="border border-gray-300 px-4 py-2">Cantidad</th>
              <th className="border border-gray-300 px-4 py-2">Precio Unitario</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
          {/* className={`${
          darkMode ? "bg-siidni-darkCard text-white" : "bg-white text-black"
        } p-8 rounded-xl w-full max-w-4xl`} */}
            {eventDetails.map((detail) => (
              <tr key={detail.id} className={`${darkMode ? "hover:bg-siidni-darkLight" : "hover:bg-gray-100"}`}>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center space-x-4">
                    <img
                      src={detail.product.urlImage}
                      alt={detail.product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <span>{detail.product.name}</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">{detail.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">${detail.unitPrice}</td>
                <td className="border border-gray-300 px-4 py-2">${detail.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>

       {/* Botón para cerrar */}
      <div className="flex justify-end mt-6">
        {new Date(endDate).getTime() >= Date.now() && (  // convierte endDate en un objeto Date valido y obtiene su tiempo en milisegundos 
          <button
            onClick={handleCancelModalOpen}
            className="p-2 rounded-lg flex gap-2 text-gray-700 hover:text-red-500 top-4 right-4"
          >
            <BookX /> Cancelar Evento
          </button>
        )}
      </div>

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
