import { generateId } from "../../../shared/utils";

export const AdminPagination = ({
  totalPages,
  handlePreviousPage = () => {},
  hasPreviousPage,
  handleCurrentPage,
  currentPage,
  handleNextPage = () => {},
  hasNextPage,
  darkMode,
}) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={!hasPreviousPage}
        className={`px-4 py-2 rounded-lg font-medium shadow-md transition-transform hover:scale-105 ${
          !hasPreviousPage
            ? "bg-gray-400 text-white cursor-not-allowed"
            : darkMode
            ? "bg-siidni-darkLight text-white hover:bg-gray-600"
            : "bg-cyan-800 text-white hover:bg-cyan-700"
        }`}
      >
        Anterior
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={generateId()}
          onClick={() => handleCurrentPage(index + 1)}
          className={`px-4 py-2 rounded-lg font-medium shadow-md transition-transform hover:scale-105 ${
            currentPage === index + 1
              ? darkMode
                ? "bg-gray-700 text-white shadow-white"
                : "bg-cyan-800 text-white shadow-cyan-400"
              : darkMode
              ? "bg-siidni-darkLight text-gray-300 hover:bg-gray-600"
              : "bg-white text-gray-700 hover:bg-cyan-100"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={!hasNextPage}
        className={`px-4 py-2 rounded-lg font-medium shadow-md transition-transform hover:scale-105 ${
          !hasNextPage
            ? "bg-gray-400 text-white cursor-not-allowed"
            : darkMode
            ? "bg-siidni-darkLight text-white hover:bg-gray-600"
            : "bg-cyan-800 text-white hover:bg-cyan-700"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
};
