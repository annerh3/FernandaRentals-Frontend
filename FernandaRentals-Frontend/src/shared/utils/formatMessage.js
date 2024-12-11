import { RiArrowUpSFill, RiArrowDownSFill, RiPauseCircleFill } from "react-icons/ri";

// Constantes para mensajes y clases
const STATUS = {
  NO_CHANGE: { message: "Sin Cambios", Icon: RiPauseCircleFill, twClasses: "text-blue-600" },
  INCREASE: { message: "% Aumento", Icon: RiArrowUpSFill, twClasses: "text-green-600" },
  DECREASE: { message: "% Disminución", Icon: RiArrowDownSFill, twClasses: "text-red-600" },
  INFINITE: { message: "infinite% Aumento", Icon: RiArrowUpSFill, twClasses: "text-green-600" },
};

export const getComparisonDetails = (comparation) => {
  if (!comparation) {
    console.log("Comparison is null, returning default status:", STATUS.NO_CHANGE);
    return STATUS.NO_CHANGE;
  }

  const { newTLast7Days, newTPrevious7Days, percentageChange } = comparation;

  if (newTPrevious7Days === 0) {
    return { ...STATUS.INFINITE, newTLast7Days };
  }

  if (newTLast7Days === newTPrevious7Days) {
    return { ...STATUS.NO_CHANGE, newTLast7Days };
  }

  if (newTLast7Days > newTPrevious7Days) {
    return { 
      message: `${percentageChange}${STATUS.INCREASE.message}`, 
      Icon: STATUS.INCREASE.Icon, 
      twClasses: STATUS.INCREASE.twClasses, 
      newTLast7Days 
    };
  }

  // Caso para disminución
  return { 
    message: `${percentageChange}${STATUS.DECREASE.message}`, 
    Icon: STATUS.DECREASE.Icon, 
    twClasses: STATUS.DECREASE.twClasses, 
    newTLast7Days 
  };
};
