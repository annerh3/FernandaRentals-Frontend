import { BookX } from "lucide-react";
import { useEffect, useRef } from "react";

export const SeeMoreModal = ({
    darkMode,
    selectedItem,
    setShowModal
}) => {
    const modalRef = useRef(null);

    // console.log(selectedItem);

    useEffect(() => {
        const handleClickOutside = (e) => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowModal(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [setShowModal]);

  return (
    <div
    className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center`}
  >
    <div
      ref={modalRef}
      className={`${
        darkMode ? "bg-siidni-darkLight" : "bg-white"
      } p-8 rounded-xl w-full max-w-md`}
    >
      <button onClick={() => handleModalOpen("delete")} className="p-2 rounded-lg text-gray-700  hover:text-red-200">
                          <BookX />
                        </button>

      <h2 className="text-xl font-bold mb-4">
        Detalles de 
      </h2>

        <section className="space-y-4">
          <div>
            <label className="block mb-1">Nombre</label>
           
           
          </div>
          <div>
            <label className="block mb-1">Descripción</label>
            
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowModal(false)}
              className={`px-4 py-2 rounded-lg ${
                darkMode ? "bg-gray-600" : "bg-gray-200"
              }`}
            >
              Ok
            </button>
              
          </div>
        </section>
 

    
    </div>
  </div>
  )
}
