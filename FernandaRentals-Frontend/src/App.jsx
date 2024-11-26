import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { useAuthStore } from "./features/security/store";
import { useEffect, useState } from "react";
import { Loading } from "./shared/components/Loading";

export const App = () => {
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
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
