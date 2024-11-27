import { webApi } from "../../../config/api/WebApi";

export const updateClientAsync = async (id, updatedData) => {
    try{
        const {data} = await webApi.put(`/clients/${id}`, updatedData);
     
        return data;
    }
    catch(error){
        console.error(error)
        return error?.response?.data;
    }
}