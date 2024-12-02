import { useEffect, useState } from "react";
import { EventPreviewItem, EventPreviewSkeleton } from "../components/events-page/EventPreviewItem";
import { useEvents } from "../../Website/hooks/data/useEvents";
import { SeeMoreModal } from "../components/events-page/SeeMoreModal";
import { selectValues } from "../../../shared/constants/variousConstants";
import { EventCalendar } from "../components";
import { CurrentDate } from "../../../shared/components/Utils";


// const isLoading = false;


export const EventsPage = ({ darkMode }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setselectedItem] = useState(null);
  const [fetching, setFetching] = useState(true);
  const { events, isLoading, loadEvents } = useEvents();

  const handleModalOpen = (data) => {
    setselectedItem(data);
    //console.log(data);
    setShowModal(true);
  };

  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    console.log("Selected Value: ", selectedValue);

    if (Object.values(selectValues).includes(selectedValue)) {
      loadEvents(selectedValue);
    }
  };

  useEffect(() => {
    if (fetching) {
      loadEvents(selectValues.TODAY);
      setFetching(false);
    }
  }, [fetching]);

  //Obtener fecha actual
  // const currentDate = new Date().toLocaleDateString("es-ES", {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

  return (
    <div className={`min-h-screen ${darkMode ? "bg-siidni-dark" : "bg-gray-200"} p-4 sm:p-6 lg:p-8`}>
      <div className="grid grid-cols-12 gap-4 ml-20 sm:ml-30 md:ml-60 flex-1 p-4 min-w-fit">
        {/* Fecha del día */}
        <div
          className={`col-span-12 mb-4 text-start text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {/* Componente que muestra la Fecha Actual */}
        <CurrentDate/>
        </div>

        {/* Primera sección (EventPreview) */}
        <div
          className={`${
            darkMode ? "bg-siidni-darkCard" : "bg-white"
          } col-span-12 lg:col-span-7 rounded-md overflow-y-auto overflow-x-hidden flex flex-col items-center min-h-fit max-h-[600px]`}
        >
          <div className="flex mt-5 mr-[330px] ">
            <select
              name="select_order"
              id="select_order"
              className={`text-sm px-4 py-2 rounded-md border ${
                darkMode
                  ? "bg-siidni-darkCard text-white border-gray-700"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              defaultValue="default"
            >
              <option disabled>Quiero ver los...</option>
              <option value={selectValues.TODAY} onClick={handleSelect}>
                Eventos Hoy
              </option>
              <option value={selectValues.FUTURE} onClick={handleSelect}>
                Próximos Eventos
              </option>
              <option value={selectValues.PAST} onClick={handleSelect}>
                Eventos Pasados
              </option>
              <option value={selectValues.ALL} onClick={handleSelect}>
                Todo el historial
              </option>
            </select>
          </div>

          {isLoading ? (
            <EventPreviewSkeleton darkMode={darkMode} />
          ) : (
            <EventPreviewItem
              events={events}
              darkMode={darkMode}
              handleModalOpen={handleModalOpen}
            />
          )}
        </div>

        {/* Secciones 2 */}
        <div className="col-span-12 lg:col-span-5 flex flex-col space-y-4">
          {/* Sección Calendario */}
          <div className="rounded-md h-[400px] w-full">
            <EventCalendar
              darkMode={darkMode}
              events={events}
              handleModalOpen={handleModalOpen}
            />
          </div>
          {/* Sección Ingreso Última Semana */}
          <div className="rounded-md bg-transparent h-[200px]"></div>
        </div>
      </div>

          {/* Para mostrar los detalles de los eventos seleccionados */}
      {showModal && (
        <SeeMoreModal
          darkMode={darkMode}
          selectedItem={selectedItem}
          setShowModal={setShowModal}
          setFetching={setFetching}
        />
      )}
    </div>
  );
};


  