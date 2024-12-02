import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/security/store/useAuthStore"
import { rolesListConstant } from "../constants/roles-list.constants";

// Componetente que protege o asegura que ningun usuario no perteneciemnte a la lista de roles entre  
// en este momento se cuenta solo con usuarios clientes y administradores pero en un futuro puede que 
// se manejen auditores o lectores de estadisticas

export const ProtectedLayout = () => {
  //Validacion de la autentificacion
    const isAuthenicated = useAuthStore((state) => state.isAuthenticated);
    const roles = useAuthStore((state) => state.roles);

    console.log("ProtectedLayout ",{isAuthenicated, roles})

    //Comprueba si el usuario no está autenticado (!isAuthenticated) o si sus 
    //roles no incluyen el rol ADMIN 
    if(!isAuthenicated || !roles.some(role => 
      [rolesListConstant.ADMIN].includes(role)
    )){
      //const prob = !roles.some(role => [rolesListConstant.ADMIN].includes(role));
      //console.log("No ADMIN en roles? -> ", prob)
      //console.log("Ni modo, pa. va pa HOME")

      // si no esta autentificado lo devuelve al Home
      return <Navigate to="/home" />
    }
    //si esta autentificado y pertenece a ADMIN reenderira el componente 
  return (
    // Aqui para mostrar lo que esta dentro del componente 
      <Outlet />
  )
}
