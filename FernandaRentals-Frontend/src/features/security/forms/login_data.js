import * as Yup from 'yup';

export const loginInitValues = {
    email: '',
    password: '',
}

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .required('El correo electrónico es requerido.')    
        .email('Ingrese un correo valido.'),
    password: Yup.string()
        .required('La contraseña es requerida')
})


export const  registerInitValues = {
    email: '',
    password: '',
    confirmPassword: '',
    clientName: '',
    clientTypeId:''
  }


export const registerValidationSchema = Yup.object({
    email: Yup.string()
    .required('El correo electrónico es requerido.')
    .email('Ingrese un correo válido.'),

    password: Yup.string()
    .required('La contraseña es requerida.')
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe ser segura y contener al menos 8 caracteres, incluyendo minúsculas, mayúsculas, números y caracteres especiales.'
    ),
  confirmPassword: Yup.string()
    .required('La confirmación de la contraseña es requerida.')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden.'), 

  clientName: Yup.string()
    .required('El nombre del cliente es requerido.')
    .min(3, 'El nombre del cliente debe tener al menos 3 caracteres.')
    .max(50, 'El nombre del cliente no debe exceder los 50 caracteres.'),

  clientTypeId: Yup.string()
    .required('El tipo de cliente es requerido.')
});
