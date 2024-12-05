import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { useAuthStore } from "./features/security/store";
import { useEffect, useState } from "react";
import { Loading } from "./shared/components/Loading";
import { initialOptions, PAYPAL_CLIENT_ID } from "./config/api/paypalCheckout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
export const App = () => {
  //Por si se actualiza la pagina se vuelve a leer el local store
  // para la validacion de la autentificacion
  const [isLoading, setLoading] = useState(true);
  const validateAuthentication = useAuthStore((state) => state.validateAuthentication);

  useEffect(() => {
    
    
      if (isLoading) {
          validateAuthentication();
          setLoading(false)
      }
  }, [validateAuthentication]);

  // Mientras se valida la autenticación
  if (isLoading) {
      return <Loading />
  }

 

 return (
  <PayPalScriptProvider options={initialOptions}>
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
</PayPalScriptProvider>
  )
}
