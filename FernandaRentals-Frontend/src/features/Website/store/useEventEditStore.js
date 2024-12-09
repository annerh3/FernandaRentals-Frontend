import { create } from 'zustand';

const initialEventData = {
  id: "",
  name: "",
  location: "",
  startDate: "2000-01-01T06:00:00.000Z",
  endDate: "2000-01-01T06:00:00.000Z",
  paypalCaptureId: "",
  total: "",
  productos: [{ productId: "", quantity: 0 }],
};


export const useEventEditStore = create((set, get) => ({

  eventDataToEdit: { ...initialEventData },

  getEventDataToEdit: () => get().eventDataToEdit,

  setEventDataToEdit: (eventToEdit) => {

    const transformedEvent = {
      id: eventToEdit.id,
      name: eventToEdit.name,
      location: eventToEdit.location,
      startDate: eventToEdit.startDate.split('T')[0], // Formato YYYY-MM-DD
      endDate: eventToEdit.endDate.split('T')[0],
      paypalCaptureId: eventToEdit.paypalCaptureId,
      total: eventToEdit.total,
      productos: eventToEdit.eventDetails.map(detail => ({
        id: detail.product.id,
        name: detail.product.name,
        description: detail.product.description,
        price: detail.product.price,
        quantity: detail.quantity,
        urlImage: detail.product.urlImage,
        totalPrice: detail.totalPrice,
        
      })),

    };
    // Actualiza el estado global con el evento transformado
    set({ eventDataToEdit: transformedEvent });

  },

  setNewPaypalCaptureId: (paypalCaptureId) =>
    set((state) => ({ eventDataToEdit: { ...state.eventDataToEdit, paypalCaptureId } })),

  resetEventDataEdit: () => set({eventDataToEdit: { ...initialEventData }  }),
}));

