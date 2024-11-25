import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/security/store/useAuthStore"
import { rolesListConstant } from "../constants/roles-list.constants";

export const ProtectedLayout = () => {

    const isAuthenicated = useAuthStore((state) => state.isAuthenticated);
    const roles = useAuthStore((state) => state.roles);

  console.log({isAuthenicated, roles})

    if(!isAuthenicated || !roles.some(role => 
      [rolesListConstant.ADMIN].includes(role)
    )){
      const prob = !roles.some(role => [rolesListConstant.ADMIN].includes(role));
      console.log("no hay ADMIN en roles?    ", prob)
      console.log("Ni modo, pa. va pa HOME")
      return <Navigate to="/home" />
    }
    
  return (
      <Outlet />
  )
}
