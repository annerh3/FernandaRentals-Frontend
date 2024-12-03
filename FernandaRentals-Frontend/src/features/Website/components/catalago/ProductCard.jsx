import ModalImage from "react-modal-image";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../security/store";
import {rolesListConstant} from "../../../../shared/constants/roles-list.constants.js"

export const ProductCard = ({ product }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const roles = useAuthStore((state) => state.roles);
  const containsRoleAdmin = roles.some(role => [rolesListConstant.ADMIN].includes(role));
  return (
    <div className="bg-background rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto flex flex-col w-full">
      {/* <img
        src={product.urlImage}
        alt={product.description}
        width={400}
        height={300}
        className="w-full h-[200px] object-cover"
        style={{ aspectRatio: "400/300", objectFit: "cover" }}
      /> */}
      <ModalImage
        small={product.urlImage}
        large={product.urlImage}
        alt={product.description}
        width={400}
        height={300}
        className="w-full h-[200px] object-cover shadow-2xl"
        style={{ aspectRatio: "400/300", objectFit: "cover" }}
      />
      <div className="p-4 flex flex-col flex-grow bg-white">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-muted-foreground mb-2">{product.description}</p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Categoría:</span>{" "}
            {product.category.name}
          </p>
          <div className="flex justify-start items-center space-x-4 mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Costo:</span> ${product.cost}
            </p>
            <p className="text-sm text-gray-600 ml-4">
              <span className="font-medium">Stock:</span> {product.stock}
            </p>
          </div>
        </div>
        <div className="mt-4">
          {containsRoleAdmin ? (
            <Link
              to="/administration/manage-products"
              className="inline-flex items-center justify-center w-full rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-transform transform hover:translate-y-1 hover:bg-blue-500 cursor-pointer"
            >
              Administrar Productos
            </Link>
          ) : (
            <Link
              to={isAuthenticated ? "/reservation" : "/security/login"}
              className="inline-flex items-center justify-center w-full rounded-md bg-[#d68a3d] px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-transform transform hover:translate-y-1 hover:bg-[#a96b2e] cursor-pointer"
            >
              {isAuthenticated ? "Reserva Ahora" : "Reserva"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
