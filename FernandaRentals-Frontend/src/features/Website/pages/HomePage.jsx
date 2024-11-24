import { useAuthStore } from "../../security/store";
import { Carousel, HeroSection } from "../components";
import { Link } from "react-router-dom";

export const HomePage = () => {
  // Imágenes del carrusel
  const images = [
    "https://i.postimg.cc/pTjKsmSv/carrusel-p1.jpg",
    "https://i.postimg.cc/PqPW83zP/carrusel-p2.jpg",
    "https://i.postimg.cc/rsLx386r/carrusel-p3.jpg",
    "https://i.postimg.cc/q7S8csjQ/carrusel-p4.png",
    "https://i.postimg.cc/x8yMSWYF/carrusel-p5.jpg",
    "https://i.postimg.cc/SQWW8z87/carrusel-p6.jpg",
  ];
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <div className="flex-row row-auto  items-center justify-center">
      <section>
        <HeroSection />
      </section>

      <main className="bg-gray-100 pt-16">
        {/* Inicio Seccion Servicios */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-200 px-3 py-3 text-sm">
                  Nuestros Servicios
                </div>
                <h2 className="text-3xl font-bold py-3 tracking-tight sm:text-5xl">
                  Transforma tu Evento con un Toque de Magia
                </h2>
                <div className="flex justify-center">
                  <p className="max-w-[600px] text-gray-600 md:text-xl lg:text-base xl:text-xl">
                    Descubre cómo nuestros servicios especializados pueden
                    convertir tu evento en una experiencia inolvidable. Desde el
                    mobiliario hasta la decoración, estamos aquí para hacer que
                    cada detalle brille.
                  </p>
                </div>
              </div>
            </div>

            {/* Carussel */}
            <div className="mx-auto grid max-w-5xl items-center gap-6  lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Préstamo de Mobiliario
                      </h3>
                      <p className="text-gray-600">
                        ¡Hazlo inolvidable con nuestro mobiliario elegante!
                        Reserva ahora y transforma tu evento.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Montaje de Evento</h3>
                      <p className="text-gray-600">
                        Déjalo en manos de expertos! Nos encargamos de cada
                        detalle para un montaje perfecto.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Decoración de Eventos
                      </h3>
                      <p className="text-gray-600">
                        ¡Crea un ambiente único! Personalizamos la decoración
                        para que tu evento destaque.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <Carousel imgs={images} />
            </div>
          </div>
        </section>
        {/* Fin Seccion Servicios */}

        {/* Inicio Seccion Beneficios */}
        <section className=" md:py-18 lg:py-25">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-200 px-3 py-3 text-sm">
                  Beneficios
                </div>
                <h2 className="text-3xl  font-bold tracking-tighter sm:text-4xl">
                  ¿Por qué elegir{" "}
                  <a className="text-siidni-goldLight">Siidni Rentals®</a> ?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                  Nuestro servicio de alquiler de muebles ofrece una variedad de
                  beneficios para que la planificación de su evento sea
                  sencilla.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Instalación sin estrés</h3>
                  <p className="text-muted-foreground">
                    Nuestro equipo se encarga de la entrega, instalación y
                    desmontaje de los muebles, para que usted pueda concentrarse
                    en el evento.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">
                    Opciones personalizables
                  </h3>
                  <p className="text-muted-foreground">
                    Elija entre nuestra amplia selección de muebles para crear
                    el ambiente perfecto para su evento.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Calidad excepcional</h3>
                  <p className="text-muted-foreground">
                    Nuestros muebles se mantienen meticulosamente y se obtienen
                    de proveedores de primera calidad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Fin Seccion Beneficios */}

        {/* Inicio Seccion Testimonios */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className=" grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-3 text-sm">
                Testimonios
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Lo que dicen nuestros clientes
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                Escuche a nuestros clientes satisfechos sobre su experiencia con
                nuestros servicios de alquiler de muebles.
              </p>
            </div>
            <div className="divide-y rounded-lg border">
              <div className="grid w-full grid-cols-1 items-stretch justify-center divide-x md:grid-cols-2">
                <div className="mx-auto flex w-full items-center justify-start p-4 sm:p-8">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <a
                        href="https://github.com/annerh3"
                        target="_blank"
                        className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden"
                      >
                        <img
                          src="https://i.postimg.cc/5NPm7mZy/gfemale-person.jpg"
                          alt="Avatar"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </a>
                      <aside className="font-medium">
                        Fernanda Quintanilla
                      </aside>
                    </div>
                    <p className="italic opacity-70">
                      "A chinga, tengo una tienda. Es un servicio de primera. El
                      de al lado va a coronar esta noche."
                    </p>
                  </div>
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <a
                          href="https://github.com/TETvega"
                          target="_blank"
                          className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden"
                        >
                          <img
                            src="https://i.postimg.cc/g21LXYM6/hector-profile.jpg"
                            alt="Avatar"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </a>
                        <aside className="font-medium">Héctor Vega</aside>
                      </div>
                    </div>
                    <p className="italic opacity-70">
                      "Me impresionó la amplia selección de muebles y el proceso
                      de entrega e instalación impecable. ¡Muy recomendable!"
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid w-full grid-cols-1 items-stretch justify-center divide-x md:grid-cols-2">
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-16 h-16 rounded-full overflow-hidden">
                          <img
                            src="https://i.postimg.cc/15ztH0Gv/padre.jpg"
                            alt="Avatar"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </span>
                        <aside className="font-medium">
                          Jonahthan Velasquez
                        </aside>
                      </div>
                    </div>
                    <p className="italic opacity-70">
                      "Las sillas de madera con cojín fueron perfectas para mi
                      babyshower. ¡Quiero otro bebé!"
                    </p>
                  </div>
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-16 h-16  rounded-full overflow-hidden shadow-md">
                          <img
                            src="https://i.postimg.cc/MpFdTYDN/mewin.jpg"
                            alt="Avatar"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </span>
                        <aside className="font-medium">Rolando Mejia</aside>
                      </div>
                    </div>
                    <p className="italic opacity-70">
                      "Ocupabamos 100 mesas para un evento de la Escuela de
                      Mewing ®. Fernanda Rentals nos dió el servicio al dia
                      siguiente. ¡Son increíbles!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Inicio Seccion Testimonios */}

        <section className="w-full h-96 justify-center bg-black/50 bg-action-pattern bg-cover flex items-center">
          <section className="w-full h-96 flex justify-center items-center bg-black/50">
            <div>
              <span className="flex justify-center mb-4 text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl">
               {!isAuthenticated ? "Tu Evento Perfecto Está a Un Clic" : ""} 
              </span>
              <span className="flex justify-center">
                <Link
                  to="/reservation"
                  className="inline-flex items-center justify-center text-white rounded-md bg-[#d68a3d] px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-transform transform hover:translate-y-1 hover:border-transparent cursor-pointer hover:bg-[#a96b2e]"
                >
                  Ver Productos
                </Link>
              </span>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};
