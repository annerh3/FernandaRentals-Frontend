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


  export const validateFormEditEvent = (data) => {
    const errors = {};
    const warnings = {};
    const currentDate = new Date();
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
  
    // Validaciones para los campos obligatorios
    if (!data.name) errors.name = "El nombre del evento es obligatorio.";
    if (!data.location) errors.location = "La ubicación es obligatoria.";
  
    // Validación de la fecha de inicio
    if (!startDate) {
      errors.startDate = "La fecha de inicio es obligatoria.";
    } else {
      const minStartDate = new Date();
      minStartDate.setDate(currentDate.getDate() + 3); // Fecha actual + 3 días
  
      // Prioridad: validar que la fecha de inicio sea al menos 3 días después de la fecha actual
      if ((startDate < minStartDate && (currentDate <= startDate))) {
        errors.startDate = "La fecha de inicio debe ser al menos 3 días posterior a la fecha actual.";
      } else if (currentDate >= startDate) {
        // Si la fecha ya comenzó, no permitir edición
        warnings.startDate = "No se puede editar la fecha de inicio porque ya comenzó o es una fecha pasada.";
      }
    }
  
    // Validación de la fecha de finalización
    if (!endDate) {
      errors.endDate = "La fecha de finalización es obligatoria.";
    } else {
      // Validar que la fecha de finalización sea posterior a la fecha de inicio
      if (startDate && endDate < startDate) {
        errors.endDate = "La fecha de finalización debe ser igual o posterior a la fecha de inicio.";
      }
      // Validar que la fecha de finalización no sea anterior a la fecha actual
      if (endDate < currentDate) {
        errors.endDate = "La fecha de finalización debe ser igual o posterior a la fecha actual.";
      }
    }
  
    return { errors, warnings };
  };
  
  
  
  