import { toast } from "react-toastify";
import { toastAutoClose } from "./variousConstants";

export const showToast = (type, message) => {
    toast[type](message, {
      position: "top-center",
      autoClose: toastAutoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };