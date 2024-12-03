import {
  CalendarDays,
  CircleDollarSign,
  MapPinHouse,
  UserRound,
} from "lucide-react";
import { InfoRow } from "./InfoRow";
import { formatDate } from "../../../../shared/utils";

export const TableInformationEvent = ({
  client,
  location,
  eventCost,
  discount,
  total,
  startDate,
  endDate,
}) => {
  return (
    <>
      <div className="mb-6 space-y-2">
        {/* Información de los Clientes */}
        <InfoRow
          icon={UserRound}
          iconClass="text-purple-500"
          label={`${client.name} (${client.clientType})`}
        />
        {/* Información de fechas */}
        <InfoRow
          icon={CalendarDays}
          iconClass="text-yellow-500"
          label={`${formatDate(startDate)} - ${formatDate(endDate)}`}
        />
        {/* Información de Ubicación */}
        <InfoRow icon={MapPinHouse} iconClass="text-red-500" label={location} />

        {/* Sobre Costos del Evento */}
        <p>
          Costo del Evento: <span className="text-red-600">${eventCost}</span>
          <br />
          Descuento: <span className="text-blue-500">${discount} </span> <br />
          <div className="flex items-center gap-1">
            <InfoRow icon={CircleDollarSign} iconClass="text-green-500" />
            Costo Total: <span className="text-green-500">${total}</span>
          </div>
        </p>
      </div>
    </>
  );
};
