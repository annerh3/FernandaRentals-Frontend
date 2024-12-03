import { Link } from "react-router-dom";

export const ItemNavAdministration = ({
  isActive,
  titleLink,
  linkTo,
  darkMode,
  spanTitle,
  Icon,
  iconClass,
}) => {
  return (
    <li>
      <Link
        title={titleLink}
        to={linkTo}
        className={`flex items-center justify-center md:justify-start space-x-3 w-full p-3 rounded-lg ${
          isActive
            ? darkMode
              ? "bg-gray-800 text-gray-200" // Fondo blanco y texto negro en dark mode
              : "bg-gray-300 text-black" // Fondo gris en modo claro
            : darkMode
            ? "hover:bg-gray-800 text-white" // Hover para el dark mode
            : "hover:bg-gray-100 text-black" // Hover para el modo claro
        }`}
      >
        {/* Icono con las clases que permiten cambiar el color */}
        <Icon className={`text-xl ${iconClass}`} />
        <span className="hidden md:inline">{spanTitle}</span>
      </Link>
    </li>
  );
};
