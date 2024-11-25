import { Route, Routes } from "react-router-dom";
import { WebRouter } from "../features/Website/routes/WebRouter";
import { SecurityRouter } from "../features/security/routes/SecurityRouter";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AdministrationRouter } from "../features/administration/routes/AdministrationRouter";
import { ProtectedLayout } from "../shared/components";

export const AppRouter = () => {
  const location = useLocation();

  useEffect(() => {
    const loadFlyonui = async () => {
      try {
        await import("flyonui/flyonui");
        if (
          window.HSStaticMethods &&
          typeof window.HSStaticMethods.autoInit === "function"
        ) {
          window.HSStaticMethods.autoInit();
        }
      } catch (error) {
        console.error("Error loading Flyonui:", error);
      }
    };

    loadFlyonui();
  }, [location.pathname]);

  return (
    <Routes>
      {/* <Route element={<ProtectedLayout />}> */}
        <Route path="/administration/*" element={<AdministrationRouter />} />
      {/* </Route> */}
      <Route path="/security/*" element={<SecurityRouter />} />

      <Route path="/*" element={<WebRouter />} />

    </Routes>
  );
};
