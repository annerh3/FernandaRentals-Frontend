import * as Yup from 'yup';

export const checkProductsInitvalues = {
    eventStartDate: "2024-12-01T00:00:00Z",
    eventEndDate: "2024-12-04T00:00:00Z",
    products: [
      {
        productId: "abc123",
        quantity: 0,
      },
    ],
  };


export const checkProductsValidationSchema = Yup.object({
    eventStartDate: Yup.date()
      .required("La fecha de inicio es obligatoria")
      .min(new Date(), "La fecha de inicio debe ser mayor al día actual"),
    eventEndDate: Yup.date()
      .required("La fecha de fin es obligatoria")
      .min(Yup.ref('eventStartDate'), "La fecha de fin debe ser posterior a la fecha de inicio"),
  });