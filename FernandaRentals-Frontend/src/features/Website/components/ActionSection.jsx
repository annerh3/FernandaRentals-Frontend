import { Link } from "react-router-dom";

export const ActionSection = ({isAuthenticated}) => {
    return (<section className="w-full h-96 justify-center bg-black/50 bg-action-pattern bg-cover flex items-center">
        <section className="w-full h-96 flex justify-center items-center bg-black/50">
          <div>
            <span className="flex justify-center mb-4 text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl">
             {!isAuthenticated ? "Tu Evento Perfecto Está a Un Clic" : "Explora los productos"} 
            </span>
            <span className="flex justify-center">
              <Link to="/products" className="inline-flex items-center justify-center text-white rounded-md bg-[#d68a3d] px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-transform transform hover:translate-y-1 hover:border-transparent cursor-pointer hover:bg-[#a96b2e]">
                Ver Productos
              </Link>
            </span>
          </div>
        </section>
      </section>);
  }