import * as Yup from 'yup';
export const userAdminInitialValues = (selectedUserAdmin) => {
  const initValues = {
    "name": `${selectedUserAdmin?.userName || ""}`,
    "email": `${selectedUserAdmin?.userEmail || ""}`,
    "password": "Temporal01*"
  }
  return initValues;
}


export const userAdminValidationSchema = Yup.object({
  name: Yup.string().required('El nombre de usuario es obligatorio.'),
  email: Yup.string()
        .required('El correo electrónico es requerido.')    
        .email('Ingrese un correo valido.'),
  password: Yup.string()
    .required('La contraseña es obligatoria.')
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula.')
    .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula.')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número.')
    .matches(/[\W_]/, 'La contraseña debe contener al menos un carácter especial (por ejemplo: @, #, $, %, etc.).'),
 
});
