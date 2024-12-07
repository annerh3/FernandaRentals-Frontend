import { PayPalButtons } from "@paypal/react-paypal-js";
import { usePriceEvent } from "../hooks/usePriceEvent";
import { isObjectEmpty } from "../../../shared/utils";
import { useEventsData } from "../store/useEventsData";
import { createEvent } from "../../../shared/actions/events";
import { useCart } from "react-use-cart";
import { refundPayment } from "../../../config/api/PaypalSandBoxApi";

export const PaymentPage = ({ handleModal, errors }) => {
  const { TOTAL } = usePriceEvent();
  const { eventData, resetEventData, setIsCreated } = useEventsData();
  const { emptyCart } = useCart();

  // Validar estado del pago
  const validatePaymentStatus = (details) => {
    const paymentStatus = details.status || details.purchase_units[0].payments.captures[0].status;
    if (paymentStatus !== "COMPLETED") {
      console.error("El pago no se completó correctamente:", paymentStatus);
      alert("El pago no se completó correctamente.");
      return false;
    }
    return true;
  };

  // Crear una orden de pago
  const createOrder = (data, actions) => {
    console.log("Cart Total for Order:", TOTAL);
    console.log(eventData);

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

  // Manejar aprobación de pago
  const onApprove = async (data, actions) => {
    let captureId = null;

    try {
      const details = await actions.order.capture();
      console.log("Payment Approved:", details);

      // Validar el estado del pago
      if (!validatePaymentStatus(details)) return;

      // Capturar el ID de la transacción
      captureId = details.purchase_units[0].payments.captures[0].id;

      console.log(`Pago completado por ${details.payer.name.given_name}`);

      // Crear el evento en el backend
      const response = await createEvent(eventData);
      console.log(response);

      if (response.status === true) {
        console.log("Evento creado exitosamente:", response);
        handleModal(response);
        setIsCreated(true);
        resetEventData();
        emptyCart();
      } else {
        // Si el evento falla, realizar reembolso
        console.error("Error al crear el evento:", response);
        if (captureId) {
          await refundPayment(captureId);
        }
        alert("El evento no pudo ser creado. Se ha realizado un reembolso.");
      }
    } catch (error) {
      console.error("Error al capturar el pago o crear el evento:", error);
      if (captureId) {
        // Si ocurre un error durante la captura o creación del evento, intenta el reembolso
        await refundPayment(captureId);
      }
      alert("Ocurrió un problema al procesar el pago.");
    }
  };

  // Manejar errores en el pago
  const onError = async (err) => {
    console.error("Error en el pago:", err);
    alert("Hubo un problema con el pago.");
    // No es necesario hacer reembolso aquí, ya que `captureId` no está disponible en este contexto
  };

  return (
    <div>
      <h1 className="font-bold flex justify-center">Realizar Pago</h1>
      <PayPalButtons
        key={eventData.location} // Forzar rerender si el total cambia
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        disabled={!isObjectEmpty(errors)}
      />
    </div>
  );
};
