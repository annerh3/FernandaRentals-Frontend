import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import "./../../index.css";
import { SideBar2 } from "./SideBar2";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { useAuthStore } from "../../features/security/store/useAuthStore";
import { ShoppingCart } from "../../features/Website/components/ShoppingCart";
import { useProductsValidation } from "../../features/Website/store/useProductsValidation";

export const Header = () => {
  const sideBar = useRef(null); // useRef para referenciar el componente SideBar2.
  const [isOpen, setIsOpen] = useState(false); // para controlar si el SideBar2 está abierto o cerrado.
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const success = useProductsValidation((state) => state.success);
 
  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Invierte el valor de 'isOpen' cuando se llama.
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
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
      if (
        sideBar.current &&
        !sideBar.current.contains(event.target) &&
        !event.target.closest(".shopping-cart-container")
      ) {
        setIsOpen(false);
        setIsCartOpen(false); // Cierra el carrito si se hace clic fuera
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
        <kbd className="rounded-lg p-1 border min-h-6 text-[13px] pointer-events-none shadow-inner shadow-slate-600">Ctrl</kbd>
        <span className="text-sm pointer-events-none ">+</span>
        <kbd className="rounded-lg p-1 border w-7 text-center min-h-6 text-[13px] pointer-events-none shadow-inner shadow-slate-600">/</kbd>
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
      <span className="text-white text-2xl font-bold">
        Fernanda Rentals
      </span>
    </Link>
    {/* {
      !success && ( */}
    <div className="shopping-cart-container relative transition-transform transform hover:translate-y-1">     
      <ShoppingCart toggleCart={toggleCart} isCartOpen={isCartOpen}/>
    </ div>

      {/* )
    } */}
  </header>
</section>

  );
};
