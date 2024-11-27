import { BookUser, Percent, ScrollText } from "lucide-react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

export const ClientTypesGrid = ({ darkMode, handleModalOpen }) => {

  // const clientTypes = [
  //   {
  //     id: 1,
  //     name: "Enterprise",
  //     description: "Large scale business clients",
  //   },
  //   {
  //     id: 2,
  //     name: "Small Business",
  //     description: "Small to medium business clients",
  //   },
  // ];


  const clientTypes = {
    "data": [
      {
        "id": "e2d5f6b9-7f8d-4c7b-9a1e-0b7e8f3d2c14",
        "name": "ONG",
        "description": "Clientes que representan una organización no gubernamental, con un descuento especial.",
        "discount": 0.25
      },
      {
        "id": "a1f5e93b-6d4f-4f91-9a3d-0b8e6f1b8e16",
        "name": "Normal",
        "description": "Clientes regulares sin descuentos especiales.",
        "discount": 0
      },
      {
        "id": "d3a7b2c4-5d6f-4f8e-9a2c-0c9e5b7d1a19",
        "name": "Iglesia",
        "description": "Clientes que representan una iglesia, con un descuento especial.",
        "discount": 0.2
      },
      {
        "id": "b6f0d3a7-3e17-4c5d-9b3e-7a1d7e2fbb19",
        "name": "Organización Privada",
        "description": "Clientes que representan una organización privada, con un descuento especial.",
        "discount": 0.1
      },
      {
        "id": "c8e3f4b1-2e16-4c8d-8e7e-8a5d6c3e1a18",
        "name": "Organización Pública",
        "description": "Clientes que representan una organización pública, con un descuento especial.",
        "discount": 0.15
      }
    ],
    "message": "Listado de tipos de cliente obtenido correctamente.",
    "status": true
  };
  return (
    <div>
      <div className="flex justify-start items-center ">
        <button
          onClick={() => handleModalOpen("create")}
          className={`mr-8 flex items-center space-x-2 px-4 py-2 rounded-lg ${
            darkMode ? "bg-blue-600" : "bg-blue-500"
          } text-white transition-transform hover:scale-105`}
        >
          <FiPlus />
          <span>Crear Tipo de Cliente</span>
        </button>
      </div>
      {/* <p className="mt-2 text-xl flex gap-2 items-center">
      <MdOutlineInventory2 /> Stock: {product.stock} */}
      <div className={`p-6`}>
        <div className={`space-y-4`}>
          {clientTypes?.data?.map((clientType) => (
            <div
              key={clientType.id}
              className={`flex items-center justify-between p-4 border rounded-lg ${
                darkMode
                  ? "border-gray-700 bg-siidni-darkCard"
                  : "border-gray-300 bg-gray-100"
              }`}
            >
              <div>
                <h4
                  className={`mt-2 text-xl flex gap-2 items-center ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <BookUser size={18}/>
                  {clientType.name}
                </h4>
                <p
                  className={`mt-2 text-sm flex gap-2 items-center${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  <ScrollText size={18} /> 
                  {clientType.description}
                </p>
                <p
                  className={`mt-2 text-sm flex gap-2 items-center ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  <Percent size={18}  />
                  {clientType.discount * 100}%
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleModalOpen("edit",clientType)}
                  className={`p-2 ${
                    darkMode
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  <FiEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleModalOpen("delete",clientType)}
                  className={`p-2 ${
                    darkMode
                      ? "text-red-400 hover:text-red-300"
                      : "text-red-600 hover:text-red-800"
                  }`}
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ); 
};
