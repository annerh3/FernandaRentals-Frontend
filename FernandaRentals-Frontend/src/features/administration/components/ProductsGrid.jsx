import { ScrollText } from "lucide-react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  MdOutlineCategory,
  MdOutlineInventory2,
  MdOutlinePriceChange,
} from "react-icons/md";
import ModalImage from "react-modal-image";
import { DataNotFound } from "./DataNotFound";

export const ProductsGrid = ({ products, darkMode, handleModalOpen }) => {
  return (
    <>
      {products?.data?.items?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {products.data.items.map((product) => (
            <div
              key={product.id}
              className={`${
                darkMode ? "bg-siidni-darkLight" : "bg-white"
              } p-6 rounded-xl shadow-md flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4`}
            >
              {/* Imagen del producto */}
              <ModalImage
                small={product.urlImage}
                large={product.urlImage}
                alt={product.description}
                width={128}
                height={128}
                className="w-full sm:w-32 sm:h-32 rounded-lg object-cover shadow-2xl transition-transform hover:scale-105"
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
              />

              {/* Detalles del producto */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl sm:text-xl font-bold">
                    {product.name}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleModalOpen("edit", product)}
                      className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleModalOpen("delete", product)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-xl flex gap-2 items-center">
                  <MdOutlineInventory2 /> Stock: {product.stock}
                </p>
                <p className="text-lg mt-2 flex gap-2 items-center">
                  <MdOutlinePriceChange /> ${product.cost}
                </p>
                <p className="text-sm sm:text-base opacity-70 mt-2 flex gap-2 items-center">
                  <MdOutlineCategory /> {product.category.name}
                </p>
                <p className="text-sm sm:text-base opacity-70 mt-2 flex gap-2 items-center">
                  <ScrollText size={15} /> {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DataNotFound
          message={"No se encontraron los productos"}
          darkMode={darkMode}
        />
      )}
    </>
  );
};

export const Productskeleton = ({ darkMode }) => {
  return (
    <div
      className={`${
        darkMode ? "bg-siidni-darkLight" : "bg-white"
      } p-6 rounded-xl shadow-md flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-pulse`}
    >
      {/* Skeleton para imagen */}
      <div className="w-full sm:w-32 sm:h-32 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>

      {/* Skeleton para detalles */}
      <div className="flex-1 space-y-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  );
};
