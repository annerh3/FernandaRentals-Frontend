import * as Yup from 'yup';


  export const categoriesInitialValues = (selectedCategory) => {
    const initValues = {
      "name": `${selectedCategory?.name || ""}`,
      "description": `${selectedCategory?.description || ""}`,
    }
    return initValues;
  }


  export const CategoriesValidationSchema = Yup.object({
    name: Yup.string().required('El nombre del producto es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
  });