export const refundPayment = async (paymentId) => {
    // const { paymentId } = req.body;
  
    try {
      const refundResponse = await paypalClient.refundPayment(paymentId); // Implementación del cliente PayPal.
      res.status(200).json({ success: true, data: refundResponse });
    } catch (error) {
      console.error("Error procesando reembolso:", error);
      res.status(500).json({ success: false, message: "No se pudo procesar el reembolso." });
    }
  };
  