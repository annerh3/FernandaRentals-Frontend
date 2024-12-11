import { useFormik } from "formik";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { BsCartDash, BsCartX } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "react-use-cart";
import {
  basicValidationSchema,
  checkProductsInitvalues,
  checkProductsValidationSchema,
} from "../forms/checkProductsAreAvaible.data";
import { isObjectEmpty } from "../../../shared/utils";
import { validateProducts } from "../../../shared/actions/products/products";

import "react-toastify/dist/ReactToastify.css";
import { useProductsValidation } from "../store/useProductsValidation";
import { Link, useNavigate } from "react-router-dom";
import { useEventsData } from "../store/useEventsData";
import { useEventEditStore } from "../store";
import { useAuthStore } from "../../security/store";


export const ShoppingCart = ({ toggleCart, isCartOpen }) => {
  const [loading, setLoading] = useState(false);
  const setShowModal = useProductsValidation((state) => state.setShowModal);

  const { eventDataToEdit } = useEventEditStore();


  const setData = useProductsValidation((state) => state.setData);
  const isAuthenicated = useAuthStore((state) => state.isAuthenticated);

  const setSuccess = useProductsValidation((state) => state.setSuccess);
  const success = useProductsValidation((state) => state.success);

  const navigate = useNavigate();

  const {
    setEventStartDate,
    setEventEndDate,
    setEventProducts,
    resetEventData,
  } = useEventsData();

  const {
    cartTotal,
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();


  const { eventData } = useEventsData();

  useEffect(() => {
    console.log("useEventData", eventData);
  }, [eventData]);

  const isEditMode = eventDataToEdit.id && eventDataToEdit.id.trim() !== '';
  const itStartedShopping = eventData.startDate && eventData.startDate.trim() !== '';

  // Manejador personalizado para agregar los productos
  const handleAddProducts = (e) => {
    e.preventDefault();
    const formatedProducts = items.map((product) => ({
      productId: product.id,
      quantity: product.quantity || 1,
    }));

    // Actualizar `products` en los valores de Formik
    formik.setFieldValue("products", formatedProducts).then(() => {
      console.log("Productos actualizados en values:", formik.values.products);
      formik.handleSubmit(); // Llamar al envío después de la actualización
    });
  };

  const handleEmptyCart = () => {
    resetEventData();
    emptyCart();
    formik.resetForm();
  };
  
  // useEffect(() => {
  //   if (eventDataToEdit) {
  //     formik.setValues({
  //       eventStartDate: eventDataToEdit.startDate || checkProductsInitvalues.eventStartDate,
  //       eventEndDate: eventDataToEdit.endDate || checkProductsInitvalues.eventEndDate,
  //       products: eventDataToEdit.products || checkProductsInitvalues.products,
  //     });
  //   }
  // }, [eventDataToEdit]);
 

  const formik = useFormik({
    initialValues: checkProductsInitvalues,
    enableReinitialize: true, 
    validationSchema: isEditMode ? basicValidationSchema : checkProductsValidationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log("formikValues: ",values);
      
      setEventStartDate(values.eventStartDate);
      setEventEndDate(values.eventEndDate);
      setEventProducts(values.products);

      setShowModal(true);
      if(!isAuthenicated){
        return navigate("/security/login");
      }
      
      try {
        const result = await validateProducts(values);
        console.log("Response from server:", result);

        console.log("carrito", success);
        setData(result);
        setShowModal(true);
      } catch (error) {
        // howToast("warning", "Sin conexión al servidor");
      } finally {
        setLoading(false);
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (success && !isEditMode && !itStartedShopping) {
      setSuccess(false);
      navigate("/reservation");
      toggleCart(); // Cerrar el carrito al navegar
    }
  }, [success]);
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
              <div className="grid mt-4 justify-center space-y-2">
                <span className="text-center text-gray-400">Tu carrito está vacío</span>
                <Link
                  to="/products"
                  onClick={toggleCart}
                  className=" items-center justify-center w-44 text-center rounded-md bg-siidni-goldDark px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-transform transform hover:translate-y-1 hover:border-transparent cursor-pointer hover:bg-[#a96b2e]"
                >
                  Ver Productos
                </Link>
              </div>
            </>
          ) : (
            // text-red-500 hover:text-red-900  bg-red-200 hover:bg-red-300
            <>
              {/* Botón para crear evento */}
              <form className="space-y-2" onSubmit={handleAddProducts}>
                <span className="flex justify-between">
                  <h3 className="text-2xl flex justify-center  font-bold">
                    Carrito
                  </h3>
                  <BsCartX
                    onClick={handleEmptyCart}
                    title="Vaciar Carrito"
                    size={35}
                    className="text-red-500 hover:text-red-900  bg-red-200 hover:bg-red-300 rounded-md cursor-pointer "
                  />
                </span>
                <div className="grid grid-flow-row lg:grid-flow-col gap-3 mt-4 py-2">
                  <div className="grid grid-flow-col gap-3">
                    <div className="sm:col-span-4 justify-center">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="eventStartDate"
                      >
                        Fecha de Inicio
                      </label>
                      <input
                        type="date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md"
                        id="eventStartDate"
                        name="eventStartDate"
                        value={formik.values.eventStartDate}  
                        onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                      />
                      {formik.touched.eventStartDate &&
                        formik.errors.eventStartDate && (
                          <div className="text-red-600 text-xs my-1">
                            {formik.errors.eventStartDate }
                          </div>
                        )}
                    </div>
                    <div className="sm:col-span-4 justify-center">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="enddate"
                      >
                        Fecha de Finalización
                      </label>
                      <input
                        type="date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md"
                        id="eventEndDate"
                        name="eventEndDate"
                        value={formik.values.eventEndDate}  
                        onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                      />
                      {formik.touched.eventEndDate &&
                        formik.errors.eventEndDate && (
                          <div className="text-red-600 text-xs my-1">
                            {formik.errors.eventEndDate}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <span className="flex justify-end gap-2 items-center py-3">
                  <h2 className="text-lg font-semibold">
                    Sub-Total: L {cartTotal}
                  </h2>

                  <button
                    className={`transition duration-200 py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block w-2/5 
                ${
                  !isObjectEmpty(formik.errors)
                    ? "cursor-not-allowed bg-gray-300 text-black"
                    : "bg-siidni-gold text-white hover:bg-siidni-goldLight focus:bg-unah-blueLight"
                }
                `}
                    type="submit"
                    disabled={!isObjectEmpty(formik.errors)}
                  >
                    Ver disponibilidad
                  </button>
                </span>
              </form>
              <hr />

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
