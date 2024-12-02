import { webApi } from "../../../config/api/WebApi";

//para cargar los datos del dasboard
export const getDashBoardData = async () => {
    try{
      const {data} = await webApi.get('/admin/dashboard'); 
      return data;
    }catch (error){
      console.error(error);
      return error.response;
    }
  }