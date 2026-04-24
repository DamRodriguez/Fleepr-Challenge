import type { ToastProps } from "@/components/toast/Toast";
import { toast } from "react-toastify";
import Toast from "@/components/toast/Toast";

const showToast = (type: ToastProps["type"], text: ToastProps["text"], manualClose?: ToastProps["manualClose"]) => {
  toast[type](
    ({ closeToast }) => (
      <Toast text={text} type={type} closeToast={closeToast} manualClose={manualClose} />
    ),
    {
      position: "top-right",
      autoClose: 2500,
      closeButton: false,
    },
  );
};

export default showToast;