import { Navigate, Route, Routes } from "react-router-dom";
import { Footer, Header } from "../../../shared/components";
import { LoginPage, RegisterPage } from "../pages";

export const SecurityRouter = () => {
  return (
    // bg-login-pattern
    <main className="flex flex-col min-h-screen  w-full bg-login-pattern bg-cover bg-center"> {/* en esta clases se determina que ocupe toda la pantalla*/}
      <Header />
      {/* <div className="py-10"></div> */}
      {/* <section className="flex-grow px-6 py-28"> */}
        <div className="bg-black/50">
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>} /> 
            <Route path="/*" element={<Navigate to={"/security/login"} />} />
          </Routes>
        </div>
      {/* </section> */}
      <Footer />
    </main>
  );
};
