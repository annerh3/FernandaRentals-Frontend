import { useEffect, useState } from "react";
import { isObjectEmpty } from "../../../shared/utils";
import { useClientType } from "../../administration/hooks";
import { LabelFormBase, SelectButton } from "./FormsComponents";

export const RegisterForm = ({ formikRegister, loading }) => {
  const { clientTypes, loadClientTypes, isLoading } = useClientType();
  const [fetchingClients, setFetchingClients] = useState(true);



  useEffect(() => {
    if (fetchingClients) {
      loadClientTypes();
      setFetchingClients(false);
    }
  }, [fetchingClients]);

  // const handleClientTypeSelect = (clientId) => {
  //   console.log("ID del cliente seleccionado:", clientId);
  // };

  return (
    <form onSubmit={formikRegister.handleSubmit} id="registerForm">
      {/* Primera fila: Nombre y Seleccionador */}
      <div className=" gap-4 mb-4 items-center">
        {/* Campo de Nombre */}
        <div>
          <LabelFormBase
            inputLabel="Nombre"
            inputId="clientName"
            inputType="text"
            inputName="clientName"
            inputValue={formikRegister.values.clientName}
            inputOnChange={formikRegister.handleChange}
            inputOnblur={formikRegister.handleBlur}
            evaluated={
              formikRegister.touched.clientName &&
              formikRegister.errors.clientName
            }
            errorForm={formikRegister.errors.clientName}
          />
        </div>
      </div>

        <div>
          <LabelFormBase
            inputLabel="Email"
            inputId="email"
            inputType="email"
            inputName="email"
            inputValue={formikRegister.values.email}
            inputOnChange={formikRegister.handleChange}
            inputOnblur={formikRegister.handleBlur}
            evaluated={
              formikRegister.touched.email &&
              formikRegister.errors.email
            }
            errorForm={formikRegister.errors.email}
          />
        </div>
      {/* Tercera fila: Contraseña y Confirmar Contraseña */}
      <div className="gap-4 mb-4">
        <div>
          <LabelFormBase
            inputLabel="Contraseña"
            inputId="password"
            inputType="text"
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
        {/* Botón Seleccionador */}
        <span>
          <label className="block text-white text-sm font-bold mb-2">Tipo de Cliente</label>
          <select
            name="clientTypeId"
            id="clientTypeId"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black font-extralight leading-tight focus:outline-none focus:shadow-outline"
            value={formikRegister.values.clientTypeId}
            {...formikRegister.getFieldProps("clientTypeId")}
          >
            <option hidden className="text-gray-500">Seleccione tipo de cliente</option>
            {isLoading ? (
              <option disabled>Cargando tipos de clientes...</option>
            ) : clientTypes?.data?.length ? (
              clientTypes.data.map((ctype) => (
                <option key={ctype.id} value={ctype.id}>
                  {ctype.name}
                </option>
              ))
            ) : (
              <option disabled>No hay tipos de clientes disponibles</option>
            )}
          </select>
          {formikRegister.touched.clientTypeId && formikRegister.errors.clientTypeId ? (
            <div className="text-red-500 text-sm">
              {formikRegister.errors.clientTypeId}
            </div>
          ) : null}
        </span>
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
  );
};
