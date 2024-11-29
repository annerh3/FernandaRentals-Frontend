import { LuSofa } from "react-icons/lu";

export const DataNotFound = ({ message, darkMode, Icon = LuSofa }) => {
  return (
    <section
      className={`${
        darkMode ? "bg-siidni-darkLight text-white" : "bg-gray-200 text-gray-900"
      } mt-4 rounded-lg min-w-max`}
    >
      <div className="flex items-center h-96 px-6 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium text-white rounded-full bg-siidni-goldLight ">
            {Icon && <Icon className="font-extrabold text-3xl" />}
          </p>
          <h1 className="mt-3 text-2xl font-normal md:text-3xl">{message}</h1>
        </div>
      </div>
    </section>
  );
};
