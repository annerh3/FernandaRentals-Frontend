import { FiCalendar, FiHome, FiPackage, FiUsers } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineCategory } from "react-icons/md";
import { Link } from "react-router-dom";

export const AdminSideBar = ({ darkMode }) => {
  const handleLogout = () => {
    logout();
    setTimeout(() => navigate("/home", { replace: true }), 0); // ejecutar navigate luego que procesos anteriores terminen
  };

  return (
    <aside
      className={`fixed h-screen w-20 md:w-64 ${
        darkMode ? "bg-siidni-darkLight text-white" : "bg-white shadow-slate-600"
      } shadow-sm flex flex-col rounded-r-2xl`}
    >
      <div className="p-4">
        <Link
          to="/home"
          title="Ir a Pagina Principal"
          className="flex items-center justify-center md:justify-start space-x-3 mb-3"
        >
          <img
            src="https://i.postimg.cc/Y02vKjST/siidni-logo.png"
            alt="Siidni Icon"
            className={`${
              !darkMode ? "drop-shadow-sm shadow-black" : " "
            } h-10 object-cover object-center`}
          />
          <span
            className={`hidden md:inline ${
              !darkMode ? "drop-shadow-sm shadow-black" : " "
            } text-[#d56e18] text-xl font-semibold`}
          >
            Fernanda Rentals
          </span>
        </Link>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                title="DashBoard"
                to="/administration/dashboard"
                className={`flex items-center justify-center md:justify-start space-x-3 w-full p-3 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <FiHome className="text-xl text-green-500" />
                <span className="hidden md:inline">Dashboard</span>
              </Link>
            </li>

            <li>
              <button
                className={`flex items-center justify-center md:justify-start space-x-3 w-full p-3 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <FiCalendar className="text-xl text-blue-400" />
                <span className="hidden md:inline">Eventos</span>
              </button>
            </li>
            <hr className="border-gray-200 rounded-lg dark:border-gray-700" />
            <li>
              <Link
                title="Productos"
                to="/administration/manage-products"
                className={`flex items-center justify-center md:justify-start space-x-3 w-full p-3 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <FiPackage className="text-xl text-siidni-gold" />
                <span className="hidden md:inline">Productos</span>
              </Link>
            </li>
            <li>
              <Link
                title="Categorías de Productos"
                to="/administration/manage-products-categories"
                className={`flex items-center justify-center md:justify-start space-x-3 w-full p-3 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <MdOutlineCategory className="text-xl text-red-600" />
                <span className="hidden md:inline">Categorías</span>
              </Link>
            </li>
            <hr className="border-gray-200 rounded-lg dark:border-gray-700" />
            <li >
              <Link
              title="Usuarios"
                to="/administration/manage-users"
                className={`flex items-center justify-center md:justify-start space-x-3 w-full p-3 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <FiUsers className="text-xl text-purple-500" title="Usuarios" />
                <span className="hidden md:inline">Usuarios</span>
              </Link>
            </li>

            <li >
              <Link onClick={handleLogout}>
                <div
                  title="Cerrar Sesión"
                  className={`flex items-center justify-start  md:justify-start space-x-3 w-full p-3 rounded-lg hover:bg-red-500`}
                >
                  <HiOutlineLogout
                
                    className={` ${
                      darkMode ? "text-gray-200" : "text-gray-950"
                    }`}
                  />
                  <span
                    className={` ${
                      darkMode ? "text-gray-200" : "text-gray-950"
                    }text-sm ml-4 hidden md:inline`}
                  >
                    Cerrar Sesión
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
