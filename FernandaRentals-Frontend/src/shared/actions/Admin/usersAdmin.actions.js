import { webApi } from "../../../config/api/WebApi";


export const getUsersAdminData = async () => {
    try{
      const {data} = await webApi.get('admin/admin-users'); 
      return data;
    }catch (error){
      console.error(error);
      return error.response;
    }
  }

  export const createAdminUser = async (values) => {
    try{
      const {data} = await webApi.post('/admin/create-admin', values); 
      return data;
    }catch (error){
      console.error(error);
      return error.response;
    }
  }

  export const UpdateAdminUser = async (id, updatedData) => {
    try{
      const {data} = await webApi.put(`/admin/edit-admin/${id}`, updatedData); 
      return data;
    }catch (error){
      console.error(error);
      return error.response;
    }
  }
