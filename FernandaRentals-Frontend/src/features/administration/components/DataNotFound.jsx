import { LuSofa } from "react-icons/lu";

export const DataNotFound = ({ message, darkMode, Icon = LuSofa }) => {
  return (
    <section
      className={`${
        darkMode ? "bg-siidni-darkLight text-white" : "bg-gray-200 text-gray-900"
      } mt-4 rounded-lg w-4/5 mb-4 flex justify-center items-center`}  
    >
      <div className="flex flex-col items-center justify-center text-center p-6">
        <p className="p-3 text-sm font-medium text-white rounded-full bg-siidni-goldLight ">
          {Icon && <Icon className="font-extrabold text-3xl" />}
        </p>
        <h1 className="mt-3 text-2xl font-normal md:text-3xl">{message}</h1>
      </div>
    </section>
  );
};

