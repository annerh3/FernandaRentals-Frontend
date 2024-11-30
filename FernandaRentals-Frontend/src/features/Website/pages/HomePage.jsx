import { useAuthStore } from "../../security/store";
import { ActionSection, Carousel, HeroSection, Testimonials } from "../components";

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
                  <a className="text-siidni-goldLight">Fernanda Rentals®</a> ?
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
       <Testimonials     />
        {/* Inicio Seccion Testimonios */}

      <ActionSection   isAuthenticated={isAuthenticated}  />
      </main>
    </div>
  );
};