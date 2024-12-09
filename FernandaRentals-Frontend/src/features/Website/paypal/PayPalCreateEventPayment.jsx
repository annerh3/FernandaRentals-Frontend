import { PayPalButtons } from "@paypal/react-paypal-js";
import { usePriceEvent } from "../hooks/usePriceEvent";
import { isObjectEmpty } from "../../../shared/utils";
import { useEventsData } from "../store/useEventsData";
import { createEvent, updateEvent } from "../../../shared/actions/events";
import { useCart } from "react-use-cart";
import { refundPayment } from "../../../config/api/PaypalSandBoxApi";
import { useEventEditStore } from "../store";
import { validatePaymentStatus } from "./utils/validatePaymentStatus";

export const PayPalCreateEventPayment = ({ handleModal, errors, setErrorMessage, setRefundDetails, setIsErrorModalOpen, toggle}) => {
  const { TOTAL } = usePriceEvent();
  const { getEventData, resetEventData, setIsCreated, eventData, setPaypalCaptureId } = useEventsData();
  const { eventDataToEdit, resetEventDataEdit, getEventDataToEdit } = useEventEditStore();
  const { emptyCart, items } = useCart();
  const isEditMode = eventDataToEdit.id && eventDataToEdit.id.trim() !== '';
  console.log("isEditMode: ", isEditMode); 
  
  const wrongEventData = {
    "name": "Evento No Disponible - Error Modal",
    "location": "Santa Rosa de Copán",
    "startDate": "2024-12-28",
    "endDate": "2024-12-31",
    "productos": [
      {
        "productId": "d01c78d4-3e7d-4d4d-bfee-749d5f78d66f",
        "quantity": 1000000
      }
    ]
  };


  // Crear una orden de pago
  const createOrder = (data, actions) => {
    console.log("Cart Total for Order:", TOTAL);
    // console.log(eventData);

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


  const handleEventCreation = async (details, errorMessages, updatedEventData) => {
    try {
      //! OJO AQUI   << << << << << << <<< << << << << << << <<< << << << << << << <<< << << << << << << <<< << << << << << << <<< << << << << << << <<< << << << << << << <<< << << << << <<  
      const latestEventData = getEventData();
      console.log("latestEventData", latestEventData);
      // const response = await createEvent(wrongEventData);
      const response = await createEvent(updatedEventData);
      console.log("Respuesta del backend:", response);
      console.log(response);

      if (response.status === true) {
        console.log("Evento creado exitosamente:", response);
        handleModal(response);
        setIsCreated(true);
        resetEventData();
        emptyCart();
        return true; // se creo ek evento correctamente
      } else {
        console.error("Error al crear el evento:", response);
        throw new Error(response.data.message || "Error desconocido al crear el evento.");
      }
    } catch (error) {
      console.error("Error en la creación del evento:", error);
      if (updatedEventData.paypalCaptureId) {
        await refundPayment(updatedEventData.paypalCaptureId);
        setRefundDetails([
          `Cliente: ${details.payer.name.given_name}`,
          `ID de la transacción: ${updatedEventData.paypalCaptureId}`,
          `Monto reembolsado: $ ${details.purchase_units[0].amount.value}`,
          `Mensaje del backend: ${error.message}`,
        ]);
        errorMessages.add
      }
      setErrorMessage("Hubo un problema al procesar su solicitud.");
      setIsErrorModalOpen(true);
      return false; // error al crear evento
    }
  };

  // manejar aprobacin de pago
  const onApprove = async (data, actions) => {
    let paypalCaptureId = null;
    let errorMessages = [];

    if (isEditMode) handleEditEvent(); 

    try {
      const details = await actions.order.capture();
      console.log("Payment Approved:", details);

      // validar el estado del pago
      if (!validatePaymentStatus(details)) return;

      paypalCaptureId = details.purchase_units[0].payments.captures[0].id; // TODO: Guardar en base de datos
       // Crear una copia del objeto actualizado
    const updatedEventData = { ...getEventData(), paypalCaptureId }; 
    setPaypalCaptureId(paypalCaptureId); // Guardar en el estado global si es necesario

    console.log("Objeto eventData actualizado: ", updatedEventData);
      
      console.log(`Pago completado por ${details.payer.name.given_name}`);

      await handleEventCreation(details, errorMessages, updatedEventData);
    } catch (error) {
      console.error("Error al capturar el pago o manejar el evento:", error);
      if (paypalCaptureId) {
        await refundPayment(paypalCaptureId);
        setRefundDetails([`ID de la transacción: ${paypalCaptureId}`, "Reembolso realizado."]);
      }
      setErrorMessage("Hubo un problema al procesar su solicitud.");
      setIsErrorModalOpen(true);
    }
  };


  // Manejar errores en el pago
  const onError = async (err) => {
    console.error("Error en el pago:", err);
    setErrorMessage("Problema de pago.");
    setRefundDetails(["Hubo un problema al realizar el pago."]);
  };

  return (
    <div>
      <h1 className="font-bold flex justify-center">Realizar Pago</h1>
      <PayPalButtons
        key={toggle} // Forzar rerender 
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        disabled={!isObjectEmpty(errors)}
      />
    </div>
  );
};
