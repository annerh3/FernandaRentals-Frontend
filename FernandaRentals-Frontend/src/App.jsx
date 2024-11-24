import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { useAuthStore } from "./features/security/store";
import { useEffect, useState } from "react";



export const App = () => {
  const [fetching, setFetching] = useState(true);
  const validateAuthentication = useAuthStore((state) => state.validateAuthentication);

  useEffect(() => {
    if(fetching) {
      validateAuthentication();
      setFetching(false);
       
    }
  }, [fetching]);


 return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
