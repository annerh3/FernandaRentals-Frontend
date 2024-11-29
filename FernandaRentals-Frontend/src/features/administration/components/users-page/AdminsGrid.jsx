import { useEffect, useState } from "react";
import { useAdminUsers } from "../../hooks/useAdminUsers";
import { useFetchStore } from "../../store/useFetchStore";
import { AdminUserItem, AdminUserItemSkeleton } from "./AdminUserItem";
import { FiPlus } from "react-icons/fi";

export const AdminsGrid = ({ darkMode, handleModalOpen, icon }) => {
  const { usersAdmin, isLoading, loadUsersAdmin } = useAdminUsers();
  const [fetching, setFetching] = useState(true);
  const fetch = useFetchStore((state) => state.fetch);
  const setFetch = useFetchStore((state) => state.setFetch);

  useEffect(() => {
    if (fetching || fetch) {
      loadUsersAdmin();
      setFetching(false);
      setFetch(false);
    }
  }, [fetching, fetch]);

  
  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center ">
        <button
          onClick={() => handleModalOpen("create")}
          className={`mr-8 flex items-center space-x-2 px-4 py-2 rounded-lg ${
            darkMode ? "bg-blue-600" : "bg-blue-500"
          } text-white transition-transform hover:scale-105`}
        >
          <FiPlus />
          <span>Nuevo Admin</span>
        </button>
      </div>
      {isLoading ? (
        <AdminUserItemSkeleton darkMode={darkMode} Icon={icon} />
      ) : (
        <AdminUserItem admins={usersAdmin} darkMode={darkMode} Icon={icon}  handleModalOpen={handleModalOpen} />
      )}
    </div>
  );
};
