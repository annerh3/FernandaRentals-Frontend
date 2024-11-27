import { useClientsData } from "../../hooks/useClientsData";
import { ClientDataItem, ClientDataItemSkeleton } from "./ClientDataItem";
import { useEffect, useState } from "react";

export const ClientsGrid = ({ darkMode, handleModalOpen }) => {

  const {  clientsData, isLoadingClientsData, loadClientsData} = useClientsData();
  const [fetching, setFetching] = useState(true);
    
  // const clients = [
  //   {
  //     id: 1,
  //     name: "John Smith",
  //     email: "john@example.com",
  //     clientType: "Enterprise",
  //     eventCount: 45,
  //   },
  //   {
  //     id: 2,
  //     name: "Sarah Johnson",
  //     email: "sarah@example.com",
  //     clientType: "Small Business",
  //     eventCount: 23,
  //   },
  //   {
  //     id: 3,
  //     name: "Michael Brown",
  //     email: "michael@example.com",
  //     clientType: "Corporate",
  //     eventCount: 67,
  //   },
  // ];

  // const clients = {
  //   "data": [
  //     {
  //       "clientId": "3d952d76-9598-4184-b5ef-951bf9451aec",
  //       "clientName": "Siscomp",
  //       "clientEmail": "siscomp.hn@gmail.com",
  //       "clientTypeName": "Organización Privada",
  //       "clientTypeId": "b6f0d3a7-3e17-4c5d-9b3e-7a1d7e2fbb19",
  //       "totalPastEvents": 2,
  //       "totalUpcomingEvents": 3
  //     },
  //     {
  //       "clientId": "4389611b-4bab-4e11-be4f-b392d5a6b55c",
  //       "clientName": "Marlon Lopez",
  //       "clientEmail": "m_lopez@gmail.com",
  //       "clientTypeName": "Normal",
  //       "clientTypeId": "a1f5e93b-6d4f-4f91-9a3d-0b8e6f1b8e16",
  //       "totalPastEvents": 1,
  //       "totalUpcomingEvents": 1
  //     },
  //     {
  //       "clientId": "5db04822-c5a5-4f44-8c05-adb33cf274c8",
  //       "clientName": "Municipalidad de Santa Rosa de Copán",
  //       "clientEmail": "src_muni@gmail.com",
  //       "clientTypeName": "Organización Pública",
  //       "clientTypeId": "c8e3f4b1-2e16-4c8d-8e7e-8a5d6c3e1a18",
  //       "totalPastEvents": 1,
  //       "totalUpcomingEvents": 0
  //     },
  //     {
  //       "clientId": "0ee18dfe-f03f-4e05-a5a9-510e1066c2fa",
  //       "clientName": "Naara Chávez",
  //       "clientEmail": "naara.chavez@unah.hn",
  //       "clientTypeName": "Normal",
  //       "clientTypeId": "a1f5e93b-6d4f-4f91-9a3d-0b8e6f1b8e16",
  //       "totalPastEvents": 0,
  //       "totalUpcomingEvents": 0
  //     },
  //     {
  //       "clientId": "55e6a5d4-9384-41d1-9b1a-6ae2515e23df",
  //       "clientName": "PILARH",
  //       "clientEmail": "pilarh_hn@gmail.com",
  //       "clientTypeName": "ONG",
  //       "clientTypeId": "e2d5f6b9-7f8d-4c7b-9a1e-0b7e8f3d2c14",
  //       "totalPastEvents": 0,
  //       "totalUpcomingEvents": 0
  //     },
  //     {
  //       "clientId": "b0f530f9-ea57-4841-a1d7-07ead509df50",
  //       "clientName": "Iglesia Católica de Santa Rosa",
  //       "clientEmail": "e.cat_src@gmail.com",
  //       "clientTypeName": "Iglesia",
  //       "clientTypeId": "d3a7b2c4-5d6f-4f8e-9a2c-0c9e5b7d1a19",
  //       "totalPastEvents": 0,
  //       "totalUpcomingEvents": 0
  //     },
  //     {
  //       "clientId": "049f8d7f-2d5c-4312-b285-d4bd7ea52300",
  //       "clientName": "Iglesia Menonita",
  //       "clientEmail": "menonita_src@gmail.com",
  //       "clientTypeName": "Iglesia",
  //       "clientTypeId": "d3a7b2c4-5d6f-4f8e-9a2c-0c9e5b7d1a19",
  //       "totalPastEvents": 0,
  //       "totalUpcomingEvents": 0
  //     },
  //     {
  //       "clientId": "0b6441c9-ee73-4918-a81d-961961174248",
  //       "clientName": "Vision Fund",
  //       "clientEmail": "vision_fund@gmail.com",
  //       "clientTypeName": "ONG",
  //       "clientTypeId": "e2d5f6b9-7f8d-4c7b-9a1e-0b7e8f3d2c14",
  //       "totalPastEvents": 0,
  //       "totalUpcomingEvents": 0
  //     },
  //     {
  //       "clientId": "c6a65998-231e-4355-bf67-536a243ccfae",
  //       "clientName": "Empresa Municipal Aguas de Santa Rosa",
  //       "clientEmail": "gerencia@aguasdesantarosa.org",
  //       "clientTypeName": "Organización Pública",
  //       "clientTypeId": "c8e3f4b1-2e16-4c8d-8e7e-8a5d6c3e1a18",
  //       "totalPastEvents": 0,
  //       "totalUpcomingEvents": 0
  //     },
  //     {
  //       "clientId": "e75dece5-49a5-4c9a-9b30-84a4879f64c3",
  //       "clientName": "Aire Frío",
  //       "clientEmail": "aire.frio@gmail.com",
  //       "clientTypeName": "Organización Privada",
  //       "clientTypeId": "b6f0d3a7-3e17-4c5d-9b3e-7a1d7e2fbb19",
  //       "totalPastEvents": 0,
  //       "totalUpcomingEvents": 0
  //     },
  //     {
  //       "clientId": "4bf06874-0af7-4342-9539-4094ae626b9f",
  //       "clientName": "Ruth Quintanilla",
  //       "clientEmail": "ruthquintanilla3@icloud.com",
  //       "clientTypeName": "Normal",
  //       "clientTypeId": "a1f5e93b-6d4f-4f91-9a3d-0b8e6f1b8e16",
  //       "totalPastEvents": 0,
  //       "totalUpcomingEvents": 0
  //     },
  //     {
  //       "clientId": "752040ba-ebd4-4e98-92f1-08c6c5949316",
  //       "clientName": "Shalom Henriquez",
  //       "clientEmail": "s_hqz2@gmail.com",
  //       "clientTypeName": "Normal",
  //       "clientTypeId": "a1f5e93b-6d4f-4f91-9a3d-0b8e6f1b8e16",
  //       "totalPastEvents": 0,
  //       "totalUpcomingEvents": 0
  //     }
  //   ],
  //   "message": "Registros encontrados correctamente.",
  //   "status": true
  // };
  
  useEffect(() => {
    if (fetching) {
      loadClientsData();
      setFetching(false);
    }
  }, [fetching]);
  return (
    <div className="space-y-6">
      {
        isLoadingClientsData
        ?(
          <ClientDataItemSkeleton darkMode={darkMode}  />
        ):(
          <ClientDataItem   clients={clientsData}  darkMode={darkMode} handleModalOpen={handleModalOpen}  />
        )
      }
    </div>
  );
};