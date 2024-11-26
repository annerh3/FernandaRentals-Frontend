import { useState } from "react";
import { createCategoryProduct, getAllCategoryProducts, updateCategoryProduct } from "../../../../shared/actions/categoryProducts/categoryProduct";

export const useCategoryProduct = () => {

    const [categoriesProd, setCategoriesProd] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const loadCategoriesProd = async () => {
      setIsLoading(true);
      const result = await getAllCategoryProducts();
      setCategoriesProd(result);
      setIsLoading(false);
    } 

    const createCategoryProd = async (categoryData) => {
      setIsLoading(true);
      const result = await createCategoryProduct(categoryData);
      setCategoriesProd(result);
      setIsLoading(false);
    }

    const editCategoryProd = async (id, updatedData) => {
      setIsLoading(true);
      const result = await updateCategoryProduct(id, updatedData);
      setCategoriesProd(result);
      setIsLoading(false);
    }

  
    return {
      //Properties
      categoriesProd,
      isLoading,
          //Methods
          loadCategoriesProd,
          createCategoryProd,
          editCategoryProd
    }
  
}
