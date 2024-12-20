import { Link } from "react-router-dom";
import { PayPalCreateEventPayment, PayPalEditEventPayment } from "../../paypal";


export const FormButtons = ({ handleModal, onCancel, errors, setRefundDetails, setErrorMessage, setIsErrorModalOpen, isEditing, toggle}) => {

  return (
    <div className="flex flex-col space-x-4 sm:flex-row sm:justify-between mt-4 w-[400px]">
      {/* Contenedor de botones Regresar y Cancelar */}
      <div className="flex flex-col align-middle w-60 sm:w-[40%]">
        {/* Botón de Regresar */}
        <Link
          to="/home"
          className="mt-5 mb-2 text-center px-4 py-2 bg-green-400 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Regresar
        </Link>

        {/* Botón de Cancelar */}
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Cancelar
        </button>
      </div>

      {/* Componente de Pago  */}

      {
        isEditing ? (
          <div  className="w-full sm:w-[40%] flex-grow z-0">
           <PayPalEditEventPayment 
             setErrorMessage={setErrorMessage} 
             setRefundDetails={setRefundDetails} 
             handleModal={handleModal} 
             errors={errors} 
             setIsErrorModalOpen={setIsErrorModalOpen} 
             toggle={toggle}/>
         </div>
        ) 
        : (
          <div  className="w-full sm:w-[40%] flex-grow z-0">
           <PayPalCreateEventPayment 
             setErrorMessage={setErrorMessage} 
             setRefundDetails={setRefundDetails} 
             handleModal={handleModal} 
             errors={errors} 
             setIsErrorModalOpen={setIsErrorModalOpen} 
             toggle={toggle}/>
         </div>
        )
      }

      {/* <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 w-full bg-blue-400 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Enviar
        </button> */}
    </div>
  );
};
