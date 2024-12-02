import { Fingerprint } from "lucide-react";

export const ItemUserDetail = ({darkMode, userName}) => {
    return (
        <>
          <li>
            <div>
              <div
                title="Cerrar Sesión"
                className={` rounded-lg pointer-events-none hidden md:inline`}
              >
                <div className="flex items-center justify-start  md:justify-start space-x-3 w-full p-2 ">
                  <Fingerprint
                    size={22}
                    className={` ${darkMode ? "text-gray-200" : "text-gray-950 "}`}
                  />
                  <span
                    className={` ${
                      darkMode ? "text-gray-200" : "text-gray-950"
                    }text-sm ml-4 `}
                  >
                    {userName}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </>
      );
}
