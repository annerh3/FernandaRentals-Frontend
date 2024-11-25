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
    setFetchingProducts(true); // Activar el refresco
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

  // const proDucts = {
  //   data: {
  //     hasNextPage: true,
  //     hasPreviousPage: false,
  //     currentPage: 1,
  //     pageSize: 4,
  //     totalItems: 33,
  //     totalPages: 9,
  //     items: [
  //       {
  //         id: "ed94b902-dc8b-4f40-9c4f-8cf5f00c35a4",
  //         name: "Candelabro de Cristal",
  //         description: "Candelabro de cristal con detalles dorados.",
  //         urlImage: "https://i.postimg.cc/zG8FFyQW/Candelabro-de-Cristal.jpg",
  //         category: {
  //           id: "ecd0a6b2-b849-4b34-9602-125524a4e931",
  //           name: "Decoración",
  //           description: "Categoría para decoración de eventos y espacios.",
  //         },
  //         stock: 20,
  //         cost: 35,
  //       },
  //       {
  //         id: "f5e99eb9-4353-49f2-a2db-57c9982eaff8",
  //         name: "Carpa Transparente",
  //         description:
  //           "Carpa transparente para eventos nocturnos al aire libre.",
  //         urlImage: "https://i.postimg.cc/HxcwkXJG/Carpa-Transparente.png",
  //         category: {
  //           id: "1e011229-5619-436d-b405-39e18889a6d8",
  //           name: "Carpas y Toldos",
  //           description:
  //             "Categoría para carpas y toldos para eventos al aire libre.",
  //         },
  //         stock: 5,
  //         cost: 200,
  //       },
  //       {
  //         id: "d01c78d4-3e7d-4d4d-bfee-749d5f78d66f",
  //         name: "Carpa Verde Militar",
  //         description: "Carpa verde de estilo militar para eventos rústicos.",
  //         urlImage: "https://i.postimg.cc/Qdmk4XLz/Carpa-Verde-Militar.jpg",
  //         category: {
  //           id: "1e011229-5619-436d-b405-39e18889a6d8",
  //           name: "Carpas y Toldos",
  //           description:
  //             "Categoría para carpas y toldos para eventos al aire libre.",
  //         },
  //         stock: 6,
  //         cost: 180,
  //       },
  //       {
  //         id: "edbf7a6f-7d65-4708-89fc-18c61ed2a452",
  //         name: "Centro de Mesa con Velas",
  //         description: "Centro de mesa decorativo con velas perfumadas.",
  //         urlImage:
  //           "https://i.postimg.cc/Bvv5Rd4n/Centro-de-Mesa-con-Velas.jpg",
  //         category: {
  //           id: "ecd0a6b2-b849-4b34-9602-125524a4e931",
  //           name: "Decoración",
  //           description: "Categoría para decoración de eventos y espacios.",
  //         },
  //         stock: 40,
  //         cost: 22,
  //       },
  //     ],
  //   },
  //   message: "Listado de Productos Obtenida Correctamente",
  //   status: true,
  // };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-siidni-dark text-white" : "bg-gray-200 text-gray-900"
      }`}
    >
      <div className="flex">
        {/* Main Content */}
        <main className="ml-20 sm:ml-64  flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
              <h1 className="text-3xl font-bold">Productos</h1>
              <form onSubmit={formik.handleSubmit} className="flex items-center w-full sm:w-64 rounded-lg mb-2 sm:mb-0">
                  <input
                    type="text"
                    id="searchTerm"
                    name="searchTerm"
                    placeholder="Busca productos..."
                    value={formik.values.searchTerm}
                    onChange={formik.handleChange}
                    className="px-4 py-2 border rounded-lg w-full ml-3"
                  />
                <button
                  type="submit"
                  className="mt-2 sm:mt-0 sm:ml-2 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-black rounded-lg shadow-lg"
                >
                  <Search className="mx-3" />
                </button>
              </form>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => handleModalOpen("create")}
                className={`mr-8 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  darkMode ? "bg-blue-600" : "bg-blue-500"
                } text-white`}
              >
                <FiPlus />
                <span>New Product</span>
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

    
  