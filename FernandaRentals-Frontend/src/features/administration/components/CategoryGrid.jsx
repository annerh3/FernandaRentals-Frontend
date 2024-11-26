import { FiEdit, FiTrash2 } from "react-icons/fi";
import { DataNotFound } from "./DataNotFound";
export const CategoryGrid = ({ categoriesProd, darkMode, handleModalOpen }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categoriesProd?.data?.length ? (
        categoriesProd?.data?.map((category) => (
          <div
            key={category.id}
            className={`${
              darkMode ? "bg-siidni-darkLight" : "bg-white"
            } p-6 rounded-xl shadow-md transition-transform hover:scale-105`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{category.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleModalOpen("edit", category)}
                  className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleModalOpen("delete", category)}
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <p className="text-sm opacity-70">{category.description}</p>
          </div>
        ))
      ) : (
        <DataNotFound message={"No se encontraron las categorías"} darkMode={darkMode} />
      )}
    </div>
  );
};

export const CategoryProductSkeleton = ({ darkMode }) => {
  return (
    <div
      className={`${
        darkMode ? "bg-siidni-darkLight" : "bg-white"
      } p-6 rounded-xl shadow-md transition-transform hover:scale-105 animate-pulse`}
    >
      <div className="flex-1 space-y-4">
        <div className="flex justify-between">
          <div
            className={`h-6 ${
              darkMode ? "bg-gray-700" : "bg-gray-400"
            } rounded w-3/5`}
          ></div>
          <div className="flex space-x-2">
            <span
              className={`h-8 w-8 ${
                darkMode ? "bg-gray-700" : "bg-gray-400"
              } rounded`}
            ></span>
            <span
              className={`h-8 w-8 ${
                darkMode ? "bg-gray-700" : "bg-gray-400"
              } rounded`}
            ></span>
          </div>
        </div>

        <div
          className={`h-4 ${
            darkMode ? "bg-gray-700" : "bg-gray-400"
          } rounded w-5/6`}
        ></div>
        <div
          className={`h-4 ${
            darkMode ? "bg-gray-700" : "bg-gray-400"
          } rounded w-1/3`}
        ></div>
      </div>
    </div>
  );
};
