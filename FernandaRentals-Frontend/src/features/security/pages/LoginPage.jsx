import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerInitValues,
  registerValidationSchema,
} from "../forms/login_data";
import { mirage } from "ldrs";
import { toast, ToastContainer } from "react-toastify";
import { useAuthStore } from "../store/useAuthStore";
import "react-toastify/dist/ReactToastify.css";
import { rolesListConstant } from "../../../shared/constants/roles-list.constants";
import { LoginForm, RegisterForm } from "../components";
import { useEventsData } from "../../Website/store";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Estado para cambiar entre login y registro
  const navigate = useNavigate();

  const { login, register, isAuthenticated, validateAuthentication, roles } =
    useAuthStore();

    const {
      eventData
    } = useEventsData();

    const itStartedShopping = eventData.startDate && eventData.startDate.trim() !== '';

  useEffect(() => {
    // eventData.startDate
    let destination ;
    if (!isAuthenticated) return;
    const hasAdminRole = roles.includes(rolesListConstant.ADMIN);
    if(itStartedShopping){
      navigate('/reservation')
      return;
    }
    destination = hasAdminRole
    ? "/administration/dashboard"
    : "/my-events";
    navigate(destination);
  }, [roles]);

  useEffect(() => {
    mirage.register();
  }, []);


  // Formulario de login
  const formikLogin = useFormik({
    initialValues: registerInitValues,
    validationSchema: registerValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      console.log("formValues: ",values);
      
      setLoading(true);
      try {
        const { error, message } = await login(formValues);
        validateAuthentication();
        toast[error ? "error" : "success"](message, {
          position: "top-center",
          autoClose: 2500,
        });
      } catch (e) {
        toast.warning("Sin conexión al servidor", {
          position: "top-center",
          autoClose: 2500,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  // Formulario de registro
  const formikRegister = useFormik({
    initialValues: registerInitValues,
    validationSchema: registerValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      console.log(formValues);
      
      setLoading(true);
      try {
        const { error, message } = await register(formValues);
        toast[error ? "error" : "success"](message, {
          position: "top-center",
          autoClose: 2500,
        });
      } catch (e) {
        toast.warning("Sin conexión al servidor", {
          position: "top-center",
          autoClose: 2500,
        });
      } finally {
        setLoading(false);
        navigate("/products");
        formikRegister.resetForm();
      }
    },
  });


  
useEffect(() => {
  console.log(formikRegister.errors);
  
}, [formikRegister.errors])

  return (
    <section className="flex justify-center items-center min-h-screen w-full">
      <div className="bg-gray-950 bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-md">
        <ToastContainer
          position="top-center"
          autoClose={1300}
          hideProgressBar={false}
        />

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}
        </h2>

        {/* Mostrar formulario de Login o Registro */}
        {!isRegistering ? (
          <LoginForm formikLogin={formikLogin} loading={loading} />
        ) : (
          <RegisterForm formikRegister={formikRegister} loading={loading} />
        )}

        {/* Enlace para cambiar entre login y registro */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsRegistering((prev) => !prev)}
            className="text-siidni-gold text-sm hover:underline"
          >
            {isRegistering
              ? "¿Ya tienes cuenta? Inicia sesión"
              : "¿No tienes cuenta? Regístrate"}
          </button>
        </div>
      </div>
    </section>
  );
};
