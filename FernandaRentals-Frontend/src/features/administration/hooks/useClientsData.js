import { useState } from "react";
import { getClientsData } from "../../../shared/actions/Admin/clientsData.actions";

export const useClientsData = () => {
    const [clientsData, setClientsData] = useState({});
    const [isLoadingClientsData, setIsLoadingClientsData] = useState(false);

const loadClientsData = async () => {
    setIsLoadingClientsData(true);
    try
    {
        const result = await getClientsData();
        setClientsData(result) 
    } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingClientsData(false);
      }
}

    return{
       clientsData,
       isLoadingClientsData,
       loadClientsData,
    }
}