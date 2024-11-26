import { useState } from "react";
import { FiUsers, FiUserPlus, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { BsBuilding, BsSun, BsMoon } from "react-icons/bs";

export const UsersPage = ({darkMode}) => {
  const [activeTab, setActiveTab] = useState("clients");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");



  const dummyClientUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      clientType: "Enterprise",
      eventCount: 45
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      clientType: "Small Business",
      eventCount: 23
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      clientType: "Corporate",
      eventCount: 67
    }
  ];

  const dummyAdminUsers = [
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

  const dummyClientTypes = [
    {
      id: 1,
      name: "Enterprise",
      description: "Large scale business clients"
    },
    {
      id: 2,
      name: "Small Business",
      description: "Small to medium business clients"
    }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedClientUsers = [...dummyClientUsers].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    return sortDirection === "asc"
      ? aVal > bVal ? 1 : -1
      : aVal < bVal ? 1 : -1;
  });

  const filteredAdminUsers = dummyAdminUsers.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ClientUsersList = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedClientUsers.map((user) => (
          <div key={user.id} className={`p-6 ${darkMode ? "bg-siidni-darkLight text-white" : "bg-white"} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${darkMode ? "bg-blue-900" : "bg-blue-100"} rounded-full flex items-center justify-center`}>
                  <FiUsers className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{user.name}</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className={`p-2 ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"} transition-colors duration-200`}>
                  <FiEdit className="w-5 h-5" />
                </button>
                <button className={`p-2 ${darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-800"} transition-colors duration-200`}>
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Client Type:</span>
                <span className={`px-3 py-1 text-sm font-medium ${darkMode ? "text-blue-400 bg-blue-900" : "text-blue-600 bg-blue-100"} rounded-full`}>
                  {user.clientType}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Total Events:</span>
                <span className={`px-3 py-1 text-sm font-medium ${darkMode ? "text-green-400 bg-green-900" : "text-green-600 bg-green-100"} rounded-full`}>
                  {user.eventCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AdminUsersList = () => (
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
        {filteredAdminUsers.map((admin) => (
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

  const ClientTypesManagement = () => (
    <div className="space-y-6">
      <form className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} mb-4`}>Add New Client Type</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="typeName" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Type Name
            </label>
            <input
              type="text"
              id="typeName"
              className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"}`}
              required
            />
          </div>
          <div>
            <label htmlFor="typeDescription" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Description
            </label>
            <textarea
              id="typeDescription"
              rows="3"
              className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"}`}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Client Type
          </button>
        </div>
      </form>

      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} mb-4`}>Existing Client Types</h3>
        <div className="space-y-4">
          {dummyClientTypes.map((type) => (
            <div
              key={type.id}
              className={`flex items-center justify-between p-4 border rounded-lg ${darkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <div>
                <h4 className={`text-md font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{type.name}</h4>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{type.description}</p>
              </div>
              <div className="flex space-x-2">
                <button className={`p-2 ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"}`}>
                  <FiEdit className="w-5 h-5" />
                </button>
                <button className={`p-2 ${darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-800"}`}>
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? "bg-siidni-dark" : "bg-gray-200"} p-4 sm:p-6 lg:p-8 `}>
      <div className="max-w-7xl mx-auto">
        
        <div className={`${darkMode ? "bg-[#262626]" : "bg-white"} rounded-lg shadow-lg overflow-hidden ml-20 sm:ml-30 mt-13 md:ml-60`}>
          <div className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <nav className="-mb-px flex" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("clients")}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "clients"
                    ? darkMode
                      ? "border-blue-400 text-blue-400"
                      : "border-blue-500 text-blue-600"
                    : darkMode
                    ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-current={activeTab === "clients" ? "page" : undefined}
              >
                <FiUsers className="w-5 h-5 inline-block mr-2" />
                Client Users
              </button>
              <button
                onClick={() => setActiveTab("admins")}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "admins"
                    ? darkMode
                      ? "border-blue-400 text-blue-400"
                      : "border-blue-500 text-blue-600"
                    : darkMode
                    ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-current={activeTab === "admins" ? "page" : undefined}
              >
                <FiUserPlus className="w-5 h-5 inline-block mr-2" />
                Admin Users
              </button>
              <button
                onClick={() => setActiveTab("types")}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "types"
                    ? darkMode
                      ? "border-blue-400 text-blue-400"
                      : "border-blue-500 text-blue-600"
                    : darkMode
                    ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-current={activeTab === "types" ? "page" : undefined}
              >
                <BsBuilding className="w-5 h-5 inline-block mr-2" />
                Client Types
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {activeTab === "clients" && <ClientUsersList />}
            {activeTab === "admins" && <AdminUsersList />}
            {activeTab === "types" && <ClientTypesManagement />}
          </div>
        </div>
      </div>
    </div>
  );
};

