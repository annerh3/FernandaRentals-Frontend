import { useState } from "react";
import { FiSearch, FiUsers } from "react-icons/fi";


export const AdminsGrid = ({darkMode}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const admins = [
        {
          id: 1,
          name: "Admin User 1",
          email: "admin1@example.com",
          role: "Super Admin"
        },
        {
          id: 2,
          name: "Admin User 2",
          email: "admin2@example.com",
          role: "System Admin"
        }
      ];
    return(
        <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search admins..."
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white border-gray-300"}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="absolute right-3 top-3 text-gray-400" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {admins.map((admin) => (
          <div key={admin.id} className={`p-4 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow`}>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 ${darkMode ? "bg-blue-900" : "bg-blue-100"} rounded-full flex items-center justify-center`}>
                  <FiUsers className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
              </div>
              <div>
                <h3 className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{admin.name}</h3>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{admin.email}</p>
                <span className={`inline-block mt-1 px-2 py-1 text-xs font-semibold ${darkMode ? "text-blue-400 bg-blue-900" : "text-blue-600 bg-blue-100"} rounded-full`}>
                  {admin.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};