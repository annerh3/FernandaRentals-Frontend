import { FaHome, FaRegUserCircle } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuCalendarPlus } from "react-icons/lu";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuthStore } from "../../features/security/store/useAuthStore";
import { PackageSearch } from "lucide-react";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { MdOutlineLogin } from "react-icons/md";

//Este es el sidebar ajustado y responsivo en cierta manera
export const SideBar2 = React.forwardRef(({ isOpen, toggleSidebar }, ref) => {
  // se usa 'React.forwardRef' para permitir recibir la referencia (ref) junto con las demás propiedades
  // Se debe colocar las iguientes declaraciones dentro del componente SideBar para manejar el comportamiento
  const btnClose = useRef(null);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    setTimeout(() => navigate("/home", { replace: true }), 0); // ejecutar navigate luego que procesos anteriores terminen
  };

  // Cierra el sidebar al presionar Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        toggleSidebar(); // por algun motivo este evento se dispara aun estando el sideBar cerrado
        console.log("esc");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [btnClose]);

  return (
    <div className="items-center" ref={ref}>
      <div
        className={`sidebar fixed top-0 bottom-0 p-2 w-[300px]  text-center bg-gray-900 ${
          isOpen ? "left-0" : "left-[-300px]"
        } transition-all duration-300     
        `}
      >
        <div className="text-gray-100 text-sm">
          {/* Nombre Principal e Icono */}
          <div className="p-2 mt-1 flex items-center justify-between">
            <div className="flex items-center">
              {isAuthenticated ? (
                <>
                  <FaRegUserCircle className="py-0.3 w-7 h-7" />
                  <span className="font-bold text-gray-200 ml-3 text-xl pointer-events-none">
                    {user.name}{" "}
                  </span>
                </>
              ) : (
                <>
                  <FaHome className="py-0.3" />
                  <span className="font-bold text-gray-200 ml-3 text-xl pointer-events-none">
                    Fernanda Rentals{" "}
                  </span>
                </>
              )}
            </div>

            <div className="flex space-x-1">
              <TbLayoutSidebarLeftExpandFilled
                className="text-3xl cursor-pointer text-white rotate-180 hover:border-2 hover:border-transparent hover:text-gray-400"
                ref={btnClose}
                onClick={toggleSidebar}
              />
            </div>
          </div>
          {/* Fin del Nombre Principal e Icono */}
          <hr className="my-2 text-gray-600" />
        </div>

        {/* Item de Header  */}
        {isAuthenticated ? ("") : (
          <Link to="/home">
            <div className=" flex mt-3 p-2 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-500">
              <IoHomeOutline className="text-white" />
              <span className=" text-sm ml-4 text-gray-200">Home</span>
            </div>
          </Link>
        )}

        {/* Item de Producos  */}
        <Link to="/products">
          <div className=" flex mt-3 p-2 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-500">
            <PackageSearch className="text-white" size={17} />
            <span className="text-sm ml-4 text-gray-200">Productos</span>
          </div>
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/reservation">
              <div className=" flex mt-3 p-2 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-500">
                <LuCalendarPlus className="text-white" />
                <span className=" text-sm ml-4 text-gray-200">
                  Crear Reservación
                </span>
              </div>
            </Link>

            <Link to="/my-events">
              <div className=" flex mt-3 p-2 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-500">
                <RiCalendarScheduleLine className="text-white" />
                <span className=" text-sm ml-4 text-gray-200">Mis Eventos</span>
              </div>
            </Link>

            <Link onClick={handleLogout}>
              <div className="flex mt-3 p-2 ml-0 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-500">
                <HiOutlineLogout className="text-white" />
                <span className=" text-sm ml-4 text-gray-200">
                  Cerrar Sesión
                </span>
              </div>
            </Link>
          </>
        ) : (
          <Link to="security/login">
            <div className="flex mt-3 p-2 ml-0 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#a96b2e]">
              <MdOutlineLogin className="text-white" />
              <span className=" text-sm ml-4 text-gray-200">
                Iniciar Sesión
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
});
// Asigna un displayName al componente
SideBar2.displayName = "SideBar2";
