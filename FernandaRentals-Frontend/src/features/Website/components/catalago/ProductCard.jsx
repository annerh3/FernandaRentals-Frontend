import ModalImage from "react-modal-image";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../security/store";
import { rolesListConstant } from "../../../../shared/constants/roles-list.constants.js";
import { useCart } from "react-use-cart";

export const ProductCard = ({ product }) => {

  const formattedProductObject = {
    id: product.id,
    name: product.name,
    description: product.description,
    urlImage: product.urlImage,
    category: product.category,
    price: product.price,
    stock: product.stock,
  };
// console.log(formattedProductObject)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const roles = useAuthStore((state) => state.roles);
  const containsRoleAdmin = roles.some((role) =>
    [rolesListConstant.ADMIN].includes(role)
  );
  const { addItem } = useCart();

  return (
    <div className="bg-background rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto flex flex-col w-full">
      <ModalImage
        small={formattedProductObject.urlImage}
        large={formattedProductObject.urlImage}
        alt={formattedProductObject. description}
        width={400}
        height={300}
        className="w-full h-[200px] object-cover shadow-2xl"
        style={{ aspectRatio: "400/300", objectFit: "cover" }}
      />
      <div className="p-4 flex flex-col flex-grow bg-white">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-2">
            {formattedProductObject.name}
          </h3>
          <p className="text-muted-foreground mb-2">
            {formattedProductObject. description}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Categoría:</span>{" "}
            {formattedProductObject.category.name}
          </p>
          <div className="flex justify-start items-center space-x-4 mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Costo:</span> $
              {formattedProductObject.price}
            </p>
            <p className="text-sm text-gray-600 ml-4">
              <span className="font-medium">Stock:</span>{" "}
              {formattedProductObject.stock}
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
            <button
              onClick={() => addItem(product)}
              className="inline-flex items-center justify-center w-full rounded-md bg-[#d68a3d] px-6 py-3 text-white text-md font-bold text-primary-foreground shadow-sm transition-transform transform hover:translate-y-1 hover:bg-[#a96b2e] cursor-pointer"
            >
              Agregar al Carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
