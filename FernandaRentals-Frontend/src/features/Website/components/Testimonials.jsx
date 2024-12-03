import { generateId } from "../../../shared/utils/generateid";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Fernanda Quintanilla",
      avatar: "https://i.postimg.cc/5NPm7mZy/gfemale-person.jpg",
      quote: `"Es un servicio de primera. Es increible lo profesionales que son cuando se presentan problemas. Ellos resuelven."`,
    },
    {
      name: "Héctor Vega",
      avatar: "https://i.postimg.cc/g21LXYM6/hector-profile.jpg",
      quote: `"Me impresionó la amplia selección de muebles y el proceso de entrega e instalación impecable. ¡Muy recomendable!"`,
    },
    {
      name: "Jonahthan Velasquez",
      avatar: "https://i.postimg.cc/15ztH0Gv/padre.jpg",
      quote: `"Las sillas de madera con cojín fueron perfectas para mi fiesta de cumpleaños. ¡Son lo mejores!"`
    },
    {
      name: "Rolando Mejia",
      avatar: "https://i.postimg.cc/MpFdTYDN/mewin.jpg",
      quote: `"Ocupabamos 100 mesas para un evento de la Escuela de Mewing®. Fernanda Rentals nos dió el servicio al día siguiente. ¡Son increíbles!"`
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
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
            {testimonials.map((testimonial) => (
              <div
                key={generateId()}
                className="mx-auto flex w-full items-center justify-start p-4 sm:p-8"
              >
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    {testimonial.link ? (
                      <a
                        className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={testimonial.avatar}
                          alt={`Avatar de ${testimonial.name}`}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </a>
                    ) : (
                      <span className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                        <img
                          src={testimonial.avatar}
                          alt={`Avatar de ${testimonial.name}`}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </span>
                    )}
                    <aside className="font-medium">{testimonial.name}</aside>
                  </div>
                  <p className="italic opacity-70">{testimonial.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
