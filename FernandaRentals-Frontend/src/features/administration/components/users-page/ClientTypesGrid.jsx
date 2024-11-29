import { FiPlus } from "react-icons/fi";
import { ClientTypeItem, ClientTypeSkeleton } from "./ClientTypeItem";
import { useClientType } from "../../hooks/useClientType";
import { useEffect, useState } from "react";
import { useFetchStore } from "../../store/useFetchStore";

export const ClientTypesGrid = ({ darkMode, handleModalOpen, icon }) => {
  const { clientTypes, isLoading, loadClientTypes } = useClientType();
  const [fetching, setFetching] = useState(true);
  const fetch = useFetchStore((state) => state.fetch);
  const setFetch = useFetchStore((state) => state.setFetch);


  useEffect(() => {
    if (fetching || fetch) {
      loadClientTypes();
      setFetching(false);
      setFetch(false);
    }
  }, [fetching, fetch]);

  return (
    <div>
      <div className="flex justify-start items-center ">
        <button
          onClick={() => handleModalOpen("create")}
          className={`mr-8 flex items-center space-x-2 px-4 py-2 rounded-lg ${
            darkMode ? "bg-blue-600" : "bg-blue-500"
          } text-white transition-transform hover:scale-105 mb-6`}
        >
          <FiPlus />
          <span>Crear Tipo de Cliente</span>
        </button>
      </div>
      {isLoading ? (
        <ClientTypeSkeleton darkMode={darkMode} />
      ) : (
        <ClientTypeItem
          clientTypes={clientTypes}
          darkMode={darkMode}
          handleModalOpen={handleModalOpen}
          icon={icon}
        />
      )}
    </div>
  );
};
