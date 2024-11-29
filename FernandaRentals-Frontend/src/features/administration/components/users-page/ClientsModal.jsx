import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { mirage } from "ldrs";
import { useClientType } from "../../hooks/useClientType";
import { clientInitialValues, ClientValidationSchema } from "../../forms";
import { toastAutoClose } from "../../../../shared/constants/variousConstants";
import { updateClientAsync } from "../../../../shared/actions/clients/clients.action";
import { useFetchStore } from "../../store/useFetchStore";

export const ClientsModal = ({
    darkMode,
    modalType,
    selectedItem,
    setShowModal,
    handleModalClose
  }) => {
    const modalRef = useRef(null);
    
    const { clientTypes, isLoading, loadClientTypes} = useClientType();
    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const setFetch = useFetchStore((state) => state.setFetch);
   
    useEffect(() => {
      mirage.register(); // Para segurar que se registre al montar el componente
    }, []);
    
    useEffect(() => {
      if (fetching) {
        loadClientTypes();
        setFetching(false);
      }
    }, [fetching]);


 
    const formik = useFormik({  
      initialValues: clientInitialValues(selectedItem), 
      validationSchema: ClientValidationSchema,
      validateOnChange: true,
      onSubmit: async (values) => {
        // Procesar el envío del formulario aquí
        console.log(values);
        console.log('clientId: ',selectedItem.clientId)
  
         setLoading(true);
         try {
          const result = await updateClientAsync(selectedItem.clientId, values);         
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
          handleModalClose();
          setFetch(true);
          setShowModal(false)
        }
      },
    
  });
  

  
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
            {modalType === "edit"
              ? "Editar Información Cliente"
              : "Eliminar Cliente?"}
          </h2>
  
          {modalType !== "delete" ? (
            <form className="" 
            onSubmit={formik.handleSubmit}
            >
              <div className="mb-4"> 
                <label className="block mb-1">Nombre de Cliente</label>
                <input
                  type="text"
                  name="clientName"
                  id="clientName"
                  className="w-full p-2 border rounded-lg"
                   value={formik.values.clientName} 
                  {...formik.getFieldProps("clientName")}
                />
                 {formik.touched.clientName && formik.errors.clientName ? (
                  <div className="text-red-500 text-sm">{formik.errors.clientName}</div>
                ) : null}
              </div>
              
                <span>
                  <label className="block mb-1">Tipo de Cliente</label>
                  <select
                    name="clientTypeId"
                    id="clientTypeId"
                    className={`${
                      darkMode
                        ? "bg-siidni-darkLight border text-white"
                        : "bg-white text-black"
                    } w-full h-11 rounded-lg p-2 cursor-pointer`}
                     value={formik.values.clientTypeId} 
                     {...formik.getFieldProps("clientTypeId")}
                  >
                    <option disabled>Seleccione tipo</option>
                    {isLoading ? (
                      <option disabled>Cargando tipos de clientes...</option>
                    ) : clientTypes?.data?.length ? (
                      clientTypes.data.map((ctype) => (
                        <option key={ctype.id} value={ctype.id}>
                          {ctype.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No hay tipos de clientes disponibles</option>
                    )}
                  </select>
                  {formik.touched.clientTypeId && formik.errors.clientTypeId ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.clientTypeId}
                    </div>
                  ) : null} 
                </span>
             
  
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
                  ) : modalType === "edit" ? (
                    "Guardar Cambios"
                  ) : (
                    "Eliminar"
                  )}
                </button>
              </div>
            </form>
          ) : (
           ""
          )}

        </div>
      </div>
    );
  };