import { webApi } from "../../../config/api/WebApi";


export const getFinancialsMonthly = async (values) => {
    try{
      const {data} = await webApi.post('admin/financials/monthly', values); 
      return data;
    }catch (error){
      console.error(error);
      return error.response;
    }
  }