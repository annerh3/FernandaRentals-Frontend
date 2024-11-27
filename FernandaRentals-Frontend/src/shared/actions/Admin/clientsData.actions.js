import { webApi } from "../../../config/api/WebApi";

export const getClientsData = async () => {
    try{
      const {data} = await webApi.get('admin/clients-data'); 
      return data;
    }catch (error){
      console.error(error);
      return error.response;
    }
  }