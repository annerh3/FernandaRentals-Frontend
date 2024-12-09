import * as Yup from 'yup';

export const notesInitValues = {
    name: '',
    description: '',
}

export const notesValidationSchema = Yup.object({
    name: Yup.string()
        .required('El nombre es requerido.')  ,  
    description: Yup.string()
        .required('La contraseña es requerida')
        .max(500, 'La descripción no puede tener más de 500 caracteres.')
})