import { useState } from "react";
import { getUsersAdminData } from "../../../shared/actions/Admin/usersAdmin.actions";

export const useAdminUsers = () => {
    const [usersAdmin, setUsersAdmin] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const loadUsersAdmin = async () => {
        try {
            setIsLoading(true);
            const result = await getUsersAdminData();
            setUsersAdmin(result)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    // const CreateClientType = async (values) => {
    //     try {
    //         setIsLoading(true);
    //         const result = await createClientType(values);
    //         console.log("userClienType  ", result);
            
    //         setclientTypes(result)
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    // const EditClientType = async (id, updatedData) => {
    //     try {
    //         setIsLoading(true);
    //         const result = await updateClientType(id, updatedData);
    //         setclientTypes(result)
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    return{
        usersAdmin,
        isLoading,
        loadUsersAdmin,
        
    }
}