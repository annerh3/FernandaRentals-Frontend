import * as Yup from 'yup';
export const productInitialValues = {
    "name": "",
    "description": "",
    "urlImage": "",
    "categoryId": "",
    "stock": 0,
    "cost": 0
  }


export const ProductValidationSchema = Yup.object({
  name: Yup.string().required('El nombre del producto es obligatorio'),
  description: Yup.string().required('La descripción es obligatoria'),
  urlImage: Yup.string().url('La URL de la imagen no es válida').required('La URL de la imagen es obligatoria'),
  categoryId: Yup.string().required('Selecciona una categoría').nullable(),
  stock: Yup.number().min(0, 'El stock no puede ser negativo').required('El stock es obligatorio'),
  cost: Yup.number().min(0, 'El precio no puede ser negativo').required('El precio es obligatorio'),
});
