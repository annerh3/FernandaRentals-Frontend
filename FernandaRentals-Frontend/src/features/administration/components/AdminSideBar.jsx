import { FiCalendar, FiHome, FiPackage, FiUsers } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import {  Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../security/store";
import { ItemNavAdministration, ItemPresentation, ItemUserLogout } from "./sidebard-Administration";
import { ItemUserDetail } from "./sidebard-Administration/ItemUserDetail";

export const AdminSideBar = ({ darkMode }) => {

  const location = useLocation();


  const logout = useAuthStore((state) => state.logout);

  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    //console.log("Cerrando Sesión ?");
    logout();
    setTimeout(() => Navigate("/home", { replace: true }), 0); // ejecutar navigate luego que procesos anteriores terminen
  };

  return (
    <aside
      // Elemento Aside
      // Aquí se aplica el estilo según el botón de Dark o lig theme
      className={`fixed h-screen w-20 md:w-64 ${
        darkMode
          ? "bg-siidni-darkLight text-white"
          : "bg-white shadow-slate-600"
      } shadow-sm flex flex-col rounded-r-2xl`}
    >
      {/* Elementos del aside */}
      <div className="p-4">
        <ItemPresentation
          isDarkMode={darkMode}
          linkTo={"/home"}
          titleLink={"Home"}
          imgUrl={"https://i.postimg.cc/Y02vKjST/siidni-logo.png"}
          alt={"Logo Fernanda Rentals"}
          nameSpace={"Fernanda Rentals"}
        />
        <nav>
          <ul className="space-y-2">
            
            {/* dashboard */}
            <ItemNavAdministration
              titleLink="Dashboard"
              linkTo={"/administration/dashboard"}
              Icon={FiHome}
              darkMode={darkMode}
              iconClass="text-green-500"
              spanTitle="Dashboard"
              isActive={location.pathname === "/administration/dashboard"}
            />

            {/* eventos */}
            <ItemNavAdministration
              titleLink="Events"
              linkTo={"/administration/manage-events"}
              Icon={FiCalendar}
              darkMode={darkMode}
              iconClass="text-blue-400"
              spanTitle="Eventos"
              isActive={location.pathname === "/administration/manage-events"}
            />
          {/* Productos */}
            <hr className="border-gray-200 rounded-lg dark:border-gray-700" />
            <ItemNavAdministration
              titleLink="Products"
              linkTo={"/administration/manage-products"}
              Icon={FiPackage}
              darkMode={darkMode}
              iconClass="text-siidni-gold"
              spanTitle="Productos"
              isActive={location.pathname === "/administration/manage-products"}
            />
            
            {/* categorías de Productos */}
            <ItemNavAdministration
              titleLink="Category Products"
              linkTo={"/administration/manage-products-categories"}
              Icon={MdOutlineCategory}
              darkMode={darkMode}
              iconClass="text-red-600"
              spanTitle="Categorías"
              isActive={location.pathname === "/administration/manage-products-categories"}
            />
            
            <hr className="border-gray-200 rounded-lg dark:border-gray-700" />

            <ItemNavAdministration
              titleLink="Users"
              linkTo={"/administration/manage-users"}
              Icon={FiUsers}
              darkMode={darkMode}
              iconClass="text-purple-500"
              spanTitle="Usuarios"
              isActive={location.pathname === "/administration/manage-users"}
            />
            <hr className="border-gray-200 rounded-lg dark:border-gray-700" />

            {/* Para mostrar el Nombre del Usuario conectado */}
            <ItemUserDetail darkMode={darkMode} userName={user.name}/>
            
            {/* Maneja el cierre de Sesion   */}
            <ItemUserLogout darkMode={darkMode} handleLogout={handleLogout}/>
            
          </ul>
        </nav>
      </div>
    </aside>
  );
};
