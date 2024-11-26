import { FiEdit, FiTrash2 } from "react-icons/fi";

export const ClientTypesGrid = ({darkMode}) => {
    const clientTypes = [
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

    return(
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
          {clientTypes.map((type) => (
            <div
              key={type.id}
              className={`flex items-center justify-between p-4 border rounded-lg ${darkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <div>
                <h4 className={`text-md font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{type.name}</h4>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{type.description}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                onClick={() => handleModalOpen("edit")}
                className={`p-2 ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"}`}>
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
    )
}