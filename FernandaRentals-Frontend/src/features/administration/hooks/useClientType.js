import { useState } from "react";
import { createClientType, getAllClientTypes, updateClientType } from "../../../shared/actions/clientTypes/clientTypes";

export const useClientType = () => {
    const [clientTypes, setclientTypes] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const loadClientTypes = async () => {
        try {
            setIsLoading(true);
            const result = await getAllClientTypes();
            setclientTypes(result)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const CreateClientType = async (values) => {
        try {
            setIsLoading(true);
            const result = await createClientType(values);
            console.log("userClienType  ", result);
            
            setclientTypes(result)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const EditClientType = async (id, updatedData) => {
        try {
            setIsLoading(true);
            const result = await updateClientType(id, updatedData);
            setclientTypes(result)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return{
        clientTypes,
        isLoading,
        loadClientTypes,
        EditClientType,
        CreateClientType,
    }
}