import { toast, ToastContainer } from "react-toastify";
import { deleteEvent } from "../../../../shared/actions/events";
import { useEffect, useState } from "react";
import { toastAutoClose } from "../../../../shared/constants/variousConstants";
import "react-toastify/dist/ReactToastify.css";
import { mirage } from "ldrs";

export const CancelEventModal = ({ darkMode, selectedItem, setShowCancelModal, setShowModal, setFetching }) => {
    useEffect(() => {
        mirage.register(); // Para segurar que se registre al montar el componente
      }, []);

const [loading, setLoading] = useState(false);
  const handleCancelEvent = async () => {
    console.log("EventId:  ",selectedItem.id);


    setLoading(true);
    try {
      const result = await deleteEvent(selectedItem.id);
      console.log("Response:", result);  
      toast[result?.status ? "success" : "error"](
        result?.message || "Hubo un error al procesar la solicitud.",
        {
          position: "top-center",
          autoClose: toastAutoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      setFetchingProducts(true);
    } catch (e) {
     if(!result?.status){
      toast.warning("Sin conexión al servidor", {
        position: "top-center",
        autoClose: toastAutoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
     }
    } finally {
      setLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 3000)); 
      setShowModal(false)
      setFetching(true)
    }
    const result = await deleteEvent(selectedItem.id);
    setShowModal(false)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
       <ToastContainer
          position="top-center"
          autoClose={1300}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      
      <div
        className={`${
          darkMode ? "bg-siidni-darkCard text-white" : "bg-white text-black"
        } p-8 rounded-xl w-1/2 max-w-4xl`}
      >

       
        <h1 className="mb-6 font-bold">Cancelar el evento {selectedItem.name}</h1>
<p>Estás a punto de cancelar un evento del cliente {selectedItem.client.name}.</p>
<p className="mt-3 text-red-600 font-semibold">Esta acción no tiene vueltra atras. ¿Estas seguro de hacer esto? </p>
 

        {/* Botón para cerrar */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={handleCancelEvent}
            disabled={loading}
            className={`px-4 py-2 rounded-lg ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
            } hover:bg-gray-300`}
          >
            {
                loading ? ( 
                    <span className="flex justify-center">
                    <l-mirage size="80" speed="2.5" color="#ffffff"></l-mirage>
                  </span>
                    
                ):(
                    <span>Cancelar Evento</span>
                )
            }
          </button>
          <button
            onClick={() => setShowCancelModal(false)}
            className={`px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 `}
          >
            Cerrar
          </button>
        </div>
      </div>
    
    </div>
  );
};
