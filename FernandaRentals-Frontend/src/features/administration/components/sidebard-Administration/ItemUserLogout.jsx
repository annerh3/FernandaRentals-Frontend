import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";

export const ItemUserLogout = ({darkMode , handleLogout}) => {
  return (
    <>
      <li>
        <Link onClick={handleLogout}>
          <div
            title="Cerrar Sesión"
            className={`flex items-center justify-start  md:justify-start space-x-3 w-full p-3 rounded-lg hover:bg-red-500`}
          >
            <HiOutlineLogout
              className={` ${darkMode ? "text-gray-200" : "text-gray-950"}`}
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
    </>
  );
};
