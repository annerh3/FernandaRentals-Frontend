import { formatDate } from "../../utils";

export const CurrentDate = ({darkMode}) => {
  return (
    <>
      <span className={`${darkMode ? "text-white" : "text-gray-500 "} ml-5 `}>
        {formatDate(new Date().toLocaleDateString())}
      </span>
    </>
  );
};
