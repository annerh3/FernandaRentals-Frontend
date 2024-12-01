import { useEffect, useState } from "react";
import { EventPreviewItem, EventPreviewSkeleton } from "../components/events-page/EventPreviewItem";
import { useEvents } from "../../Website/hooks/data/useEvents";
import { SeeMoreModal } from "../components/events-page/SeeMoreModal";


// const isLoading = false;

export const EventsPage = ({ darkMode }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setselectedItem] = useState(null);
  const selectValues  = {PAST: "past", FUTURE:"future"}


  const handleModalOpen = (data) => {
    setselectedItem(data);
    console.log(data)
    setShowModal(true);     
  };
  const [fetching, setFetching] = useState(true);
  const { events, isLoading, loadEvents } = useEvents();

const handleSelect = (e) => {
console.log(e.target.value)
}

  useEffect(() => {
    if (fetching) {
      loadEvents();
      setFetching(false);
    }
  }, [fetching]);

  

  return (
    <div className={`min-h-screen ${darkMode ? "bg-siidni-dark" : "bg-gray-200"} p-4 sm:p-6 lg:p-8`}>
    <div className="grid grid-cols-12 gap-4 ml-20 sm:ml-30 md:ml-60 flex-1 p-8">
      {/* Primera sección (EventPreview) */}
      <div
        className={`${
          darkMode ? "bg-siidni-darkCard" : "bg-white"
        } col-span-12 lg:col-span-7 rounded-md overflow-y-auto overflow-x-hidden flex flex-col items-center h-[600px]`}
      >
        <div className="flex mt-5 mr-[330px]">
          <select
            name="select_order"
            id="select_order"
            className={`text-sm px-4 py-2 rounded-md border ${
              darkMode ? "bg-siidni-darkCard text-white border-gray-700" : "bg-gray-100 text-gray-800 border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            defaultValue="default"
          >
            <option disabled>
              Quiero ver los...
            </option>
            <option value={selectValues.FUTURE}  onClick={handleSelect}>Próximos Eventos</option>
            <option value={selectValues.PAST} onClick={handleSelect}>Eventos Pasados</option>
          </select>
      </div>

        {isLoading ? (
          <EventPreviewSkeleton />
        ) : (
          <EventPreviewItem events={events} darkMode={darkMode} handleModalOpen={handleModalOpen} />
        )}
      </div>
  
      {/* Secciones 2 */}
      <div className="col-span-12 lg:col-span-4 flex flex-col space-y-4">
        {/* Sección Calendario */}
        <div className="rounded-md bg-green-400 h-[300px]">
          2
        </div>
        {/* Sección Ingreso Ultima semana */}
        <div className="rounded-md bg-purple-400 h-[200px]">
          3
        </div>
      </div>
    </div>
  
    {showModal && (
      <SeeMoreModal
        darkMode={darkMode}
        selectedItem={selectedItem}
        setShowModal={setShowModal}
      />
    )}
  </div>
  

  );
};


  