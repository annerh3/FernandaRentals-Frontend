import { useState } from "react";
import { deleteEvent, getAllEvents, getClientEventsList } from "../../../../shared/actions/events";

export const useEvents = () => {
  const [events, setEvents] = useState({});
  const [isLoading, setIsLoading] = useState(false);

// esteeeeeeeeeeeeeeeee
  const loadEvents = async (value) => {
    setIsLoading(true);
    const result = await getAllEvents(value);
    setEvents(result);
    setIsLoading(false);
  };

  const removeEvent = async (id) => {
    setIsLoading(true);
      await deleteEvent(id);
      console.log('Mensaje desde removeEvent HOOK');
      
      const result = await getAllEvents();
       setEvents(result);
      setIsLoading(false);
  };
  
  const loadUserEvents = async () => {
    setIsLoading(true);
    const result = await getClientEventsList();
    console.log('Mensaje desde loadUserEvents HOOK');
       setEvents(result);
      setIsLoading(false);
  };



  return {
    // Properties
    events,
    isLoading,

        //Methods
        loadEvents,
        removeEvent,
        loadUserEvents,
  };
};