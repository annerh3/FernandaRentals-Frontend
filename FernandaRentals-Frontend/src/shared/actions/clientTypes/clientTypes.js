import { webApi } from "../../../config/api/WebApi";

// Obtener todos los tipos de clientes
//TODO REVISAR SI HAY PAGINACION POR PARTE DEL BACKEND 
 // --> NO, no tiene xd
export const getAllClientTypes = async () => {
  try {
    const { data } = await webApi.get(`/clientstypes`);
    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

// Obtener un tipo de cliente por ID
export const getClientTypeById = async (id = 0) => {
  try {
    const { data } = await webApi.get(`/clientstypes/${id}`);

    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};
// Crear un clientType
export const createClientType = async (clientTypeData) => {
    try {
      const { data } = await webApi.post('/clientstypes', clientTypeData);
  
      return data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  };

// Editar un tipo de cliente
export const updateClientType = async (id, updatedData) => {
  try {
    const { data } = await webApi.put(`/clientstypes/${id}`, updatedData);
    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

// Eliminar un tipo de cliente
export const deleteClientType = async (id) => {
  try {
    const { data } = await webApi.delete(`/clientstypes/${id}`);

    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};
