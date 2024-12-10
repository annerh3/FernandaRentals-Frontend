import { useCart } from "react-use-cart";
import { useAuthStore } from "../../security/store";

export const usePriceEvent = () => {
    const { cartTotal } = useCart();
    const user = useAuthStore((state) => state.user);
  
    // Calcula los precios dinámicamente
    const calculatePrices = () => {
      const discountRate = user?.clientType?.discount || 0; 
      const subtotal = cartTotal || 0; 
      const discount = subtotal * discountRate; 
      const total = subtotal - discount; 
      
      return {
        SUBTOTAL: subtotal,
        DISCOUNT: discount,
        TOTAL: total,
      };
    };
  
    return calculatePrices();
  };