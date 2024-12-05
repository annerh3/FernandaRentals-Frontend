import { ShoppingCartIcon } from "lucide-react";
import { BsCartDash, BsCartX } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

export const ShoppingCart = ({ toggleCart, isCartOpen }) => {
  const {
    cartTotal,
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  return (
    <>
      {/* Ícono del carrito */}
      <div className="relative cursor-pointer " onClick={toggleCart}>
        {totalUniqueItems > 0 && (
          <div className="absolute top-0 right-0 bg-red-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {totalUniqueItems}
          </div>
        )}

        <ShoppingCartIcon size={30} className="text-white" />
      </div>

      {/* Contenido del carrito */}
      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-[450px] bg-white rounded-lg p-4 z-50 max-h-96 overflow-y-auto shadow-sm shadow-black">
          {isEmpty ? (
            <>
              <h3 className="text-lg font-semibol flex justify-center font-bold">
                Carrito
              </h3>
              <div className="text-center text-gray-500 mt-4">
                Tu carrito está vacío
              </div>
            </>
          ) : (
            // text-red-500 hover:text-red-900  bg-red-200 hover:bg-red-300
            <>
              {/* Botón para crear evento */}
              <section className="space-y-2">
                <span className="flex justify-between">
                  <h3 className="text-2xl flex justify-center  font-bold">
                    Carrito
                  </h3>
                  <h2 className="text-xl">Cotización: L {cartTotal}</h2>
                </span>
                <span className="flex justify-between">
                  <BsCartX
                  onClick={() => emptyCart()}
                    title="Vaciar Carrito"
                    size={35}
                    className="text-red-500 p-1 hover:text-red-900  bg-red-200 hover:bg-red-300 rounded-md cursor-pointer min-w-fit min-h-fit"
                  />
              <Link to="reservation" onClick={toggleCart} className="w-1/3 bg-siidni-gold text-white font-bold py-2 rounded-lg hover:bg-siidni-goldDark focus:outline-none flex justify-center">
                Continuar...
              </Link>
                </span>
              </section>

              {/* Productos en el carrito */}
              {items.map((product) => (
                <div
                  className="flex items-center p-3 bg-white hover:bg-gray-100  border-b border-gray-100"
                  key={product.id}
                >
                  {/* Imagen del producto */}
                  <div className="w-16 h-16 mr-3">
                    <img
                      src={product.urlImage}
                      alt="img product"
                      className="w-full h-full object-cover rounded-sm shadow-sm shadow-black"
                    />
                  </div>
                  {/* Detalles del producto */}
                  <div className="flex-1 text-sm">
                    <div className="font-bold text-lg text-gray-800">
                      {product.name}
                    </div>
                    <div className="text-gray-500 text-lg mb-2">
                      Cantidad: {product.quantity}
                    </div>
                    <div className=" space-x-2">
                      <button
                        className=""
                        onClick={() =>
                          updateItemQuantity(
                            product.id,
                            (product.quantity ?? 0) - 1
                          )
                        }
                      >
                        <FaMinus className="bg-gray-200 p-1 text-xl text-gray-400 hover:bg-yellow-400 rounded-sm" />
                      </button>
                      <button
                        onClick={() =>
                          updateItemQuantity(
                            product.id,
                            (product.quantity ?? 0) + 1
                          )
                        }
                      >
                        <FaPlus className="bg-gray-200 p-1 text-xl text-gray-400 hover:bg-green-300 rounded-sm" />
                      </button>
                    </div>
                  </div>
                  {/* Precio y eliminar */}
                  <div className="flex flex-col items-end ml-4">
                    <div className="text-lg font-medium text-gray-900">
                      L {product.price}
                    </div>
                    <div
                    title="Quitar del carrito"
                      onClick={() => removeItem(product.id)}
                      className="mt-2 w-6 h-6 flex items-center justify-center bg-yellow-200 hover:bg-yellow-300  rounded-full cursor-pointer"
                    >
                      <BsCartDash size={20} className="text-yellow-800" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};
