import { useState } from "react"
import {getProductsList, updateProduct, validateProducts} from "../../../../shared/actions/products/products"

export const useProducts = () => {
  const [products, setProducts] = useState({});
  const [newProductData, setnewProductData] = useState({});
  const [prodCats, setProductsCategory] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const loadProducts = async (searchTerm, page, category) => {
    setIsLoading(true);
    const result = await getProductsList(searchTerm, page,category);
    setProducts(result);
    setIsLoading(false);
  } 

  const loadProductsByCategory = async (id) => {
    setIsLoading(true);
    const result = await getAllByCategory(id);
    setProductsCategory(result);
    setIsLoading(false);
  }

  const editProduct = async (id, updatedData) => {
    setIsLoading(true);
    // console.log("useProducts. Id => ", id)
    // console.log("useProducts. Data => ", updatedData)
    const result = await updateProduct(id, updatedData);
    console.log("API useProduct Response:", result);
    setnewProductData(result);
    setIsLoading(false);
  }


    // validar disponibilidad de productos entre fechas del evento
    const getValidationProducts = async (values) => {
      setIsLoading(true);
      const result = await validateProducts(values);
      setProducts(result);
        setIsLoading(false);
    };

//getProductsList

  return {
    // Properties
    products,
    isLoading,
    prodCats,
    newProductData,
    // Methods
    loadProducts,
    loadProductsByCategory,
    getValidationProducts,
    editProduct,
  }
}