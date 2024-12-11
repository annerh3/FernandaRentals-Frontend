

import { RiArrowUpSFill, RiArrowDownSFill, RiPauseCircleFill } from "react-icons/ri";

export const getComparisonDetails = (comparation) => {
  if (!comparation) 
  {
    console.log("Icon:", {icon: <RiPauseCircleFill className="text-blue-600" />});
    return { message: "Sin Cambios", icon: <RiPauseCircleFill className="text-blue-600" /> };
  }
  const { newTLast7Days, newTPrevious7Days, percentageChange } = comparation;
  let message = "Sin Cambios";
  let icon = <RiPauseCircleFill className="text-blue-600" />; 

  if (newTPrevious7Days === 0) {
    message = "infinite% Aumento";
    console.log("Icon:", {icon: <RiPauseCircleFill className="text-blue-600" />});
    icon = <RiArrowUpSFill className="text-green-600" />; 
  } else if (newTLast7Days === newTPrevious7Days) {
    message = "Sin Cambios";
  } else if (newTLast7Days > newTPrevious7Days) {
    message = `${percentageChange}% Aumento`;
    console.log("Icon:", {icon: <RiPauseCircleFill className="text-blue-600" />});
    icon = <RiArrowUpSFill className="text-green-600" />;  
  } else if (newTLast7Days < newTPrevious7Days) {
    message = `${percentageChange}% Disminución`;
    console.log("Icon:", {icon: <RiPauseCircleFill className="text-blue-600" />});
    icon = <RiArrowDownSFill className="text-red-600" />; 
  }

  return { message, icon, newTLast7Days };
};
