import { formatDate } from "../../utils";

export const CurrentDate = () => {
  return (
    <>
      <span className=" ml-5 text-gray-500">
        {formatDate(new Date().toLocaleDateString())}
      </span>
    </>
  );
};
