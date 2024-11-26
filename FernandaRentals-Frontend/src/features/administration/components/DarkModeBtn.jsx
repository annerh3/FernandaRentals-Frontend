import { FiMoon, FiSun } from "react-icons/fi";

export const DarkModeBtn = ({ setDarkMode, darkMode }) => {
  return (
    <button
    onClick={() => setDarkMode(!darkMode)}
    className={`fixed absolute top-4 right-4 p-2 rounded-lg mt-[19px] z-50 ${
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

/*
okay. ahora tenemos que hacer la pagina de usuario. esta pagina tendrá varias secciones, 
por lo que tendra paneles, una seccion será el listado de usuarios. 
usuarios admin y usuarios clientes, para los usuarios clientes tendremos su nombre, su correo, y tipo de cliente y dos contadores que indicara los eventos que ha reservado y el otro sera el contador de los eventos que esta por suceder. recuerda que esto es una sseccion, quiero que sean tres secciones. una donde estan listados los usuarios-clientes, la otra donde estén los usuarios-admin y la ultima seccion donde esté el crud de tipos de clientes

*/