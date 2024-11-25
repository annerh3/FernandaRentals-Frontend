import { Navigate, Route, Routes } from "react-router-dom"
import { DashBoardPage } from "../pages/DashBoardPage"
import { AdminSideBar } from "../components/AdminSideBar"
import { useState } from "react";
import { DarkModeBtn } from "../components/DarkModeBtn";
import { ProductsPage } from "../pages/ProductsPage";

export const AdministrationRouter = () => {
    const [darkMode, setDarkMode] = useState(true);
  
    return (
      <main className={`flex flex-col min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-gray-900"}`}>
        <AdminSideBar darkMode={darkMode} />
        <DarkModeBtn setDarkMode={setDarkMode} darkMode={darkMode} />

        <section className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<DashBoardPage darkMode={darkMode} />} />
            <Route path="/manage-products" element={<ProductsPage darkMode={darkMode} />} />
            <Route path="/*" element={<Navigate to={"/dashboard"} />} />
          </Routes>
        </section>

      </main>
    );
  };
  