import { Navigate, Route, Routes } from "react-router-dom"
import { DashBoardPage } from "../pages/DashBoardPage"
import { AdminSideBar } from "../components/AdminSideBar"
import { useState } from "react";
import { DarkModeBtn } from "../components/DarkModeBtn";
import { ProductsPage } from "../pages/ProductsPage";
import { CategoryProductPage } from "../pages/CategoryProductPage";
import {UsersPage} from "../pages/UsersPage";
import { EventsPage } from "../pages/EventsPage";

export const AdministrationRouter = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main className={`flex min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-gray-900"}`}>
      <AdminSideBar darkMode={darkMode} className="w-64" />

      <div className="flex-1 flex flex-col">

        <DarkModeBtn setDarkMode={setDarkMode} darkMode={darkMode} className="p-4" />

        <section className="flex-1 pl-4">
          <Routes>
            <Route path="/dashboard" element={<DashBoardPage darkMode={darkMode} />} />
            <Route path="/manage-events" element={<EventsPage darkMode={darkMode} />} />
            <Route path="/manage-products" element={<ProductsPage darkMode={darkMode} />} />
            <Route path="/manage-products-categories" element={<CategoryProductPage darkMode={darkMode} />} />
            <Route path="/manage-users" element={<UsersPage darkMode={darkMode} />} />
            <Route path="/*" element={<Navigate to={"/dashboard"} />} />
          </Routes>
        </section>
      </div>
    </main>
  );
};
