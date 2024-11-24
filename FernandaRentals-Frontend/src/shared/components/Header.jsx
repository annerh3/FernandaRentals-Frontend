import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import "./../../index.css";
import { SideBar2 } from "./SideBar2";
import { BsFilterLeft } from "react-icons/bs";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

export const Header = () => {
  const sideBar = useRef(null); // useRef para referenciar el componente SideBar2.
  const [isOpen, setIsOpen] = useState(false); // para controlar si el SideBar2 está abierto o cerrado.

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Invierte el valor de 'isOpen' cuando se llama.
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Detecta si se presionan Ctrl + /
      if (event.ctrlKey && event.key === "/") {
        toggleSidebar();
      }
    };
    // Agregar el event listener al cargar el componente
    document.addEventListener("keydown", handleKeyDown);
    // Limpiar el event listener al desmontar el componente
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBar.current && !sideBar.current.contains(event.target)) {
        setIsOpen(false); // Cierra el sidebar si se hace clic fuera de él.
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sideBar]);

  return (
    <section className="relative">
  <span className="fixed z-50">
    <SideBar2 ref={sideBar} isOpen={isOpen} toggleSidebar={toggleSidebar}/>
  </span>
  <header className="header flex items-center justify-between px-4 py-2 bg-gray-800">
    {/* Ícono del sidebar y atajo */}
    <div className="flex items-center space-x-4">
      <TbLayoutSidebarLeftExpandFilled
        className="text-white shadow-sm text-2xl w-10 h-10 cursor-pointer  rounded-md hover:border-2 hover:border-transparent"
        onClick={toggleSidebar}
      />
      <p className="flex items-center space-x-1  text-white">
        <kbd className="kbd min-h-6 text-[13px] pointer-events-none">Ctrl</kbd>
        <span className="text-sm pointer-events-none">+</span>
        <kbd className="kbd min-h-6 text-[13px] pointer-events-none">/</kbd>
      </p>
    </div>

    {/* Logo y nombre */}
    <Link
      to="/home"
      className="flex items-center space-x-4 cursor-pointer"
    >
      <div className="flex items-center space-x-2">
        <img
          src="https://i.postimg.cc/Y02vKjST/siidni-logo.png"
          alt="Siidni Icon"
          className="h-10 object-cover object-center"
        />
      </div>
      <span className="text-[#d56e18] text-2xl font-semibold">
        Fernanda Rentals
      </span>
    </Link>

    <div className="h-10 bg-transparent w-48"></div>
  </header>
</section>

  );
};
