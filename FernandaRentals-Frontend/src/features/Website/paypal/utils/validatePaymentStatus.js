export const validatePaymentStatus = (details) => {
    const paymentStatus = details.status || details.purchase_units[0].payments.captures[0].status;
    if (paymentStatus !== "COMPLETED") {
      console.error("El pago no se completó correctamente:", paymentStatus);
      alert("El pago no se completó correctamente.");
      return false;
    }
    return true;
  };