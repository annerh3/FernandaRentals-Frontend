import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { AdminPagination, ProductModal, ProductsGrid, Productskeleton } from "../components";
import { useFormik } from "formik";
import { paginationInitValues } from "../../../shared/forms/search-data";
import { useProducts } from "../../Website/hooks/data";

export const ProductsPage = ({ darkMode }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "edit", "delete", "create"
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products, loadProducts, isLoading } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchingProducts, setFetchingProducts] = useState(true);

  const handleModalOpen = (type, product = null) => {
    setModalType(type);
    setSelectedProduct(product);
    setShowModal(true);
    
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFetchingProducts(true); // actualizar lista de productos
  };

  useEffect(() => {
    if (fetchingProducts) {
      loadProducts(formik.values.searchTerm, currentPage);
      setFetchingProducts(false);
    }
  }, [fetchingProducts]);

  const handlePreviousPage = () => {
    if (products.data.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
      setFetchingProducts(true);
    }
  };

  const handleNextPage = () => {
    if (products.data.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      setFetchingProducts(true);
    }
  };

  const handleCurrentPage = (index = 1) => {
    setCurrentPage(index);
    setFetchingProducts(true);
  };

  const formik = useFormik({
    initialValues: paginationInitValues,
    onSubmit: async () => {
      setFetchingProducts(true);
    },
  });

  // Agregar el listener de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePreviousPage();
      } else if (e.key === "ArrowRight") {
        handleNextPage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [products]);

 
  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-siidni-dark text-white" : "bg-gray-200 text-gray-900"
      }`}
    >
      <div className="flex">
        {/* Main Content */}
        <main className="ml-20 sm:ml-30 md:ml-60 flex-1 p-8 container">
        <div className="flex flex-wrap justify-between items-center mb-8">
  <div className="flex flex-wrap gap-2 items-start sm:items-center">
    <h1 className="text-3xl font-bold w-full sm:w-auto">Productos</h1>
    <form
      onSubmit={formik.handleSubmit}
      className="flex items-center w-full sm:w-64 rounded-lg mb-2 sm:mb-0"
    >
      <input
        type="text"
        id="searchTerm"
        name="searchTerm"
        placeholder="Busca productos..."
        value={formik.values.searchTerm}
        onChange={formik.handleChange}
        className={`px-4 py-2 border rounded-lg w-full ${darkMode ? "bg-siidni-darkLight" : "bg-white"}`}
      />
      <button
        type="submit"
        className="mt-2 sm:mt-0 sm:ml-2 px-4 py-2 bg-yellow-200 hover:bg-yellow-300 text-black rounded-lg shadow-lg"
      >
        <Search className="mx-3" />
      </button>
    </form>
  </div>

  <div className="flex sm:ml-2 mr-5 ">
    <button
      onClick={() => handleModalOpen("create")}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
        darkMode ? "bg-blue-600" : "bg-blue-500"
      } text-white transition-transform hover:scale-105 mr-8`}
    >
      <FiPlus />
      <span>Nuevo Producto</span>
    </button>
  </div>
</div>


          {/* products Grid */}
          {
            isLoading
            ?(
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                {[...Array(8)].map((_, index) => <Productskeleton key={index} darkMode={darkMode} />)}
              </div>
            )
            :(
              <ProductsGrid products={products}  darkMode={darkMode} handleModalOpen={handleModalOpen}  />
            )
          }
          {/* Inicio de Paginación */}
          <div className="mt-8 flex justify-center">
            <div>
              <AdminPagination
                totalPages={products?.data?.totalPages}
                hasNextPage={products?.data?.hasNextPage}
                hasPreviousPage={products?.data?.hasPreviousPage}
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                setCurrentPage={setCurrentPage}
                handleCurrentPage={handleCurrentPage}
                darkMode={darkMode}
              />
            </div>
          </div>
          {/* Fin de Paginación */}
        </main>
      </div>
      {/* Modal */}
      {showModal && (
        <ProductModal
          darkMode={darkMode}
          modalType={modalType}
          selectedProduct={selectedProduct}
          setShowModal={setShowModal} 
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};