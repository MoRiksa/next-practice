import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const showSuccessAlert = (title: string, text: string) => {
  Swal.fire({
    icon: "success",
    title,
    text,
    timer: 2000,
    showConfirmButton: false,
  });
};

export const showErrorAlert = (title: string, text: string) => {
  Swal.fire({
    icon: "error",
    title,
    text,
    timer: 2000,
    showConfirmButton: false,
  });
};

export const showToast = (message: string, type: "success" | "error") => {
  toast[type](message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
