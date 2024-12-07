import { useEffect, useRef, useState } from "react";
import { useProducts } from "../../hooks/data";
import { ProductGrid } from "./ProductGrid";
import { ProductsSelectGrid } from "./ProductsSelectGrid";
import { Pagination } from "../../../../shared/components";
import {
  convertToISO,
  validateFormCreateEvent,
} from "../../../../shared/utils";
import { Alert } from "../utils";
import { AlertPopUp } from "../utils/AlertPopUp";
import { AlertPopUp2 } from "../utils/AlertPopUp2";
import { SelecOptions } from "./SelecOptions";
import { useCart } from "react-use-cart";
import { EventPricePayment } from "./EventPricePayment";

import { useEventsData } from "../../store/useEventsData";
import { useProductsValidation } from "../../store/useProductsValidation";
import { useNavigate } from "react-router-dom";

export const ReservationForm = () => {
  const { products, loadProducts, isLoading } = useProducts(); //para cargar los productos
  const [currentPage, setCurrentPage] = useState(1); // para administracion de la pagina de productos
  const [searchTerm, setSearchTerm] = useState(""); //para el uso de la busqueda
  const [selectedCategory, setSelectedCategory] = useState(""); //para almacenar la categoria selecionada
  const [fetching, setFetching] = useState(true); //feching
  const [selectedProducts, setSelectedProducts] = useState([]); // para almacenar los productos seleccionados
  const [alert, setAlert] = useState({ message: "", isVisible: false }); // la que salta por errores del backend
  const [errors, setErrors] = useState({}); //para almacenar los errores que viene del back y del form validation
  
  const navigate = useNavigate();

  const { items, addItem, updateItemQuantity, removeItem, emptyCart, cartTotal  } = useCart();
  const nameInputRef = useRef(null); // lo referencio para despues hacerle focus, cuando se renderice la pagina
  const setSuccess = useProductsValidation((state) => state.setSuccess);
    const {
      eventData,
      setEventName,
      setEventLocation,
      setEventStartDate,
      setEventEndDate,
      resetEventData,
      isCreated,
      setIsCreated
    } = useEventsData();


  // Ejecutar la validación en un efecto separado
  const validateData = () => {
    const errors = validateFormCreateEvent(eventData); // Valida el evento
    console.log("Errores de validación actualizados:", errors);

    // Solo actualiza los errores si hay cambios
    setErrors((prevErrors) => {
      if (JSON.stringify(prevErrors) !== JSON.stringify(errors)) {
        return errors;
      }
      return prevErrors;
    });
  };

  // useEffect(() => {
  //   if (isCreated) {
  //     setIsCreated(false);
  //     navigate("/my-events");
  //   }
  // }, [isCreated]);
  

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    productos: [{}],
  });

  // para asi actualizar las fechas del formulario de crear evente cuando cambie las fechas del carrito
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: eventData.startDate || "",
      endDate: eventData.endDate || "",
    }));

 
  }, [eventData]);
  

  useEffect(() => {
    validateData(); // Llama a la función de validación
  }, [eventData]);


  // useEffect(() => {
  //   console.log("eventData actualizado: ", eventData);
  // }, [eventData]);

  const [successAlert, setSuccessAlert] = useState({
    isVisible: false,
    data: {},
  });

 
  

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();

        }
  }, []);

  // Cargar productos cuando sea necesario
  useEffect(() => {
    if (!fetching) return;
    console.log(selectedCategory);
    validateData();

    loadProducts(searchTerm, currentPage, selectedCategory);
    setFetching(false);
  }, [fetching, searchTerm, currentPage, loadProducts]);

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      startDate: "",
      endDate: "",
      productos: [],
    });
    emptyCart();
    setSelectedProducts([]);
    setErrors({});
    setAlert({ message: "", isVisible: false });
  };
 

  const handlePreviousPage = () => {
    if (products?.data?.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
      setFetching(true);
    }
  };

  const handleNextPage = () => {
    if (products?.data?.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      setFetching(true);
    }
  };

  const handleCurrentPage = (index = 1) => {
    setCurrentPage(index);
    setFetching(true);
  };

  const handleSearchChange = async (e) => {
    e.preventDefault();
    console.log(selectedProducts);

    await setSelectedProducts(selectedProducts);
    setFetching(true); // Vuelve a cargar productos cuando cambia el término de búsqueda
  };

  const handleModal = async (response) => {
    console.log("Modal",response);
  
     try {
      if (response.status == true) {
        resetForm();

        await setSuccessAlert({
          ...response.data, // Aquí pasas todos los detalles del evento
          isVisible: true, // Añadimos isVisible para controlar la visibilidad del pop-up
        });
      } else {
        console.log(response);

        await setAlert({
          message: response.data.message,
          isVisible: true,
        });
      }
    } catch (error) {
      setAlert({
        message: "Error en la solicitud: " + error.message,
        isVisible: true,
      });
    
  }
}
//   // Solitud Crear Evento
//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting . . ")
//     // arreglando el Data que manda al backend
    

//     // try {
//     //   const response = await createEvent(formDataToSubmit);
//     //   if (response.status == true) {
//     //     resetForm();

//     //     await setSuccessAlert({
//     //       ...response.data, // Aquí pasas todos los detalles del evento
//     //       isVisible: true, // Añadimos isVisible para controlar la visibilidad del pop-up
//     //     });
//     //   } else {
//     //     console.log(response);

//     //     await setAlert({
//     //       message: response.data.message,
//     //       isVisible: true,
//     //     });
//     //   }
//     // } catch (error) {
//     //   setAlert({
//     //     message: "Error en la solicitud: " + error.message,
//     //     isVisible: true,
//       // });

 
//     // }

//     setFetching(true);
//   };

  const handleCancel = () => {
    setFormData({
      eventName: "",
      location: "",
      startDate: "",
      endDate: "",
      products: [{}],
    });
    emptyCart();
    resetEventData();

    setSuccess(false);

    setErrors({});
  };

  const handlesearchChangeValue = (e) => {
    setSearchTerm(e.target.value);
    console.log(selectedProducts);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  
  const handleCloseAlert = () => {
    setAlert({ ...alert, isVisible: false });
  };
  const handleCreateAnotherEvent = () => {
    setSuccessAlert((prevState) => ({
      ...prevState,
      isVisible: false,
    }));
  };

  return (
    <div className="min-h-screen container ml-auto flex items-center justify-center bg-gray-100 ">
      <div className="w-full p-4 ">
        <form
          className="bg-white shadow-md pb-4 pt-6 rounded-md grid grid-cols-1 sm:grid-cols-2 "
        >
          {successAlert.isVisible && (
            <AlertPopUp2
              eventDetails={successAlert}
              isUpdate={false}
              onCreateAnotherEvent={handleCreateAnotherEvent}
            />
          )}
          {alert.isVisible && (
            <AlertPopUp message={alert.message} onClose={handleCloseAlert} />
          )}
          <div className="my-4 mx-6">
            {/* Inicio Info Básica del Evento */}
            <section className="flex justify-between items-center ">
  <div className="">
    <div className="grid grid-flow-row sm:grid-flow-col gap-3 w-96">
      <div className="sm:col-span-4 justify-center">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Nombre del Evento
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:ring focus:ring-blue-400"
          id="name"
          name="name"
          value={eventData.name}
          placeholder="Presentación UNAH"
          onChange={(e) => setEventName(e.target.value)}
          ref={nameInputRef}
        />
        {errors.name && <Alert errorMessage={errors.name} />}
      </div>
      <div className="sm:col-span-4 justify-center">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="ubication"
        >
          Localización del Evento
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md"
          id="ubication"
          name="location"
          placeholder="Santa Rosa, Copán, Honduras"
          value={eventData.location}
          onChange={(e) => setEventLocation(e.target.value)}
        />
        {errors.location && <Alert errorMessage={errors.location} />}
      </div>
    </div>

    <div className="grid grid-flow-row lg:grid-flow-col gap-3 mt-4 py-2">
      <div className="grid grid-flow-col gap-3">
        <div className="sm:col-span-4 justify-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startdate"
          >
            Fecha de Inicio
          </label>
          <input
            type="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md"
            id="startdate"
            name="startDate"
            value={formData.startDate}
            onChange={(e) => setEventStartDate(e.target.value)}
          />
          {errors.startDate && (
            <Alert errorMessage={errors.startDate} />
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
            id="enddate"
            name="endDate"
            value={formData.endDate}
            onChange={(e) => setEventEndDate(e.target.value)}
          />
          {errors.endDate && <Alert errorMessage={errors.endDate} />}
        </div>
      </div>
    </div>
  </div>

  {/* Contenedor para los botones */}
  <div className="ml-[350px]">
    <EventPricePayment handleCancel={handleCancel} errors={errors} handleModal={handleModal}/>
  </div>
</section>

            
            {/* Fin Info Básica del Evento */}

            {/* Inicio Sección Productos   */}
            <section className="grid grid-flow-row lg:grid-flow-col gap-3 mt-8">
              {/* Inicio de los Productos que seleeciona el Usuario  */}
              <div className="border rounded w-full shadow-md mb-4 mt-4 py-2">
                {/* Encabezados */}
                <div className="w-full justify-center items-center">
                  <h3 className="text-center font-bold text-gray-800">
                    Productos Seleccionados
                  </h3>
                </div>
                {/* Cuerpo  */}
                <ProductsSelectGrid
                  items={items}
                  updateItemQuantity = {updateItemQuantity}
                  removeItem = {removeItem}
                  
                  // onRemoveProduct={handleRemoveProduct}
                  // onUpdateQuantity={handleUpdateQuantity}
                />
              </div>
              {/* Fin de los Productos que seleeciona el Usuario  */}

              {/* Inicio Lista de Productos Existentes */}
              <div className="border rounded w-full shadow-md mb-4 mt-4 px-6 py-2">
                <div className="w-full justify-center items-center">
                  <h3 className="text-center font-bold text-gray-800">
                    Lista de Productos Existentes
                  </h3>
                </div>

                {/* Selector de Categoría y Buscador */}
                <div className="">
                  <div className="flex items-center mb-4 mt-4 ">
                    <SelecOptions
                      setSelectedCategory={setSelectedCategory}
                      setFeching={setFetching}
                    />

                    <input
                      type="text"
                      placeholder="Buscar productos..."
                      name="searchTerm"
                      className="ml-4 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={searchTerm}
                      onChange={handlesearchChangeValue}
                      onKeyDown={handleEnter}
                    />

                    <button
                      type="button"
                      className="ml-4 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleSearchChange}
                    >
                      Buscar
                    </button>
                  </div>

                  {/* Lista de Productos */}
                  <div className="border rounded w-full shadow-md mb-4 mt-4 py-2">
                    <div className="w-full justify-center items-center">
                      <h3 className="text-center font-bold text-gray-800 mb-4">
                        Lista de Productos Existentes
                      </h3>

                      <ProductGrid
                        products={products}
                        isLoading={isLoading}
                        
                       
                      />
                      {/* Paginación */}
                      <Pagination
                        totalPages={products?.data?.totalPages}
                        hasNextPage={products?.data?.hasNextPage}
                        hasPreviousPage={products?.data?.hasPreviousPage}
                        currentPage={currentPage}
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                        setCurrentPage={setCurrentPage}
                        handleCurrentPage={handleCurrentPage}
                      />
                      {/* Fin de Paginacion */}
                    </div>
                  </div>
                </div>
              </div>
              {/* Fin Lista de Productos Existentes */}
            </section>
             {/* Fin SecciónProductos   */}
          </div>
        </form>
      </div>
    </div>
  );

}
