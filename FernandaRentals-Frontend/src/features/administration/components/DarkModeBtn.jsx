import { FiMoon, FiSun } from "react-icons/fi";

// Boton para el manejo del color de la interfaz
export const DarkModeBtn = ({ setDarkMode, darkMode }) => {
  return (
    <button
    //para manejar el estado del boton
      onClick={() => setDarkMode(!darkMode)}
      // aplica las clases basicas y las clases mediante ternarios segun el estado del boton
      className={`fixed top-4 right-4 p-2 rounded-lg mt-[19px] z-50 ${
        darkMode
          ? "bg-siidni-darkLight text-white hover:bg-gray-50 hover:text-black " 
          : "bg-white text-gray-900 hover:bg-siidni-darkLight hover:text-white"
      } shadow-md transition-transform hover:scale-105`}
      aria-label="Toggle dark mode"
    >
      {/* para mostrar el boton el icono segun el estado */}
      {darkMode ? (
        <FiSun className="text-xl" />
      ) : (
        <FiMoon className="text-xl" />
      )}
    </button>
  );
};
