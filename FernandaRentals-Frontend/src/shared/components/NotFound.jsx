import { LuSofa } from "react-icons/lu";
import { Link } from "react-router-dom";

export const NotFound = ({ message }) => {
  return (
    <section className="min-h-screen bg-transparent event">
      <div className="container flex items-center h-96 px-6  mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-extrabold text-siidni-brown rounded-full bg-white">
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg> */}
            <LuSofa className="font-extrabold text-3xl" />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
            {message}
          </h1>
          <span className="flex justify-center mt-3">
            <Link
              to="/reservation"
              className="md:text-xl lg:text-base xl:text-xl inline-flex items-center justify-center rounded-md bg-siidni-gold px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
            >
              Reserva Ahora
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};
