import * as Yup from 'yup';

export const checkProductsInitvalues = {
    eventStartDate: "",
    eventEndDate: "",
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
      .min(
        new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Fecha actual + 3 días
        "La fecha de inicio debe ser al menos 3 días después del día actual"
      ),
    eventEndDate: Yup.date()
      .required("La fecha de fin es obligatoria")
      .min(
        Yup.ref("eventStartDate"),
        "La fecha de fin debe ser posterior a la fecha de inicio"
      ),
  });

  export const basicValidationSchema = Yup.object({
    eventStartDate: Yup.date()
      .required("La fecha de inicio es obligatoria"),
    eventEndDate: Yup.date()
      .required("La fecha de fin es obligatoria")
  });


  