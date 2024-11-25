import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginInitValues, loginValidationSchema } from "../forms/login_data";
import { isObjectEmpty } from "../../../shared/utils";
import { mirage } from "ldrs";
import { toast, ToastContainer } from "react-toastify";
import { useAuthStore } from "../store/useAuthStore";
import "react-toastify/dist/ReactToastify.css";
import { rolesListConstant } from "../../../shared/constants/roles-list.constants";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login, isAuthenticated, validateAuthentication, roles } = useAuthStore();

    useEffect(() => {
      if (!isAuthenticated) return;
    console.log(roles)
      const hasAdminRole = roles.includes(rolesListConstant.ADMIN);
      console.log("tiene admin role?  ",hasAdminRole)
    
      const destination = hasAdminRole ? "/administration/dashboard" : "/my-events";
      console.log("dest => ",destination)
      navigate(destination);
    }, [roles]);

    // useEffect(() => {
    //   if(isAuthenticated) navigate("/administration/dashboard");
    // })
    

  useEffect(() => {
    mirage.register(); // Para segurar que se registre al montar el componente
  }, []);

  const formik = useFormik({
    initialValues: loginInitValues,
    validationSchema: loginValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      setLoading(true);
      try {
        const { error, message } = await login(formValues);
        validateAuthentication();
        toast[error ? "error" : "success"](message, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (e) {
        toast.warning("Sin conexión al servidor", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className="flex justify-center items-center min-h-screen w-full">
      <div className="bg-gray-950 bg-opacity-20 backdrop-blur-lg  rounded-lg shadow-lg p-8 w-full max-w-md">
        <ToastContainer
          position="top-center"
          autoClose={1300}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Iniciar Sesión
        </h2>
        <form onSubmit={formik.handleSubmit} id="loginForm">
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-siidni-gold text-xs my-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.password && formik.errors.password && (
              <div className="text-siidni-gold text-xs my-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          {!loading ? (
            <button
              className={`transition duration-200 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block 
                ${
                  !isObjectEmpty(formik.errors)
                    ? "cursor-not-allowed bg-gray-300 text-black"
                    : "bg-siidni-gold text-white hover:bg-siidni-goldLight focus:bg-unah-blueLight"
                }
                `}
              type="submit"
              disabled={!isObjectEmpty(formik.errors)}
            >
              Login
            </button>
          ) : (
            <span className="flex justify-center">
              <l-mirage size="80" speed="2.5" color="#e8a06d"></l-mirage>
            </span>
          )}
        </form>
      </div>
    </section>
  );
};
