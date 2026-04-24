import clsx from "clsx";
import CustomCloseButton from "@/components/toast/CustomCloseButton";

export interface ToastProps {
  type: "error" | "success" | "warning" | "info";
  text: string;
  closeToast: () => void;
  manualClose?: boolean
}

const toastItems: Record<
  ToastProps["type"],
  {
    title?: string;
    textClassName: string;
    bgClassName: string;
  }
> = {
  error: {
    textClassName: "text-black",
    bgClassName: "bg-light-white",
  },
  success: {
    textClassName: "text-black",
    bgClassName: "bg-light-green",
  },
  warning: {
    textClassName: "text-yellow-200",
    bgClassName: "bg-light-yellow",
  },
  info: {
    textClassName: "text-secondary-500",
    bgClassName: "bg-light-blue",
  },
};

const Toast = ({ type, text, closeToast, manualClose }: ToastProps) => {
  const toastItem = toastItems[type];

  return (
    <div
      className={clsx(
        "w-full flex justify-between items-center pl-[0.2rem] sm:py-[1rem]",
        toastItem.bgClassName,
      )}
    >
      <div className="flex flex-col w-full pr-[0.5rem] ">
        {toastItem.title && (
          <p
            className={clsx("text-base font-medium", toastItem.textClassName)}
          >
            {toastItem.title}
          </p>
        )}
        <p className="text-base sm:text-lg text-black">{text}</p>
      </div>
      {manualClose && (
        <CustomCloseButton closeToast={closeToast} />
      )}
    </div>
  );
};

export default Toast;

