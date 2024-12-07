import { useState } from "react";
import {
  MdDiscount,
  MdOutlineCancel,
  MdOutlineEventNote,
} from "react-icons/md";
import { TbCalendarTime, TbFilePencil } from "react-icons/tb";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { formatDate } from "../../../shared/utils";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { SiVirustotal } from "react-icons/si";
import { useEvents } from "../hooks/data";
import Popup from "reactjs-popup";

// Función para calcular la diferencia en días entre dos fechas
const calculateDaysBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const differenceInTime = end - start;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  return differenceInDays > 0 ? differenceInDays : 1; // Asegura que al menos sea 1 día
};

export const EventItem = ({ event, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { removeEvent } = useEvents(); // Obtén la función removeEvent desde el hook

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = () => {
    console.log("Botón Cancelar Presionado");
    console.log(event.id);
    
    removeEvent(event.id).then(() => {
      onDelete(); // Llama a la función `onDelete` después de eliminar
    });
    //}
  };
  const now = Date.now();
const isCancellable = now < new Date(event.startDate).getTime();

  const days = calculateDaysBetweenDates(event.startDate, event.endDate);
  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-4  text-black">
      <div className="mb-4 flex items-center">
        <MdOutlineEventNote className="text-xl text-green-600 mr-1" />
        <h2 className="text-lg font-bold">{event.name}</h2>
      </div>
      <span className="flex items-center">
        <FaLocationDot className="text-red-800 mr-1" />
        <span>{event.location}</span>
      </span>
      <span className="flex items-center">
        <TbCalendarTime className="text-xl mr-1 text-blue-400 " />
        <span className="mr-1">
          {days} {days === 1 ? "día" : "días"}
        </span>
      </span>
      <span className="flex items-center">
        <GrMoney className="text-yellow-600 mr-1" />{" "}
        <span>${event.total.toFixed(2)}</span>
      </span>

      <div className="mb-4">
        {showDetails && (
          <section className=" text-black">
            <hr className="m-4" />
            <p className="text-sm  ">
              <strong className="mr-1">Fecha de Inicio:</strong>
              {formatDate(event.startDate)}
            </p>
            <p className="text-sm  ">
              <strong className="mr-1">Fecha de Fin:</strong>
              {formatDate(event.endDate)}
            </p>

            <p className="text-sm   flex items-center">
              <SiVirustotal className="mr-1" />
              <strong className="mr-1">Costo del Evento:</strong> $
              {event.eventCost.toFixed(2)}
            </p>
            <p className="text-sm   flex items-center">
              <MdDiscount className="mr-1" />
              <strong className="mr-1">Descuento:</strong> $
              {event.discount.toFixed(2)}
            </p>
            <br />
            <strong>Lista de Productos Reservados</strong>
            <table className="min-w-full mt-4 border border-black ">
  <thead>
    <tr className="bg-gray-300 ">
      <th className="py-2 px-4 border border-black rounded-l-md">Imagen</th>
      <th className="py-2 px-4 border border-black">Producto</th>
      <th className="py-2 px-4 border border-black">Cantidad</th>
      <th className="py-2 px-4 border border-black">Precio Unitario</th>
      <th className="py-2 px-4 border border-black">Precio Total</th>
    </tr>
  </thead>
  <tbody>
    {event.eventDetails.map((detail) => (
      <tr key={detail.id} className="border-b border-black">
        <td className="py-2 px-4 border border-black">
          <a
            href={detail.product.urlImage}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-4 flex justify-center transform transition-transform duration-300 hover:scale-110"
          >
            <img
              src={detail.product.urlImage}
              width={50}
              alt="img-product"
              className="rounded-md shadow-md"
            />
          </a>
        </td>
        <td className="py-2 px-4 border border-black">
          {detail.product.name}
        </td>
        <td className="py-2 px-4 border border-black">{detail.quantity}</td>
        <td className="py-2 px-4 border border-black">
          ${detail.unitPrice.toFixed(2)}
        </td>
        <td className="py-2 px-4 border border-black">
          ${detail.totalPrice.toFixed(2)}
        </td>
      </tr>
    ))}
  </tbody>
</table>

          </section>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={toggleDetails}
          className="flex items-center text-sm border border-black rounded px-3 py-1 hover:bg-blue-200 hover:text-black"
        >
          {showDetails ? (
            <>
              <VscEyeClosed className="h-4 w-4 mr-2" />
              Ocultar Detalles
            </>
          ) : (
            <>
              <VscEye className="h-4 w-4 mr-2" />
              Ver Detalles
            </>
          )}
        </button>

        <Link
          to={`/my-event/edit/${event.id}`}
          className="flex items-center text-sm border border-black  rounded px-3 py-1 hover:bg-orange-300 hover:text-black"
        >
          <TbFilePencil className="h-4 w-4 mr-2" />
          Editar
        </Link>

        <Popup
          trigger={
            
              isCancellable && (
                <span className="flex items-center text-sm border border-black  rounded px-3 py-1 hover:bg-red-500 hover:cursor-pointer hover:text-black">
                  <MdOutlineCancel className="h-4 w-4 mr-2" />
                  Cancelar
                </span>
              )
            
          }
          position="top right"
          className="flex items-center text-sm border border-black rounded px-3 py-1 hover:bg-red-500"
        >
          <aside className="bg-siidni-goldLight rounded-md p-4 flex flex-col items-center justify-center">
            <strong className="mb-2 text-center">
              ¿Estás seguro de que deseas cancelar este evento?
            </strong>
            <button
              onClick={handleDelete}
              className="flex items-center text-sm border border-black rounded px-3 py-1 bg-red-500"
            >
              <MdOutlineCancel className="h-4 w-4 mr-2" />
              SHI 😥
            </button>
          </aside>
        </Popup>
      </div>
    </div>
  );
};
