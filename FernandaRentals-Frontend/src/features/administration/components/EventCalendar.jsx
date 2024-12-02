import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { formatDate } from "../../../shared/utils";

export const EventCalendar = ({ darkMode, events, handleModalOpen }) => {
  // const [showPopup, setShowPopup] = useState(false);
  //   const [selectedEvent, setSelectedEvent] = useState(null);


  //cuando se seleciona un evento
  const handleSelectEvent = (event) => {
    console.log("Evento seleccionado:", event);
    handleModalOpen(event);
  };

  const localizer = momentLocalizer(moment);
  // para la trasformacion de los eventos
  const transformEvents = (events) => {
    return events?.map((event) => ({
      id: event.id,
      title: event.name,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      total: event.total,
      client: event.client,
      eventCost: event.eventCost,
      discount: event.discount,
      eventDetails: event.eventDetails,
    }));
  };
  
  const calendarEvents = transformEvents(events?.data);

  return (
    <div
      className={`rounded-lg shadow-md ${
        darkMode ? "bg-siidni-darkCard text-white" : "bg-white text-black"
      } p-4 max-h-[600px] sm:max-h-[700px] w-full h-[400px]`}
    >
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: "100%" }}
        defaultView="month"
        views={false}
        className="w-full h-[400px] sm:h-[500px] lg:h-[600px]"
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};
