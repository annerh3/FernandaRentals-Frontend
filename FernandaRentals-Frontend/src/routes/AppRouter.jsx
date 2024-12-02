import { Route, Routes } from "react-router-dom";
import { WebRouter } from "../features/Website/routes/WebRouter";
import { SecurityRouter } from "../features/security/routes/SecurityRouter";
//import { useLocation } from "react-router-dom";
//import { useEffect } from "react";
import { AdministrationRouter } from "../features/administration/routes/AdministrationRouter";
import { ProtectedLayout } from "../shared/components";

export const AppRouter = () => {
  // const location = useLocation();
  // useEffect(() => {
  //   const loadFlyonui = async () => {
  //     try {
  //       await import("flyonui/flyonui");
  //       if (
  //         window.HSStaticMethods &&
  //         typeof window.HSStaticMethods.autoInit === "function"
  //       ) {
  //         window.HSStaticMethods.autoInit();
  //       }
  //     } catch (error) {
  //       console.error("Error loading Flyonui:", error);
  //     }
  //   };

  //   loadFlyonui();
  // }, [location.pathname]);

  return (
    <Routes>
      {/* Se encuentra el Dashboard asi como la parte administrativa  */}
      {/* Aquí podemos crear los usuarios administradores. */}
      <Route element={<ProtectedLayout />}>
        <Route path="/administration/*" element={<AdministrationRouter />} />
      </Route>
      
      {/* Donde encontramos el inicio de session asi como la parte de registro de usuarios nuevo comunes o clientes */}
      <Route path="/security/*" element={<SecurityRouter />} />

      {/* Parte publica para todos 
        Se utilizan validaciones para restringir el acceso a mis eventos a los usuarios administradores
        Solo los usuarios autentificados pueden acceder a mis eventos
        
      */}
      <Route path="/*" element={<WebRouter />} />

    </Routes>
  );
};
