import { create } from "zustand";

const initialEventData = {
  name: "",
  location: "",
  startDate: "2000-01-01T06:00:00.000Z",
  endDate: "2000-01-01T06:00:00.000Z",
  productos: [{ productId: "", quantity: 0 }],
};

export const useEventsData = create((set) => ({

  eventData: { ...initialEventData },

  // Actualizar campos específicos del evento
  setEventName: (name) =>
    set((state) => ({ eventData: { ...state.eventData, name } })),

  setEventLocation: (location) =>
    set((state) => ({ eventData: { ...state.eventData, location } })),

  setEventStartDate: (startDate) =>
    set((state) => ({ eventData: { ...state.eventData, startDate } })),

  setEventEndDate: (endDate) =>
    set((state) => ({ eventData: { ...state.eventData, endDate } })),

  setEventProducts: (productos) => {
    const formattedProducts = productos.map((product) => ({
      productId: product.id,
      quantity: product.quantity || 1,
    }));
    set((state) => ({ eventData: { ...state.eventData, productos: formattedProducts } }));
  },

  // Reiniciar los datos del evento a los valores predeterminados
  resetEventData: () => set({ eventData: { ...initialEventData } }),

  isCreated: false,
  setIsCreated: (state) => {
    set({isCreated: state})
  }
}));



