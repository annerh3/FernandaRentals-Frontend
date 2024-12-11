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
    .test(
      'has-lowercase',
      'La contraseña debe contener al menos una letra minúscula.',
      (value) => /[a-z]/.test(value || '')
    )
    .test(
      'has-uppercase',
      'La contraseña debe contener al menos una letra mayúscula.',
      (value) => /[A-Z]/.test(value || '')
    )
    .test(
      'has-number',
      'La contraseña debe contener al menos un número.',
      (value) => /\d/.test(value || '')
    )
    .test(
      'has-special-char',
      'La contraseña debe contener al menos un carácter especial.',
      (value) => /[@$!%*?&]/.test(value || '')
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
