import { useClientsData } from "../../hooks/useClientsData";
import { useFetchStore } from "../../store/useFetchStore";
import { ClientDataItem, ClientDataItemSkeleton } from "./ClientDataItem";
import { useEffect, useState } from "react";

export const ClientsGrid = ({ darkMode, handleModalOpen , icon}) => {

  const {clientsData, isLoadingClientsData, loadClientsData} = useClientsData();
  const [fetching, setFetching] = useState(true);
  const fetch = useFetchStore((state) => state.fetch);
  const setFetch = useFetchStore((state) => state.setFetch);
  const handleModalClose = () => {
     setFetching(true); 
  };


  
  useEffect(() => {
    if (fetching || fetch) {
      loadClientsData();
      setFetching(false);
      setFetch(false)
    }
  }, [fetching,fetch]);
  return (
    <div className="space-y-6">
      {
        isLoadingClientsData
        ?(
          <ClientDataItemSkeleton darkMode={darkMode}  />
        ):(
          <ClientDataItem   clients={clientsData}  darkMode={darkMode} handleModalOpen={handleModalOpen}  handleModalClose={handleModalClose} icon={icon}/>
        )
      }
    </div>
  );
};