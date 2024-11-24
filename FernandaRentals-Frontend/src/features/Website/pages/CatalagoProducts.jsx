import { CatalagoProductsList } from "../components/catalago/CatalagoProductsList";

export const CatalagoProducts = () => {
  return (
    <div className="w-full bg-gray-100">
      <div className="w-full h-96 justify-center bg-header-pattern bg-cover flex items-center">    
        <div className="h-full w-screen bg-black/50 flex items-center justify-center">
          <div className="flex justify-center text-white items-center">
         <div>
         <h2 className="flex justify-center text-3xl mb-2 sm:text-4xl md:text-5xl font-bold tracking-tight">
            Muebles destacados
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl">
            Explora nuestra cuidada selección de muebles de alquiler.
          </p>
         </div>
          </div>
        </div>
      </div>
      <section className="h-full pb-8">
        <div className=" w-full sm:px-6 md:px-8 lg:px-10">
          {/* Lista de los Productos */}
          <CatalagoProductsList className="z-0" />
        </div>
        {/*  */}
      </section>
    </div>
  );
};
