import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  clientTypeInitialValues,
  clientTypeValidationSchema,
} from "../../forms";
import { mirage } from "ldrs";
import { useFetchStore } from "../../store/useFetchStore";
import { createClientType, updateClientType } from "../../../../shared/actions/clientTypes/clientTypes";
import { toastAutoClose } from "../../../../shared/constants/variousConstants";

export const ClientTypeModal = ({
  darkMode,
  modalType,
  selectedItem,
  setShowModal,
  handleModalClose,
}) => 
  {
  const modalRef = useRef(null);
  const setFetch = useFetchStore((state) => state.setFetch);
  const [loading, setLoading] = useState(false);
  
  const formik = useFormik({
    initialValues: clientTypeInitialValues(selectedItem),
    validationSchema: clientTypeValidationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {

      const formatedObject = { ...values, discount: values.discount / 100 };
      console.log(formatedObject);
      console.log("clientTypeId",selectedItem);

      setLoading(true);
      try {
        let result;
        if (!selectedItem) {
           console.log("dentro if: ", selectedItem);
          result = await createClientType(formatedObject); 
        } else {
          result = await updateClientType(selectedItem.id, formatedObject);
        }
        console.log("Response:", result);

        toast[result?.status ? "success" : "error"](
          result?.message || "Hubo un error al procesar la solicitud.",
          {
            position: "top-center",
            autoClose: toastAutoClose,
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
          autoClose: toastAutoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setLoading(false);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        handleModalClose()
        setFetch(true);
       setShowModal(false);
    }
  },
});

  useEffect(() => {
    mirage.register();
  }, []);

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
        id={selectedItem}
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
            ? "Crear Nuevo Tipo de Cliente"
            : modalType === "edit"
            ? "Editar Tipo de Cliente"
            : "Eliminar Tipo de Cliente"}
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className={`${
            darkMode ? "bg-siidni-darkLight text-white" : "bg-white text-black"
          } p-6 rounded-lg shadow`}
        >
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={formik.handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  darkMode
                    ? "bg-siidni-darkLight text-white border-gray-600"
                    : "border-gray-300"
                }`}
                value={formik.values.name}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="typeDescription"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Descripcion
              </label>
              <textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                rows="4"
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  darkMode
                    ? "bg-siidni-darkLight text-white border-gray-600"
                    : "border-gray-300"
                }`}
                value={formik.values.description}
                {...formik.getFieldProps("description")}
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>
            {formik.values.name !== "Normal" && (
              <div>
                <label
                  htmlFor="typeDescription"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Descuento (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode
                      ? "bg-siidni-darkLight text-white border-gray-600"
                      : "border-gray-300"
                  }`}        
                  onChange={formik.handleChange}  
                  value={Math.round(formik.values.discount || 0)}
                />
                {formik.touched.discount && formik.errors.discount && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.discount}
                  </div>
                )}
              </div>
            )}

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
                {formik.isSubmitting && loading ? (
                  <span className="flex justify-center">
                    <l-mirage size="80" speed="2.5" color="#ffffff"></l-mirage>
                  </span>
                ) : modalType === "create" ? (
                  "Crear"
                ) : (
                  "Guardar Cambios"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
