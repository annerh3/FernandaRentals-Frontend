import { Navigate, Route, Routes } from "react-router-dom";
import { Footer, Header } from "../../../shared/components";
import { CatalagoProducts, FormEditEventPage, FormEventPage, HomePage, PageNotFound } from "../pages";
import { MyEvents } from "../pages/MyEvents";
import { useAuthStore } from "../../security/store/useAuthStore.js";

export const WebRouter = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Header ahora incluye el SideBar2 */}     
        <main className="flex-1">
         
            <Routes>
              <Route path="/reservation" element={<FormEventPage />} />
              <Route path="/not-found" element={<PageNotFound />} />
              <Route path="/my-events" element={<MyEvents />} />
              <Route path="/products" element={<CatalagoProducts />} />
              <Route path="/my-event/edit/:id" element={<FormEditEventPage/>} />
              {

isAuthenticated
?(
  <Route path="/*" element={<Navigate to={"/my-events"} />} />
)
:(
 <>
   <Route path="/home" element={<HomePage />} />
   <Route path="/*" element={<Navigate to={"/home"} />} />
 </>
)
              }
             
            </Routes>
        
        </main>
        <Footer />
    
    </div>
  );
};
