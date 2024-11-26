import * as Yup from 'yup';
export const productInitialValues = (selectedProduct) => {
  const initValues = {
    "name": `${selectedProduct?.name || ""}`,
    "description": `${selectedProduct?.description || ""}`,
    "urlImage": `${selectedProduct?.urlImage|| ""}`,
    "categoryId": `${selectedProduct?.category?.id || ""}`,
    "stock": `${selectedProduct?.stock || ""}`,
    "cost": `${selectedProduct?.cost || ""}`
  }
  return initValues;
}


export const ProductValidationSchema = Yup.object({
  name: Yup.string().required('El nombre del producto es obligatorio'),
  description: Yup.string().required('La descripción es obligatoria'),
  urlImage: Yup.string().url('La URL de la imagen no es válida').required('La URL de la imagen es obligatoria'),
  categoryId: Yup.string().required('Selecciona una categoría').nullable(),
  stock: Yup.number().min(0, 'El stock no puede ser negativo').required('El stock es obligatorio'),
  cost: Yup.number().min(0, 'El precio no puede ser negativo').required('El precio es obligatorio'),
});
