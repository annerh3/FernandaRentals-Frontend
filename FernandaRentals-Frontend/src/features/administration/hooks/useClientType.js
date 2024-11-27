import { useState } from "react";
import { getAllClientTypes } from "../../../shared/actions/clientTypes/clientTypes";

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

    return{
        clientTypes,
        isLoading,
        loadClientTypes
    }
}