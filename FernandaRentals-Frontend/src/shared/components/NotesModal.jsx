import Popup from "reactjs-popup";
import { VscAdd } from "react-icons/vsc";
import { FaRegTimesCircle } from "react-icons/fa";
import { formatDateTime, isObjectEmpty } from "../utils";
import { useEffect, useState } from "react";
import { createNote } from "../actions/notes/notes.actions";
import { useFormik } from "formik";
import { notesInitValues, notesValidationSchema } from "../forms";

export const NotesModal = ({ event, onClose, setFetching, darkMode = false }) => {
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    console.log(event);
  }, []);

  const formik = useFormik({
    initialValues: notesInitValues,
    validationSchema: notesValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      const eventId = event.id;
      const body = { ...formValues, eventId };
      let result = await createNote(body); // Petición al API
      if (result.status !== true) return alert("Error al crear la nota.");
      alert("Nota creada");
      setIsCreating(false); // Oculta el formulario después de enviarlo
      setFetching(true);
      onClose();
    },
  });

  return (
    <Popup open={true} onClose={onClose} modal nested>
      <div
        className={`${
          darkMode ? " text-white" : " text-black"
        } fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60`}
      >
        <div
          className={`${
            darkMode ? "bg-siidni-darkCard" : "bg-gray-200"
          } rounded-lg shadow-lg p-8 w-1/2 max-w-4xl relative`}
        >
          <button
            className={`absolute top-2 right-2 text-xl ${
              darkMode ? "text-white" : "text-black"
            }`}
            onClick={onClose}
          >
            <FaRegTimesCircle />
          </button>

          <label
            className={`font-extralight text-[10px] mb-4 ${
              darkMode ? "text-gray-400" : "text-gray-800"
            }`}
          >
            Notas del Evento:
          </label>
          <h2 className="text-2xl font-bold mb-4">{event.name}</h2>

          {!isCreating && (
            <button
              onClick={() => setIsCreating(true)}
              className={`flex items-center rounded px-4 py-2 mb-4 ${
                darkMode
                  ? "bg-blue-700 hover:bg-blue-800 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              <VscAdd className="mr-2" />
              Crear Nueva Nota
            </button>
          )}

          {isCreating && (
            <form onSubmit={formik.handleSubmit} id="NotesForm" className="mb-4">
              <input
                type="text"
                placeholder="Título"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border p-2 w-full mb-2 ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : ""
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-700 text-xs my-1">{formik.errors.name}</div>
              )}
              <textarea
                placeholder="Descripción"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border p-2 w-full mb-2 ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : ""
                }`}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-700 text-xs my-1">
                  {formik.errors.description}
                </div>
              )}
              <button
                type="submit"
                className={`transition duration-200 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold ${
                  !isObjectEmpty(formik.errors)
                    ? "cursor-not-allowed bg-gray-300 text-black"
                    : darkMode
                    ? "bg-siidni-gold text-black hover:bg-siidni-goldLight"
                    : "bg-siidni-gold text-white hover:bg-siidni-goldLight"
                }`}
              >
                Guardar Nota
              </button>
            </form>
          )}

          <div className="mt-6 max-h-60 overflow-y-auto">
            {event.eventNotes && event.eventNotes.length > 0 ? (
              event.eventNotes.map((note) => (
                <div
                  key={note.id}
                  className={`border-b mb-4 pb-4 rounded-md p-2 ${
                    darkMode ? "bg-gray-700 text-white" : "hover:bg-gray-200"
                  }`}
                >
                  <div className="font-semibold">{note.name}</div>
                  <div className="text-sm mt-2">{note.description}</div>
                  <div className="text-xs mt-2">
                    {note.userName} - {formatDateTime(note.createdDate)}
                  </div>
                </div>
              ))
            ) : (
              <p>No hay notas disponibles para este evento.</p>
            )}
          </div>
        </div>
      </div>
    </Popup>
  );
};
