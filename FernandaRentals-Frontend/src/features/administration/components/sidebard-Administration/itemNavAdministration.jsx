import { Link } from "react-router-dom";

export const ItemNavAdministration = ({
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
          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
        }`}
      >
        {/* El icono con las clases que se pueden cambiar el color  */}
        <Icon className={`text-xl ${iconClass}`} />

        <span className="hidden md:inline">{spanTitle}</span>
      </Link>
    </li>
  );
};
