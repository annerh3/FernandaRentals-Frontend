import { webApi } from "../../../config/api/WebApi"

export const loginAsync = async (form) => {
    try{
        const {data} = await webApi.post('/auth/login', form);
           // console.log(data);
        return data;
    }
    catch(error){
        console.error(error)
        return error?.response?.data;
    }
}