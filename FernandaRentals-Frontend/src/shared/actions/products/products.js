import { webApi } from "../../../config/api/WebApi";

// Obtener toda la lista de productos
export const getProductsList = async (searchTerm = "", page = 1 ,category ="" ) => {
  try {
    const { data } = await webApi.get(
      `/products?searchTerm=${searchTerm}&category=${category}&page=${page}`
    );

    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

// Obtener producto por ID
export const getProductById = async (id = 0) => {
  try {
    const { data } = await webApi.get(`/products/${id}`);

    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

// Obtener productos por categoría
export const getAllByCategory = async (id = 0) => {
  try {
    const { data } = await webApi.get(`/products/category/${id}`);

    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};


// Crear un producto
export const createProduct = async (productData) => {
    try {
      const { data } = await webApi.post('/products', productData);
  
      return data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  };
  
  // Editar un producto
  export const updateProduct = async (id, updatedData) => {
    console.log("Este es el id: ", id)
    // console.log(id);
    console.log("Este es body: ", updatedData)
    // console.log(updatedData);
    try {
      const { data } = await webApi.put(`/products/${id}`, updatedData);
      console.log("API Raw Response:", data);
      return data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  };
  
  // Eliminar un producto
  export const deleteProduct = async (id) => {
    try {
      const { data } = await webApi.delete(`/products/${id}`);
  
      return data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  };