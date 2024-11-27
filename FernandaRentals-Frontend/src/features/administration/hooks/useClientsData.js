import { useState } from "react";
import { getClientsData } from "../../../shared/actions/Admin/clientsData.actions";
import { updateClientAsync } from "../../../shared/actions/clients/clients.action";

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

const editClientData = async (id, updatedData) => {
    setIsLoadingClientsData(true);
    try
    {
        const result = await updateClientAsync(id, updatedData);
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
       editClientData,
    }
};