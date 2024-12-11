import { Navigate, Route, Routes } from "react-router-dom"
import { DashBoardPage } from "../pages/DashBoardPage"
import { AdminSideBar } from "../components/AdminSideBar"
import { DarkModeBtn } from "../components/DarkModeBtn";
import { ProductsPage } from "../pages/ProductsPage";
import { CategoryProductPage } from "../pages/CategoryProductPage";
import {UsersPage} from "../pages/UsersPage";
import { EventsPage } from "../pages/EventsPage";
import { useDarkMode } from "../hooks";

export const AdministrationRouter = () => {
  const [darkMode, setDarkMode] = useDarkMode();


  return (
    <main className={`flex min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-gray-900"}`}>
      <AdminSideBar darkMode={darkMode} className="w-64" />

      <div className="flex-1 flex flex-col">

        {/* Botón para manejar el DarkMode o LightMode */}
        <DarkModeBtn setDarkMode={setDarkMode} darkMode={darkMode} className="p-4" />

        <section className="flex-1 pl-4">
          {/* Aquí se encuentran todas las rutas de Administrador  ASI COMO LOS CRUD*/}
          <Routes>
            {/* Pagina Principal Dashboard */}
            <Route path="/dashboard" element={<DashBoardPage darkMode={darkMode} />} />

            {/* Pagina de Eventos */}
            <Route path="/manage-events" element={<EventsPage darkMode={darkMode} />} />

            {/* PRODUCTOS */}
            <Route path="/manage-products" element={<ProductsPage darkMode={darkMode} />} />
            {/* Categorías de Productos */}
            <Route path="/manage-products-categories" element={<CategoryProductPage darkMode={darkMode} />} />

            {/* Usuarios, Administradores */}
            <Route path="/manage-users" element={<UsersPage darkMode={darkMode} />} />

            {/* Dashboard */}
            <Route path="/*" element={<Navigate to={"/dashboard"} />} />
          </Routes>
        </section>
      </div>
    </main>
  );
};
