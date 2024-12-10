import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { transformEvents } from "../../../shared/utils";
import { useEffect } from "react";

export const EventCalendar = ({ darkMode, events, handleModalOpen }) => {
  // const [showPopup, setShowPopup] = useState(false);
  //   const [selectedEvent, setSelectedEvent] = useState(null);
  useEffect(() => {
    moment.locale("es"); // Configura Moment.js en español solo para este componente
  }, []);
  //cuando se selecciona un evento
  const handleSelectEvent = (event) => {
    console.log("Evento seleccionado:", event);
    handleModalOpen(event);
  };

  //moment.locale("es"); // Configurar Moment en español
  const localizer = momentLocalizer(moment);

  // para la trasformación de los eventos
  const calendarEvents = transformEvents(events?.data);
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.color || "#007bff", // Color del evento
      borderRadius: "4px",
      opacity: 0.8,
      color: "red",
      border: "none",
      display: "block",
      fontSize: "10px", // Ajusta el tamaño del texto
      //padding: "3px",
    };

    return {
      style,
    };
  };
  const CustomEvent = ({ event }) => {
    return (
      <div className={` text-white text-[10px] rounded-lg`}>{event.title}</div>
    );
  };
  const CustomPopupEvent = ({ event }) => {
    return (
      <div>
        <strong>{event.title}</strong>
        {/* <p>{event.description || "No hay descripción"}</p> */}
      </div>
    );
  };

  const dayPropGetter = () => {
    return {
      style: {
        backgroundColor: darkMode ? "#1e293b" : "#f8f9fa",
        color: darkMode ? "#ff0000" : "#f8f9fa",
      },
    };
  };

  const messages = {
    today: "Hoy", // Traducción para "Today"
    previous: "Atrás", // Traducción para "Back"
    next: "Siguiente", // Traducción para "Next"
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    allDay: "Todo el día",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango.",
    showMore: (total) => `+${total} más`, // Traducción para "show more"
    // weekday: {
    //   0: "Domingo", // Domingo
    //   1: "Lunes",   // Lunes
    //   2: "Martes",  // Martes
    //   3: "Miércoles", // Miércoles
    //   4: "Jueves",  // Jueves
    //   5: "Viernes", // Viernes
    //   6: "Sábado",  // Sábado
    // },
    // monthNames: [
    //   "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    //   "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    // ],

  };
  

  return (
    <div
      className={`rounded-lg shadow-md ${
        darkMode ? "bg-siidni-darkCard text-white" : "bg-white text-black"
      } p-4 max-h-[600px] sm:max-h-[700px] w-full h-[400px]`}
    >
      <Calendar
      // dayPropGetter={dayPropGetter}
        localizer={localizer}
        messages={messages}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: "100%" }}
        defaultView="month"
        views={true}
        className="w-full h-[400px] sm:h-[500px] lg:h-[600px] text-[10px] rounded-md text-slate-400"
        allDayMaxRows={2}
        popup
        //messages={messages}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter} // Aplica los estilos personalizados
        components={{
          event: CustomEvent, // Renderiza eventos normales
          agenda: {
            event: CustomPopupEvent, // Renderiza eventos en el popup
          },
        }}
      />
    </div>
  );
};
