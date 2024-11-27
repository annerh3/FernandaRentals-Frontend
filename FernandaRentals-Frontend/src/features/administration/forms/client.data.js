import * as Yup from 'yup';

export const clientInitialValues = (selectedItem) => {
  const initValues = {
    "clientName": `${selectedItem?.clientName || ""}`,
    "clientTypeId": `${selectedItem?.clientTypeId || ""}`,
  }
  return initValues;
}


export const ClientValidationSchema = Yup.object({
    clientName: Yup.string().required('El nombre del cliente es obligatorio'),
    clientTypeId: Yup.string().required('El tipo de cliente es obligatorio'),
});
