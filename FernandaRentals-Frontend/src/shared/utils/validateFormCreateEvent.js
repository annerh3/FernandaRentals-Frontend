  // función para validar los errores del Formulario
 export const validateFormCreateEvent = (data) => {
    const errors = {};
    const warnings = {}; 

    if (!data.name) errors.name = "El nombre del evento es obligatorio.";
    if (!data.location) errors.location = "La ubicación es obligatoria.";
    if (!data.startDate) errors.startDate = "La fecha de inicio es obligatoria.";
    if (!data.endDate) errors.endDate = "La fecha de finalización es obligatoria.";
    if (data.startDate && data.endDate) {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
    
        // Validar si endDate es menor que startDate
        if (endDate < startDate) {
          errors.startDate = "La Fecha de Inicio tiene que ser antes de la Fecha de Finalización";
        }
      }
    if (data.productos.length === 0)
      errors.selectedProducts = "Debe seleccionar al menos un producto.";

    return {errors, warnings};
  };


  // Función de validación para la edición de eventos
  export const validateFormEditEvent = (data) => {
    const errors = {};
    const warnings = {}; // Para mensajes informativos que no bloquean el formulario
    const currentDate = new Date();
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
  
    // Validaciones para los campos obligatorios
    if (!data.name) errors.name = "El nombre del evento es obligatorio.";
    if (!data.location) errors.location = "La ubicación es obligatoria.";
  
    // Validación de la fecha de inicio
    if (!startDate) {
      errors.startDate = "La fecha de inicio es obligatoria.";
    } else if (currentDate > startDate && currentDate < endDate) {
      // Si la fecha actual está dentro del rango, no permitir cambiar la fecha de inicio
      warnings.startDate = "No se puede editar la fecha de inicio mientras el evento está en curso.";
    } else {
      // Validación: la fecha de inicio debe ser al menos 3 días después de la fecha actual
      const minStartDate = new Date();
      minStartDate.setDate(currentDate.getDate() + 3); // Fecha actual + 3 días
      if (startDate < minStartDate) {
        errors.startDate = "La fecha de inicio debe ser al menos 3 días posterior a la fecha actual.";
      }
    }
  
    // Validación de la fecha de finalización
    if (!endDate) {
      errors.endDate = "La fecha de finalización es obligatoria.";
    } else {
      // Validación: la fecha de finalización debe ser posterior a la fecha de inicio
      if (startDate && endDate < startDate) {
        errors.endDate = "La fecha de finalización debe ser posterior a la fecha de inicio.";
      }
  
      // Validación: la fecha de finalización debe ser igual o posterior a la fecha actual
      if (endDate < currentDate) {
        errors.endDate = "La fecha de finalización debe ser igual o posterior a la fecha actual.";
      }
    }
  
    return { errors, warnings };
  };
  
  
  