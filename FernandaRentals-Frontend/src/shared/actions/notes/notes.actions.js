import { webApi } from "../../../config/api/WebApi"

export const createNote = async (form) => {
    try{
        const {data} = await webApi.post('/notes', form);        
        return data;
    }
    catch(error){
        console.error(error)
        return error?.response?.data;
    }
}