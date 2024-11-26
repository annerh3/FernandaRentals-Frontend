import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { CategoryGrid, CategoryModal, CategoryProductSkeleton } from "../components";
import { useCategoryProduct } from "../../Website/hooks/data/useCategoryProduct";

export const CategoryProductPage = ({ darkMode }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { categoriesProd, loadCategoriesProd, isLoading } = useCategoryProduct();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      loadCategoriesProd();
      setFetching(false);
      // console.log(selectedProduct);
    }
  }, [fetching]);

  const handleModalOpen = (type, category = null) => {
    setModalType(type);
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFetching(true); // actualizar lista de categorias
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-siidni-dark text-white" : "bg-gray-200 text-gray-900"
      }`}
    >
      <div className="flex">
        {/* Main Content */}
        <main className="ml-20 sm:ml-30 md:ml-60 flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Categorías de Productos</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => handleModalOpen("create")}
                className={`mr-8 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  darkMode ? "bg-blue-600" : "bg-blue-500"
                } text-white transition-transform hover:scale-105`}
              >
                <FiPlus />
                <span>Nueva Categoría</span>
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(8)].map((_, index) => <CategoryProductSkeleton key={index} darkMode={darkMode} />)}
            </div>
          ) : (
            <CategoryGrid
              categoriesProd={categoriesProd}
              darkMode={darkMode}
              handleModalOpen={handleModalOpen}
             
            />
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <CategoryModal
          darkMode={darkMode}
          modalType={modalType}
          selectedCategory={selectedCategory}
          setShowModal={setShowModal}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};

