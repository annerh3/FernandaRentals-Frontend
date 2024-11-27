import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";

export const ClientTypeModal = ({
darkMode,
  modalType,
  selectedItem,
  setShowModal,
  handleModalClose
}) => {
    const modalRef = useRef(null);

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

        {modalType !== "delete" ? (
          <form
            className={`${
              darkMode
                ? "bg-siidni-darkLight text-white"
                : "bg-white text-black"
            } p-6 rounded-lg shadow`}
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="typeName"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="typeName"
                  className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "border-gray-300"
                  }`}
                  required
                />
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
                  id="typeDescription"
                  rows="3"
                  className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "border-gray-300"
                  }`}
                  required
                ></textarea>
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
                //   disabled={!formik.isValid || formik.isSubmitting} // Deshabilitar si el formulario tiene errores o se está enviando
                >
                  {/* {formik.isSubmitting ? (
                  <span className="flex justify-center">
                    <l-mirage size="80" speed="2.5" color="#ffffff"></l-mirage>
                  </span>
                ) : modalType === "create" ? (
                  "Crear"
                ) : modalType === "edit" ? (
                  "Guardar Cambios"
                ) : (
                  "Eliminar"
                )} */}
                </button>
              </div>
            </div>
          </form>
        ) : (
          ""
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
