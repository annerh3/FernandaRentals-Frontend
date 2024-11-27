import { FiMoon, FiSun } from "react-icons/fi";

export const DarkModeBtn = ({ setDarkMode, darkMode }) => {
  return (
    <button
    onClick={() => setDarkMode(!darkMode)}
    className={`fixed top-4 right-4 p-2 rounded-lg mt-[19px] z-50 ${
      darkMode ? "bg-siidni-darkLight text-white hover:bg-gray-50 hover:text-black " : "bg-white text-gray-900 hover:bg-siidni-darkLight hover:text-white"
    } shadow-md transition-transform hover:scale-105`}
    aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <FiSun className="text-xl" />
      ) : (
        <FiMoon className="text-xl" />
      )}
    </button>
  );
};
