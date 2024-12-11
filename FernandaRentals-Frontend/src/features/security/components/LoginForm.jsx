//import { isObjectEmpty } from "../../../shared/utils";
import { LabelFormBase } from "./FormsComponents";

export const LoginForm = ({ formikLogin, loading }) => (
  <form onSubmit={formikLogin.handleSubmit} id="loginForm">
    <div className="mb-4">
      <LabelFormBase
        inputLabel="Email"
        inputId="email"
        inputName="email"
        inputType="email"
        inputValue={formikLogin.values.email}
        inputOnChange={formikLogin.handleChange}
        inputOnblur={formikLogin.handleBlur}
        evaluated={formikLogin.touched.email && formikLogin.errors.email}
        errorForm={formikLogin.errors.email}
      />
    </div>
    <div className="mb-6">
      <LabelFormBase
        inputLabel="Contraseña"
        inputId="password"
        inputName="password"
        inputType="password"
        inputValue={formikLogin.values.password}
        inputOnChange={formikLogin.handleChange}
        inputOnblur={formikLogin.handleBlur}
        evaluated={formikLogin.touched.password && formikLogin.errors.password}
        errorForm={formikLogin.errors.password}
      />
    </div>
    {!loading ? (
      <button
        className={`transition duration-200 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block ${
          Object.keys(formikLogin.errors).length > 0 || formikLogin.isSubmitting
            ? "cursor-not-allowed bg-gray-300 text-black"
            : "bg-siidni-gold text-white hover:bg-siidni-goldLight focus:bg-unah-blueLight"
        }`}
        type="submit"
        disabled={
          formikLogin.isSubmitting || Object.keys(formikLogin.errors).length > 0
        }
      >
        Login
      </button>
    ) : (
      <span className="flex justify-center">
        <l-mirage size="80" speed="2.5" color="#e8a06d"></l-mirage>
      </span>
    )}
  </form>
);
