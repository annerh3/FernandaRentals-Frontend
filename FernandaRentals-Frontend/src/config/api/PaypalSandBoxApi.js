import axios from "axios";

const PAYPAL_SANDBOX_API_URL = "https://api-m.sandbox.paypal.com/"; 
const PAYPAL_CLIENT_ID = 'Ab0A-wgCWkvVmSTrObo9OjO_clWlvWHJMG8TZDWGUfZ6NY3EWN-kYPQQQYgeHFouKfyyGsluEKTWAuTH';
const PAYPAL_CLIENT_SECRET = 'EBlG5y5eTz01XktmqZs9wlfNczYHSmBb4hzJKyUOYpiNhtmfEW4dyFP-ffldZVBWjfSoHLbHKBGF5A9n';

// para componente en App.jsx
export const initialOptions = {
    "client-id": PAYPAL_CLIENT_ID,
    currency: "USD", 
    intent: "capture",
  };

const paypalSandboxApi = axios.create({
  baseURL: PAYPAL_SANDBOX_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Obtener el token de acceso
const getAccessToken = async () => {
  try {
    const authResponse = await axios.post(
      `${PAYPAL_SANDBOX_API_URL}v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        auth: {
          username: PAYPAL_CLIENT_ID,
          password: PAYPAL_CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return authResponse.data.access_token; // Devuelve el token de acceso
  } catch (error) {
    console.error("Error obteniendo token de acceso:", error.response?.data);
    throw new Error("No se pudo obtener el token de acceso");
  }
};

// Realizar un reembolso
export const refundPayment = async (captureId, refundAmount = null) => {
  try {
    const accessToken = await getAccessToken();

    const refundPayload = refundAmount
      ? { amount: { value: refundAmount, currency_code: "USD" } }
      : {}; // Cuerpo vacío para reembolso completo

    const refundResponse = await paypalSandboxApi.post(
      `/v2/payments/captures/${captureId}/refund`,
      refundPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Token en el encabezado
        },
      }
    );

    console.log("Reembolso exitoso:", refundResponse.data);
    return refundResponse.data;
  } catch (error) {
    console.error("Error al realizar el reembolso:", error.response?.data);
    throw new Error("No se pudo completar el reembolso");
  }
};

