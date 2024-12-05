import { PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

export const PaymentPage = () => {
  const { cartTotal } = useCart();
  console.log(cartTotal);
  const [currentTotal, setCurrentTotal] = useState(cartTotal);

  // Actualizar currentTotal cuando cartTotal cambia
  useEffect(() => {
    setCurrentTotal(cartTotal);
  }, [cartTotal]); 

  const createOrder = (data, actions) => {
    console.log("Current Total:", currentTotal); // Verifica el valor correcto

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: currentTotal.toFixed(2), // Asegúrate de pasar el valor correcto
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
        console.log(details)
      alert(`Pago completado por ${details.payer.name.given_name}`);
    });
  };

  const onError = (err) => {
    console.error("Error en el pago:", err);
    alert("Hubo un problema con el pago.");
  };

  return (
    <div>
      <h1 className="font-bold flex justify-center">Realizar Pago</h1>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  );
};
