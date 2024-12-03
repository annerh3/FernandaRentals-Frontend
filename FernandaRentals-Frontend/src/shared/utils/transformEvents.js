export const transformEvents = (events) => {
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