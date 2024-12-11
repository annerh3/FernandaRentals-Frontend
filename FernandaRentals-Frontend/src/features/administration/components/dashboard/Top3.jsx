
import { TopItem } from "./TopItem";

export const Top3 = ({ darkMode , data ,title , colSpan =2 , is_up=true}) => {
    return (
        <div
      className={`col-span-${colSpan} ${
        darkMode ? "bg-siidni-darkCard text-white" : "bg-white text-gray-900"
      } shadow-md rounded-xl p-6 transition-transform hover:scale-105`}
    >
          {/* Titulo centrado */}
          <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
    
          {/* Lista de productos */}
          <ul className="list-none space-y-2">
            {data?.map((item, index) => (
              <TopItem 
                key={index} 
                product={item.product} 
                count={item.count}
                monto={item.revenue}
                is_up={is_up}
              />
            ))}
          </ul>
        </div>
      );
};
