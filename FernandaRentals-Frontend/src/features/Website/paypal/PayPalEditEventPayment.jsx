import { PayPalButtons } from "@paypal/react-paypal-js";
import { usePriceEvent } from "../hooks/usePriceEvent";
import { useEventEditStore, useEventsData } from "../store";
import { useCart } from "react-use-cart";
import { updateEvent } from "../../../shared/actions/events";
import { isObjectEmpty } from "../../../shared/utils";
import { useEffect } from "react";
import { refundPayment } from "../../../config/api/PaypalSandBoxApi";
import { validatePaymentStatus } from "./utils/validatePaymentStatus";

export const PayPalEditEventPayment = ({ handleModal, errors, setErrorMessage, setRefundDetails, setIsErrorModalOpen, toggle }) => {
  const { emptyCart, items } = useCart();
  const { TOTAL } = usePriceEvent();
  const { eventData, resetEventData, getEventData } = useEventsData();
  const { eventDataToEdit, getEventDataToEdit, setNewPaypalCaptureId } = useEventEditStore();
  const isEditing = eventDataToEdit.id && eventDataToEdit.id.trim() !== '';
  
  useEffect(() => {   
    console.log(" => eventData: ", eventData);
    console.log(" => eventDataToEdit: ", eventDataToEdit);  
  }, [items, eventData]);

  const handleCreateOrder = (data, actions) => {
    // Crear orden de pago
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: TOTAL.toFixed(2),
          },
        },
      ],
    });
  };

  const handleApprove = async (data, actions) => {
    let paypalCaptureId = null;
    let errorMessages = [];

    try {
      // Paso 1: Reembolso del pago anterior
      const previousPaypalCaptureId = eventDataToEdit.paypalCaptureId;
      if (previousPaypalCaptureId) {
        console.log(`Reembolsando el pago anterior con CaptureId: ${previousPaypalCaptureId}`);
        const refundResult = await refundPayment(previousPaypalCaptureId);
        if (refundResult.status !== "COMPLETED") {
          throw new Error(`Error al hacer reembolso del pago anterior. ${refundResult.status}`);
        }
        console.log("Reembolso del pago anterior exitoso.", refundResult);
      }

      // Paso 2: Captura del nuevo pago
      const details = await actions.order.capture(); // Detalles del nuevo pago
      console.log("Payment Approved (nuevo monto):", details); 

      if (!validatePaymentStatus(details)) return; // Validar estado del pago

      paypalCaptureId = details.purchase_units[0].payments.captures[0].id;
      console.log("Nuevo CaptureId:", paypalCaptureId);

      const updatedEventData = { ...getEventData(), paypalCaptureId };
      setNewPaypalCaptureId(paypalCaptureId); // Actualizar estado global

      console.log(`Pago completado por ${details.payer.name.given_name}`);
      console.log("Objeto eventData actualizado:", updatedEventData);

      if (isEditing) {
        const isEventUpdated = await handleEditEvent(details, errorMessages, updatedEventData);
        if (!isEventUpdated) {
          // Si la edición del evento falla, se reembolsa el pago nuevo
          console.log("Reembolsando el nuevo pago debido a error en la edición del evento...");
          await refundPayment(paypalCaptureId);
          setRefundDetails([
            `ID de la transacción: ${paypalCaptureId}`,
            "Reembolso realizado debido a error en la edición del evento.",
          ]);
        }
      }

    } catch (error) {
      console.error("Error al procesar el pago o la edición del evento:", error);
      if (paypalCaptureId) {
        // Si hay un pago procesado, realizar reembolso
        await refundPayment(paypalCaptureId);
        setRefundDetails([`ID de la transacción: ${paypalCaptureId}`, "Reembolso realizado."]);
      }
      setErrorMessage("Hubo un problema al procesar su solicitud.");
      setIsErrorModalOpen(true);
    }
  };

  const handleEditEvent = async (details, errorMessages, updatedEventData) => {
    try {
      const eventResult = await updateEvent(getEventDataToEdit().id, updatedEventData); // Editar evento
      console.log("Respuesta del backend al intentar editar evento:", eventResult);

      if (eventResult.status === true) {
        console.log("Evento editado exitosamente.");

        // Si la edición es exitosa, cerrar modal y limpiar datos
        handleModal(eventResult);
        resetEventData();
        // resetEventDataEdit();
        emptyCart();
        return true;
      } else {
        console.error("Error al editar el evento:", eventResult);
        throw new Error(eventResult.data.message || "Error desconocido al editar el evento.");
      }

    } catch (error) {
      console.error("Error al editar el evento:", error);
      setErrorMessage("Hubo un problema al procesar su solicitud de editar evento.");
      setIsErrorModalOpen(true);
      return false; // Si falla la edición, se devolverá false
    }
  };

  const handleError = (error) => {
    console.error("Error de PayPal:", error);
    setErrorMessage("Error al iniciar la transacción de PayPal.");
    setIsErrorModalOpen(true);
  };

  return (
    <div>
      <h1 className="font-bold flex justify-center">Iniciar Transacciones para modificar este evento.</h1>
      <PayPalButtons
        key={toggle}
        createOrder={handleCreateOrder}
        onApprove={handleApprove}
        onError={handleError}
        disabled={!isObjectEmpty(errors)}
      />
    </div>
  );
};




// import { PayPalButtons } from "@paypal/react-paypal-js"
// import { usePriceEvent } from "../hooks/usePriceEvent";
// import { useEventEditStore, useEventsData } from "../store";
// import { useCart } from "react-use-cart";
// import { updateEvent } from "../../../shared/actions/events";
// import { isObjectEmpty } from "../../../shared/utils";
// import { useEffect } from "react";
// import { refundPayment } from "../../../config/api/PaypalSandBoxApi";
// import { validatePaymentStatus } from "./utils/validatePaymentStatus";

// export const PayPalEditEventPayment = ({ handleModal, errors, setErrorMessage, setRefundDetails, setIsErrorModalOpen, toggle }) => {
//     const { emptyCart, items } = useCart();
//     const { TOTAL } = usePriceEvent();
//   const { eventData, resetEventData,  getEventData} = useEventsData();
//   const { eventDataToEdit, resetEventDataEdit, getEventDataToEdit, setNewPaypalCaptureId } = useEventEditStore();
//   const isEditing = eventDataToEdit.id && eventDataToEdit.id.trim() !== '';
//   console.log("isEditing: ", isEditing); 


//   useEffect(() => {   
//     console.log(" => eventData: ", eventData);
//     console.log(" => eventDataToEdit: ", eventDataToEdit);  
//   }, [items, eventData])
  
  
//   const handleCreateOrder = (data, actions) => {

//     // Crear orden de pago
//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             value: TOTAL.toFixed(2), 
//           },
//         },
//       ],
//     });
//   };

//   const handleApprove = async (data, actions) => {
//     let paypalCaptureId = null;
//     let errorMessages = [];
   
//     try {
//         const details = await actions.order.capture(); // detalles del nuevo pago
//         console.log("Payment Approved (se ha cobrado el nuevo monto):", details); // ? 1. Hacer Pago. Total de evento editado
       
//         // validar el estado del pago
//         if (!validatePaymentStatus(details)) return; // por si falla el pago (1)
       
             
//         paypalCaptureId = details.purchase_units[0].payments.captures[0].id; // TODO: Guardar nueva captureId en base de datos
//         // Crear una copia del objeto actualizado
//         console.log("Nuevo CaptureId: ",paypalCaptureId);
        
//         console.log("getEventData: ",getEventData());
        
//         const updatedEventData = { ...getEventData(), paypalCaptureId }; // se usa la data de eventData (no incluye id), justo como el backend lo espera
//         setNewPaypalCaptureId(paypalCaptureId); // actualizar estado global de eventDataToEdit
//           console.log(`Pago completado por ${details.payer.name.given_name}`);
        
//         console.log("Objeto eventData actualizado: ", updatedEventData); // aqui está el captureId del nuevo pago (por editar)
//         if (isEditing) await handleEditEvent(details, errorMessages, updatedEventData);  // ? 2. Editar Evneto
      
//     } catch (error) {
//       console.error("Error al capturar el pago o manejar el evento:", error);
//       if (paypalCaptureId) {
//         await refundPayment(paypalCaptureId);
//         setRefundDetails([`ID de la transacción: ${paypalCaptureId}`, "Reembolso realizado."]);
//       }
//       setErrorMessage("Hubo un problema al procesar su solicitud.");
//       setIsErrorModalOpen(true);
//     }
//   };

//   const handleEditEvent = async (details, errorMessages, updatedEventData) => {
    
//     // console.log("[getEventDataToEdit] Vamos a editar la siguiente data:", dataToUpdate);
//     try{
//         console.log(`El ID que se enviará es: ${getEventDataToEdit().id}.`);
//         console.log("getEventDataToEdit: ",getEventDataToEdit());
//         console.log("La data que irá en el body es: ",updatedEventData );
        
        
//       const eventResult = await updateEvent(getEventDataToEdit().id, updatedEventData); // el id es de eventDataToEdit, porque eventData no tiene esa propiedad;
//       console.log("Respuesta del backend al intentar editarEvento:", eventResult);
  
//       if (eventResult.status === true) {
//         console.log("Evento editado exitosamente. Sigue el reembolso...:", eventResult);

//         const refundResult = await refundPayment(updatedEventData.paypalCaptureId); // ? 3. Hacer reembolso del total del evento antes de editar
//       if(refundResult.status != "COMPLETED") throw new Error(`Error al hacer reembolso. ${refundResult.status}`);
//       console.log("Reembolso exitoso.", refundResult);

//         handleModal(eventResult);
//         // setIsCreated(true);
//         resetEventData();
//         resetEventDataEdit();
//         emptyCart();
//         console.log("SE CREOOOO")
//         return true; 
//       } else {
//         console.error("Error al editar el evento:", eventResult);
//         throw new Error(eventResult.data.message || "Error desconocido al editar el evento.");
//       }
      
//     }catch(error){
//       console.error("Error al editar el evento:", error);
//       if (updatedEventData.paypalCaptureId) {
//         await refundPayment(updatedEventData.paypalCaptureId);
//         setRefundDetails([
//           `Cliente: ${details.payer.name.given_name}`,
//           `ID de la transacción: ${updatedEventData.paypalCaptureId}`,
//           `Monto reembolsado: $ ${details.purchase_units[0].amount.value}`,
//           `Mensaje del backend: ${error.message}`,
//         ]);
//         errorMessages.add
//       }
//       setErrorMessage("Hubo un problema al procesar su solicitud de editar evento.");
//       setIsErrorModalOpen(true);
//       return false; 
//     }
//   }
  

//   const handleError = (error) => {
//     console.error("Error de PayPal:", error);
//     setErrorMessage("Error al iniciar la transacción de PayPal.");
//     setIsErrorModalOpen(true); // Mostrar modal de error
//   };
  
//     return (
//     <div>
//       <h1 className="font-bold flex justify-center">Iniciar Transacciones</h1>
//       <PayPalButtons
//         key={toggle} 
//         createOrder={handleCreateOrder}
//         onApprove={handleApprove}
//         onError={handleError}
//         disabled={!isObjectEmpty(errors)}
//       />
//     </div>
//   )
// }
