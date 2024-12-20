import { Link } from "react-router-dom";
import { useAuthStore } from "../../security/store";

export const HeroSection = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="flex items-center justify-center h-[100vh] bg-hero-pattern w-full bg-cover">
      <div className="h-screen w-screen bg-black/50 flex items-center justify-center">
        <div className="text-center text-white space-y-6 px-4 sm:px-6 md:px-8 lg:px-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            El Comienzo de un Evento Perfecto Está Aquí
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl">
            Descubre las piezas perfectas para transformar tu espacio y crear
            una experiencia inolvidable.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center font-pluto-light font-bold">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-md bg-siidni-goldDark px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-transform transform hover:translate-y-1 hover:border-transparent cursor-pointer hover:bg-[#a96b2e]"
              >
              Ver Productos
            </Link>
            {
              !isAuthenticated && <Link
              to="/security/login"
              className="inline-flex items-center justify-center rounded-md border t px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-transform transform hover:translate-y-1 hover:border-transparent cursor-pointer hover:shadow-2xl hover:bg-[#A99C2E]"
            >
              Iniciar Sesión
            </Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
