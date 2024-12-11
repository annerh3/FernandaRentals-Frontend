import { isObjectEmpty } from "../../../shared/utils";
import { LabelFormBase, SelectButton } from "./FormsComponents";

export const RegisterForm = ({ formikRegister, loading }) => {


  const handleClientTypeSelect = (clientId) => {
    console.log("ID del cliente seleccionado:", clientId);
  };
  return (


  <form onSubmit={formikRegister.handleSubmit} id="registerForm">
    {/* Primera fila: Nombre y Seleccionador */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 items-center">
      {/* Campo de Nombre */}
      <div>
        <LabelFormBase
          inputLabel="Nombre"
          inputId="name"
          inputType="text"
          inputName="name"
          inputValue={formikRegister.values.name}
          inputOnChange={formikRegister.handleChange}
          inputOnblur={formikRegister.handleBlur}
          evaluated={formikRegister.touched.name && formikRegister.errors.name}
          errorForm={formikRegister.errors.name}
        />
      </div>

      {/* Botón Seleccionador */}
      <div className="flex items-center">
        <SelectButton  onSelect={handleClientTypeSelect} />
      </div>
    </div>

    {/* Tercera fila: Contraseña y Confirmar Contraseña */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div>
        <LabelFormBase
          inputLabel="Contraseña"
          inputId="password"
          inputType="password"
          inputName="password"
          inputValue={formikRegister.values.password}
          inputOnChange={formikRegister.handleChange}
          inputOnblur={formikRegister.handleBlur}
          evaluated={
            formikRegister.touched.password && formikRegister.errors.password
          }
          errorForm={formikRegister.errors.password}
        />
      </div>
      <div>
        <LabelFormBase
          inputLabel="Confirmar Contraseña"
          inputId="confirmPassword"
          inputType="password"
          inputName="confirmPassword"
          inputValue={formikRegister.values.confirmPassword}
          inputOnChange={formikRegister.handleChange}
          inputOnblur={formikRegister.handleBlur}
          evaluated={
            formikRegister.touched.confirmPassword &&
            formikRegister.errors.confirmPassword
          }
          errorForm={formikRegister.errors.confirmPassword}
        />
      </div>
    </div>

    {/* Botón de Registro */}
    {!loading ? (
      <button
        className={`transition duration-200 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block ${
          !isObjectEmpty(formikRegister.errors)
            ? "cursor-not-allowed bg-gray-300 text-black"
            : "bg-siidni-gold text-white hover:bg-siidni-goldLight focus:bg-unah-blueLight"
        }`}
        type="submit"
        disabled={
          !isObjectEmpty(formikRegister.errors) || formikRegister.isSubmitting
        }
      >
        Registrar
      </button>
    ) : (
      <span className="flex justify-center">
        <l-mirage size="80" speed="2.5" color="#e8a06d"></l-mirage>
      </span>
    )}
  </form>
  )
};
