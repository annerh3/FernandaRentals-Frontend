import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import {
  categoriesInitialValues,
  CategoriesValidationSchema,
} from "../forms/categories.data";
import { mirage } from "ldrs";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {
  createCategoryProduct,
  deleteCategoryProduct,
  updateCategoryProduct,
} from "../../../shared/actions/categoryProducts/categoryProduct";

export const CategoryModal = ({
  darkMode,
  modalType,
  selectedCategory,
  setShowModal,
  handleModalClose,
}) => {
  const modalRef = useRef(null);
  useEffect(() => {
    mirage.register();
  }, []);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: categoriesInitialValues(selectedCategory),
    validationSchema: CategoriesValidationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log("values", values);
      console.log(selectedCategory);

      try {
        let result;

        if (selectedCategory == null) {
          result = await createCategoryProduct(values);
        } else {
          result = await updateCategoryProduct({selectedCategory}.id, values);
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
        await new Promise((resolve) => setTimeout(resolve, 3000));
        handleModalClose();
        setShowModal(false);
      }
    },
  });

  const handleDeleteCategory = async () => {
    console.log(selectedCategory.id);
    setLoading(true);
    try {
      const result = await deleteCategoryProduct(selectedCategory.id);
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
    <div
      className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center`}
    >
      <div
        ref={modalRef}
        className={`${
          darkMode ? "bg-siidni-darkLight" : "bg-white"
        } p-8 rounded-xl w-full max-w-md`}
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
            ? "Crear Nueva Categoría de Producto"
            : modalType === "edit"
            ? "Editar Categoría de Productos"
            : "Eliminar Categoría de Productos"}
        </h2>

        {modalType !== "delete" ? (
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                id="id"
                className="w-full p-2 border rounded-lg"
                value={formik.values.name}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
            <div>
              <label className="block mb-1">Descripción</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                value={formik.values.description}
                {...formik.getFieldProps("description")}
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.description}
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
         <div className="space-y-1">
          <p>¿Estas seguro que quieres eliminar la categoría {selectedCategory.name}?</p>
          <p className="text-red-500"> Esta acción afectará a productos y eventos de manera permanente.</p>
         </div>
        )}

        {modalType === "delete" ? (
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowModal(false)}
              className={`px-4 py-2 rounded-lg  bg-blue-600 text-white`}
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteCategory}
              
              className={`px-4 py-2 rounded-lg ${
                darkMode ? "bg-gray-600" : "bg-gray-200"
              }`}
            >
              {loading ? (
                <span className="flex justify-center">
                  <l-mirage size="80" speed="2.5" color="#ffffff"></l-mirage>
                </span>
              ) : modalType === "delete" ? (
                "Eliminar"
              ) : (
                ""
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
