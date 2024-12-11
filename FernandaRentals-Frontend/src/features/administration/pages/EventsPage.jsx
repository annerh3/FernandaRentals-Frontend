import { useEffect, useState } from "react";
import {
  EventPreviewItem,
  EventPreviewSkeleton,
} from "../components/events-page/EventPreviewItem";
import { useEvents } from "../../Website/hooks/data/useEvents";
import { SeeMoreModal } from "../components/events-page/SeeMoreModal";
import { selectValues } from "../../../shared/constants/variousConstants";
import { EventCalendar } from "../components";
import { CurrentDate } from "../../../shared/components/Utils";
import { NotesModal } from "../../../shared/components";
import { MonthPicker, MonthInput } from "react-lite-month-picker";
import { FinancialReport } from "../components/FinancialReport";
import { useFinance } from "../hooks/useFinance";

// const isLoading = false;
const backendResponse = {
  data: {
    totalRevenue: 7343.4,
    totalDiscounts: 802.6,
    eventCount: 38,
    averageRevenue: 193.25,
  },
  message: "Reporte del mes de noviembre 2024 recibido correctamente.",
  status: true,
};

export const EventsPage = ({ darkMode }) => {
  const [showModal, setShowModal] = useState(false);

  // Da el reporte inicialmente
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [showNotesModal, setShowNotesModal] = useState(false);

  const [lastSelectedValue, setLastSelectedValue] = useState(null); // para recargar los datos luego de crear una nota
  const [selectedItem, setselectedItem] = useState(null);

  const [fetching, setFetching] = useState(true);
  const { events, isLoading, loadEvents } = useEvents();

  const { finance, financeIsLoading, loadFinancialsMonthly } = useFinance();

  // para actualizar el reporte
  useEffect(() => {
    //  console.log("El mes es: ",selectedMonthData);
    loadFinancialsMonthly(selectedMonthData);
  }, [selectedMonthData]);

  const handleModalOpen = (data) => {
    setselectedItem(data);
    //console.log(data);
    setShowModal(true);
  };

  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    // console.log("Selected Value: ", selectedValue);
    //console.log(e.target.value);

    if (Object.values(selectValues).includes(selectedValue)) {
      setLastSelectedValue(selectedValue);
      loadEvents(selectedValue);
    }
  };

  useEffect(() => {
    if (fetching) {
      loadEvents(selectValues.TODAY);
      setselectedItem(false);
      //console.log("Fetched");
      //console.log(finance);
    }
  }, [fetching]);

  const openNotesModal = (event) => {
    setselectedItem(event);
    setShowNotesModal(true);
    console.log(event);
  };

  const closeNotesModal = () => {
    setShowNotesModal(false);
    setselectedItem(null);
    // setFetching(true);
  };

  //Obtener fecha actual
  // const currentDate = new Date().toLocaleDateString("es-ES", {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-siidni-dark" : "bg-gray-200"
      } p-4 sm:p-6 lg:p-8 lg:ml-60 sm:ml-[800]`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 lg:ml-0 ml-16">
        {/* Fecha del día */}
        <div
          className={`col-span-12 lg:col-span-12 text-start text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {/* Componente que muestra la Fecha Actual */}
          <CurrentDate />
        </div>

        {/* Primera sección: Eventos */}
        <div
          className={`${
            darkMode ? "bg-siidni-darkCard" : "bg-white"
          } col-span-12 lg:col-span-5 rounded-md overflow-y-auto flex flex-col items-center min-h-[300px] max-h-[800px]`}
        >
          <div className="flex mt-5 w-full px-4">
            <select
              name="select_order"
              id="select_order"
              className={`text-sm px-4 py-2 rounded-md border w-full ${
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
              onViewNotes={openNotesModal}
            />
          )}
        </div>

        {/* Segunda sección: Reporte Financiero y Calendario */}
        <div className="col-span-12 lg:col-span-7 flex flex-col space-y-4">
          {/* Reporte Financiero */}
          <div
            className={`${
              darkMode ? "bg-siidni-darkCard" : "bg-white"
            } rounded-md p-4`}
          >
            {/* Selector de Mes */}
            {/* <Selector   selectedMonthData={selectedMonthData} setIsPickerOpen={setIsPickerOpen} isPickerOpen={isPickerOpen} darkMode={darkMode} setSelectedMonthData={setSelectedMonthData}  /> */}

            <FinancialReport
              data={finance?.data}
              message={finance?.message}
              status={finance?.status}
              darkMode={darkMode}
              financeIsLoading={financeIsLoading}
              selectedMonthData={selectedMonthData}
              setIsPickerOpen={setIsPickerOpen}
              isPickerOpen={isPickerOpen}
              darkMode={darkMode}
              setSelectedMonthData={setSelectedMonthData}
            />
          </div>

          {/* Calendario */}
          <div
            className={`${
              darkMode ? "bg-siidni-darkCard" : "bg-white"
            } rounded-md p-4 overflow-hidden`}
          >
            <EventCalendar
              darkMode={darkMode}
              events={events}
              handleModalOpen={handleModalOpen}
            />
          </div>
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

      {showNotesModal && (
        <NotesModal
          darkMode={darkMode}
          event={selectedItem}
          onClose={closeNotesModal}
          setFetching={() =>
            handleSelect({ target: { value: lastSelectedValue } })
          }
        />
      )}
    </div>
  );
};

function Selector({
  selectedMonthData,
  setIsPickerOpen,
  isPickerOpen,
  darkMode,
  setSelectedMonthData,
}) {
  return (
    <div>
      <MonthInput
        selected={selectedMonthData}
        setShowMonthPicker={setIsPickerOpen}
        showMonthPicker={isPickerOpen}
        lang="es"
        size="small" // Personalización del MonthInput según el tema
        bgColor={darkMode ? "#444" : "#fff"} // Fondo oscuro o claro
        textColor={darkMode ? "#fff" : "#333"} // Texto blanco o oscuro
        bgColorHover={darkMode ? "#444" : "#f4f4f4"} // Hover con fondo más oscuro o más claro
      />
      {isPickerOpen && (
        <MonthPicker
          size="small"
          lang="es"
          setIsOpen={setIsPickerOpen}
          selected={selectedMonthData}
          onChange={setSelectedMonthData} // Personalización del MonthPicker según el tema
          bgColorPicker={darkMode ? "#333" : "#fff"} // Fondo del picker
          textColor={darkMode ? "#fff" : "#333"} // Color de texto
          bgColorMonthActive={darkMode ? "#ea995e" : "#4ea3983e"} // Fondo activo
          bgColorMonthHover={darkMode ? "#444" : "#f4f4f4"} // Fondo al pasar el mouse sobre un mes
          borderRadiusMonth="7px" // Radio de bordes del mes
        />
      )}
    </div>
  );
}
