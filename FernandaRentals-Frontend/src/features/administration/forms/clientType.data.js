import * as Yup from 'yup';

export const clientTypeInitialValues = (selectedItem) => {
  const initValues = {
    "name": `${selectedItem?.name || ""}`,
    "description": `${selectedItem?.description || ""}`,
    "discount": selectedItem?.discount * 100|| 0 ,
  }
  return initValues;
}

export const clientTypeValidationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio.'), 
    description: Yup.string().required('La descripción es obligatoria.'),
    discount: Yup.number()
      .typeError('El descuento debe ser un número.') // Validación de tipo
      .required('El descuento es obligatorio.') // Validación de requerido
      .min(0, 'El descuento no puede ser menor al 0%.') // Mínimo permitido
      .max(100, 'El descuento no puede ser mayor al 100%.') // Máximo permitido
  });