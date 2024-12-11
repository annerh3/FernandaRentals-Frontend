import { webApi } from "../../../config/api/WebApi"

export const loginAsync = async (form) => {
    try{
        const {data} = await webApi.post('/auth/login', form);
        
        return data;
    }
    catch(error){
        console.error(error)
        return error?.response?.data;
    }
}

export const registerAsync = async (form) => {

    try{
        const {data} = await webApi.post('/auth/register', form);
        return data;
    }
    catch(error){
        console.error(error)
        return error?.response?.data;
    }
}