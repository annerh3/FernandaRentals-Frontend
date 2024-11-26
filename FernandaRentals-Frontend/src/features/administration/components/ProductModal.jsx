import { useEffect, useRef, useState } from "react";
import { useCategoryProduct } from "../../Website/hooks/data/useCategoryProduct";
import { productInitialValues, ProductValidationSchema } from "../forms/products.data";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { mirage } from "ldrs";
import "react-toastify/dist/ReactToastify.css";
import { webApi } from "../../../config/api/WebApi";
import {
  createProduct,
  deleteProduct,
} from "../../../shared/actions/products/products";

export const ProductModal = ({
  darkMode,
  modalType,
  selectedProduct,
  setShowModal,
  handleModalClose,
}) => {
  const modalRef = useRef(null);
  const { categoriesProd, loadCategoriesProd, isLoading } =
    useCategoryProduct();
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  // const { editProduct, newProductData} = useProducts();
  useEffect(() => {
    mirage.register(); // Para segurar que se registre al montar el componente
  }, []);
  
  const editProduct = async (id, updatedData) => {
    try {
      const {data} = await webApi.put(`/products/${id}`, updatedData);
      return data; // Asegúrate de devolver solo los datos necesarios
    } catch (error) {
      console.error("Error en editProduct:", error);
      throw error; // Esto asegura que el error se propague hacia arriba
    }
  };

  const handleDeleteProduct = async () => {
    console.log(selectedProduct.id);
    setLoading(true);
    try {
      const result = await deleteProduct(selectedProduct.id);
      console.log("Response:", result);  
      toast[result?.status ? "success" : "error"](
        result?.message || "Hubo un error al procesar la solicitud.",
        {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      setFetchingProducts(true);
    } catch (e) {
     if(!result?.status){
      toast.warning("Sin conexión al servidor", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
     }
    } finally {
      setLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 3000)); 
      handleModalClose()
      setShowModal(false)
    }
  };
  // Configura valores iniciales para Formik
  const formik = useFormik({
    initialValues: productInitialValues(selectedProduct),
    validationSchema: ProductValidationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      // Procesar el envío del formulario aquí
      // console.log(values);
      // console.log(selectedProduct.id);

      setLoading(true);
      try {
        let result;

        if (selectedProduct == null) {
          console.log("dentro if: ", selectedProduct);
          result = await createProduct(values); // de actions
        } else {
          result = await editProduct(selectedProduct.id, values);
        }
        console.log("Response:", result);

        toast[result?.status ? "success" : "error"](
          result?.message || "Hubo un error al procesar la solicitud.",
          {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } catch (e) {
        toast.warning("Sin conexión al servidor", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setLoading(false);
        handleModalClose()
        await new Promise((resolve) => setTimeout(resolve, 3000)); 
        setShowModal(false)
      }
    },
  });

  useEffect(() => {
    if (fetching) {
      loadCategoriesProd();
      setFetching(false);
      console.log(selectedProduct);
    }
  }, [fetching]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal]);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className={`${
          darkMode ? "bg-siidni-darkLight text-white" : "bg-white text-black"
        } p-8 rounded-xl w-full max-w-md`}
        id={selectedProduct}
      >
        <ToastContainer
          position="top-center"
          autoClose={1300}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <h2 className="text-xl font-bold mb-4">
          {modalType === "create"
            ? "Añadir Nuevo Producto"
            : modalType === "edit"
            ? "Editar Producto"
            : "Eliminar Producto"}
        </h2>

        {modalType !== "delete" ? (
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block mb-1">Nombre de Producto</label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full p-2 border rounded-lg"
                value={formik.values.name} // Usar value en lugar de defaultValue
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="flex justify-between">
              <span>
                <label className="block mb-1">Precio</label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  step="0.01"
                  className="w-20 p-2 border rounded-lg"
                  value={formik.values.cost} // Usar value en lugar de defaultValue
                  {...formik.getFieldProps("cost")}
                />
                {formik.touched.cost && formik.errors.cost ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.cost}
                  </div>
                ) : null}
              </span>
              <span>
                <label className="block mb-1">Categoría de Producto</label>
                <select
                  name="categoryId"
                  id="categoryId"
                  className={`${
                    darkMode
                      ? "bg-siidni-darkLight border text-white"
                      : "bg-white text-black"
                  } w-full h-11 rounded-lg p-2 cursor-pointer`}
                  value={formik.values.categoryId} // Usar value en lugar de defaultValue
                  {...formik.getFieldProps("categoryId")}
                >
                  <option value="default">Seleccione categoría</option>
                  {isLoading ? (
                    <option disabled>Cargando categorías...</option>
                  ) : categoriesProd?.data?.length ? (
                    categoriesProd.data.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No hay categorías disponibles</option>
                  )}
                </select>
                {formik.touched.categoryId && formik.errors.categoryId ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.categoryId}
                  </div>
                ) : null}
              </span>
            </div>
            <div>
              <label className="block mb-1">Descripción</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                value={formik.values.description} // Usar value en lugar de defaultValue
                {...formik.getFieldProps("description")}
              />
            </div>
            <div>
              <label className="block mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                id="stock"
                className="w-full p-2 border rounded-lg"
                value={formik.values.stock} // Usar value en lugar de defaultValue
                {...formik.getFieldProps("stock")}
              />
              {formik.touched.stock && formik.errors.stock ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.stock}
                </div>
              ) : null}
            </div>
            <div>
              <label className="block mb-1">Imagen URL</label>
              <input
                type="text"
                id="urlImage"
                name="urlImage"
                className="w-full p-2 border rounded-lg"
                value={formik.values.urlImage} // Usar value en lugar de defaultValue
                {...formik.getFieldProps("urlImage")}
              />
              {formik.touched.urlImage && formik.errors.urlImage ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.urlImage}
                </div>
              ) : null}
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? "bg-gray-600" : "bg-gray-200"
                }`}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg ${
                  modalType === "delete" ? "bg-red-600" : "bg-blue-600"
                } text-white`}
                disabled={!formik.isValid || formik.isSubmitting} // Deshabilitar si el formulario tiene errores o se está enviando
              >
                {formik.isSubmitting ? (
                  <span className="flex justify-center">
                    <l-mirage size="80" speed="2.5" color="#ffffff"></l-mirage>
                  </span>
                ) : modalType === "create" ? (
                  "Crear"
                ) : modalType === "edit" ? (
                  "Guardar Cambios"
                ) : (
                  "Eliminar"
                )}
              </button>
            </div>
          </form>
        ) : (
          <p>
            ¿Estás seguro de eliminar este producto? Esta acción no tiene vuelta
            atrás.
          </p>
        )}

        {modalType === "delete" ? (
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowModal(false)}
              className={`px-4 py-2 rounded-lg ${
                darkMode ? "bg-gray-600" : "bg-gray-200"
              }`}
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteProduct}
              className={`px-4 py-2 rounded-lg ${
                modalType === "delete" ? "bg-red-600" : "bg-blue-600"
              } text-white`}
            >
              {loading
              ?(
                <span className="flex justify-center">
                    <l-mirage size="80" speed="2.5" color="#ffffff"></l-mirage>
                  </span>
              )
            :(

              modalType === "delete" ? "Eliminar" : ""
            )}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
