import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { useAuthStore } from "./features/security/store";
import { useEffect, useState } from "react";

export const App = () => {
  const [fetching, setFetching] = useState(true);
  const validateAuthentication = useAuthStore((state) => state.validateAuthentication);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
      if (fetching) {
          validateAuthentication();
          setFetching(false);
      }
  }, [fetching]);

  // Mientras se valida la autenticación
  if (isLoading) {
      return null; 
  }

 return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
