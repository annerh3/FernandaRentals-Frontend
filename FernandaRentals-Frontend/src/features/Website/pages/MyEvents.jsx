import { useEffect, useState } from "react";
import { useEvents } from "../hooks/data";
import { EventItem } from "./EventItem";
import { EventItemSkeleton } from "../components/events/EventsListSkeleton";
import { AlertPopUpGeneric } from "../components/utils";
import { NotFound } from "../../../shared/components";
import { generateId } from "../../../shared/utils";
import { useAuthStore } from "../../security/store/useAuthStore";

export const MyEvents = () =>  {

  const {events, isLoading, loadUserEvents, } = useEvents();
  const [fetching, setFetching] = useState(true);
  const [showAlert, setShowAlert] = useState(false);  // Estado para controlar la alerta

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if(fetching) {
      loadUserEvents();
      setFetching(false);
       
    }
  }, [fetching]);

  const handleAfterDelete = () => {
    setShowAlert(true); // Muestra la alerta
    setFetching(true); // Esto hará que se vuelva a ejecutar el useEffect y recargue los eventos
  };

  const handleOk = () => {
    setShowAlert(false);
  }

  return (



    
    <section className="min-h-screen mx-auto px-4 md:px-6 bg-gray-100 bg-my-events-pattern bg-cover">
      <header className="flex items-center justify-center mb-8">
        {/* <h1 className="mt-28 text-3xl font-semibold text-white shadow-2xl event rounded-lg">{isLoading || !user ? "" : (<>Eventos de {user.name}</>)}</h1> */}
        {/* <h1 className="mt-28 text-3xl font-semibold text-white shadow-lg">Eventos de {user.name}</h1> */}
        {isLoading || !user ? (
          <div className="mt-28 event animate-pulse flex items-center rounded-lg">
            <div className=" bg-gray-50 rounded-full w-96 h-6 mr-1"></div>
          </div>
        ) : (
          <h1 className="mt-28 text-3xl font-semibold text-white shadow-2xl event rounded-lg">
            Eventos de {user.name}
          </h1>
        )}
      </header>

      <section className="bg-transparent p-6 rounded-md mb-0">
        <div className="grid gap-6 ">
          {
            isLoading ? (
              [...Array(4)].map(() => (
                <EventItemSkeleton key={generateId()} />)
              )            
            ) : (
              
            events?.data?.length ? (
              events.data.map((event) => (
                <>
                {console.log("USER en MyEvents.jsx, isLoading = false:  ", user)  }
                <EventItem key={event.id} event={event} onDelete={handleAfterDelete} />
                </>
              ))
            ) : (
              <>
              <NotFound message={"No hay eventos."} />
              </>
             
            )
          )
          }
        </div>
      </section>

      {showAlert && <AlertPopUpGeneric message="Se ha eliminado el evento" onDelete={handleOk}/>} {/* Muestra la alerta si showAlert es true */}
    </section>
  );
}
