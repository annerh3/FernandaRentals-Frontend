import * as Yup from 'yup';

export const eventInitialValues = {
    name: "",
    location: "",
    eventStartDate: "",
    eventEndDate: "",
    products: [
      {
        productId: "abc123",
        quantity: 0,
      },
    ],
  };


export const eventCreateValidationSchema = Yup.object({
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


  export const editEventValidationSchema = Yup.object({
    eventEndDate: Yup.date()
      .required("La fecha de fin es obligatoria")
      .min(new Date(), "La fecha de fin debe ser igual o posterior a la fecha actual"), // Validar que sea >= a la fecha actual.
    eventStartDate: Yup.date()
      .nullable() // Permitir valores iniciales.
      .test(
        "validate-start-date",
        "La fecha de inicio no puede modificarse a menos que sea al menos 3 días después de la fecha actual",
        function (value) {
          const { initialStartDate } = this.options.context; // Obtener la fecha inicial del contexto.
          const nowPlusThreeDays = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // Fecha actual + 3 días.
  
          // Validar si:
          // 1. La fecha no cambió (sigue siendo igual a la inicial), o
          // 2. Si cambió, es >= a 3 días después de la fecha actual.
          return value === initialStartDate || new Date(value) >= nowPlusThreeDays;
        }
      ),
  });

