import { useCart } from "react-use-cart";
import { ProductGridItem } from "./ProductGridItem";

export const ProductGrid = ({ products, isLoading, onProductSelect }) => {
  const { addItem } = useCart();
    const handleDoubleClick = (product) => {
      addItem(product);
    };
  
    return (
      <div className="border rounded w-full shadow-md mb-4 mt-4 px-4 py-2 max-h-80 overflow-y-auto">
        {isLoading ? (
          <p className="text-gray-500">Cargando productos...</p> 
        ) : (
          <>
            {products?.data?.items?.length ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  </tr>
                </thead>
                <ProductGridItem products={products.data.items} handleDoubleClick={handleDoubleClick} />
              </table>
            ) : (
              <section className="">
                <span className="flex text-gray-500 justify-center mb-3">
                  <img src="https://i.postimg.cc/15KZsqSC/notfound.jpg" alt="404-Not-Found" className="w-80 rounded-md z-0" />
                </span>
                <span className="flex text-gray-500 justify-center mb-3">Nel, rey. Dele pa' fuera</span>
                </section> 
               
            )}
          </>
        )}
      </div>
    );
  };
  