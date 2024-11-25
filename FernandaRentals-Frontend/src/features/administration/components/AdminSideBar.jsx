import { FiCalendar, FiHome, FiPackage, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

export const AdminSideBar = ({ darkMode }) => {
  return (
    <aside
      className={`fixed h-screen w-20 md:w-64 ${
        darkMode ? "bg-siidni-darkLight text-white" : "bg-white"
      } shadow-lg flex flex-col`}
    >
      <div className="p-4">
        <div className="flex items-center justify-center md:justify-start space-x-3 pointer-events-none mb-3">
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
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
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
            <li>
              <Link
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
              <button
                className={`flex items-center justify-center md:justify-start space-x-3 w-full p-3 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <FiUsers className="text-xl text-purple-500" />
                <span className="hidden md:inline">Users</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
